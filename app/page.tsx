"use client";

import { useState, useCallback, useEffect } from "react";
import { CinematicLanding } from "@/components/invitation/CinematicLanding";
import { Hero } from "@/components/invitation/Hero";
import { InvitationStory } from "@/components/invitation/InvitationStory";
import { WeddingGallery } from "@/components/invitation/WeddingGallery";
import { WeddingCountdown } from "@/components/invitation/WeddingCountdown";
import { WeddingDetails } from "@/components/invitation/WeddingDetails";
import { WeddingLocation } from "@/components/invitation/WeddingLocation";
import { FinalInvitation } from "@/components/invitation/FinalInvitation";
import { Footer } from "@/components/invitation/Footer";
import { WeddingData } from "@/data/wedding";
import { Suspense } from "react";
import { CountdownFallback } from "@/components/invitation/CountdownFallback";

import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareReady, setShareReady] = useState(false);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = `Join us for Noufiya & Mansoor's wedding on ${WeddingData.couple.date}. We would be delighted to have you celebrate with us.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Noufiya & Mansoor Wedding", text, url });
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        if (navigator.vibrate) navigator.vibrate(12);
      } catch {
        // clipboard unavailable
      }
    }
  }, []);

  const handleAddToCalendar = useCallback(() => {
    const start = new Date(WeddingData.couple.fullDate);
    const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);

    const escape = (s: string) =>
      s.replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Noufiya&Mansoor//Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:noufiya-mansoor-wedding-${Date.now()}@wedding`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTEND:${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `SUMMARY:${escape("Noufiya & Mansoor Wedding")}`,
      `DESCRIPTION:${escape(WeddingData.invitation.closing)}`,
      `LOCATION:${escape(WeddingData.venue.address)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "noufiya-mansoor-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, []);

  if (typeof window !== "undefined") {
    useEffect(() => {
      setShareReady(true);
    }, []);
  }

  return (
    <>
      <CinematicLanding isOpen={isOpen} onOpen={() => setIsOpen(true)} />

      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero isOpen={isOpen} onOpen={() => setIsOpen(true)} />
        <InvitationStory />
        <WeddingGallery />
        <Suspense fallback={<CountdownFallback />}>
          <WeddingCountdown />
        </Suspense>
        <WeddingDetails />
        <WeddingLocation />
        <FinalInvitation />
      </main>

      <Footer />

      {/* Utility bar — share + calendar */}
      
<div
  aria-label="Invitation actions"
  className={`
    fixed bottom-0 left-0 right-0 z-50
    flex items-center justify-center gap-3
    border-t border-[#F1DDE1]
    bg-white/90 px-4 py-3
    backdrop-blur-xl
    transition-all duration-500
    ${isOpen
      ? "translate-y-0 opacity-100 pointer-events-auto"
      : "translate-y-full opacity-0 pointer-events-none"}
  `}
>
  {/* Share Invitation */}
  <button
    onClick={handleShare}
    aria-label="Share invitation"
    className="
      group inline-flex items-center justify-center gap-2
      border border-[#C8102E]
      bg-white px-5 py-3
      text-[#C8102E]
      transition-all duration-300
      hover:bg-[#C8102E] hover:text-white
      active:scale-95
      sm:px-7
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4"
    >
      <path d="M12 16V4m-5 5 5-5 5 5" />
      <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
    </svg>

    <span className="text-[10px] font-medium uppercase tracking-[0.16em] sm:text-xs">
      Share Invitation
    </span>
  </button>

  {/* Add to Calendar */}
  <button
    onClick={handleAddToCalendar}
    aria-label="Add to calendar"
    className="
      group inline-flex items-center justify-center gap-2
      border border-[#C8102E]
      bg-[#C8102E] px-5 py-3
      text-white
      transition-all duration-300
      hover:bg-[#A50D26] hover:border-[#A50D26]
      active:scale-95
      sm:px-7
    "
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M16 3v4M8 3v4M3 10h18M12 13v5m-2.5-2.5L12 18l2.5-2.5" />
    </svg>

    <span className="text-[10px] font-medium uppercase tracking-[0.16em] sm:text-xs">
      Add to Calendar
    </span>
  </button>
</div>
    </>
  );
}
