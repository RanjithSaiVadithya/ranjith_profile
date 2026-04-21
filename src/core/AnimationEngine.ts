import { Transition, Variants } from "framer-motion";

export const springConfig: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 18,
};

export const baseTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 18,
  duration: 0.3,
};

export const animations: Record<string, Variants> = {
  slam: {
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: baseTransition },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  },
  slideLeft: {
    initial: { x: 30, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: baseTransition },
    exit: { x: -30, opacity: 0, transition: { duration: 0.2 } },
  },
  slideUp: {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: baseTransition },
    exit: { y: -30, opacity: 0, transition: { duration: 0.2 } },
  },
  expand: {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1, transition: baseTransition },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  },
  snap: {
    initial: { y: 15, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { ...baseTransition, stiffness: 260 } },
    exit: { y: -15, opacity: 0, transition: { duration: 0.2 } },
  }
};
