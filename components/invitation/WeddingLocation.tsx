
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WeddingData } from "@/data/wedding";
import { MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function WeddingLocation() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      aria-label="Wedding location"
      className="relative overflow-hidden bg-white px-5 py-24 text-[#30201f] sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1350px]">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center lg:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#8c3546]/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8c3546]">
              Find Your Way
            </span>
            <span className="h-px w-9 bg-[#8c3546]/50" />
          </div>

          <h2 className="font-serif text-5xl font-normal tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            The Wedding
            <span className="ml-3 italic text-[#8c3546]">Venue</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#887771]">
            We can&apos;t wait to celebrate this special day with you.
            Here&apos;s where our beautiful journey begins.
          </p>
        </motion.div>

        {/* Location content */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

          {/* Venue information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="mb-8 flex h-12 w-12 items-center justify-center border border-[#8c3546]/20 text-[#8c3546]">
              <MapPin size={21} strokeWidth={1.3} />
            </div>

            <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-[#9a8981]">
              Celebrate with us at
            </span>

            <h3 className="mb-6 font-serif text-3xl font-normal leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              {WeddingData.venue.name}
            </h3>

            <div className="mb-9 flex items-start gap-3 border-l border-[#8c3546]/30 pl-5">
              <MapPin
                size={17}
                className="mt-1 shrink-0 text-[#8c3546]"
                strokeWidth={1.5}
              />

              <p className="max-w-sm text-sm leading-7 text-[#887771]">
                {WeddingData.venue.address}
              </p>
            </div>

            <Link
              href={WeddingData.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-5 border border-[#8c3546] bg-[#8c3546] px-7 py-4 text-white transition-all duration-300 hover:bg-white hover:text-[#8c3546]"
            >
              <span className="text-[10px] uppercase tracking-[0.2em]">
                Get Directions
              </span>

              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <p className="mt-8 text-[9px] uppercase tracking-[0.25em] text-[#aa9b94]">
              Noufiya & Mansoor · 15 November 2026
            </p>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.25 }}
            className="relative"
          >
            <div className="absolute -bottom-3 -right-3 h-full w-full border border-[#8c3546]/20" />

            <div className="relative aspect-[4/3] overflow-hidden border border-[#e9dfd9] bg-[#f8f5f0] sm:aspect-[16/10]">
              <iframe
                src={WeddingData.venue.embedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  display: "block",
                  width: "100%",
                  height: "100%",
                }}
                title={`Map showing ${WeddingData.venue.name}`}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="relative mt-5 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#9a8981]">
                  Wedding destination
                </span>
                <span className="mt-1 block font-serif text-lg text-[#30201f]">
                  {WeddingData.venue.name}
                </span>
              </div>

              <MapPin
                size={20}
                strokeWidth={1.2}
                className="shrink-0 text-[#8c3546]"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-[#e9dfd9]" />
          <span className="font-serif text-lg italic text-[#8c3546]">
            We look forward to seeing you
          </span>
          <span className="h-px w-12 bg-[#e9dfd9]" />
        </motion.div>

      </div>
    </section>
  );
}
