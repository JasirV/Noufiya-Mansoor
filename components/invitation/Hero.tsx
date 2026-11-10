
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Heart } from "lucide-react";
import { heroImage } from "@/data/gallery";
import { OpeningInvitation } from "./OpeningInvitation";

interface HeroProps {
  isOpen: boolean;
  onOpen: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ isOpen, onOpen }: HeroProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.5, 0]
  );

  useEffect(() => {
    if (isOpen) return;

    // Prevent accidental scrolling before opening the invitation.
    // OpeningInvitation remains responsible for its own interaction.
  }, [isOpen]);

  return (
    <>
      <motion.section
        ref={ref}
        aria-label="Wedding invitation hero"
        className="relative min-h-[680px] h-[100svh] w-full overflow-hidden bg-[#24070D] text-[#FFF6EF]"
      >
        {/* Background photograph */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Cinematic color overlays */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#180409]/65 via-[#24070D]/15 to-[#180409]/85" /> */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#24070D]/35 via-transparent to-[#24070D]/20" />

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(20,2,8,0.45)]" />

        {/* Decorative frame */}
        {/* <div className="pointer-events-none absolute inset-4 border border-[#FFF6EF]/20 sm:inset-6 md:inset-8">
          <div className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[#E5B7A9] sm:h-14 sm:w-14" />
          <div className="absolute right-0 top-0 h-10 w-10 border-r border-t border-[#E5B7A9] sm:h-14 sm:w-14" />
          <div className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-[#E5B7A9] sm:h-14 sm:w-14" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#E5B7A9] sm:h-14 sm:w-14" />
        </div> */}

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-8 py-8 sm:px-12 md:px-16"
        >
          {/* <div className="flex items-center gap-3">
            <Heart
              size={15}
              strokeWidth={1.2}
              className="text-[#E5B7A9]"
            />
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#FFF6EF]/90 sm:text-[10px]">
              The Wedding Celebration
            </span>
          </div> */}

          <span className="hidden text-[9px] tracking-[0.3em] text-[#FFF6EF]/75 sm:block">
            N · M
          </span>
        </motion.header>

        {/* Main content */}
        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16 pt-24 text-center sm:px-10 md:px-16"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mb-7 flex items-center gap-3 sm:mb-10 sm:gap-5"
          >
            {/* <span className="h-px w-8 bg-[#E5B7A9]/80 sm:w-12" /> */}

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#F3D6C9] sm:text-[11px] sm:tracking-[0.45em]">
              Together with their families
            </span>

            {/* <span className="h-px w-8 bg-[#E5B7A9]/80 sm:w-12" /> */}
          </motion.div>

          {/* Couple names */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.4,
              delay: 0.8,
              ease,
            }}
            className="w-full"
          >
            <h1 className="font-serif text-[clamp(3.1rem,10.5vw,9rem)] font-light leading-[0.95] tracking-[-0.055em] text-[#FFF6EF] [text-shadow:0_4px_35px_rgba(0,0,0,0.3)]">
              Noufiya
              <span className="mx-2 block py-2 text-[0.52em] italic text-[#E5B7A9] sm:mx-4 md:inline md:py-0">
                &
              </span>
              Mansoor
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease }}
            className="mt-6 max-w-md text-[10px] leading-relaxed tracking-[0.25em] text-[#FFF6EF]/85 sm:mt-8 sm:text-xs sm:tracking-[0.3em]"
          >
            TWO HEARTS · ONE BEAUTIFUL BEGINNING
          </motion.p>

          {/* Date divider */}
          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.1, delay: 1.5, ease }}
            className="mt-9 flex w-full max-w-[340px] items-center justify-center gap-4 sm:mt-12"
          >
            <span className="h-px flex-1 bg-[#E5B7A9]/50" />

            <Heart
              size={13}
              strokeWidth={1}
              className="shrink-0 text-[#E5B7A9]"
            />

            <span className="h-px flex-1 bg-[#E5B7A9]/50" />
          </motion.div> */}

          {/* Wedding date */}
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease }}
            className="mt-6"
          >
            <p className="font-serif text-xl font-light tracking-[0.14em] text-[#FFF6EF] sm:text-2xl md:text-3xl">
              15 November 2026
            </p>

            <p className="mt-3 text-[8px] uppercase tracking-[0.4em] text-[#E5B7A9] sm:text-[9px]">
              Sunday · A Day To Remember
            </p>
          </motion.div> */}

      
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10"
        >
          <span className="whitespace-nowrap text-[8px] uppercase tracking-[0.35em] text-[#FFF6EF]/70 sm:text-[9px]">
            Scroll to explore
          </span>

          <motion.div
            animate={{ y: [0, 7, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown
              size={16}
              strokeWidth={1}
              className="text-[#E5B7A9]"
            />
          </motion.div>
        </motion.div>

        {/* Bottom corner details */}
        <div className="pointer-events-none absolute bottom-8 left-8 z-10 hidden sm:block md:left-12">
          <span className="text-[8px] tracking-[0.3em] text-[#FFF6EF]/55">
            EST. 2026
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-8 right-8 z-10 hidden sm:block md:right-12">
          <span className="text-[8px] tracking-[0.3em] text-[#FFF6EF]/55">
            WITH LOVE
          </span>
        </div>

        {/* Existing invitation opening interaction */}
        <OpeningInvitation isOpen={isOpen} onOpen={onOpen} />
      </motion.section>
    </>
  );
}
