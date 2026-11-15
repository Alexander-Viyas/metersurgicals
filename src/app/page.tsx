"use client";

import { useEffect, useRef } from "react";
import { framerHtml } from "./content";
import HomeCrossPortal from "@/components/HomeCrossPortal";
import { initQuoteReveal } from "@/lib/quoteReveal";
import { initServicesWheel } from "@/lib/servicesWheel";
import { initScrollFadeIn } from "@/lib/scrollFadeIn";

function adaptContent(source: string) {
  const replacements: [string, string][] = [
    ["Althea", "Meter Surgicals"],
    ["Journal", "Brochure"],
    ["Services", "Products"],
    ["./book-a-consultation", "/contact"],
    ["/book-a-consultation", "/contact"],
    ["Modern aesthetic and wellness care, with a gentle and personal approach.", "CE-certified surgical drapes, procedure packs, and non-woven disposables for healthcare providers."],
    ["Our Services", "Our Products"],
    ["Thoughtful care, chosen&nbsp;for&nbsp;you.", "Surgical drapes for every procedure."],
    ["We offer a carefully selected range of aesthetic and wellness treatments focused on natural results and long-term skin health.", "Explore surgical drapes, procedure packs, sterilization wrapping sheets, and other medical disposables from our brochure."],
    ["Skin Health", "General Surgery Drapes"],
    ["Aesthetic Care", "Gynecology Surgery Drapes"],
    ["Wellness &amp; Recovery", "Orthopedic Surgery Drapes"],
    ["Personal Consultation", "Sterilization Wrapping Sheets"],
    ["Long-Term Care Plans", "Other Surgery Drapes"],
    ["Treatments designed to support balanced, healthy skin and maintain its natural strength over time.", "General, mini, universal, HB SAG, and HIV protection drape packs. Customer-specific packs can be requested."],
    ["Subtle, non-invasive treatments designed to refresh your natural look without going to extremes.", "LSCS, delivery, DNC, Hystro Lap, perineal drape kits, and maternity mats. Customisation is available on request."],
    ["Care that supports deep relaxation, gentle recovery, and overall well-being for body and mind.", "Ortho packs, knee and hip drapes, arthroscopy, TKR, THR, and shoulder arthroscopy packs."],
    ["A calm, one-on-one conversation to understand your goals and create a plan that fits you.", "SMS sterilization wrapping sheets in 50, 60, 75, and 90 cm sizes; custom sizes and 43/50 GSM options."],
    ["Thoughtful programs built around your skin and wellness needs, focused on lasting results.", "CABG, Angio, LAVH, renal transplant, cystoscopy, IVF, urology, neurology, laparoscopy, PCNL, and TURP drapes."],
    ["Tap to learn more", "View product details"],
    ["Click to learn more", "View product details"],
    ["Book a consultation", "Contact Meter Surgicals"],
    ["Trusted by 80+ clients", "CE-certified manufacturer · Incorporated 2010"],
    ["Pricing", "Product Catalog"],
    ["Aesthetic & Wellness", "Surgical Drapes & Disposables"],
    ["Our Approach", "Our Company"],
    ["Bringing the pieces together.", "Surgical products for procedure needs."],
    ["Your Care Journey.", "Explore our product range."],
    ["Ready to begin your care?", "Need product information?"],
    ["Every step at Meter Surgicals starts with a conversation. Together, we create a plan that feels right for you — calm, considered, and focused on long-term well-being.", "Contact our team for product details, customer-specific drape packs, and brochure information."],
    ["Send us an email or connect with us on social", "Call +91 89254 99953 or email metersurgicals@gmail.com"],
    ["Listening first", "Quality and hygiene"],
    ["Every journey starts with a real conversation. We take time to understand your goals, your concerns, and what truly matters to you.", "Meter Surgicals focuses on quality, hygiene, and infection control in surgical environments."],
    ["Careful choices", "Drapes and kits"],
    ["We recommend only what makes sense for you. No trends, no pressure — just thoughtful treatments chosen with care.", "The brochure includes general and specialty surgery drapes, procedure packs, and kits."],
    ["Subtle results", "Wrapping sheets"],
    ["Our focus is on natural-looking outcomes. The goal is to help you look refreshed and feel confident, never overdone.", "SMS wrapping sheets are available in standard and customized sizes."],
    ["Long-term care", "Other disposables"],
    ["We think beyond quick fixes. Our approach supports your skin health and well-being over time, not just today.", "The catalog also includes gowns, bed sheets, covers, aprons, and other non-woven disposables."],
    ["Trusted by 80+ clients", "CE-certified manufacturer · incorporated in 2010"],
  ];
  return replacements.reduce((html, [from, to]) => html.replaceAll(from, to), source);
}

export default function Home() {
  const html = useRef(adaptContent(framerHtml));

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const quote = document.getElementById("quote");
    const services = document.getElementById("our-services");
    if (quote) cleanups.push(initQuoteReveal(quote));
    if (services) cleanups.push(initServicesWheel(services));
    const heroTitle = document.querySelector<HTMLElement>(".framer-m3elfi h1, .framer-DFt9Q h1");
    if (heroTitle) heroTitle.textContent = "Surgical drapes. Trusted care.";
    const productImages = ["/meter/sterilization-sheets.jpg", "/meter/general-drape-pack.jpg", "/meter/gynecology-drapes.jpg", "/meter/orthopedic-drapes.jpg", "/meter/other-drapes.jpg"];
    services?.querySelectorAll<HTMLImageElement>("img").forEach((image, index) => {
      image.src = productImages[Math.floor(index / 2) % productImages.length];
      image.removeAttribute("srcset");
    });
    const timer = window.setTimeout(() => cleanups.push(initScrollFadeIn()), 60);
    return () => {
      window.clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <><div dangerouslySetInnerHTML={{ __html: html.current }} /><HomeCrossPortal /></>;
}
