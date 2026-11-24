"use client";

import { useEffect, useState } from "react";
import { framerHtml } from "./content";
import { initQuoteReveal } from "@/lib/quoteReveal";
import { initServicesWheel } from "@/lib/servicesWheel";
import { initScrollFadeIn } from "@/lib/scrollFadeIn";

const brochureCategories = [
  {
    title: "Sterilization Wrapping Sheets",
    image: "/meter/sterilization-sheets.jpg",
    brochureImage: "/meter/brochure-sterilization-wrapping-sheets.jpg",
    summary: "Standard and customized SMS wrapping sheets for sterilization.",
    products: ["50 × 50 cm", "60 × 60 cm", "75 × 75 cm", "90 × 90 cm", "Customized sizes in 43/50 GSM SMS fabric; packs of 25 or 50."],
  },
  {
    title: "General Surgery Drapes",
    image: "/meter/general-drape-pack.jpg",
    brochureImage: "/meter/brochure-general-surgery-drapes.jpg",
    summary: "General, Mini, Universal, Hb SAG, and HIV Protection drape packs.",
    products: ["General Surgical Drape Pack", "Mini Drape Pack", "Universal Drape Pack", "Hb SAG Drape Pack", "HIV Protection Drape Kit"],
    note: "The HIV Protection Drape Kit can be customized as per customer request.",
  },
  {
    title: "Gynecology Surgery Drapes",
    image: "/meter/gynecology-drapes.jpg",
    brochureImage: "/meter/brochure-gynecology-surgery-drapes.jpg",
    summary: "Drape packs and kits for gynecology and maternity procedures.",
    products: ["LSCS Drape Pack", "Delivery Drape Pack", "DNC Drape Kit", "Hystro Lap Pouch", "Perineal Drape Kit", "Maternity Mat"],
    note: "Customization is available as per customer request.",
  },
  {
    title: "Orthopedic Surgery Drapes",
    image: "/meter/orthopedic-drapes.jpg",
    brochureImage: "/meter/brochure-orthopedic-surgery-drapes.jpg",
    summary: "Orthopedic, replacement, and arthroscopy drape packs.",
    products: ["Ortho Drape Pack (5-gown and 3-gown options)", "Knee O Drape", "Hip U Drape", "Knee Arthroscopy", "TKR Total Knee Replacement Drape Pack", "THR Total Hip Replacement Drape Pack", "Shoulder Arthroscopy"],
    note: "Customization is available as per customer request.",
  },
  {
    title: "Other Surgery Drapes",
    image: "/meter/other-drapes.jpg",
    brochureImage: "/meter/brochure-other-surgery-drapes.jpg",
    summary: "Specialty drape packs for a broad range of surgical procedures.",
    products: ["CABG Drape Packs", "Angio Drape Packs", "LAVH Drape Kit", "Renal Transplant Packs", "Cystoscopy Drape Packs", "Embryo Transplant Packs", "Egg Collection Packs", "Urology Drape Packs", "IVF Drape Packs", "OCR-ET Packs", "Neurology Drape Packs", "Laparoscopy Drape Packs", "Other Customized Drape Packs", "PCNL Drape", "TURP Drape"],
    note: "Drape packs can be customized as per customer request.",
  },
  {
    title: "Other Medical & Surgical Disposables",
    brochureImage: "/meter/brochure-other-medical-surgical-disposables.jpg",
    summary: "Additional disposable products featured in the brochure.",
    products: ["Large Sheet", "Center Hole Sheet", "Mayo Cover", "C-Arm Cover", "Leggings", "Camera Cover", "Shoe Cover", "Trolley Sheet", "Apron", "Under Pad"],
  },
] as const;

const brochureQuestions = [
  ["Which products are listed in the brochure?", "The brochure lists sterilization wrapping sheets; general, gynecology, orthopedic, and other surgery drapes; and other medical and surgical disposables."],
  ["Which wrapping-sheet sizes and specifications are listed?", "Standard sizes are 50 × 50 cm, 60 × 60 cm, 75 × 75 cm, and 90 × 90 cm. Customized sizes use 43/50 GSM SMS fabric and come in packs of 25 or 50."],
  ["Can drape packs be customized?", "The brochure notes customization as per customer request for selected packs. Contact Meter Surgicals with your procedure and pack requirements."],
  ["Which other medical and surgical disposables are shown?", "Large Sheet, Center Hole Sheet, Mayo Cover, C-Arm Cover, Leggings, Camera Cover, Shoe Cover, Trolley Sheet, Apron, and Under Pad."],
  ["What should I include in a product enquiry?", "Share the procedure, product type, required quantity, and any size or pack preferences."],
  ["How can I contact Meter Surgicals?", "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com."],
];

const mobileSectionLinks = [
  ["Home", "#hero"],
  ["About Us", "#our-approach"],
  ["Products", "#our-services"],
  ["Our Process", "#why-althea"],
  ["Product Enquiries", "#pricing"],
  ["Product Range", "#journal-preview"],
  ["FAQs", "#faq"],
  ["Contact", "#ready-to-begin"],
] as const;

function adaptContent(source: string) {
  const replacements: [string, string][] = [
    ["Althea", "Meter Surgicals"], ["Journal", "Brochure"], ["Services", "Products"],
    ["https://framerusercontent.com/images/AYmhm7fQptPoF2bCQsLfIJDi0U4.jpg", "/meter/surgical-suturing.jpg"],
    ["https://framerusercontent.com/images/Iygm9WFensHwXXoe01QWLQ0iF78.jpg", "/meter/surgical-instrument-clamp.jpg"],
    ["https://framerusercontent.com/images/AFEMnkblR75GU9bwfRpmzlqBpQ.jpg", "/meter/surgical-care-disposables.jpg"],
    ["Our Journal", "Product Brochure"],
    ["href=\"./about\"", "href=\"/#our-approach\""], ["href=\"./services\"", "href=\"/#our-services\""],
    ["href=\"./journal\"", "href=\"/#journal-preview\""], ["href=\"./book-a-consultation\"", "href=\"/#ready-to-begin\""],
    ["Modern aesthetic and wellness care, with a gentle and personal approach.", "Surgical drapes, procedure packs, and non-woven disposables for hospitals and operating theatres."],
    ["Start your journey", "Explore Our Products"], ["Our Services", "Our Products"],
    ["Thoughtful care, chosen&nbsp;for&nbsp;you.", "Surgical products for procedure needs."],
    ["We offer a carefully selected range of aesthetic and wellness treatments focused on natural results and long-term skin health.", "Explore surgical drapes, procedure packs, sterilization wrapping sheets, and non-woven disposables for hospitals and operating theatres."],
    ["Skin Health", "General &amp; Specialty Surgical Drapes"], ["Aesthetic Care", "Procedure Packs"],
    ["Wellness &amp; Recovery", "Sterilization Wrapping Sheets"], ["Personal Consultation", "Custom Drape Packs"],
    ["Long-Term Care Plans", "Medical &amp; Surgical Disposables"],
    ["Treatments designed to support balanced, healthy skin and maintain its natural strength over time.", "Explore surgical drape packs across general, gynecology, orthopedic, and specialty surgical categories."],
    ["Subtle, non-invasive treatments designed to refresh your natural look without going to extremes.", "Discuss procedure-specific drape packs configured for operating-theatre requirements."],
    ["Care that supports deep relaxation, gentle recovery, and overall well-being for body and mind.", "Review wrapping-sheet sizes, SMS material options, and pack quantities."],
    ["A calm, one-on-one conversation to understand your goals and create a plan that fits you.", "Drape packs can be customized according to your procedure, pack contents, sizes, and packaging requirements."],
    ["Thoughtful programs built around your skin and wellness needs, focused on lasting results.", "Enquire about covers, sheets, aprons, under pads, and related products."],
    ["Tap to learn more", "View Products"], ["Click to learn more", "View Products"],
    ["Your Care Journey.", "From requirements to enquiry."],
    ["A simple, thoughtful process designed to understand your needs and guide you toward natural, lasting results.", "Tell us what your team needs so we can discuss suitable products and available options."],
    ["Consultation.", "Share Your Requirements"],
    ["We begin with a calm conversation to understand your goals and concerns before recommending the right approach.", "Tell us the procedure, product type, required quantity, and any size or pack preferences."],
    ["Personalized Plan.", "Discuss Product Options"],
    ["Based on your skin, lifestyle, and preferences, we create a thoughtful plan designed to support natural and balanced results.", "Ask about available drapes, kits, wrapping sheets, and customer-specific configurations."],
    ["Treatment & Care.", "Request Your Quotation"],
    ["Treatments are performed with precision and care, followed by guidance to support long-term skin health and maintain refined results.", "Contact our team to confirm specifications, commercial terms, and supply availability."],
    ["Ready to begin your care?", "Looking for a specific drape pack?"],
    ["Every step at Meter Surgicals starts with a conversation. Together, we create a plan that feels right for you", "Share your procedure and product requirements with Meter Surgicals."],
    ["Book a consultation", "Discuss Your Requirements"],
    ["Trusted by 80+ clients", "2010 · Year of incorporation"], ["+81", "India & Beyond"],
    ["Excellent", "Domestic and international"], ["4.9 out of 5", "Customization"], ["TrustPoint", "Meter Surgicals"],
    ["Our Approach", "About Meter Surgicals"], ["Bringing the pieces together.", "Surgical essentials. A focused purpose."],
    ["Our approach is built by combining a few essential elements.", "Incorporated in 2010, Meter Surgicals manufactures surgical disposable products for healthcare providers in India and internationally."],
    ["Listening first", "Quality & Hygiene"],
    ["Every journey starts with a real conversation. We take time to understand your goals, your concerns, and what truly matters to you.", "A product focus shaped around the needs of hospitals and surgical environments."],
    ["Careful choices", "Procedure-Based Range"],
    ["We recommend only what makes sense for you. No trends, no pressure", "Explore general and specialty drape packs for different procedure requirements."],
    ["Subtle results", "Customization Options"],
    ["Our focus is on natural-looking outcomes. The goal is to help you look refreshed and feel confident, never overdone.", "Discuss customer-specific drape-pack requirements with our team."],
    ["Long-term care", "Surgical Essentials"],
    ["We think beyond quick fixes. Our approach supports your skin health and well-being over time, not just today.", "Find drapes, wrapping sheets, gowns, covers, and other non-woven disposables."],
    ["What our clients say", "Product range highlights"], ["Pricing", "Product Enquiries"],
    ["Thoughtful care, transparent pricing.", "Discuss your product requirements."],
    ["Every treatment begins with a consultation so we can understand your goals and recommend what truly fits you.", "Contact us about product selection, pack configurations, quantities, and quotation requirements."],
    ["Skin Health Consultation", "General Surgery Packs"],
    ["A detailed skin assessment with personalized guidance to help you understand your skin and choose the most suitable care approach.", "Explore general, mini, universal, and other listed general-surgery packs."],
    ["Aesthetic Treatments", "Specialty Drape Packs"],
    ["Subtle, non-invasive treatments designed to refresh your appearance while maintaining natural, balanced results.", "Discuss procedure-specific options across the brochure's specialty categories."],
    ["Wellness & Recovery", "Wrapping Sheets"],
    ["Relaxing treatments that support recovery, reduce tension, and restore a natural sense of balance for body and mind.", "Ask about listed sizes, SMS material options, and pack quantities."],
    ["Personal Care Plan", "Surgical Disposables"],
    ["A tailored program combining treatments and professional guidance to support long-term skin health and well-being.", "Enquire about covers, sheets, aprons, under pads, and related products."],
    ["Final pricing may vary depending on your personal consultation and treatment plan.", "Product specifications, availability, quantities, and commercial terms must be confirmed with Meter Surgicals."],
    ["Book your consultation", "Request a Quote"], ["Insights for thoughtful care.", "Product information"],
    ["Notes on skin health, aesthetic treatments, and simple ways to support long-term&nbsp;well-being.", "Browse product categories and specifications featured in the Meter Surgicals brochure."],
    ["How Professional Guidance Makes a Difference.", "General Surgery Drapes."],
    ["A closer look at why personal assessment matters and how tailored care supports refined outcomes.", "General, mini, universal, Hb SAG, and HIV protection drape packs, with customization available on request."],
    ["Hydration Beyond Moisturizer.", "Gynecology Surgery Drapes."],
    ["An overview of internal and external hydration, what truly supports moisture retention, and how to maintain it daily.", "LSCS, delivery, DNC, and perineal drape kits, hystro lap pouches, and maternity mats."],
    ["Explore more articles in our Journal and discover practical insights for thoughtful, long-term care.", "Explore product categories and specifications in the Meter Surgicals brochure."],
    ["Browse insights", "View Product Range"],
    ["Your questions, answered.", "Product enquiries"],
    ["Everything you need to know before booking&nbsp;your&nbsp;visit.", "Contact Meter Surgicals about products, specifications, pack requirements, and quotations."],
    ["A quiet note from Althea.", "Contact Meter Surgicals"],
    ["Occasional updates on skin health, thoughtful care, and simple ways to support your well&nbsp;being.", "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com."],
    ["Enter your email", "Email Meter Surgicals"], ["hello@world.com", "metersurgicals@gmail.com"],
    ["Send us an email", "metersurgicals@gmail.com"], ["connect with us on social", "or call +91 89254 99953"],
    ["from $120", "Enquire"], ["from $250", "Enquire"], ["from $180", "Enquire"], ["from $350", "Enquire"],
    ["$120", "Enquire"], ["$250", "Enquire"], ["$180", "Enquire"], ["$350", "Enquire"],
    ["TrustScore&nbsp;4.9&nbsp;&nbsp;245&nbsp;reviews", "Meter Surgicals product range"], ["245&nbsp;reviews", "Meter Surgicals"],
    ["how-professional-guidance-makes-a-difference", "general-surgery-drapes"], ["hydration-beyond-moisturizer", "gynecology-surgery-drapes"],
    ["Aesthetic &amp; Wellness", "Surgical Drapes &amp; Disposables"],
    ["Get this template", "Meter Surgicals"], ["from $129", ""], ["Anton Drukarov", "Meter Surgicals"],
    ["https://templatoria.com/", "/"], ["https://framer.link/drukarov", "/"], ["https://buy.polar.sh/", "/contact"],
    ["Dr. Eva Laurent", "Meter Surgicals"], ["hello@altheacare.com", "metersurgicals@gmail.com"], ["hello@altheaclinic.com", "metersurgicals@gmail.com"],
    ["Do I need a consultation before any treatment?", "Which products are listed in the brochure?"],
    ["Yes. Every treatment at Althea starts with a personal consultation. This gives us time to understand your goals, your concerns, and your skin or wellness needs.", "The brochure lists surgical drapes and kits, surgeon gowns, disposable bed sheets, sterilization wrapping sheets, and other non-woven disposable products for hospitals and operation theatres."],
    ["Are the results natural-looking?", "Can drape packs be customized?"],
    ["Yes. Our approach is focused on subtle, natural results. The goal is to help you look refreshed and feel confident, not overdone.", "The brochure notes selected drape packs can be customized as per customer request. Confirm requirements with Meter Surgicals."],
    ["Do you offer wellness treatments as well as aesthetic ones?", "Which wrapping-sheet specifications are listed?"],
    ["Yes. Althea combines aesthetic care with wellness-focused treatments that support relaxation, recovery, and overall balance.", "Sizes listed are 50 × 50 cm, 60 × 60 cm, 75 × 75 cm, and 90 × 90 cm. Customized sizes use 43/50 GSM SMS fabric and are available in packs of 25 or 50."],
    ["How can I book an appointment?", "How can I contact Meter Surgicals?"],
    ["You can book your consultation online through our booking page or contact us directly if you have questions first.", "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com. Address: Plot No 43, Puzhuthivakkam Main Road, Puzhuthivakkam, Tamil Nadu, Chennai 600091."],
    ["Are the treatments safe?", "What details should I share for a product enquiry?"],
    ["Your safety is always our priority. We work with professional standards, proven methods, and carefully chosen treatments designed for long-term skin health and well-being.", "Share the procedure, product type, required quantity, and any size or pack preferences with our team."],
    ["How do I know which treatment is right for me?", "How can I request a quotation?"],
    ["You don’t need to decide alone. During your consultation, we listen to your goals and concerns and create a personal plan that makes sense for you.", "Contact Meter Surgicals to confirm product specifications, commercial terms, and supply availability."],
    ["Is there any pressure to book a treatment?", "Can I ask about product availability and commercial terms?"],
    ["No. We believe good care starts with trust and honest advice. The consultation is about understanding your options, not pushing you into decisions.", "Yes. Product specifications, availability, quantities, and commercial terms must be confirmed with Meter Surgicals."],
    ["What should I expect during my first visit?", "Which products are available for different procedures?"],
    ["Your first visit starts with a calm, personal consultation. We talk about your goals, your skin or wellness concerns, and any questions you may have. From there, we suggest a thoughtful plan that fits you, without pressure and without rushing into decisions.", "The brochure lists general, gynecology, orthopedic, and specialty surgery drapes, plus wrapping sheets and other medical and surgical disposables."],
    ["Didn’t find what you were looking for? Get in touch and let’s sort it out.", ""],
  ];
  let html = replacements.reduce((content, [from, to]) => content.replaceAll(from, to), source);
  html = html
    .replaceAll("Didn’t find what you were looking for? Get in touch and let’s sort it out.", "")
    .replaceAll("Didn't find what you were looking for? Get in touch and let's sort it out.", "")
    .replace(/<[^>]+>Experience with sound<[^>]+>/gi, "")
    .replace(/Experience with sound/gi, "");
  html = html.replace(/Every step at Meter Surgicals starts with a conversation\.[^<]*/g, "Share your procedure and product requirements with Meter Surgicals.");
  const slides = [
    ["consultation felt", "General & Specialty Drapes", "Explore drape packs across general, gynecology, orthopedic, and specialty surgical categories."],
    ["whole experience felt", "Customer-Specific Packs", "Discuss customer-specific drape-pack requirements with our team."],
    ["consultation was very thoughtful", "Sterilization Wrapping Sheets", "Review listed wrapping-sheet sizes, SMS material options, and pack quantities."],
    ["calm atmosphere and clear explanations", "Medical & Surgical Disposables", "Enquire about covers, sheets, aprons, under pads, and related products."],
    ["looking for something natural", "General & Specialty Drapes", "Explore drape packs across general, gynecology, orthopedic, and specialty surgical categories."],
  ];
  html = html.replace(/(<h4\b[^>]*>)([\s\S]*?)(<\/h4>)/g, (full, open, text, close) => {
    const slide = slides.find(([match]) => text.includes(match));
    return slide ? `${open}${slide[1]}${close}` : full;
  });
  const credits = [["Emma L.", slides[0][2]], ["Sofia M.", slides[1][2]], ["Laura P.", slides[2][2]], ["Isabelle R.", slides[3][2]], ["Anna K.", slides[0][2]]];
  html = html.replace(/(<p\b[^>]*>)([\s\S]*?)(<\/p>)/g, (full, open, text, close) => {
    const credit = credits.find(([name]) => text.includes(name));
    return credit ? `${open}${credit[1]}${close}` : full;
  });
  return html;
}
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [html] = useState(() => adaptContent(framerHtml));

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("button, a, [role='button']").forEach((control) => {
      const label = [
        control.textContent?.toLowerCase(),
        control.getAttribute("aria-label")?.toLowerCase(),
        control.getAttribute("title")?.toLowerCase(),
      ].filter(Boolean).join(" ");
      if (label.includes("experience") && label.includes("sound")) control.remove();
    });
    document.querySelectorAll<HTMLElement>("p, h1, h2, h3, h4, h5, button, a, div").forEach((element) => {
      const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (
        text === "Experience with sound" ||
        text === "Didn’t find what you were looking for? Get in touch and let’s sort it out." ||
        text === "Didn't find what you were looking for? Get in touch and let's sort it out."
      ) {
        element.remove();
      }
    });
    const routeTargets: Record<string, string> = {
      "/about": "#our-approach",
      "/products": "#our-services",
      "/services": "#our-services",
      "/brochure": "#journal-preview",
      "/journal": "#journal-preview",
    };
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((link) => {
      const target = routeTargets[link.getAttribute("href") ?? ""];
      if (target) link.href = target;
    });
    const quote = document.getElementById("quote");
    const services = document.getElementById("our-services");
    if (quote) cleanups.push(initQuoteReveal(quote));
    if (services) cleanups.push(initServicesWheel(services));
    const carouselOrder = [1, 2, 3, 4, 0] as const;
    services?.querySelectorAll<HTMLElement>("h4").forEach((heading, index) => {
      const categoryIndex = carouselOrder[index % carouselOrder.length];
      const category = categoryIndex === undefined ? undefined : brochureCategories[categoryIndex];
      if (!category || categoryIndex === undefined) return;
      heading.textContent = category.title;
      const cardLink = heading.closest<HTMLAnchorElement>("a");
      const textContainer = cardLink ?? heading.closest<HTMLElement>('[data-framer-name="Text Container"]');
      const paragraphs = Array.from(textContainer?.querySelectorAll<HTMLElement>("p") ?? []);
      if (paragraphs[0]) paragraphs[0].textContent = category.summary;
      if (paragraphs.length > 1) paragraphs[paragraphs.length - 1].textContent = "Explore products";
      if (cardLink) cardLink.href = "#journal-preview";
    });
    services?.querySelectorAll<HTMLElement>('[data-framer-name="Icon Container"]').forEach((imageContainer, index) => {
      const categoryIndex = carouselOrder[index % carouselOrder.length];
      const category = categoryIndex === undefined ? undefined : brochureCategories[categoryIndex];
      if (!category) return;
      const image = document.createElement("img");
      image.className = "meter-product-carousel-image";
      image.src = category.image;
      image.alt = category.title;
      image.loading = "lazy";
      imageContainer.replaceChildren(image);
    });
    const heroTitle = document.querySelector<HTMLElement>(".framer-m3elfi h1, .framer-DFt9Q h1");
    if (heroTitle) heroTitle.textContent = "Surgical drapes. Trusted care.";
    const hero = document.getElementById("hero");
    const heroMessage = hero?.querySelector<HTMLElement>(".framer-eo1y6");
    if (heroMessage) {
      heroMessage.querySelectorAll(".meter-hero-eyebrow").forEach((item) => item.remove());
      const heroCopy = Array.from(heroMessage.querySelectorAll<HTMLElement>("p")).find((item) => !item.closest("a"));
      heroCopy?.remove();
      const primary = heroMessage.querySelector<HTMLAnchorElement>("a");
      if (primary) primary.href = "#our-services";
      heroMessage.querySelector('a[href="/meter/meter-surgicals-drapes.pdf"]')?.remove();
    }
    hero?.querySelectorAll<HTMLAnchorElement>('a[href="/#ready-to-begin"], a[href="#ready-to-begin"]').forEach((link) => link.remove());
    document.querySelectorAll<HTMLElement>(".framer-1sdbrz5-container").forEach((headerCta) => {
      headerCta.querySelectorAll("p, strong").forEach((label) => { label.textContent = "Request a Quote"; });
    });
    const headerBrand = document.querySelector<HTMLAnchorElement>('[data-framer-name="Navigation"] > div:first-child a');
    if (headerBrand) {
      headerBrand.classList.add("meter-home-brand");
      headerBrand.closest<HTMLElement>('[data-framer-component-type="RichTextContainer"]')?.classList.add("meter-home-brand-wrap");
      const logo = document.createElement("img");
      logo.src = "/meter/meter-surgicals-logo.png";
      logo.alt = "";
      logo.width = 44;
      logo.height = 44;
      const copy = document.createElement("span");
      copy.className = "meter-home-brand-copy";
      const name = document.createElement("b");
      name.textContent = "METER SURGICALS";
      const tagline = document.createElement("small");
      tagline.textContent = "SAVING LIVES";
      copy.append(name, tagline);
      headerBrand.replaceChildren(logo, copy);
    }
    document.querySelectorAll<HTMLElement>(".framer-3mmeed").forEach((stats) => {
      stats.replaceChildren();
      stats.classList.add("meter-factual-stats");
      [["2010", "Year of incorporation"], ["India & Beyond", "Domestic and international providers"], ["Customization", "Drape packs to customer requirements"]].forEach(([value, caption]) => {
        const item = document.createElement("div");
        const strong = document.createElement("strong");
        const small = document.createElement("span");
        strong.textContent = value;
        small.textContent = caption;
        item.append(strong, small);
        stats.appendChild(item);
      });
    });
    const enquiryCta = Array.from(document.querySelectorAll<HTMLElement>("section")).find((section) => section.textContent?.includes("Looking for a specific drape pack?"));
    enquiryCta?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => { link.textContent = "Discuss Your Requirements"; link.href = "#ready-to-begin"; });
    const enquiryCards = [
      {
        title: "General Surgery Packs",
        description: "General, mini, universal, and HIV protection packs for general surgical procedures.",
      },
      {
        title: "Specialty Drape Packs",
        description: "Gynecology, orthopedic, and other surgery packs tailored to procedure requirements.",
      },
      {
        title: "Sterilization Wrapping Sheets",
        description: "SMS wrapping sheets in standard sizes with customized options.",
      },
      {
        title: "Medical & Surgical Disposables",
        description: "Sheets, covers, gowns, and other non-woven products for operating rooms.",
      },
    ];
    document.querySelectorAll<HTMLAnchorElement>("#pricing a.framer-ga0h3").forEach((link, index) => {
      const labels = ["Enquire About Packs", "Discuss Requirements", "Request Specifications", "Request a Quote"];
      link.href = "#ready-to-begin";
      link.querySelector('[data-framer-name="Price"]')?.remove();
      const card = enquiryCards[index % enquiryCards.length];
      const title = Array.from(link.querySelectorAll<HTMLElement>("h4")).find((heading) => !heading.closest('[data-framer-name="Price"]'));
      const description = Array.from(link.querySelectorAll<HTMLElement>("p")).find((paragraph) => !paragraph.closest('[data-framer-name="Price"]'));
      if (title) title.textContent = card.title;
      if (description) description.textContent = card.description;
      if (!link.querySelector(".meter-enquiry-card-action")) {
        const action = document.createElement("span");
        action.className = "meter-enquiry-card-action";
        action.textContent = labels[index % labels.length];
        link.append(action);
      }
    });
    document.querySelectorAll<HTMLFormElement>(".framer-h1bpuk").forEach((footerForm) => {
      const contact = document.createElement("div");
      contact.className = "meter-footer-contact-info";
      contact.innerHTML = '<a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a><p>Plot No 43, Puzhuthivakkam Main Road, Puzhuthivakkam, Tamil Nadu, Chennai 600091</p>';
      footerForm.replaceWith(contact);
    });
    const footer = document.querySelector("footer");
    footer?.querySelectorAll<HTMLElement>('[data-framer-name="Column"]').forEach((column) => {
      if (column.querySelector("p")?.textContent?.trim() === "Sitemap") column.remove();
    });
    footer?.querySelectorAll<HTMLElement>('[data-framer-name="Sitemap"]').forEach((box) => box.remove());
    footer?.querySelectorAll<HTMLElement>('[data-framer-name="Copyright"]').forEach((copyright) => copyright.remove());
    if (footer) {
      footer.querySelectorAll<HTMLElement>(".meter-home-footer-brand").forEach((brand) => brand.remove());
      const footerBrand = document.createElement("a");
      footerBrand.className = "meter-home-footer-brand";
      footerBrand.href = "/";
      const logo = document.createElement("img");
      logo.src = "/meter/meter-surgicals-logo.png";
      logo.alt = "";
      logo.width = 42;
      logo.height = 42;
      const copy = document.createElement("span");
      copy.className = "meter-home-brand-copy";
      const name = document.createElement("b");
      name.textContent = "METER SURGICALS";
      const tagline = document.createElement("small");
      tagline.textContent = "SAVING LIVES";
      copy.append(name, tagline);
      footerBrand.append(logo, copy);
      footer.append(footerBrand);
    }

    const productImages = ["/meter/general-drape-pack.jpg", "/meter/gynecology-drapes.jpg", "/meter/orthopedic-drapes.jpg", "/meter/other-drapes.jpg", "/meter/sterilization-sheets.jpg"];
    services?.querySelectorAll<HTMLImageElement>("img:not(.meter-product-carousel-image)").forEach((image, index) => {
      image.src = productImages[Math.floor(index / 2) % productImages.length];
      image.removeAttribute("srcset");
    });
    if (services && !services.nextElementSibling?.classList.contains("meter-product-range-cta")) {
      const rangeCta = document.createElement("section");
      rangeCta.className = "meter-product-range-cta";
      rangeCta.innerHTML = '<a href="#journal-preview">View Full Product Range</a>';
      services.insertAdjacentElement("afterend", rangeCta);
    }

    const journey = document.getElementById("why-althea");
    journey?.querySelectorAll<HTMLElement>("h2").forEach((heading) => { heading.textContent = "From enquiry to product selection."; });
    const journeySteps = [
      ["Share Your Requirements", "Tell us the procedure, product type, required quantity, and any size or pack preferences."],
      ["Confirm Product Specifications", "Review suitable drapes, kits, wrapping-sheet sizes, and other listed disposable products."],
      ["Request a Quotation", "Contact Meter Surgicals to confirm product specifications, availability, and commercial terms."],
    ];
    journeySteps.forEach(([title, description], index) => {
      journey?.querySelectorAll<HTMLElement>(`[data-framer-name="Claim 0${index + 1}"]`).forEach((step) => {
        step.querySelectorAll<HTMLElement>("h4, h5").forEach((heading) => { heading.textContent = title; });
        step.querySelectorAll<HTMLElement>("p").forEach((paragraph) => { paragraph.textContent = description; });
      });
    });

    const contactCtaSection = document.getElementById("ready-to-begin");
    contactCtaSection?.querySelectorAll<HTMLElement>("h3, h4").forEach((heading) => { heading.textContent = "Need product details or a quote?"; });
    contactCtaSection?.querySelectorAll<HTMLElement>("p").forEach((paragraph) => {
      if (paragraph.textContent?.includes("Every step") || paragraph.textContent?.includes("Share your procedure")) {
        paragraph.textContent = "Contact Meter Surgicals about brochure-listed drapes, packs, wrapping sheets, and other disposables.";
      }
    });
    contactCtaSection?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
      link.textContent = "Contact Meter Surgicals";
      link.href = "#ready-to-begin";
    });

    const approach = document.getElementById("our-approach");
    approach?.querySelectorAll<HTMLElement>('[data-framer-name="Headline"] p').forEach((paragraph) => {
      if (paragraph.textContent?.includes("About Meter Surgicals")) {
        paragraph.textContent = "ABOUT METER SURGICALS";
      } else {
        paragraph.textContent = "Incorporated in 2010, Meter Surgicals is a CE-certified manufacturer serving healthcare providers in India and internationally. Its vision is to enhance quality, hygiene, and infection control in surgical environments with disposable surgical-care products.";
      }
    });
    approach?.querySelectorAll<HTMLElement>('[data-framer-name="Headline"] h2').forEach((heading) => { heading.textContent = "Quality, hygiene and infection control."; });
    const approachCards = Array.from(approach?.querySelectorAll<HTMLElement>('[data-framer-name="Bento Container"]') ?? [])
      .filter((card) => card.querySelector("h2, h3, h4, h5") && card.querySelector("p"));
    const approachContent = [
      ["Surgical Environment Focus", "Our vision is to enhance quality, hygiene, and infection control in surgical environments."],
      ["Surgical Drapes & Kits", "General and specialty surgical drapes and kits for a range of procedures."],
      ["Customization on Request", "Selected drape packs can be customized as per customer request."],
      ["Non-woven Disposables", "Surgeon gowns, disposable bed sheets, wrapping sheets, and other non-woven products."],
    ];
    const approachImages: Record<number, { src: string; alt: string }> = {
      1: { src: "/meter/surgical-suturing.jpg", alt: "Surgical instruments being used during a procedure" },
      2: { src: "/meter/surgical-instrument-clamp.jpg", alt: "Surgical clamp instrument" },
      3: { src: "/meter/surgical-care-disposables.jpg", alt: "Surgeon wearing protective surgical clothing and using instruments" },
    };
    const approachImageLayouts: Record<number, { width: string; height: string; left: string; top: string; objectFit: "contain" | "cover"; headingWidth: string }> = {
      1: { width: "38%", height: "100%", left: "81%", top: "50%", objectFit: "cover", headingWidth: "62%" },
      2: { width: "45%", height: "65%", left: "77.5%", top: "55%", objectFit: "contain", headingWidth: "52%" },
      3: { width: "40%", height: "100%", left: "80%", top: "50%", objectFit: "cover", headingWidth: "58%" },
    };
    approachCards.forEach((card, index) => {
      const cardIndex = Math.floor(index / 3);
      const content = approachContent[cardIndex];
      const imageContent = approachImages[cardIndex];
      const imageLayout = approachImageLayouts[cardIndex];
      if (!content) return;
      const heading = card.querySelector<HTMLElement>("h2, h3, h4, h5");
      const paragraph = card.querySelector<HTMLElement>("p");
      if (heading) heading.textContent = content[0];
      if (paragraph) paragraph.textContent = content[1];
      const image = card.querySelector<HTMLImageElement>("img");
      if (image && imageContent) {
        image.src = imageContent.src;
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");
        image.alt = imageContent.alt;
        const imageFrame = image.closest<HTMLElement>("section");
        if (imageFrame && imageLayout) {
          Object.assign(imageFrame.style, {
            width: imageLayout.width,
            height: imageLayout.height,
            left: imageLayout.left,
            top: imageLayout.top,
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
          });
          Object.assign(image.style, {
            position: "absolute",
            inset: "0",
            width: "100%",
            height: "100%",
            objectFit: imageLayout.objectFit,
            objectPosition: "center",
          });
          if (heading?.parentElement) heading.parentElement.style.maxWidth = imageLayout.headingWidth;
        }
      }
    });

    document.getElementById("testimonials")?.remove();

    const numbers = document.getElementById("numbers");
    if (numbers) {
      numbers.classList.add("meter-company-facts");
      numbers.replaceChildren();
      const heading = document.createElement("h2");
      heading.textContent = "Meter Surgicals at a glance";
      const facts = document.createElement("div");
      facts.className = "meter-company-facts-grid";
      [["2010", "Year of incorporation"], ["CE Certified", "Surgical disposables manufacturer"], ["India & Global", "Healthcare providers served"]].forEach(([value, label]) => {
        const fact = document.createElement("div");
        const strong = document.createElement("strong");
        const caption = document.createElement("p");
        strong.textContent = value;
        caption.textContent = label;
        fact.append(strong, caption);
        facts.append(fact);
      });
      numbers.append(heading, facts);
    }

    const pricing = document.getElementById("pricing");
    pricing?.querySelectorAll<HTMLElement>("h2").forEach((heading) => { heading.textContent = "Discuss your product requirements."; });
    pricing?.querySelectorAll<HTMLElement>("p").forEach((paragraph) => {
      const text = paragraph.textContent?.trim() ?? "";
      if (text === "Product Enquiries") paragraph.textContent = "METER SURGICALS · PRODUCT ENQUIRIES";
      if (text.startsWith("Contact us about product selection")) {
        paragraph.textContent = "Ask about the brochure's drapes and kits, SMS wrapping sheets, gowns, sheets, and other disposables.";
      }
    });

    const catalog = document.getElementById("journal-preview");
    if (catalog) {
      catalog.classList.add("meter-brochure-catalog");
      catalog.replaceChildren();
      const header = document.createElement("div");
      header.className = "meter-catalog-header";
      const eyebrow = document.createElement("p");
      eyebrow.textContent = "METER SURGICALS · PRODUCT BROCHURE";
      const title = document.createElement("h2");
      title.textContent = "Surgical drapes, packs & disposables.";
      const intro = document.createElement("p");
      intro.textContent = "Browse the product ranges and specifications shown in the brochure.";
      header.append(eyebrow, title, intro);

      const grid = document.createElement("div");
      grid.className = "meter-catalog-grid";
      brochureCategories.forEach((category) => {
        const card = document.createElement("article");
        card.className = "meter-catalog-card";
        const photo = document.createElement("img");
        photo.className = "meter-catalog-photo";
        if (category.title === "Sterilization Wrapping Sheets") {
          photo.classList.add("meter-catalog-photo-bottom");
        }
        photo.src = category.brochureImage;
        photo.alt = category.title;
        photo.loading = "lazy";
        card.append(photo);
        const heading = document.createElement("h3");
        heading.textContent = category.title;
        const description = document.createElement("p");
        description.textContent = category.summary;
        const list = document.createElement("ul");
        category.products.forEach((product) => {
          const item = document.createElement("li");
          item.textContent = product;
          list.append(item);
        });
        card.append(heading, description, list);
        if ("note" in category) {
          const note = document.createElement("p");
          note.className = "meter-catalog-note";
          note.textContent = category.note;
          card.append(note);
        }
        grid.append(card);
      });

      [
        {
          href: "/products/msgs01",
          title: "Product Code MSGS01",
          description: "General Surgery Kit",
        },
        {
          href: "/products/ortho-pack-a1",
          title: "Ortho Pack A-1",
          description: "Orthopedic procedure pack",
        },
      ].forEach((product) => {
        const packLink = document.createElement("a");
        packLink.className = "meter-catalog-card meter-catalog-product-link";
        packLink.href = product.href;
        packLink.setAttribute("aria-label", `View ${product.title}`);
        const packTitle = document.createElement("h3");
        packTitle.textContent = product.title;
        const packDescription = document.createElement("p");
        packDescription.textContent = product.description;
        packLink.append(packTitle, packDescription);
        grid.append(packLink);
      });

      const action = document.createElement("a");
      action.className = "meter-catalog-action";
      action.href = "#ready-to-begin";
      action.textContent = "Ask about products or request a quote";
      catalog.append(header, grid, action);
    }

    const faq = document.getElementById("faq");
    if (faq) {
      faq.classList.add("meter-product-faq");
      faq.replaceChildren();
      const heading = document.createElement("h2");
      heading.textContent = "Product enquiries";
      const intro = document.createElement("p");
      intro.textContent = "Answers about brochure-listed products, specifications, and enquiries.";
      const list = document.createElement("div");
      list.className = "meter-faq-list";
      brochureQuestions.forEach(([question, answer]) => {
        const item = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = question;
        const response = document.createElement("p");
        response.textContent = answer;
        item.append(summary, response);
        list.append(item);
      });
      faq.append(heading, intro, list);
    }

    document.querySelectorAll<HTMLAnchorElement>('a[href^="/"], a[href^="./"]').forEach((link) => {
      const href = link.getAttribute("href") ?? "";
      const path = href.split(/[?#]/, 1)[0].replace(/^\.\//, "/");
      const target = routeTargets[path] ?? (path.startsWith("/journal/") ? "#journal-preview" : undefined);
      if (target) link.setAttribute("href", target);
    });
    document.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
      const label = link.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
      if (
        label.includes("contact meter surgicals") ||
        label.includes("request a quote") ||
        label === "contact us" ||
        label.includes("discuss your requirements")
      ) {
        link.href = "/contact-us";
      }
    });
    document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:mailto:"]').forEach((link) => {
      link.href = link.getAttribute("href")?.replace(/^mailto:mailto:/, "mailto:") ?? link.href;
    });

    const timer = window.setTimeout(() => cleanups.push(initScrollFadeIn()), 60);
    return () => {
      window.clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <>
    <div dangerouslySetInnerHTML={{ __html: html }} />
    <div className="mobile-section-menu">
      <button
        className="mobile-section-menu__toggle"
        type="button"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-section-menu-panel"
        aria-label={mobileMenuOpen ? "Close section menu" : "Open section menu"}
        onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
      >
        <span className="mobile-section-menu__icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
      </button>
      <nav
        className="mobile-section-menu__panel"
        id="mobile-section-menu-panel"
        aria-label="Page sections"
        hidden={!mobileMenuOpen}
      >
        {mobileSectionLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  </>;
}
