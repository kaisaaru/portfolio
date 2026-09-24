"use client";

import { useState, useEffect } from "react";
import CinematicIntro from "./CinematicIntro";

export default function IntroSequence() {
  // Starts directly with the Cinematic Intro (Preloader removed as requested)
  const [stage, setStage] = useState<"cinematic" | "done">("cinematic");

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
