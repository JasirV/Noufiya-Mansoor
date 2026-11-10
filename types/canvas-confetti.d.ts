declare module "canvas-confetti" {
  interface ConfettiArgs {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    ticks?: number;
    gravity?: number;
    scalar?: number;
    decay?: number;
    sides?: number;
    zIndex?: number;
    direction?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    stagger?: number;
    ticks?: number;
    [key: string]: unknown;
  }

  type Confetti = (args?: ConfettiArgs) => void;

  const confetti: Confetti;
  export default confetti;
}
