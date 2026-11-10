"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { type GalleryImage } from "@/data/gallery";

interface GalleryLightboxProps {
  image: GalleryImage | null;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function GalleryLightbox({
  image,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, handleKeyDown]);

  const prevLabel =
    index > 0 ? `Previous image (${index})` : "No previous image";
  const nextLabel =
    index < total - 1
      ? `Next image (${index + 2} of ${total})`
      : "No next image";

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${total}: ${image.alt}`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(37, 37, 37, 0.97)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(1rem, 3vw, 2.5rem)",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            style={{
              position: "absolute",
              top: "clamp(1rem, 3vw, 2rem)",
              right: "clamp(1rem, 3vw, 2rem)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#FAF8F4",
              width: "clamp(40px, 4vw, 48px)",
              height: "clamp(40px, 4vw, 48px)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.25s ease, transform 0.25s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.16)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "88vh",
              aspectRatio: "16 / 10",
              overflow: "hidden",
              boxShadow: "0 30px 90px rgba(0,0,0,0.4)",
              cursor: "zoom-in",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="90vw"
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              quality={95}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "clamp(1rem, 2vw, 1.5rem)",
                background:
                  "linear-gradient(to top, rgba(37,37,37,0.7) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.06em",
                  color: "rgba(250,248,244,0.85)",
                }}
              >
                {image.alt} · {index + 1} / {total}
              </span>
            </div>
          </motion.div>

          <div
            style={{
              position: "absolute",
              bottom: "clamp(1.2rem, 3vw, 2.5rem)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "clamp(0.5rem, 1.5vw, 1rem)",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label={prevLabel}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#FAF8F4",
                width: "clamp(44px, 4vw, 52px)",
                height: "clamp(44px, 4vw, 52px)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: index > 0 ? "pointer" : "default",
                opacity: index > 0 ? 1 : 0.35,
                transition: "opacity 0.25s ease, background 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (index > 0) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.16)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              disabled={index <= 0}
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label={nextLabel}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#FAF8F4",
                width: "clamp(44px, 4vw, 52px)",
                height: "clamp(44px, 4vw, 52px)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: index < total - 1 ? "pointer" : "default",
                opacity: index < total - 1 ? 1 : 0.35,
                transition: "opacity 0.25s ease, background 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (index < total - 1) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.16)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              disabled={index >= total - 1}
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          <ZoomIn
            size={14}
            color="rgba(255,255,255,0.4)"
            style={{
              position: "absolute",
              bottom: "clamp(1.2rem, 3vw, 2.5rem)",
              right: "clamp(1.2rem, 3vw, 2.5rem)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
