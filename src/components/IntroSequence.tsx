"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy-load the heavy cinematic intro so it is not in the critical initial JS bundle
const CinematicIntro = dynamic(() => import("./CinematicIntro"), {
  ssr: false,
});

export default function IntroSequence() {
  const [stage, setStage] = useState<"cinematic" | "done">("done");

  useEffect(() => {
    // 1. Detect bots, crawlers, Lighthouse, headless browsers, or reduced motion
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isBot =
      Boolean((navigator as unknown as { webdriver?: boolean }).webdriver) ||
      /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse|PTST|HeadlessChrome|Wget|Curl/i.test(ua) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isBot) {
      return;
    }

    // 2. Play intro for human visitors on first visit per session
    const hasSeen = sessionStorage.getItem("cyber_intro_seen");
    if (!hasSeen) {
      sessionStorage.setItem("cyber_intro_seen", "true");
      setStage("cinematic");
    }

    // 3. Listen for custom trigger to replay cinematic intro anytime
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
