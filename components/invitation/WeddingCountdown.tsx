
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// November 15, 2026 — 12:00 PM IST
const WEDDING_DATE = "2026-11-15T12:00:00+05:30";

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const target = new Date(WEDDING_DATE).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

interface TimeUnitProps {
  label: string;
  value: number;
}

function TimeUnit({ label, value }: TimeUnitProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(value);

  useEffect(() => {
    if (previousValue.current === value) return;

    if (numberRef.current) {
      gsap.fromTo(
        numberRef.current,
        {
          opacity: 0.35,
          y: 12,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }

    previousValue.current = value;
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <span
        ref={numberRef}
        className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-none tracking-tight text-[#FFF0E9] tabular-nums"
      >
        {pad(value)}
      </span>

      <div className="my-5 h-px w-7 bg-[#E52B3B]/80" />

      <span className="text-[8px] uppercase tracking-[0.25em] text-[#DCA9A7]/70 sm:text-[10px] sm:tracking-[0.35em]">
        {label}
      </span>
    </div>
  );
}

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  const [isWedded, setIsWedded] = useState(
    Date.now() >= new Date(WEDDING_DATE).getTime()
  );

  const rootRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const completed = Date.now() >= new Date(WEDDING_DATE).getTime();

      if (completed) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        setIsWedded(true);
        return;
      }

      setTimeLeft(getTimeLeft());
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  // Cinematic GSAP entrance animations
  useEffect(() => {
    if (!rootRef.current || hasAnimated.current) return;

    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      entrance
        .from(".countdown-rec", {
          opacity: 0,
          y: -15,
          duration: 0.8,
        })
        .from(
          ".countdown-eyebrow",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".countdown-heading",
          {
            opacity: 0,
            y: 35,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".countdown-subtitle",
          {
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".countdown-unit",
          {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.9,
          },
          "-=0.4"
        )
        .from(
          ".countdown-date",
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Recording indicator
      gsap.to(".countdown-rec-dot", {
        opacity: 0.35,
        scale: 0.7,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Background light movement
      gsap.to(".countdown-light", {
        x: 35,
        y: -20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Subtle decorative line
      gsap.from(".countdown-line", {
        scaleX: 0,
        duration: 1.5,
        delay: 0.6,
        stagger: 0.2,
        transformOrigin: "center",
        ease: "power3.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      ref={rootRef}
      aria-label="Wedding countdown"
      className="relative isolate mx-auto w-full max-w-[1200px] overflow-hidden bg-[#260609] px-5 py-24 text-center sm:px-12 sm:py-32"
    >
      {/* Background cinematic lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="countdown-light absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A20D24]/20 blur-[130px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.13] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Film scratches / texture lines */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]">
        <div className="absolute left-[15%] top-0 h-full w-px bg-white" />
        <div className="absolute left-[82%] top-0 h-full w-px bg-white" />
        <div className="absolute left-0 top-[18%] h-px w-full bg-white" />
        <div className="absolute left-0 top-[85%] h-px w-full bg-white" />
      </div>

      {/* Outer frame */}
      <div className="pointer-events-none absolute inset-4 z-0 border border-[#FF3448]/15 sm:inset-8" />

      {/* Camera viewfinder corner marks */}
      <div className="pointer-events-none absolute inset-4 z-10 sm:inset-8">
        <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-[#FF3448]/80" />
        <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-[#FF3448]/80" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-[#FF3448]/80" />
        <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-[#FF3448]/80" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex max-w-3xl flex-col items-center">

        {/* Recording status */}
        <div className="countdown-rec mb-12 flex items-center gap-3 rounded-full border border-[#FF3448]/30 bg-black/25 px-5 py-2.5 backdrop-blur-sm">
          <span className="countdown-rec-dot h-2.5 w-2.5 rounded-full bg-[#FF263D] shadow-[0_0_12px_3px_rgba(255,38,61,0.55)]" />

          <span className="text-[10px] font-semibold tracking-[0.35em] text-[#FF5365]">
            REC
          </span>

          <span className="ml-2 h-3 w-px bg-white/20" />

          <span className="text-[9px] tracking-[0.2em] text-white/50">
            LOVE IN FRAME
          </span>
        </div>

        {/* Heading */}
        <p className="countdown-eyebrow mb-6 text-[9px] uppercase tracking-[0.45em] text-[#E4A8A5]/80 sm:text-[11px]">
          A beautiful beginning
        </p>

        <div className="countdown-line mb-7 h-px w-14 bg-[#FF3448]/60" />

        <h2 className="countdown-heading font-serif text-4xl font-light italic leading-tight text-[#FFF0E9] sm:text-6xl md:text-7xl">
          {isWedded ? "Forever Starts Today" : "Our Moment Is Near"}
        </h2>

        <p className="countdown-subtitle mt-6 text-[9px] uppercase tracking-[0.3em] text-[#DCA9A7]/70 sm:text-[11px]">
          Noufiya <span className="px-2 text-[#FF3448]">&</span> Mansoor
        </p>

        {/* Countdown */}
        {!isWedded ? (
          <div className="mt-16 grid w-full grid-cols-4 items-center justify-center gap-2 sm:mt-20 sm:gap-8">
            {units.map((unit, index) => (
              <div
                key={unit.label}
                className="countdown-unit relative"
              >
                <TimeUnit
                  label={unit.label}
                  value={unit.value}
                />

                {index !== 3 && (
                  <span className="absolute -right-2 top-1/4 font-serif text-xl font-light text-[#FF3448]/60 sm:-right-5 sm:text-3xl">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="countdown-unit mt-16">
            <p className="font-serif text-2xl font-light italic text-[#FFF0E9] sm:text-4xl">
              Today we begin our forever.
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#DCA9A7]">
              The beginning of our beautiful journey
            </p>
          </div>
        )}

        {/* Wedding date */}
        <div className="countdown-date mt-16 flex flex-col items-center sm:mt-20">
          <div className="countdown-line mb-7 h-px w-14 bg-[#FF3448]/60" />

          <p className="font-serif text-xl font-light tracking-wide text-[#FFF0E9] sm:text-2xl">
            15 November 2026
          </p>

          <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#DCA9A7]/80">
            Sunday · 12:00 PM
          </p>

          <p className="mt-5 text-[8px] tracking-[0.25em] text-white/30">
            INDIA STANDARD TIME · UTC +05:30
          </p>
        </div>

        {/* Bottom cinematic indicator */}
        <div className="mt-12 flex items-center gap-3 opacity-40">
          <span className="h-px w-8 bg-[#FF3448]" />
          <span className="text-[8px] tracking-[0.4em] text-white">
            ENDLESS LOVE
          </span>
          <span className="h-px w-8 bg-[#FF3448]" />
        </div>

      </div>
    </section>
  );
}
