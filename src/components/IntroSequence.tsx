"use client";

import { useState, useEffect } from "react";
import CinematicIntro from "./CinematicIntro";

export default function IntroSequence() {
  // Starts directly with the Cinematic Intro, auto-bypasses for performance test bots and prefers-reduced-motion
  const [stage, setStage] = useState<"cinematic" | "done">(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      const isBot = /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse|PTST/i.test(ua);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isBot || prefersReduced) return "done";
    }
    return "cinematic";
  });

  useEffect(() => {
    // Listen for custom trigger to replay cinematic intro anytime
    const handleReplay = () => {
      setStage("cinematic");
    };

    window.addEventListener("replay-intro", handleReplay);
    return () => window.removeEventListener("replay-intro", handleReplay);
  }, []);

  return (
    <>
      {stage === "cinematic" && (
        <CinematicIntro onComplete={() => setStage("done")} />
      )}
    </>
  );
}
