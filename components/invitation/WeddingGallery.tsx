"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { GalleryLightbox } from "./GalleryLightbox";
import { galleryImages, type GalleryImage } from "@/data/gallery";

export function WeddingGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    setActiveIndex(null);
  };

  const navigate = (dir: "prev" | "next") => {
    if (activeIndex === null) return;
    const next = dir === "next" ? activeIndex + 1 : activeIndex - 1;
    if (next >= 0 && next < galleryImages.length) {
      setActiveIndex(next);
      setLightboxImage(galleryImages[next]);
    }
  };

  const gridImages = galleryImages.filter((_, i) => i !== 0);
  const heroImage = galleryImages[0];

  return (
    <>
      <section
        ref={ref}
        style={{
          background: "var(--color-ivory)",
          padding: "clamp(4rem, 7vw, 8rem) 0",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
        aria-label="Wedding gallery"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
            display: "block",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          In Celebration
        </motion.span>

        <motion.div
          className="grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
            gap: "clamp(0.4rem, 1vw, 0.8rem)",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {gridImages.map((image, i) => (
            <motion.div
              key={image.id}
              variants={{
                hidden: { opacity: 0, scale: 0.97, y: 14 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openLightbox(image, i + 1)}
              role="button"
              tabIndex={0}
              aria-label={`View ${image.alt}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(image, i + 1);
                }
              }}
              className="group"
              style={{
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 5" : "1 / 1",
                willChange: "transform",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                decoding="async"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className="group-hover-scale"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(120, 61, 70, 0.0) 60%, rgba(120, 61, 70, 0.18) 100%)",
                  opacity: 0,
                  transition: "opacity 0.5s ease",
                  pointerEvents: "none",
                }}
                className="gallery-fade"
              />
            </motion.div>
          ))}
        </motion.div>

        {heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openLightbox(heroImage, 0)}
            role="button"
            tabIndex={0}
            aria-label={`View ${heroImage.alt}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(heroImage, 0);
              }
            }}
            style={{
              marginTop: "clamp(1rem, 2vw, 1.8rem)",
              overflow: "hidden",
              cursor: "pointer",
              aspectRatio: "9 / 6",
              background: "var(--color-soft-white)",
              boxShadow: "0 20px 60px -30px rgba(37,37,37,0.28)",
              position: "relative",
            }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(120, 61, 70, 0.0) 40%, rgba(120, 61, 70, 0.2) 100%)",
                opacity: 0,
                transition: "opacity 0.5s ease",
                pointerEvents: "none",
              }}
              className="gallery-fade"
            />
          </motion.div>
        )}
      </section>

      {/* hover overlays activated via parent .group class */}

      <GalleryLightbox
        image={lightboxImage}
        index={activeIndex ?? -1}
        total={galleryImages.length}
        onClose={closeLightbox}
        onNext={() => navigate("next")}
        onPrev={() => navigate("prev")}
      />
    </>
  );
}
