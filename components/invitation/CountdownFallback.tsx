"use client";

import { motion } from "framer-motion";

export function CountdownFallback() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(2rem, 4vw, 3.5rem)",
        textAlign: "center",
        padding: "clamp(3rem, 5vw, 5rem) 0",
        color: "var(--color-charcoal)",
      }}
    >
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.72rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--color-taupe)",
          display: "block",
        }}
      >
        Time until the wedding
      </motion.span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(1.2rem, 3vw, 2.4rem)",
          flexWrap: "wrap",
        }}
      >
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
          <div
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--color-taupe)",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4vw, 3.6rem)",
                fontWeight: 300,
                color: "var(--color-charcoal)",
                minWidth: "clamp(1.4rem, 2.5vw, 2rem)",
                animation: "pulse 1.6s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              --
            </span>
            {i < 3 && (
              <span
                style={{
                  width: "clamp(1rem, 1.5vw, 1.3rem)",
                  height: "1px",
                  background: "var(--color-taupe)",
                  opacity: 0.5,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
