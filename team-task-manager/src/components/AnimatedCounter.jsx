import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export default function AnimatedCounter({ value, duration = 1.2, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = Math.floor(v).toLocaleString() + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [value, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}