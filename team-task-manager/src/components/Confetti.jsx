import { useEffect, useRef } from "react";
import { useConfetti } from "../context/ConfettiContext";

// Simple confetti without external library
export default function Confetti() {
  const { showConfetti } = useConfetti();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!showConfetti) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#3B82F6"];
    const particles = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: Math.random() * -20 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.4,
        opacity: 1,
      });
    }

    let animationId;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.vx *= 0.99;
        if (frame > 60) p.opacity -= 0.015;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (frame < 180) {
        animationId = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [showConfetti]);

  if (!showConfetti) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[200] pointer-events-none"
    />
  );
}