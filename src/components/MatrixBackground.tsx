"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Blend of Binary (0/1), Japanese (Kanji + Katakana), and Morse code
    const MATRIX_SYMBOLS = [
      // Binary Streams
      "0", "1", "1", "0", "0", "1", "0", "1", "01", "10",
      // Japanese Kanji (Tech, cyber, detective & creation themes)
      "創", "造", "進", "化", "思", "考", "未", "来", "夢", "形",
      "電", "脳", "情", "報", "探", "偵", "執", "行", "真", "実",
      "技", "術", "開", "発", "解", "析", "工", "藤", "新", "一",
      "界", "核", "心", "命", "令",
      // Japanese Katakana
      "カ", "イ", "サ", "ー", "ル", "シ", "ン", "イ", "チ",
      "コ", "ナ", "ン", "ゼ", "ロ", "ア", "イ", "デ", "ア",
      "プ", "ロ", "グ", "ラ", "ム", "シ", "ス", "テ", "ム",
      // Morse Code sequences & symbol clusters
      "•-•", "-•-", "••-", "---", "•••", "•-", "-••", "•-••",
      "−•−", "•--•", "··-·", "•-•", "-...", "..-.", "--.", "....",
      "•", "−", "••", "−−", "•-", "-•", "•--"
    ];

    const fontSize = 16;
    // Spaced out further: cleaner and less crowded background
    const colSpacing = fontSize * 2.35;
    let numColumns = Math.floor(width / colSpacing);

    interface RainColumn {
      x: number;
      y: number; // Current head row position
      speed: number;
      length: number;
      chars: string[];
    }

    let columns: RainColumn[] = [];

    const initColumns = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      numColumns = Math.floor(width / colSpacing);
      const maxRows = Math.ceil(height / (fontSize * 1.45));
      columns = [];

      for (let i = 0; i < numColumns; i++) {
        // Shorter, lighter streams: 9 to 16 characters
        const length = Math.floor(Math.random() * 8) + 9;
        const colChars: string[] = [];
        for (let k = 0; k < length + 10; k++) {
          colChars.push(
            MATRIX_SYMBOLS[Math.floor(Math.random() * MATRIX_SYMBOLS.length)]
          );
        }

        columns.push({
          x: i * colSpacing + fontSize * 0.4,
          // Staggered initial starts covering both above and throughout the screen
          y: Math.random() * maxRows * 1.5 - maxRows * 0.5,
          speed: 0.14 + Math.random() * 0.12, // Smooth, gentle cascade
          length,
          chars: colChars,
        });
      }
    };

    initColumns();

    const handleResize = () => {
      initColumns();
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      // Clean clear every frame - Eliminates GPU alpha rounding flicker
      ctx.clearRect(0, 0, width, height);

      ctx.font = `600 ${fontSize}px "Noto Sans JP", "JetBrains Mono", Consolas, monospace`;
      ctx.textAlign = "center";

      const rowHeight = fontSize * 1.45;
      const maxRows = Math.ceil(height / rowHeight) + 5;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        col.y += col.speed;

        const currentHeadRow = Math.floor(col.y);

        // Draw stable falling stream with high, clear visibility
        for (let k = 0; k < col.length; k++) {
          const charRow = currentHeadRow - k;
          if (charRow < 0 || charRow > maxRows) continue;

          const charY = charRow * rowHeight;
          const char = col.chars[k % col.chars.length];

          // Balanced visibility alpha gradient: clear and aesthetic without overpowering
          const fadeRatio = 1 - k / col.length;

          if (k === 0) {
            // Bright, vivid cyan tip
            ctx.fillStyle = "rgba(224, 242, 254, 0.85)";
          } else if (k < 3) {
            // High intensity leading body
            ctx.fillStyle = "rgba(56, 189, 248, 0.65)";
          } else {
            // Smooth, clearly visible cyber stream
            const alpha = Math.max(0.10, fadeRatio * 0.52);
            ctx.fillStyle = i % 2 === 0
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(96, 165, 250, ${alpha})`;
          }

          ctx.fillText(char, col.x, charY);
        }

        // Loop column when it flows past the bottom of the screen
        if (col.y - col.length > maxRows) {
          col.y = -Math.random() * 8;
          // Refresh characters for new cascade
          for (let k = 0; k < col.chars.length; k++) {
            col.chars[k] =
              MATRIX_SYMBOLS[Math.floor(Math.random() * MATRIX_SYMBOLS.length)];
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050811]">
      {/* Balanced visibility Canvas rendering rich Japanese, Morse & Binary streams */}
      <canvas ref={canvasRef} className="w-full h-full opacity-65" />

      {/* Cyber Grid Lines (Brightened & clearly visible) */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1.2px, transparent 1.2px), linear-gradient(90deg, #38bdf8 1.2px, transparent 1.2px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft edges vignette that doesn't wash out the center grid & matrix streams */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,#050811_95%)] opacity-60" />
    </div>
  );
}
