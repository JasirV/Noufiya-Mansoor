"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface SaveTheDateVideoProps {
  /** Poster image shown before the video loads / as fallback. */
  poster?: string;
  /** Whether the video starts muted. Browsers require muted autoplay. */
  muted?: boolean;
  /** If true, the sound toggle is hidden (audio not used). */
  hideControls?: boolean;
}

export function SaveTheDateVideo({
  poster = "/video/save-the-date-poster.jpg",
  muted = true,
  hideControls = false,
}: SaveTheDateVideoProps = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [htmlMediaMuted, setHtmlMediaMuted] = useState(muted);
  const reduceMotion = useReducedMotion();
  const mountedRef = useRef(false);

  // Keep audio preference consistent across the session, even across
  // transitions, without touching the HTMLMediaElement's muted state in a
  // way that fights the initial muted autoplay requirement.
  useEffect(() => {
    mountedRef.current = true;
    const stored = typeof window !== "undefined" ? sessionStorage.getItem("wedding-audio-muted") : null;
    if (stored !== null) {
      const parsed = stored === "true" || stored === "false";
      if (parsed) {
        setHtmlMediaMuted(stored === "true");
      }
    }

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onCanPlay = () => {
      try {
        el.play().catch(() => {
          // Autoplay blocked — that's fine; poster is the fallback.
        });
        setReady(true);
        setPlaying(true);
      } catch {
        // ignore
      }
    };

    const onError = () => {
      setError(true);
      setReady(false);
      setPlaying(false);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    el.addEventListener("canplay", onCanPlay, { once: true });
    el.addEventListener("error", onError, { once: true });
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("error", onError);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  // Sync the actual <video> muted state with the controlled prop whenever the
  // controlled value changes (e.g. user toggles, or initial prop).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // Only touch muted if the video is our source of truth for the HTML
    // element's muted state.
    el.muted = htmlMediaMuted;
  }, [htmlMediaMuted]);

  const toggleMute = () => {
    const next = !htmlMediaMuted;
    setHtmlMediaMuted(next);
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("wedding-audio-muted", String(next));
      } catch {
        // sessionStorage unavailable
      }
    }
  };

  // If reduced motion is requested, we still render the video so the visuals
  // remain, but we avoid imposing motion-driven UI animations around it.
  const shouldAnimateControls = reduceMotion ? false : true;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
      }}
      role="img"
      aria-label="Cinematic wedding video background"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src="/video/save-the-date.mp4"
        poster={poster}
        autoPlay
        muted={htmlMediaMuted}
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: error || ready ? "block" : "block",
        }}
        aria-hidden="true"
      />

      {/* Fallback poster-only state: shown briefly until video ready, or
          permanently if the video failed to load. */}
      {error && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            opacity: 1,
          }}
          aria-hidden="true"
        />
      )}

      {/* Subtle dark gradient overlay to maintain text contrast over video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(20,16,16,0.0) 0%, rgba(20,16,16,0.28) 45%, rgba(20,16,16,0.55) 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Sound toggle — bottom-right, glassmorphism, framer-animated */}
      {!hideControls && (
        <motion.button
          aria-label={htmlMediaMuted ? "Enable sound" : "Mute sound"}
          onClick={toggleMute}
          whileHover={shouldAnimateControls ? { scale: 1.08 } : undefined}
          whileTap={shouldAnimateControls ? { scale: 0.96 } : undefined}
          style={{
            position: "absolute",
            bottom: "clamp(1rem, 3vw, 2rem)",
            right: "clamp(1rem, 3vw, 2rem)",
            width: "clamp(40px, 5vw, 48px)",
            height: "clamp(40px, 5vw, 48px)",
            borderRadius: "999px",
            border: "1px solid rgba(250,248,244,0.28)",
            background:
              "rgba(20,16,16,0.45)",
            backdropFilter: "blur(10px) saturate(140%)",
            WebkitBackdropFilter: "blur(10px) saturate(140%)",
            color: "#FAF8F4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow:
              "0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(250,248,244,0.08) inset",
            
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(250,248,244,0.55)";
            e.currentTarget.style.boxShadow =
              "0 8px 26px rgba(0,0,0,0.45), 0 0 0 1px rgba(250,248,244,0.16) inset";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(250,248,244,0.28)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(250,248,244,0.08) inset";
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(250,248,244,0.7)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(250,248,244,0.25), 0 6px 20px rgba(0,0,0,0.35)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(250,248,244,0.28)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(250,248,244,0.08) inset";
          }}
        >
          {htmlMediaMuted ? (
            <VolumeX size={20} strokeWidth={1.8} />
          ) : (
            <Volume2 size={20} strokeWidth={1.8} />
          )}
        </motion.button>
      )}

      {/* For screen readers, expose a short description of the video state
          so the experience is understandable without visuals. */}
      <div
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
        aria-live="polite"
        aria-atomic="true"
      >
        {error ? "Video unavailable; poster image shown." : ready ? "Wedding video playing." : "Wedding video loading."}
      </div>
    </div>
  );
}
