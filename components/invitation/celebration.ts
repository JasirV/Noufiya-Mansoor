"use client";

import gsap from "gsap";
import confetti from "canvas-confetti";

const LUXURY_PALETTE = [
  "#D4AF37", // Metallic Royal Gold
  "#F5D061", // Bright Champagne Gold
  "#E5B7A9", // Soft Rose Gold
  "#8C3546", // Deep Wine Burgundy
  "#641B2B", // Royal Crimson
  "#FFF9F5", // Pearlescent White
  "#F3E5AB", // Warm Vanilla Gold
];

const SVG_SHAPES = [
  // 8-point royal star
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 8.4L23 11l-8.4 2.6L12 22l-2.6-8.4L1 11l8.4-2.6z"/></svg>`,
  // Love Heart
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  // 4-point sparkle diamond
  `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>`,
  // Delicate floral petal
  `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 6 6 10 6 14a6 6 0 0012 0c0-4-2-8-6-12z"/></svg>`,
];

export async function triggerCelebration(originElement?: HTMLElement | null): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Calculate origin coordinates
  let originX = window.innerWidth / 2;
  let originY = window.innerHeight * 0.58;

  if (originElement) {
    const rect = originElement.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;

    // Animate button with GSAP
    gsap.timeline()
      .to(originElement, {
        scale: 0.92,
        duration: 0.12,
        ease: "power2.in",
      })
      .to(originElement, {
        scale: 1.05,
        duration: 0.25,
        ease: "back.out(2.5)",
      })
      .to(originElement, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
  }

  const normX = Math.max(0.1, Math.min(0.9, originX / window.innerWidth));
  const normY = Math.max(0.1, Math.min(0.9, originY / window.innerHeight));

  // 2. Create Particle Overlay Container
  const container = document.createElement("div");
  container.className = "celebration-confetti-container";
  Object.assign(container.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "99999",
    overflow: "hidden",
  });
  document.body.appendChild(container);

  // 3. Golden Shockwave Aura using GSAP
  const shockwave = document.createElement("div");
  Object.assign(shockwave.style, {
    position: "absolute",
    left: `${originX}px`,
    top: `${originY}px`,
    width: "20px",
    height: "20px",
    marginLeft: "-10px",
    marginTop: "-10px",
    borderRadius: "9999px",
    border: "2px solid #E5B7A9",
    background:
      "radial-gradient(circle, rgba(229,183,169,0.4) 0%, rgba(212,175,55,0.2) 40%, transparent 70%)",
    boxShadow: "0 0 45px rgba(229, 183, 169, 0.6)",
    pointerEvents: "none",
  });
  container.appendChild(shockwave);

  gsap.fromTo(
    shockwave,
    { scale: 0.2, opacity: 1 },
    {
      scale: 30,
      opacity: 0,
      duration: 1.1,
      ease: "power2.out",
      onComplete: () => shockwave.remove(),
    }
  );

  // 4. GSAP 3D Foil Particles
  const PARTICLE_COUNT = 85;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement("div");
    const color = LUXURY_PALETTE[i % LUXURY_PALETTE.length];
    const isSvg = i % 3 !== 0;

    Object.assign(particle.style, {
      position: "absolute",
      left: `${originX}px`,
      top: `${originY}px`,
      pointerEvents: "none",
      willChange: "transform, opacity",
      color,
    });

    if (isSvg) {
      const shapeSvg = SVG_SHAPES[i % SVG_SHAPES.length];
      particle.innerHTML = shapeSvg;
      particle.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.2))";
    } else {
      // Luxury Metallic Foil Strip
      const width = gsap.utils.random(8, 16);
      const height = gsap.utils.random(4, 9);
      Object.assign(particle.style, {
        width: `${width}px`,
        height: `${height}px`,
        background: `linear-gradient(135deg, ${color}, #FFF8F0)`,
        borderRadius: "2px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      });
    }

    container.appendChild(particle);

    // Physics parameters
    const angle = gsap.utils.random(0, Math.PI * 2);
    const velocity = gsap.utils.random(160, 480);
    const upwardLift = gsap.utils.random(100, 340);
    const targetX = Math.cos(angle) * velocity;
    const targetY = Math.sin(angle) * velocity - upwardLift;

    const rotX = gsap.utils.random(-720, 720);
    const rotY = gsap.utils.random(-720, 720);
    const rotZ = gsap.utils.random(-360, 360);

    const burstDuration = gsap.utils.random(0.5, 0.75);
    const fallDuration = gsap.utils.random(1.8, 2.8);

    const tl = gsap.timeline({
      onComplete: () => {
        particle.remove();
      },
    });

    // Step 1: Explosive 3D outward burst
    tl.to(particle, {
      x: targetX,
      y: targetY,
      rotationX: rotX * 0.4,
      rotationY: rotY * 0.4,
      rotationZ: rotZ * 0.5,
      scale: gsap.utils.random(0.9, 1.3),
      duration: burstDuration,
      ease: "power3.out",
    });

    // Step 2: Floating gravitational drift with air flutter
    tl.to(
      particle,
      {
        y: targetY + gsap.utils.random(350, 750),
        x: targetX + gsap.utils.random(-100, 100),
        rotationX: rotX,
        rotationY: rotY,
        rotationZ: rotZ + gsap.utils.random(-180, 180),
        opacity: 0,
        scale: gsap.utils.random(0.5, 0.8),
        duration: fallDuration,
        ease: "sine.inOut",
      },
      "-=0.1"
    );
  }

  // 5. High-density Canvas-Confetti Fireworks Waves
  // Wave 1: Immediate central burst
  confetti({
    particleCount: 65,
    spread: 85,
    origin: { x: normX, y: normY },
    colors: LUXURY_PALETTE,
    startVelocity: 36,
    gravity: 0.85,
    scalar: 1.15,
    ticks: 240,
  });

  // Wave 2: Left and Right dual cannons at 180ms
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 60,
      origin: { x: 0.08, y: 0.82 },
      colors: LUXURY_PALETTE,
      startVelocity: 48,
      gravity: 0.75,
      scalar: 1.1,
      ticks: 260,
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 0.92, y: 0.82 },
      colors: LUXURY_PALETTE,
      startVelocity: 48,
      gravity: 0.75,
      scalar: 1.1,
      ticks: 260,
    });
  }, 180);

  // Wave 3: Golden cascading shower from top at 420ms
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { x: 0.5, y: 0.15 },
      colors: ["#D4AF37", "#F5D061", "#E5B7A9", "#FFF9F5"],
      startVelocity: 22,
      gravity: 0.65,
      scalar: 0.95,
      ticks: 280,
    });
  }, 420);

  // Clean up container after animations complete
  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 4500);

  // Allow the initial burst to unfold before continuing
  return new Promise((resolve) => setTimeout(resolve, 600));
}
