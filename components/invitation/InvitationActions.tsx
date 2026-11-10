"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WeddingData } from "@/data/wedding";
import { Calendar, Share2, Copy, Check, MessageCircle, Heart, Clock, MapPin } from "lucide-react";

interface InvitationActionsProps {
  onAddToCalendar: () => void;
  onShare: () => void;
}

export function InvitationActions({ onAddToCalendar, onShare }: InvitationActionsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [copied, setCopied] = useState(false);
  const [calendarSaved, setCalendarSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const handleCopyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Invitation link copied to clipboard");
      setTimeout(() => setCopied(false), 2400);
    } catch {
      showToast("Could not copy link");
    }
  }, [showToast]);

  const handleCalendarClick = useCallback(() => {
    onAddToCalendar();
    setCalendarSaved(true);
    showToast("Wedding event downloaded to your calendar");
    setTimeout(() => setCalendarSaved(false), 2600);
  }, [onAddToCalendar, showToast]);

  const handleWhatsAppShare = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const message = encodeURIComponent(
      `Join us in celebrating the wedding of ${WeddingData.couple.names} on ${WeddingData.couple.date} at ${WeddingData.venue.name}, Bharathanoor.\n\nView the wedding invitation:\n${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Save the date and share"
      className="relative overflow-hidden bg-[#FAF7F5] px-5 py-24 text-[#30201f] sm:px-10 lg:px-16 lg:py-32"
    >
      {/* Toast Notification */}
      <div
        aria-live="polite"
        className={`fixed bottom-8 left-1/2 z-[1000] -translate-x-1/2 transition-all duration-400 ${
          toastMessage
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-4 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 border border-[#8C3546]/30 bg-[#30201f] px-6 py-3.5 text-white shadow-2xl backdrop-blur-md">
          <Heart size={15} className="fill-[#E5B7A9] text-[#E5B7A9]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#FFF6EF]">
            {toastMessage}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#8c3546]/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#8c3546]">
              Reserve The Date
            </span>
            <span className="h-px w-9 bg-[#8c3546]/50" />
          </div>

          <h2 className="font-serif text-5xl font-normal tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Celebrate
            <span className="ml-3 italic text-[#8c3546]">With Us</span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#887771]">
            We would be honored by your presence. Save our wedding to your personal
            calendar and share the invitation with loved ones.
          </p>
        </motion.div>

        {/* Elegant Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Card 1: Add to Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="group relative flex flex-col justify-between border border-[#e9dfd9] bg-white p-8 transition-all duration-500 hover:border-[#8c3546]/40 hover:shadow-xl sm:p-11"
          >
            {/* Top decorative accent */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#8c3546]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div>
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c3546]/20 bg-[#FAF7F5] text-[#8c3546] transition-colors duration-500 group-hover:bg-[#8c3546] group-hover:text-white">
                  <Calendar size={20} strokeWidth={1.3} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  Calendar Sync
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#30201f] sm:text-4xl">
                Add to Calendar
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#887771]">
                Save the date directly to your Apple, Google, or Outlook calendar
                so you never miss a moment of our big day.
              </p>

              {/* Event Details snippet */}
              <div className="my-7 space-y-3 border-y border-[#e9dfd9]/80 py-5">
                <div className="flex items-center gap-3 text-xs text-[#30201f]">
                  <Clock size={15} className="text-[#8c3546]" strokeWidth={1.5} />
                  <span className="font-medium tracking-wide">
                    {WeddingData.couple.date} · {WeddingData.couple.time}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-xs text-[#887771]">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#8c3546]" strokeWidth={1.5} />
                  <span className="leading-snug">
                    {WeddingData.venue.name}, {WeddingData.venue.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleCalendarClick}
              aria-label="Download calendar event"
              className="group/btn relative mt-4 flex w-full items-center justify-center gap-3 border border-[#8c3546] bg-[#8c3546] px-6 py-4 text-white transition-all duration-300 hover:bg-white hover:text-[#8c3546] active:scale-[0.99]"
            >
              {calendarSaved ? (
                <>
                  <Check size={16} strokeWidth={1.8} className="text-emerald-300 group-hover/btn:text-emerald-600" />
                  <span className="text-[10px] uppercase tracking-[0.25em]">
                    Calendar Event Saved
                  </span>
                </>
              ) : (
                <>
                  <Calendar size={16} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.25em]">
                    Download Event (.ics)
                  </span>
                </>
              )}
            </button>
          </motion.div>

          {/* Card 2: Share Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="group relative flex flex-col justify-between border border-[#e9dfd9] bg-white p-8 transition-all duration-500 hover:border-[#8c3546]/40 hover:shadow-xl sm:p-11"
          >
            {/* Top decorative accent */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#8c3546]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div>
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#8c3546]/20 bg-[#FAF7F5] text-[#8c3546] transition-colors duration-500 group-hover:bg-[#8c3546] group-hover:text-white">
                  <Share2 size={20} strokeWidth={1.3} />
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#9a8981]">
                  Spread The Word
                </span>
              </div>

              <h3 className="font-serif text-3xl text-[#30201f] sm:text-4xl">
                Share Invitation
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#887771]">
                Invite your loved ones to join in the blessing. Share this digital
                invitation directly or copy the personal link.
              </p>

              {/* Invitation link preview snippet */}
              <div className="my-7 flex items-center justify-between border-y border-[#e9dfd9]/80 py-5">
                <div className="min-w-0 pr-3">
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-[#9a8981]">
                    Celebration Link
                  </span>
                  <span className="block truncate font-serif text-sm italic text-[#8c3546]">
                    Noufiya &amp; Mansoor · Wedding Invitation
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy invitation link"
                  title="Copy Link"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#e9dfd9] bg-[#FAF7F5] text-[#30201f] transition-colors hover:border-[#8c3546] hover:bg-white hover:text-[#8c3546]"
                >
                  {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleWhatsAppShare}
                aria-label="Share invitation via WhatsApp"
                className="group/wa flex flex-1 items-center justify-center gap-2.5 border border-[#25D366] bg-[#25D366] px-5 py-4 text-white transition-all duration-300 hover:bg-[#1EBE5D] active:scale-[0.99]"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.22em]">
                  WhatsApp
                </span>
              </button>

              <button
                type="button"
                onClick={onShare}
                aria-label="Share invitation via system menu"
                className="group/share flex flex-1 items-center justify-center gap-2.5 border border-[#8c3546] bg-white px-5 py-4 text-[#8c3546] transition-all duration-300 hover:bg-[#8c3546] hover:text-white active:scale-[0.99]"
              >
                <Share2 size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-[0.22em]">
                  Share Page
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom quotation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-4 text-center"
        >
          <span className="h-px w-10 bg-[#e9dfd9]" />
          <span className="font-serif text-lg italic text-[#8c3546]">
            Your prayers and presence are our greatest gifts
          </span>
          <span className="h-px w-10 bg-[#e9dfd9]" />
        </motion.div>
      </div>
    </section>
  );
}
