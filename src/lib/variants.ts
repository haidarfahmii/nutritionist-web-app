import { Variants } from "framer-motion";

/**
 * Creates a "fade in" variant for Framer Motion.
 * @param direction - The direction to fade in from ('up', 'down', 'left', 'right').
 * @param delay - The delay in seconds before the animation starts.
 * @param duration - The duration of the animation in seconds.
 * @returns A Framer Motion Variants object.
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75], // A smooth ease-out
      },
    },
  };
};

/**
 * Basic "page load" variant for simple fade-in.
 */
export const pageLoadFade: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
