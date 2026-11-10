
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Volume2,
  VolumeX,
  Heart,
  Camera,
  Maximize,
  Minimize,
} from "lucide-react";

interface CinematicLandingProps {
  isOpen: boolean;
  onOpen: () => void;
}

const WEDDING_DATE = new Date("2026-11-15T12:00:00+05:30");

const ease = [0.22, 1, 0.36, 1] as const;

export function CinematicLanding({
  isOpen,
  onOpen,
}: CinematicLandingProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const videoContainerRef = useRef<HTMLDivElement>(null);
const [isFullscreen, setIsFullscreen] = useState(false);

const toggleFullscreen = async () => {
  const container = videoContainerRef.current;
  if (!container) return;

  try {
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen error:", error);
  }
};

useEffect(() => {
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );
  };
}, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown timer: 15 November 2026, 12 PM IST.
  useEffect(() => {
    const updateCountdown = () => {
      const difference = WEDDING_DATE.getTime() - Date.now();
      const remaining = Math.max(0, difference);

      setTimeLeft({
        days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (remaining / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (remaining / (1000 * 60)) % 60
        ),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Lock scrolling while the invitation is closed.
  useEffect(() => {
    if (!mounted) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    if (!isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousHtmlOverflow;
    };
  }, [mounted, isOpen]);

  // Keep the video muted state in sync.
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((previous) => !previous);
  };

  const handleOpen = () => {
    if (isOpen) return;
    onOpen();
  };

  const countdownItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <AnimatePresence>
      {mounted && !isOpen && (
        <motion.main
          key="wedding-landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#24070D] text-[#FFF6EF]"
        >
          {/* Background texture */}
          <div className="pointer-events-none fixed inset-0 z-30 opacity-[0.07] mix-blend-screen">
            <div className="h-full w-full bg-[url('/images/film-grain.png')] bg-repeat" />
          </div>

          {/* Main hero */}
          <section className="relative flex min-h-screen flex-col overflow-hidden">
            {/* Couple photograph */}
            <motion.div
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease }}
              className="absolute inset-0"
            >
              <img
                src="/images/IMG_3256.JPG.jpeg"
                alt="Noufiya and Mansoor"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#160307]/65 via-[#24070D]/25 to-[#160307]/90" />
            <div className="absolute inset-0 bg-[#24070D]/20" />

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease }}
              className="relative z-10 flex items-center justify-between px-6 py-7 md:px-12 md:py-9"
            >
              <div className="flex items-center gap-3">
                <Heart
                  size={15}
                  strokeWidth={1.2}
                  className="text-[#E5B7A9]"
                />
                <span className="text-[10px] tracking-[0.35em] text-[#FFF6EF]/90">
                  OUR WEDDING
                </span>
              </div>

              <span className="text-[10px] tracking-[0.3em] text-[#FFF6EF]/80">
                15 · 11 · 2026
              </span>
            </motion.header>

            {/* Hero content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1.1, ease }}
                className="mb-8 flex items-center gap-4"
              >
                <span className="h-px w-10 bg-[#E5B7A9]/70" />
                <span className="text-[9px] uppercase tracking-[0.45em] text-[#F3D6C9] md:text-[11px]">
                  Together with their families
                </span>
                <span className="h-px w-10 bg-[#E5B7A9]/70" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.4, ease }}
                className="font-serif text-[clamp(3.5rem,10vw,8.5rem)] font-light leading-[0.95] tracking-[-0.055em] text-[#FFF6EF] drop-shadow-2xl"
              >
                Noufiya
                <span className="mx-3 block py-2 font-serif text-[0.48em] italic text-[#E5B7A9] md:inline md:py-0">
                  &
                </span>
                Mansoor
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-7 text-[10px] uppercase tracking-[0.5em] text-[#FFF6EF]/85 md:text-xs"
              >
                A celebration of love
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1, ease }}
                className="mt-10 flex flex-col items-center"
              >
                <span className="font-serif text-2xl tracking-[0.2em] text-[#FFF6EF] md:text-3xl">
                  15 November 2026
                </span>
                <span className="mt-3 text-[9px] tracking-[0.4em] text-[#E5B7A9]">
                  SUNDAY · 12:00 PM
                </span>
              </motion.div>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1, duration: 1, ease }}
                className="mt-12 flex w-full max-w-[490px] justify-center"
              >
                {countdownItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex flex-1 flex-col items-center border-r border-[#FFF6EF]/20 last:border-r-0"
                  >
                    <span className="font-serif text-3xl font-light tabular-nums text-[#FFF6EF] md:text-4xl">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#E5B7A9] md:text-[9px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Open invitation */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 1, ease }}
                onClick={handleOpen}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-12 flex items-center gap-5 border border-[#E5B7A9]/70 bg-[#390A16]/55 px-8 py-4 backdrop-blur-md transition-all duration-500 hover:border-[#FFF6EF] hover:bg-[#641B2B]/80 md:px-11"
              >
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#FFF6EF]">
                  Open invitation
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.3}
                  className="text-[#E5B7A9] transition-transform duration-500 group-hover:translate-x-2"
                />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="mt-5 text-[8px] uppercase tracking-[0.3em] text-[#FFF6EF]/60"
              >
                A new chapter begins
              </motion.div>
            </div>

            {/* Bottom details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="relative z-10 flex items-center justify-between px-6 pb-7 md:px-12"
            >
              <span className="text-[8px] tracking-[0.3em] text-[#FFF6EF]/60">
                N & M
              </span>
              <span className="text-[8px] tracking-[0.3em] text-[#FFF6EF]/60">
                MADE WITH LOVE
              </span>
            </motion.div>
          </section>

          {/* Save the Date video section */}
          <section className="relative overflow-hidden bg-[#24070D] px-5 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 text-center">
                <p className="text-[9px] tracking-[0.45em] text-[#D9AAA6]">
                  A MOMENT TO REMEMBER
                </p>

                <h2 className="mt-5 font-serif text-4xl font-light text-[#FFF6EF] md:text-6xl">
                  Save the Date
                </h2>

                <p className="mt-4 text-sm text-[#FFF6EF]/60">
                  Our story, our day, our forever.
                </p>
              </div>


<div
  ref={videoContainerRef}
  className="group relative mx-auto max-w-4xl overflow-hidden border border-[#D9AAA6]/25 bg-[#390A16] [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:max-w-none [&:fullscreen]:border-0 [&:fullscreen]:bg-black"
>
  {/* Save the Date Video */}
  <video
    ref={videoRef}
    src="/video/IMG_3629.MP4"
    poster="/images/IMG_3621.JPG.jpeg"
    autoPlay
    muted={muted}
    loop
    playsInline
    preload="metadata"
    className="aspect-video w-full object-cover [&:fullscreen]:h-full [&:fullscreen]:w-full [&:fullscreen]:object-contain"
  />



  {/* Video Controls */}
  <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">

    {/* Mute / Unmute */}
    <button
      type="button"
      onClick={toggleSound}
      aria-label={muted ? "Unmute video" : "Mute video"}
      title={muted ? "Unmute" : "Mute"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#24070D]/75 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#D9AAA6] hover:bg-[#641B2B]"
    >
      {muted ? (
        <VolumeX size={18} strokeWidth={1.6} />
      ) : (
        <Volume2 size={18} strokeWidth={1.6} />
      )}
    </button>

    {/* Fullscreen / Exit Fullscreen */}
    <button
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#24070D]/75 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#D9AAA6] hover:bg-[#641B2B]"
    >
      {isFullscreen ? (
        <Minimize size={18} strokeWidth={1.6} />
      ) : (
        <Maximize size={18} strokeWidth={1.6} />
      )}
    </button>
  </div>

  {/* Bottom cinematic gradient */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#24070D]/50 to-transparent" />
</div>


              <div className="mt-9 flex items-center justify-center gap-3 text-[#D9AAA6]">
                <Camera size={14} strokeWidth={1.3} />
                <span className="text-[9px] tracking-[0.3em]">
                  A LITTLE FILM OF OUR LOVE
                </span>
              </div>
            </div>
          </section>

          {/* Closing section */}
          <section className="relative overflow-hidden border-t border-[#D9AAA6]/15 bg-[#390A16] px-5 py-20 text-center md:py-28">
            <p className="text-[9px] tracking-[0.4em] text-[#D9AAA6]">
              THE BEGINNING OF FOREVER
            </p>

            <h2 className="mt-6 font-serif text-5xl font-light text-[#FFF6EF] md:text-7xl">
              Forever starts here.
            </h2>

            <p className="mt-5 font-serif text-lg italic text-[#D9AAA6]">
              Noufiya & Mansoor
            </p>

            <button
              onClick={handleOpen}
              className="mt-10 inline-flex items-center gap-3 border border-[#D9AAA6]/60 px-8 py-4 text-[9px] uppercase tracking-[0.3em] text-[#FFF6EF] transition hover:bg-[#641B2B]"
            >
              Discover our invitation
              <ArrowDown size={14} />
            </button>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
