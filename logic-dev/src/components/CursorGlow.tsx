"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (!glowRef.current) return;

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;

      glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        width: "400px",
        height: "400px",
        marginLeft: "-200px",
        marginTop: "-200px",
        background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0) 70%)",
        filter: "blur(120px)",
      }}
    />
  );
}