"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypewriterText({
  words,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(words[0]);
      return;
    }

    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), pauseDuration);
      return () => clearTimeout(t);
    }

    const currentWord = words[wordIndex];

    if (!isDeleting && displayed === currentWord) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayed((prev) =>
          isDeleting
            ? currentWord.slice(0, prev.length - 1)
            : currentWord.slice(0, prev.length + 1)
        );
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, wordIndex, words, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse align-middle" aria-hidden />
    </span>
  );
}
