import { WeddingData } from "@/data/wedding";

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-soft-white)",
        padding: "clamp(2rem, 4vw, 3.5rem) 0",
        textAlign: "center",
        borderTop: "1px solid rgba(166, 155, 145, 0.2)",
      }}
      aria-label="Footer"
    >
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(0.95rem, 1.15vw, 1.08rem)",
          color: "var(--color-taupe)",
          margin: 0,
          letterSpacing: "0.02em",
        }}
      >
        {WeddingData.invitation.footer}
      </p>
    </footer>
  );
}
