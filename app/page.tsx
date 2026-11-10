"use client";

import { useState, useCallback } from "react";
import { CinematicLanding } from "@/components/invitation/CinematicLanding";
import { Hero } from "@/components/invitation/Hero";
import { InvitationStory } from "@/components/invitation/InvitationStory";
import { WeddingGallery } from "@/components/invitation/WeddingGallery";
import { WeddingCountdown } from "@/components/invitation/WeddingCountdown";
import { WeddingDetails } from "@/components/invitation/WeddingDetails";
import { WeddingLocation } from "@/components/invitation/WeddingLocation";
import { FinalInvitation } from "@/components/invitation/FinalInvitation";
import { InvitationActions } from "@/components/invitation/InvitationActions";
import { Footer } from "@/components/invitation/Footer";
import { WeddingData } from "@/data/wedding";
import { Suspense } from "react";
import { CountdownFallback } from "@/components/invitation/CountdownFallback";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

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
      `LOCATION:${escape(`${WeddingData.venue.name}, ${WeddingData.venue.address}`)}`,
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
        <InvitationActions
          onAddToCalendar={handleAddToCalendar}
          onShare={handleShare}
        />
      </main>

      <Footer />
    </>
  );
}
