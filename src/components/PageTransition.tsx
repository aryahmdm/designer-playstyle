import { useLocation, useOutlet } from "react-router";
import { AnimatePresence, motion } from "motion/react";

// Shared motion language: the outgoing page slides down and out of view, then the
// incoming page mounts and plays its own entrance (see QuizPage).
export const TRANSITION = { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const;

export default function PageTransition() {
  const location = useLocation();
  // Captured per render so the exiting page keeps rendering its own outlet
  // element while it animates away.
  const outlet = useOutlet();

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          exit={{ y: "100%" }}
          transition={TRANSITION}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
