"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "zoom"
  | "flip";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const animationStyles: Record<AnimationType, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-down": {
    hidden: "opacity-0 -translate-y-8",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 -translate-x-8",
    visible: "opacity-100 translate-x-0",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  zoom: {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
  flip: {
    hidden: "opacity-0 rotateX-90",
    visible: "opacity-100 rotateX-0",
  },
};

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  once = true,
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const { hidden, visible } = animationStyles[animation];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all",
        isVisible ? visible : hidden,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

// Stagger wrapper — animates children one by one
interface StaggerProps {
  children: React.ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  baseDelay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  animation = "fade-up",
  staggerDelay = 80,
  baseDelay = 0,
  className,
}: StaggerProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <AnimateOnScroll
          key={i}
          animation={animation}
          delay={baseDelay + i * staggerDelay}
        >
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  );
}
