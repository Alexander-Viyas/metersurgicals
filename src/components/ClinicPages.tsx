"use client";

import { FormEvent, useMemo, useState } from "react";

const articles = [
  { category: "Surgery Drapes", title: "General Surgery Drapes", summary: "General, mini, universal, HB SAG, and HIV protection drape packs. Customer-specific packs can be requested.", image: "/meter/general-drape-pack.jpg" },
  { category: "Surgery Drapes", title: "Gynecology Surgery Drapes", summary: "LSCS, delivery, DNC, Hystro Lap, perineal drape kits, and maternity mats. Customisation is available on request.", image: "/meter/gynecology-drapes.jpg" },
  { category: "Surgery Drapes", title: "Orthopedic Surgery Drapes", summary: "Ortho packs, knee and hip drapes, arthroscopy, TKR, THR, and shoulder arthroscopy packs.", image: "/meter/orthopedic-drapes.jpg" },
  { category: "Other Products", title: "Sterilization Wrapping Sheets", summary: "SMS sheets in 50, 60, 75, and 90 cm sizes; custom sizes and 43/50 GSM options.", image: "/meter/sterilization-sheets.jpg" },
  { category: "Other Products", title: "Other Surgery Drapes", summary: "CABG, Angio, LAVH, renal transplant, cystoscopy, IVF, urology, neurology, laparoscopy, PCNL, and TURP drapes.", image: "/meter/other-drapes.jpg" },
];

const faq = [
  ["Which product ranges are available?", "The brochure lists general, gynecology, orthopedic and other surgery drapes, sterilization wrapping sheets, and medical and surgical disposables."],
  ["Can packs be customized?", "Selected drape packs and kits can be customized as per customer request. Contact Meter Surgicals to discuss your requirements."],
  ["What sizes are listed for wrapping sheets?", "The brochure lists 50 x 50 cm, 60 x 60 cm, 75 x 75 cm, and 90 x 90 cm. Customized sizes use 43/50 GSM SMS fabric, in packs of 25 or 50."],
  ["How do I request product details?", "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com."],
];

function Header() {
  return <header className="clinic-header"><a className="clinic-logo" href="/">Meter Surgicals</a><nav><a href="/about">About</a><a href="/products">Products</a><a href="/brochure">Brochure</a><a href="/contact">Contact</a></nav><a className="clinic-book" href="/contact">Request a Quote <span>â†—</span></a></header>;
}

function Footer() {
  return <footer className="clinic-footer"><div><a className="clinic-logo" href="/">Meter Surgicals</a><p>Saving Lives</p><p>Surgical drapes and non-woven disposables for hospitals and operating theatres.</p></div><div><small>EXPLORE</small><a href="/about">About</a><a href="/products">Products</a><a href="/brochure">Brochure</a><a href="/contact">Contact</a></div><div><small>GET IN TOUCH</small><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a><p>No 3. 2/151, Brindhavan Street,<br/>Balaya Garden, Madipakkam,<br/>Chennai - 600 091</p></div><p className="clinic-copyright">Copyright {new Date().getFullYear()} Meter Surgicals. Saving Lives.</p></footer>;
}

function Shell({ children }: { children: React.ReactNode }) { return <main className="clinic-pages"><Header />{children}<Footer /></main>; }

function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="clinic-page-hero"><p className="clinic-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="clinic-lede">{copy}</p></section>;
}

function Faq() {
  const [open, setOpen] = useState(-1);
  return <section className="clinic-faq"><h2>Product<br/><i>enquiries</i></h2><div>{faq.map(([q, a], i) => <div key={i} className={open === i ? "open" : ""}><button onClick={() => setOpen(open === i ? -1 : i)}>{q}</button>{open === i && <p>{a}</p>}</div>)}</div></section>;
}

function Callout() { return <section className="clinic-callout"><p className="clinic-eyebrow">METER SURGICALS - SAVING LIVES</p><h2>Let's discuss<br/><i>your requirements.</i></h2><p>Share your procedure and product requirements with Meter Surgicals.</p><a className="clinic-book" href="/contact">Discuss Your Requirements</a></section>; }

const services = [
  ["Sterilization Wrapping Sheets", "SMS wrapping sheets for sterilization in standard and customized sizes.", "Available in 50 Ã— 50, 60 Ã— 60, 75 Ã— 75, and 90 Ã— 90 cm sizes.", "43/50 GSM SMS fabric; packs of 25 or 50; custom sizes can be requested."],
  ["General Surgery Drapes", "Drape packs and kits for general surgical procedures.", "General, Mini, Universal, HB SAG, and HIV Protection Drape Kits.", "Customer-specific packs can be customized on request."],
  ["Gynecology Surgery Drapes", "Procedure packs and kits for gynecology and maternity care.", "LSCS, Delivery, DNC, Hystro Lap, Perineal Drape Kits, and Maternity Mat.", "Customization is available on request."],
  ["Orthopedic Surgery Drapes", "Drape packs for orthopedic and arthroscopy procedures.", "Ortho packs with 5 or 3 gowns; Knee O, Hip U, Knee Arthroscopy, TKR, THR, and Shoulder Arthroscopy.", "Customer-specific options can be discussed with Meter Surgicals."],
  ["Other Surgery Drapes", "Specialty packs for a broad range of surgical procedures.", "CABG, Angio, LAVH, Renal Transplant, Cystoscopy, IVF, Urology, Neurology, Laparoscopy, PCNL, and TURP drapes.", "The brochure lists additional customized drape packs on request."],
];

export function ServicesPage() {
  const [expanded, setExpanded] = useState(0);
  return <Shell><PageHero eyebrow="METER SURGICALS Â· PRODUCT CATALOG" title="Surgical drapes & products." copy="Browse surgical drapes, procedure kits, sterilization wrapping sheets, and other non-woven disposables featured in our brochure."/><section className="clinic-services">{services.map(([title, copy, result, treatments], i)=><article className="clinic-service-row" id={`product-${i}`} key={title}><div className={`clinic-photo service-photo service-${i}`}/><div><p className="clinic-eyebrow">0{i+1} / PRODUCT RANGE</p><h2>{title}</h2><p>{copy}</p><button className="clinic-text-button" onClick={()=>setExpanded(expanded === i ? -1 : i)}>{expanded === i ? "Show less âˆ’" : "Show product details +"}</button>{expanded === i && <div className="clinic-service-detail"><b>Products listed</b><p>{result}</p><b>Options</b><p>{treatments}</p><a href="/contact">Ask about this range â†—</a></div>}</div></article>)}</section><Callout/><Faq/></Shell>;
}

export function JournalPage() {
  const [search, setSearch] = useState(""); const [category, setCategory] = useState("All topics");
  const filtered = useMemo(()=>articles.filter(a=>(category === "All topics" || a.category === category) && `${a.title} ${a.summary}`.toLowerCase().includes(search.toLowerCase())),[search,category]);
  return <Shell><PageHero eyebrow="METER SURGICALS Â· BROCHURE" title="Product catalog." copy="Browse the brochureâ€™s surgical drapes, procedure packs, sterilization wrapping sheets, and medical disposables."/><section className="clinic-journal"><div className="journal-controls"><label><span>âŒ•</span><input aria-label="Search products" placeholder="Search productsâ€¦" value={search} onChange={e=>setSearch(e.target.value)}/></label><select aria-label="Filter by product type" value={category} onChange={e=>setCategory(e.target.value)}><option>All topics</option><option>Surgery Drapes</option><option>Other Products</option></select></div><div className="clinic-article-grid">{filtered.map((a,i)=><article className="clinic-article" key={a.title}><div className="clinic-article-image" style={{backgroundImage:`url("${a.image}")`}}/><p className="clinic-eyebrow">{a.category}</p><h2>{a.title}</h2><p>{a.summary}</p><a href={`/products#product-${i}`}>View product details <span>â†—</span></a></article>)}</div>{filtered.length === 0 && <p className="journal-empty">No products match that search. Try another term.</p>}</section><a className="clinic-article" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">Open the full brochure <span>â†—</span></a><Callout/></Shell>;
}



export function AboutPage() {
  return <Shell><PageHero eyebrow="ABOUT METER SURGICALS" title="Surgical essentials. A focused purpose." copy="Incorporated in 2010, Meter Surgicals manufactures surgical disposable products for healthcare providers in India and internationally. Our range includes surgical drapes and kits, surgeon gowns, disposable bed sheets, sterilization wrapping sheets, and other non-woven disposables for hospitals and operating theatres."/><section className="clinic-callout"><p className="clinic-eyebrow">OUR VISION</p><h2>Quality, hygiene<br/><i>and infection control.</i></h2><p>To enhance the standard of quality, hygiene, and infection control in surgical environments by providing high-quality disposable surgical-care products.</p><p>Meter Surgicals</p><a className="clinic-book" href="/products">Explore Products</a></section></Shell>;
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }
  return <Shell><PageHero eyebrow="CONTACT METER SURGICALS" title="Discuss your product requirements." copy="Contact our team about product selection, customer-specific packs, listed specifications, and quotations."/><section className="clinic-contact"><form onSubmit={submit}><p className="clinic-eyebrow">PRODUCT ENQUIRY</p><h2>Tell us what<br/><i>your team needs.</i></h2><label>Your name *<input required name="name" placeholder="Your name"/></label><label>Phone number<input name="phone" type="tel" placeholder="+91"/></label><label>Your email *<input required name="email" type="email" placeholder="metersurgicals@gmail.com"/></label><label>Product enquiry<textarea name="message" rows={4} placeholder="Procedure, product type, quantity, size, or pack preferences"/></label><button className="clinic-book" type="submit">{sent ? "Enquiry prepared" : "Request a Quote ↗"}</button><small>{sent ? "Call +91 89254 99953 or email metersurgicals@gmail.com to send your enquiry." : "Call +91 89254 99953 or +91 93449 91323, or email metersurgicals@gmail.com."}</small></form><div className="clinic-contact-aside"><div className="clinic-map">METER SURGICALS <span>Chennai, India</span></div><p className="clinic-eyebrow">CONTACT DETAILS</p><h3>Meter Surgicals</h3><p><b>Email</b><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a></p><p><b>Phone</b><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a></p><p><b>Address</b>No 3. 2/151, Brindhavan Street,<br/>Balaya Garden, Madipakkam,<br/>Chennai – 600 091</p></div></section><Faq/></Shell>;
}

export const BrochurePage = JournalPage;
