"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceCard {
  id: string;
  line1: string;
  line2: string;
  description: string;
  linkText: string;
  icon: React.ReactNode;
}

const SERVICES: ServiceCard[] = [
  {
    id: "skin-health",
    line1: "Skin",
    line2: "Health",
    description: "Treatments designed to support balanced, healthy skin and maintain its natural strength over time.",
    linkText: "Click to learn more",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(100, 115, 145, 0.75)" }}>
        {/* Minimal aesthetic leaf sprout icon matching Attachment 2 */}
        <path d="M24 38V22" />
        <path d="M24 22C24 16 29 11 36 10C36 17 31 22 24 22Z" />
        <path d="M24 28C24 23 19 18 12 18C12 25 17 29 24 29Z" />
        <circle cx="24" cy="11" r="3" />
      </svg>
    ),
  },
  {
    id: "aesthetic-care",
    line1: "Aesthetic",
    line2: "Care",
    description: "Subtle, non-invasive treatments designed to refresh your natural look without going to extremes.",
    linkText: "Click to learn more",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(100, 115, 145, 0.75)" }}>
        {/* Elegant face contour / eye & brow outline matching Attachment 2 */}
        <path d="M14 20C18 15 28 15 32 20" />
        <path d="M20 23C22 21 26 21 28 23" />
        <path d="M24 23V29C24 31 26 33 28 33" />
        <path d="M20 37C23 39 27 39 30 37" />
        <path d="M12 16C12 28 16 38 24 42C32 38 36 28 36 16" />
      </svg>
    ),
  },
  {
    id: "wellness-recovery",
    line1: "Wellness",
    line2: "Recovery",
    description: "Care that supports deep relaxation, gentle recovery, and overall well-being for body and mind.",
    linkText: "Click to learn more",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(100, 115, 145, 0.75)" }}>
        {/* Serene drop & leaf recovery outline matching Attachment 2 */}
        <path d="M24 8C24 8 13 22 13 29C13 35.0751 17.9249 40 24 40C30.0751 40 35 35.0751 35 29C35 22 24 8 24 8Z" />
        <path d="M24 18C24 24 28 28 32 30" />
      </svg>
    ),
  },
  {
    id: "personal-consultation",
    line1: "Personal",
    line2: "Consultation",
    description: "A calm, one-on-one conversation to understand your goals and create a plan that fits you.",
    linkText: "Click to learn more",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(100, 115, 145, 0.75)" }}>
        {/* One-on-one consultation outline */}
        <circle cx="24" cy="18" r="6" />
        <path d="M14 36C14 30.5 18.5 27 24 27C29.5 27 34 30.5 34 36" />
        <path d="M35 18C37.2 18 39 19.8 39 22C39 24.2 37.2 26 35 26" />
      </svg>
    ),
  },
  {
    id: "long-term-care",
    line1: "Long-Term",
    line2: "Care Plans",
    description: "Thoughtful programs built around your skin and wellness needs, focused on lasting results.",
    linkText: "Click to learn more",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "rgba(100, 115, 145, 0.75)" }}>
        {/* Structured longevity & calendar outline */}
        <rect x="12" y="14" width="24" height="24" rx="4" />
        <path d="M12 22H36" />
        <path d="M18 10V14" />
        <path d="M30 10V14" />
        <circle cx="24" cy="30" r="2.5" />
      </svg>
    ),
  },
];

export default function ServicesWheel() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const runway = runwayRef.current;
          if (runway) {
            const rect = runway.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = runway.offsetHeight - windowHeight;

            if (totalDistance > 0) {
              const scrolled = -rect.top;
              const progress = Math.min(1, Math.max(0, scrolled / totalDistance));
              setScrollProgress(progress);
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

  const scrollToCard = (index: number) => {
    const runway = runwayRef.current;
    if (!runway) return;
    const totalDistance = runway.offsetHeight - window.innerHeight;
    const targetProgress = 0.08 + index * 0.21;
    const targetScrollY = runway.offsetTop + targetProgress * totalDistance;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  return (
    <div
      ref={runwayRef}
      style={{
        position: "relative",
        width: "100%",
        height: "3600px",
        background: "transparent",
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          paddingTop: "68px",
        }}
      >
        {/* Concentric circular ripple rings matching Attachment 2 */}
        <div
          style={{
            position: "absolute",
            top: "56%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1400px",
            height: "1400px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.55,
          }}
        >
          {[360, 560, 780, 1020, 1260].map((diameter, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: `${diameter}px`,
                height: `${diameter}px`,
                borderRadius: "50%",
                border: "1px solid rgba(205, 214, 233, 0.7)",
                boxShadow: "0 0 50px rgba(214, 222, 240, 0.25)",
              }}
            />
          ))}
        </div>

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "680px",
            padding: "0 20px",
            zIndex: 2,
            marginBottom: "10px",
          }}
        >
          {/* Pill Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "6px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              border: "1px solid rgba(210, 216, 231, 0.8)",
              boxShadow: "0 2px 8px rgba(100, 115, 145, 0.05)",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                fontFamily: '"Inter Display", sans-serif',
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c, rgb(119, 123, 137))",
                margin: 0,
              }}
            >
              Our Services
            </p>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(34px, 4.4vw, 50px)",
              fontWeight: 400,
              lineHeight: "115%",
              color: "var(--token-dcd16b3e-ab7e-461f-8999-c68b440ef1a4, rgb(51, 51, 51))",
              margin: "0 0 14px 0",
            }}
          >
            Thoughtful care, chosen for you.
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: '"Inter Display", sans-serif',
              fontSize: "15px",
              lineHeight: "150%",
              color: "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c, rgb(119, 123, 137))",
              maxWidth: "520px",
              margin: 0,
            }}
          >
            We offer a carefully selected range of aesthetic and wellness treatments focused on natural results and long-term skin health.
          </p>
        </div>

        {/* Curved Card Track / Deck Stage */}
        <div
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1200px",
            marginTop: "-25px",
            zIndex: 1,
          }}
        >
          {SERVICES.map((service, index) => {
            // 5 cards evenly distributed across scroll progress
            const targetProgress = 0.08 + index * 0.21;
            const delta = (scrollProgress - targetProgress) * 4.6;

            // Arc math matching Attachment 2:
            // Delta < 0 (entering from right): translateX positive, rotate positive (tilted clockwise ~12° to 24°)
            // Delta = 0 (centered): upright, centered, scaled up
            // Delta > 0 (exiting to left): translateX negative, rotate negative
            const translateX = -delta * 440;
            const translateY = Math.min(180, Math.pow(Math.abs(delta), 1.7) * 50);
            const rotateDeg = -delta * 14;
            const scale = Math.max(0.84, 1 - Math.abs(delta) * 0.09);

            // Opacity fade when sliding far off-screen
            const opacity = Math.min(1, Math.max(0, 1 - (Math.abs(delta) - 0.75) * 0.85));
            const zIndex = Math.round(50 - Math.abs(delta) * 10);

            if (Math.abs(delta) > 2.2) return null;

            return (
              <div
                key={service.id}
                style={{
                  position: "absolute",
                  width: "clamp(300px, 26vw, 360px)",
                  height: "clamp(420px, 46vh, 480px)",
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateDeg}deg) scale(${scale})`,
                  transformOrigin: "center 85%",
                  opacity,
                  zIndex,
                  transition: "transform 0.06s ease-out, opacity 0.06s ease-out",
                  willChange: "transform, opacity",
                  pointerEvents: Math.abs(delta) < 0.6 ? "auto" : "none",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    borderRadius: "36px",
                    border: "1px solid rgba(210, 216, 231, 0.8)",
                    boxShadow: "0 20px 45px -10px rgba(100, 115, 145, 0.12), 0 0 24px 0 rgba(255, 255, 255, 0.85)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "38px 32px 32px 32px",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Top Section: Icon & Header */}
                  <div>
                    {/* Icon container */}
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "18px",
                        backgroundColor: "rgba(214, 218, 235, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "32px",
                      }}
                    >
                      {service.icon}
                    </div>

                    {/* Card Title (2 lines in Instrument Serif matching Attachment 2) */}
                    <h4
                      style={{
                        fontFamily: '"Instrument Serif", serif',
                        fontSize: "36px",
                        fontWeight: 400,
                        lineHeight: "110%",
                        color: "var(--token-dcd16b3e-ab7e-461f-8999-c68b440ef1a4, rgb(51, 51, 51))",
                        margin: "0 0 16px 0",
                      }}
                    >
                      {service.line1}
                      <br />
                      {service.line2}
                    </h4>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: '"Inter Display", sans-serif',
                        fontSize: "14px",
                        lineHeight: "155%",
                        color: "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c, rgb(119, 123, 137))",
                        margin: 0,
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Link CTA */}
                  <div style={{ paddingTop: "18px" }}>
                    <a
                      href="./services"
                      style={{
                        fontFamily: '"Inter Display", sans-serif',
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--token-dcd16b3e-ab7e-461f-8999-c68b440ef1a4, rgb(51, 51, 51))",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{service.linkText}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator at Bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingBottom: "32px",
            zIndex: 10,
          }}
        >
          {SERVICES.map((_, i) => {
            const target = 0.08 + i * 0.21;
            const isActive = Math.abs(scrollProgress - target) < 0.11;
            return (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                style={{
                  width: isActive ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: isActive ? "rgb(51, 51, 51)" : "rgba(119, 123, 137, 0.35)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
