"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import MedicalCross3D from "@/components/MedicalCross3D";

export default function HomeCrossPortal() {
  const [hero, setHero] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const sourcePlaceholder = document.querySelector<HTMLElement>(
      '[data-framer-root] > .framer-16lf0oi',
    );
    if (sourcePlaceholder) sourcePlaceholder.style.display = "none";
    setHero(
      document.querySelector<HTMLElement>(".framer-m3elfi") ??
        document.getElementById("hero"),
    );
  }, []);

  return hero ? createPortal(<MedicalCross3D />, hero) : null;
}
