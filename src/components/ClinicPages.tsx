"use client";

import { FormEvent, useMemo, useState } from "react";

const articles = [
  { category: "Surgery Drapes", title: "General Surgery Drapes", summary: "General, mini, universal, HB SAG, and HIV protection drape packs. Customer-specific packs can be requested.", image: "/meter/general-drape-pack.jpg" },
  { category: "Surgery Drapes", title: "Gynecology Surgery Drapes", summary: "LSCS, delivery, DNC, Hystro Lap, perineal drape kits, and maternity mats. Customisation is available on request.", image: "/meter/gynecology-drapes.jpg" },
  { category: "Surgery Drapes", title: "Orthopedic Surgery Drapes", summary: "Ortho packs, knee and hip drapes, arthroscopy, TKR, THR, and shoulder arthroscopy packs.", image: "/meter/orthopedic-drapes.jpg" },
  { category: "Other Products", title: "Sterilization Wrapping Sheets", summary: "SMS sheets in 50, 60, 75, and 90 cm sizes; custom sizes and 43/50 GSM options.", image: "/meter/sterilization-sheets.jpg" },
  { category: "Other Products", title: "Other Surgery Drapes", summary: "CABG, Angio, LAVH, renal transplant, cystoscopy, IVF, urology, neurology, laparoscopy, PCNL, and TURP drapes.", image: "/meter/other-drapes.jpg" },
];

const articleBodies = {
  "how-professional-guidance-makes-a-difference": { title: articles[0].title, category: "Aesthetic Care", author: "Dr. Elena Rossi", minutes: "6", image: articles[0].image },
  "hydration-beyond-moisturizer": { title: articles[1].title, category: "Wellness", author: "Dr. Sofia Martin", minutes: "7", image: articles[1].image },
};

const faq = [
  ["Which product ranges are available?", "The brochure lists general, gynecology, orthopedic and other surgery drapes, sterilization wrapping sheets, and medical disposables."],
  ["Can packs be customised?", "Several drape packs and kits can be customised on request. Contact Meter Surgicals with your requirements."],
  ["What sizes are available for wrapping sheets?", "The brochure lists 50 × 50, 60 × 60, 75 × 75, and 90 × 90 cm sizes, with custom sizes also available."],
  ["How do I request product details?", "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com."],
];

function Header() {
  return <header className="clinic-header"><a className="clinic-logo" href="/">Meter Surgicals</a><nav><a href="/about">About</a><a href="/services">Products</a><a href="/journal">Brochure</a><a href="/contact">Contact</a></nav><a className="clinic-book" href="/contact">Get in touch <span>↗</span></a></header>;
}

function Footer() {
  return <footer className="clinic-footer"><div><a className="clinic-logo" href="/">Meter Surgicals</a><p>Surgical Drapes &amp; Disposables</p></div><div><small>EXPLORE</small><a href="/about">About</a><a href="/services">Products</a><a href="/journal">Brochure</a><a href="/contact">Contact</a></div><div><small>GET IN TOUCH</small><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a></div><p className="clinic-copyright">© 2026 Meter Surgicals. Saving Lives.</p></footer>;
}

function Shell({ children }: { children: React.ReactNode }) { return <main className="clinic-pages"><Header />{children}<Footer /></main>; }

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="clinic-page-hero"><p className="clinic-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="clinic-lede">{copy}</p></section>;
}

function Callout() { return <section className="clinic-callout"><p className="clinic-eyebrow">METER SURGICALS · SAVING LIVES</p><h2>Let’s discuss<br/><i>your requirements.</i></h2><p>Contact our team for brochure-listed product information and customer-specific drape packs.</p><a className="clinic-book" href="/contact">Contact Meter Surgicals <span>↗</span></a></section>; }

function Faq() { const [open, setOpen] = useState(0); return <section className="clinic-faq"><p className="clinic-eyebrow">GOOD TO KNOW</p><h2>Your questions,<br/><i>answered.</i></h2><div>{faq.map(([q, a], i) => <button className="clinic-faq-item" key={q} onClick={() => setOpen(open === i ? -1 : i)}><span><b>{q}</b><em>{open === i ? "−" : "+"}</em></span>{open === i && <p>{a}</p>}</button>)}</div></section>; }

export function AboutPage() {
  return <Shell><PageHero eyebrow="METER SURGICALS · EST. 2010" title="About Meter Surgicals." copy="A CE-certified surgical disposables manufacturer serving healthcare providers in India and globally."/><section className="clinic-split"><div className="clinic-photo photo-about"/><div><p className="clinic-eyebrow">OUR COMPANY</p><h2>Quality, hygiene<br/><i>and care.</i></h2><p>Incorporated in 2010, Meter Surgicals set out to enhance standards of quality, hygiene, and infection control in surgical environments.</p><p>The brochure describes a full range of disposable drapes and kits, surgeon gowns, disposable bed sheets, sterilization wrapping sheets, and other non-woven products for hospitals and operating theatres.</p><p>Meter Surgicals serves healthcare providers across India and around the world.</p></div></section><section className="clinic-founder"><p className="clinic-eyebrow">OUR COMMITMENT</p><h2>Supporting safer, more hygienic surgical environments.</h2><p>CE-certified surgical disposables · Incorporated 2010</p></section><section className="clinic-team"><p className="clinic-eyebrow">PRODUCT AREAS</p><h2>Drapes and kits<br/><i>for every procedure.</i></h2><div className="clinic-team-grid">{[["General Surgery","Drape packs and kits"],["Gynecology","Procedure packs and maternity products"],["Orthopedics","Ortho, knee, hip and arthroscopy drapes"]].map((t,i)=><article key={t[0]}><div className={`clinic-photo team-photo team-${i}`}/><h3>{t[0]}</h3><p>{t[1]}</p></article>)}</div></section><Callout/><Faq/></Shell>;
}

const services = [
  ["Sterilization Wrapping Sheets", "SMS wrapping sheets for sterilization in standard and customized sizes.", "Available in 50 × 50, 60 × 60, 75 × 75, and 90 × 90 cm sizes.", "43/50 GSM SMS fabric; packs of 25 or 50; custom sizes can be requested."],
  ["General Surgery Drapes", "Drape packs and kits for general surgical procedures.", "General, Mini, Universal, HB SAG, and HIV Protection Drape Kits.", "Customer-specific packs can be customized on request."],
  ["Gynecology Surgery Drapes", "Procedure packs and kits for gynecology and maternity care.", "LSCS, Delivery, DNC, Hystro Lap, Perineal Drape Kits, and Maternity Mat.", "Customization is available on request."],
  ["Orthopedic Surgery Drapes", "Drape packs for orthopedic and arthroscopy procedures.", "Ortho packs with 5 or 3 gowns; Knee O, Hip U, Knee Arthroscopy, TKR, THR, and Shoulder Arthroscopy.", "Customer-specific options can be discussed with Meter Surgicals."],
  ["Other Surgery Drapes", "Specialty packs for a broad range of surgical procedures.", "CABG, Angio, LAVH, Renal Transplant, Cystoscopy, IVF, Urology, Neurology, Laparoscopy, PCNL, and TURP drapes.", "The brochure lists additional customized drape packs on request."],
];

export function ServicesPage() {
  const [expanded, setExpanded] = useState(0);
  return <Shell><PageHero eyebrow="METER SURGICALS · PRODUCT CATALOG" title="Surgical drapes & products." copy="Browse surgical drapes, procedure kits, sterilization wrapping sheets, and other non-woven disposables featured in our brochure."/><section className="clinic-services">{services.map(([title, copy, result, treatments], i)=><article className="clinic-service-row" id={`product-${i}`} key={title}><div className={`clinic-photo service-photo service-${i}`}/><div><p className="clinic-eyebrow">0{i+1} / PRODUCT RANGE</p><h2>{title}</h2><p>{copy}</p><button className="clinic-text-button" onClick={()=>setExpanded(expanded === i ? -1 : i)}>{expanded === i ? "Show less −" : "Show product details +"}</button>{expanded === i && <div className="clinic-service-detail"><b>Products listed</b><p>{result}</p><b>Options</b><p>{treatments}</p><a href="/contact">Ask about this range ↗</a></div>}</div></article>)}</section><Callout/><Faq/></Shell>;
}

export function JournalPage() {
  const [search, setSearch] = useState(""); const [category, setCategory] = useState("All topics");
  const filtered = useMemo(()=>articles.filter(a=>(category === "All topics" || a.category === category) && `${a.title} ${a.summary}`.toLowerCase().includes(search.toLowerCase())),[search,category]);
  return <Shell><PageHero eyebrow="METER SURGICALS · BROCHURE" title="Product catalog." copy="Browse the brochure’s surgical drapes, procedure packs, sterilization wrapping sheets, and medical disposables."/><section className="clinic-journal"><div className="journal-controls"><label><span>⌕</span><input aria-label="Search products" placeholder="Search products…" value={search} onChange={e=>setSearch(e.target.value)}/></label><select aria-label="Filter by product type" value={category} onChange={e=>setCategory(e.target.value)}><option>All topics</option><option>Surgery Drapes</option><option>Other Products</option></select></div><div className="clinic-article-grid">{filtered.map((a,i)=><article className="clinic-article" key={a.title}><div className="clinic-article-image" style={{backgroundImage:`url("${a.image}")`}}/><p className="clinic-eyebrow">{a.category}</p><h2>{a.title}</h2><p>{a.summary}</p><a href={`/services#product-${i}`}>View product details <span>↗</span></a></article>)}</div>{filtered.length === 0 && <p className="journal-empty">No products match that search. Try another term.</p>}</section><a className="clinic-article" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">Open the full brochure <span>↗</span></a><Callout/></Shell>;
}

export function ArticlePage({ slug }: { slug: string }) {
  const article = articleBodies[slug as keyof typeof articleBodies] ?? articleBodies["how-professional-guidance-makes-a-difference"];
  return <Shell><section className="clinic-article-hero"><p className="clinic-eyebrow">{article.category}</p><h1>{article.title}.</h1><p className="clinic-lede">{articles.find(a=>a.title===article.title)?.summary}</p><p className="article-byline">By {article.author} <span>·</span> {article.minutes} min read</p><div className="clinic-article-cover" style={{backgroundImage:`url("${article.image}")`}}/></section><article className="clinic-prose"><p className="prose-intro">Modern aesthetic and wellness care is rarely about one dramatic change. More often, it is about understanding how small factors work together over time. Whether addressing a specific concern or maintaining overall balance, long-term results begin with clarity and careful decisions.</p><h2>A Calm Starting Point</h2><p>Meaningful progress rarely begins with a dramatic change. It begins with awareness: how your skin responds, how your lifestyle influences results, and how small daily habits accumulate over time. When you look at the full picture, it becomes easier to make decisions that support long-term balance rather than short-term reactions.</p><p>Many concerns develop gradually. They are shaped by environment, routine, stress, and personal history. Because of this, solutions also benefit from patience. A measured approach allows the skin and body to adapt naturally, without unnecessary intensity.</p><h2>Understanding What Truly Matters</h2><p>It can be tempting to focus only on visible results. Yet behind every visible change is a process: choosing appropriate methods, respecting natural limits, and understanding that progress does not look the same for everyone. Personalization is essential.</p><p>True care considers comfort as much as appearance. When decisions are made thoughtfully and expectations are realistic, confidence grows steadily. The goal is not transformation, but alignment — matching your needs with the right level of support.</p><h2>A Long-Term Perspective</h2><p>At Althea, we believe refined results come from careful listening and considered action. Our philosophy remains consistent: calm, professional care designed to support you over time. Confidence is strongest when it feels natural.</p></article><Callout/><Faq/></Shell>;
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }
  return <Shell><PageHero eyebrow="WE’RE HERE TO HELP" title="Contact Meter Surgicals." copy="Contact our team for product information, brochure-listed ranges, and customized drape packs."/><section className="clinic-contact"><form onSubmit={submit}><p className="clinic-eyebrow">SEND US A MESSAGE</p><h2>Let’s discuss<br/><i>your requirements.</i></h2><label>Your name *<input required name="name" placeholder="Your name"/></label><label>Phone number<input name="phone" type="tel" placeholder="Phone number"/></label><label>Your email *<input required name="email" type="email" placeholder="you@example.com"/></label><label>Product enquiry<textarea name="message" rows={4} placeholder="Tell us which product range you need"/></label><button className="clinic-book" type="submit">{sent ? "Message received ✓" : "Submit enquiry ↗"}</button><small>{sent ? "Thank you. Contact Meter Surgicals directly if you need a quick response." : "For direct enquiries, call +91 89254 99953 or email metersurgicals@gmail.com."}</small></form><div className="clinic-contact-aside"><div className="clinic-map">METER SURGICALS <span>Chennai, India</span></div><p className="clinic-eyebrow">VISIT OR SAY HELLO</p><h3>Meter Surgicals</h3><p><b>Email</b><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a></p><p><b>Phone</b><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a></p><p><b>Address</b>No. 3, 2/151, Brindhavan Street,<br/>Balaya Garden, Madipakkam,<br/>Chennai – 600 091, India</p></div></section><Faq/></Shell>;
}
