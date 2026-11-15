"use client";

import { useEffect, useRef, useState } from "react";

const QUOTE_WORDS = [
  '"Althea', 'is', 'built', 'on', 'care', 'that', 'feels', 'natural', 'and', 'respectful.',
  'We', 'focus', 'on', 'subtle', 'results,', 'thoughtful', 'treatments,', 'and', 'long-term',
  'well-being.', 'We', 'take', 'time', 'to', 'listen', 'and', 'understand', 'your', 'needs',
  'before', 'choosing', 'what', 'truly', 'fits', 'you.', 'No', 'pressure,', 'no', 'extremes',
  '—', 'just', 'care', 'that', 'helps', 'you', 'feel', 'confident."'
];

export default function ScrollQuoteReveal() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const runway = runwayRef.current;
          if (runway) {
            const rect = runway.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDist = runway.offsetHeight - windowHeight;

            if (totalDist > 0) {
              const scrolled = -rect.top;
              const p = Math.min(1, Math.max(0, scrolled / totalDist));
              setProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const totalWords = QUOTE_WORDS.length;

  return (
    <div
      ref={runwayRef}
      style={{
        maxWidth: "100%",
        width: "100%",
        position: "relative",
        height: "calc(100vh + 3200px)", // Generous slow scroll runway as requested
      }}
    >
      {/* Sticky viewport frame (100vh) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 24px",
        }}
      >
        {/* Concentric circular ripple rings matching Attachment 2 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1400px",
            height: "1400px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.55,
          }}
        >
          {[340, 560, 800, 1060, 1320].map((diameter, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: "50%",
                border: "1px solid rgba(205, 215, 235, 0.7)",
                boxShadow: "0 0 50px rgba(214, 222, 240, 0.25)",
              }}
            />
          ))}
        </div>

        {/* Quote Content Stage */}
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h5
            style={{
              fontFamily: '"Instrument Serif", "Instrument Serif Placeholder", serif',
              fontSize: "clamp(34px, 4.4vw, 48px)",
              fontStyle: "normal",
              fontWeight: 400,
              letterSpacing: "0em",
              lineHeight: "135%",
              textAlign: "center",
              margin: 0,
              padding: 0,
              width: "100%",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {QUOTE_WORDS.map((word, index) => {
              // Slow word reveal thresholds matching Attachment 2
              const startRange = 0.05;
              const endRange = 0.86;
              const threshold = startRange + (index / totalWords) * (endRange - startRange);
              const fadeWindow = 0.045; // generous transition for smooth, calm fade

              let opacity = 0;
              let blurPx = 12;
              let translateY = 8;
              let scale = 0.96;

              if (progress >= threshold + fadeWindow) {
                opacity = 1;
                blurPx = 0;
                translateY = 0;
                scale = 1;
              } else if (progress > threshold) {
                const t = (progress - threshold) / fadeWindow;
                opacity = t;
                blurPx = (1 - t) * 12;
                translateY = (1 - t) * 8;
                scale = 0.96 + 0.04 * t;
              }

              return (
                <span
                  key={index}
                  style={{
                    color: "var(--token-dcd16b3e-ab7e-461f-8999-c68b440ef1a4, rgb(51, 51, 51))",
                    display: "inline-block",
                    marginRight: "0.28em",
                    marginLeft: 0,
                    opacity: opacity.toFixed(3),
                    filter: blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : "none",
                    transform: `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`,
                    transition: "opacity 0.12s ease-out, filter 0.12s ease-out, transform 0.12s ease-out",
                    willChange: "opacity, filter, transform",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h5>

          {/* Founder Signature (Appears after quote is fully revealed) */}
          <div
            style={{
              marginTop: "56px",
              opacity: progress > 0.86 ? Math.min(1, (progress - 0.86) / 0.08) : 0,
              transform: `translateY(${progress > 0.86 ? ((1 - Math.min(1, (progress - 0.86) / 0.08)) * 12).toFixed(1) : 12}px)`,
              transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            }}
          >
            <p
              style={{
                fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "0em",
                lineHeight: "1.2em",
                textAlign: "center",
                color: "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c, rgb(119, 123, 137))",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              Dr. Eva Laurent — Founder
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
