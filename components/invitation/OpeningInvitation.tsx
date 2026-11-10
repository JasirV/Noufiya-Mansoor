"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ChevronDown } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface OpeningInvitationProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function OpeningInvitation({ isOpen, onOpen }: OpeningInvitationProps) {
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBurst = useCallback(() => {
    const dedupe = (args: unknown[]) =>
      args.filter(
        (_: unknown, i: number, arr: unknown[]) => arr.indexOf(_) === i
      );

    const defaults = {
      spread: 100,
      ticks: 60,
      gravity: 0.5,
      scalar: 1,
    };

    const fire = ({
      particleRatio,
      ...rest
    }: {
      particleRatio: number;
    }) => {
      const el = document.createElement("canvas");
      const ctx = el.getContext("2d");
      if (!ctx) return;

      confetti({
        ...defaults,
        ...rest,
        particleRatio,
        shapes: ["circle"],
        scalar: defaults.scalar,
        startVelocity: 25,
        origin: { y: 0.6 },
      });
    };

    const centerPiece = {
      particleRatio: 0.25,
      spread: 70,
      startVelocity: 40,
      colors: ["#783D46", "#FAF8F4", "#FFFFFF"],
    };

    const left = {
      particleRatio: 0.2,
      spread: 70,
      startVelocity: 30,
      origin: { x: 0.3, y: 0.6 },
      colors: ["#783D46", "#FAF8F4"],
    };

    const right = {
      particleRatio: 0.2,
      spread: 70,
      startVelocity: 30,
      origin: { x: 0.7, y: 0.6 },
      colors: ["#783D46", "#FAF8F4"],
    };

    const tail = {
      particleRatio: 0.15,
      spread: 120,
      startVelocity: 30,
      origin: { y: 0.5 },
      colors: ["#FFFFFF", "#FAF8F4"],
    };

    fire(centerPiece);
    setTimeout(() => fire(left), 100);
    setTimeout(() => fire(right), 200);
    setTimeout(() => fire(tail), 300);
  }, []);

  const handleClick = useCallback(() => {
    if (isOpen) return;
    onOpen();
    setTimeout(() => handleBurst(), 350);
  }, [isOpen, onOpen, handleBurst]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        zIndex: 10,
      }}
      role="button"
      tabIndex={0}
      aria-label="Open invitation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="group relative">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
          }}
        >
          Open Invitation
        </span>
        <motion.span
          animate={{
            rotate: isOpen ? 0 : [0, -25, 0, 15, 0],
            opacity: isOpen ? 0 : [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          style={{
            display: "inline-block",
            marginLeft: "1.4rem",
          }}
        >
          <ChevronDown
            size={18}
            color="var(--color-taupe)"
          />
        </motion.span>
      </div>
    </motion.div>
  );
}
