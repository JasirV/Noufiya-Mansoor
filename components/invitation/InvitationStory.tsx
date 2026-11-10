
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WeddingData } from "@/data/wedding";
import { ArrowDown, Heart } from "lucide-react";

export function InvitationStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.15,
  });

  const images = [
    {
      src: "/images/IMG_3256.JPG.jpeg",
      alt: "Noufiya and Mansoor sharing a beautiful moment",
    },
    {
      src: "/images/IMG_3621.JPG.jpeg",
      alt: "A special moment from the couple's journey",
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Our wedding story"
      className="relative overflow-hidden bg-[#f8f5f0] px-5 py-24 text-[#30201f] sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border border-[#7c2638]/10" />
      <div className="pointer-events-none absolute -right-20 top-32 h-72 w-72 rounded-full border border-[#7c2638]/10" />

      <div className="mx-auto max-w-[1440px]">
        {/* Section heading */}
        <div className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-[#8c3546]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#8c3546] sm:text-xs">
                The beginning of forever
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
              className="max-w-4xl font-serif text-5xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-8xl"
            >
              A story
              <br />
              written in{" "}
              <span className="italic text-[#8c3546]">love.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center gap-3 pb-2 lg:justify-end"
          >
            <Heart size={15} strokeWidth={1.3} className="text-[#8c3546]" />
            <span className="text-xs tracking-[0.2em] text-[#806d68]">
              NOUFIYA & MANSOOR
            </span>
          </motion.div>
        </div>

        {/* Album layout */}
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          {/* Photo composition */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[650px] pb-12 pr-8 sm:pb-16 sm:pr-16"
          >
            {/* Main photograph */}
            <div className="relative aspect-[4/5] w-[82%] overflow-hidden bg-[#e8ded5]">
              <motion.img
                src={images[0].src}
                alt={images[0].alt}
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.12 }}
                animate={isInView ? { scale: 1 } : { scale: 1.12 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>

            {/* Overlapping photograph */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 5 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, rotate: 3 }
                  : { opacity: 0, y: 30, rotate: 5 }
              }
              transition={{ duration: 1, delay: 0.45 }}
              className="absolute bottom-0 right-0 w-[43%] border-[7px] border-[#f8f5f0] bg-[#e8ded5] shadow-[0_20px_55px_rgba(48,32,31,0.16)] sm:border-[10px]"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images[1].src}
                  alt={images[1].alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Album label */}
            <div className="absolute bottom-0 left-0 flex items-center gap-3">
              <span className="h-px w-8 bg-[#8c3546]" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#806d68]">
                Moments to remember
              </span>
            </div>

            {/* Decorative number */}
            <span className="absolute -right-1 top-5 font-serif text-5xl italic text-[#8c3546]/20 sm:right-0 sm:text-7xl">
              01
            </span>
          </motion.div>

          {/* Story content */}
          <div className="lg:pl-4">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 block text-[10px] uppercase tracking-[0.35em] text-[#8c3546]"
            >
              Every love has a story
            </motion.span>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mb-8 font-serif text-3xl font-normal leading-snug sm:text-4xl lg:text-5xl"
            >
              Two hearts,
              <br />
              one beautiful journey.
            </motion.h3>

            <div className="space-y-5">
              {WeddingData.invitation.storyBody.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + index * 0.15,
                  }}
                  className="max-w-xl text-sm leading-[2] text-[#75645e] sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 border-t border-[#8c3546]/15 pt-7"
            >
              <p className="font-serif text-3xl italic text-[#8c3546]">
                With love,
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#806d68]">
                Noufiya & Mansoor
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom album footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-24 flex flex-col items-center justify-between gap-5 border-t border-[#8c3546]/15 pt-7 sm:flex-row"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
            A lifetime of memories begins here
          </span>

          <div className="flex items-center gap-3 text-[#8c3546]">
            <span className="text-[10px] tracking-[0.2em]">
              15 NOVEMBER 2026
            </span>
            <ArrowDown size={14} strokeWidth={1.2} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
