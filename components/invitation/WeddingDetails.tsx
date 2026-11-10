"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WeddingData } from "@/data/wedding";
import {
  MapPin,
  Clock,
  CalendarDays,
  Heart,
  Navigation,
} from "lucide-react";

export function WeddingDetails() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  const details = [
    {
      label: "Wedding Date",
      value: WeddingData.couple.date,
      icon: CalendarDays,
    },
    {
      label: "Ceremony Time",
      value: WeddingData.couple.time,
      icon: Clock,
    },
    {
      label: "Wedding Venue",
      value: WeddingData.venue.name,
      icon: MapPin,
    },
    {
      label: "Location",
      value: WeddingData.venue.address,
      icon: Navigation,
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Wedding details"
      className="relative overflow-hidden bg-white px-5 py-24 text-[#30201f] sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#8c3546]/[0.06]" />

      <div className="relative mx-auto max-w-[1250px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:mb-20"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#8c3546]/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8c3546]">
              Join us in celebration
            </span>
            <span className="h-px w-9 bg-[#8c3546]/50" />
          </div>

          <h2 className="font-serif text-5xl font-normal tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            The Wedding
            <span className="block italic text-[#8c3546]">
              Details
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#887771]">
            A special day, a beautiful beginning. We would be delighted
            to have you with us as we celebrate our forever.
          </p>
        </motion.div>

        {/* Couple and date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.15 }}
          className="relative mb-16 border border-[#e9dfd9] bg-[#fcfaf8] px-5 py-12 text-center sm:px-10 sm:py-16 lg:mb-20"
        >
          <span className="mb-5 block text-[9px] uppercase tracking-[0.4em] text-[#8c3546]">
            Celebrating the union of
          </span>

          <h3 className="font-serif text-4xl font-normal leading-tight tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            {WeddingData.couple.names}
          </h3>

          <div className="my-7 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#8c3546]/30" />
            <Heart
              size={16}
              className="text-[#8c3546]"
              strokeWidth={1.2}
            />
            <span className="h-px w-12 bg-[#8c3546]/30" />
          </div>

          <p className="font-serif text-2xl italic text-[#8c3546] sm:text-3xl">
            {WeddingData.couple.date}
          </p>
        </motion.div>

        {/* Details grid */}
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
          {details.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.25 + index * 0.12,
                }}
                className={`group border-[#e9dfd9] px-5 py-9 transition-colors duration-500 hover:bg-[#fcfaf8] sm:px-10 sm:py-12 ${
                  index < 2 ? "border-b" : ""
                } ${index % 2 === 0 ? "sm:border-r" : ""}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <Icon
                    size={17}
                    strokeWidth={1.3}
                    className="text-[#8c3546] transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                    {item.label}
                  </span>
                </div>

                <p className="break-words font-serif text-2xl font-normal leading-snug text-[#30201f] sm:text-3xl">
                  {item.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-[#e9dfd9] pt-8 text-center"
        >
          <Heart
            size={17}
            strokeWidth={1.2}
            className="text-[#8c3546]"
          />

          <p className="font-serif text-xl italic text-[#8c3546]">
            Your presence will make our day complete.
          </p>

          <span className="text-[9px] uppercase tracking-[0.35em] text-[#a18f87]">
            Noufiya & Mansoor · 2026
          </span>
        </motion.div>
      </div>
    </section>
  );
}
