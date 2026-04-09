"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Hide until first move
    gsap.set(cursor, { opacity: 0 });

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    let firstMove = true;
    const onFirstMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        firstMove = false;
      }
    };

    // Smooth follow with GSAP ticker
    const follow = () => {
      gsap.to(cursor, {
        x: pos.current.x,
        y: pos.current.y,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    };

    // Hover detection for interactive elements
    const onEnterInteractive = () => {
      gsap.to(cursor, {
        width: 48,
        height: 48,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onLeaveInteractive = () => {
      gsap.to(cursor, {
        width: 20,
        height: 20,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    // Click
    const onDown = () => {
      gsap.to(cursor, { scale: 0.7, duration: 0.1 });
    };
    const onUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", onFirstMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    gsap.ticker.add(follow);

    // Observe interactive elements
    const addHoverListeners = () => {
      const els = document.querySelectorAll("a, button, [role='button']");
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
      return els;
    };

    // Delay to let DOM render
    const timer = setTimeout(() => addHoverListeners(), 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onFirstMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      gsap.ticker.remove(follow);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      aria-hidden="true"
    />
  );
}
