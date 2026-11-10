
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { WeddingData } from "@/data/wedding";
import { Camera, Heart, HeartPulse, Sparkles } from "lucide-react";
import { finalImage } from "@/data/gallery";

export function FinalInvitation() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      aria-label="Final invitation"
      className="relative overflow-hidden bg-white px-5 py-24 text-[#30201f] sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1350px]">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-5 block text-[10px] uppercase tracking-[0.4em] text-[#8c3546]">
            A beautiful beginning
          </span>

          <h2 className="font-serif text-5xl font-normal leading-tight tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Two different worlds,
            <span className="block italic text-[#8c3546]">
              one beautiful love.
            </span>
          </h2>
        </motion.div>

        {/* Profession cards */}
        <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8">

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="group relative overflow-hidden border border-[#e9dfd9] bg-[#fcfaf8] p-8 sm:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  The Bride
                </span>

                <h3 className="mt-3 font-serif text-3xl text-[#30201f] sm:text-4xl">
                  The Healer
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c3546]/20 text-[#8c3546] transition-transform duration-500 group-hover:rotate-12">
                <HeartPulse size={23} strokeWidth={1.2} />
              </div>
            </div>

            <div className="my-8 h-px w-full bg-[#e9dfd9]" />

            <p className="max-w-sm font-serif text-xl italic leading-relaxed text-[#8c3546]">
              A heart devoted to caring, a soul made to bring comfort.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-7 bg-[#8c3546]/50" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#887771]">
                Anesthesiologist
              </span>
            </div>

            <Heart
              size={100}
              strokeWidth={0.5}
              className="pointer-events-none absolute -bottom-8 -right-5 text-[#8c3546]/[0.045]"
            />
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="group relative overflow-hidden border border-[#e9dfd9] bg-[#fcfaf8] p-8 sm:p-10"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  The Groom
                </span>

                <h3 className="mt-3 font-serif text-3xl text-[#30201f] sm:text-4xl">
                  The Storyteller
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c3546]/20 text-[#8c3546] transition-transform duration-500 group-hover:rotate-12">
                <Camera size={23} strokeWidth={1.2} />
              </div>
            </div>

            <div className="my-8 h-px w-full bg-[#e9dfd9]" />

            <p className="max-w-sm font-serif text-xl italic leading-relaxed text-[#8c3546]">
              An eye for beauty, a passion for capturing timeless moments.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-7 bg-[#8c3546]/50" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#887771]">
                Photographer
              </span>
            </div>

            <Camera
              size={100}
              strokeWidth={0.5}
              className="pointer-events-none absolute -bottom-8 -right-5 text-[#8c3546]/[0.045]"
            />
          </motion.div>
        </div>

        {/* Love connects everything */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-20 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#8c3546]/30" />
            <Heart size={18} className="text-[#8c3546]" strokeWidth={1.2} />
            <span className="h-px w-12 bg-[#8c3546]/30" />
          </div>

          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-[#30201f] sm:text-3xl lg:text-4xl">
            One heals hearts, the other captures moments.
            Together, they create a lifetime of memories.
          </p>
        </motion.div>

        {/* Final invitation and photograph */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* Invitation text */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <Sparkles size={15} className="text-[#8c3546]" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8c3546]">
                With love & gratitude
              </span>
            </div>

            <h3 className="mb-7 font-serif text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
              A day to remember,
              <span className="block italic text-[#8c3546]">
                forever to cherish.
              </span>
            </h3>

            <p className="mb-10 max-w-lg text-sm leading-8 text-[#887771] sm:text-base">
              {WeddingData.invitation.closing}
            </p>

            <div className="space-y-7 border-t border-[#e9dfd9] pt-8">
              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  With love
                </span>

                <p className="font-serif text-2xl text-[#30201f]">
                  {WeddingData.couple.names}
                </p>
              </div>

              <div>
                <span className="mb-2 block text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  The special day
                </span>

                <p className="font-serif text-xl italic text-[#8c3546]">
                  {WeddingData.couple.date}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Couple photograph */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -bottom-3 -right-3 h-full w-full border border-[#8c3546]/20" />

            <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f5f0]">
              <Image
                src={finalImage.src}
                alt={finalImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 550px"
                className="object-cover object-center"
              />

              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />
            </div>

            <p className="mt-5 text-center font-serif text-lg italic text-[#8c3546]">
              The beginning of forever.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 border-t border-[#e9dfd9] pt-8 text-center"
        >
          <p className="font-serif text-2xl italic text-[#8c3546]">
            With love, Noufiya & Mansoor
          </p>

          <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#a18f87]">
            15 November 2026 · A lifetime together
          </p>
        </motion.div>

      </div>
    </section>
  );
}
