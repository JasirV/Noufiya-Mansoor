"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { triggerCelebration } from "./celebration";

interface OpeningInvitationProps {
  isOpen: boolean;
  onOpen: () => void;
}

const subscribe = () => () => {};

export function OpeningInvitation({ isOpen, onOpen }: OpeningInvitationProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(async () => {
    if (isOpen) return;
    await triggerCelebration(buttonRef.current);
    onOpen();
  }, [isOpen, onOpen]);

  if (!mounted) return null;

  return (
    <motion.div
      ref={buttonRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0 }}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        zIndex: 10,
      }}
      role="button"
      tabIndex={0}
      aria-label="Open invitation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="group relative">
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "var(--color-taupe)",
          }}
        >
          Open Invitation
        </span>
        <motion.span
          animate={{
            rotate: isOpen ? 0 : [0, -25, 0, 15, 0],
            opacity: isOpen ? 0 : [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          style={{
            display: "inline-block",
            marginLeft: "1.4rem",
          }}
        >
          <ChevronDown
            size={18}
            color="var(--color-taupe)"
          />
        </motion.span>
      </div>
    </motion.div>
  );
}
