"use client";

import Image from "next/image";
import { useRef } from "react";

type ProductCategory = {
  title: string;
  image: string;
  summary: string;
  products: string[];
  customizable?: boolean;
};

const categories: ProductCategory[] = [
  {
    title: "Sterilization Wrapping Sheets",
    image: "/meter/sterilization-sheets.jpg",
    summary: "SMS wrapping sheets in standard and customized sizes.",
    products: ["50 × 50 cm", "60 × 60 cm", "75 × 75 cm", "90 × 90 cm", "Custom sizes; 43/50 GSM SMS fabric; packs of 25 or 50"],
  },
  {
    title: "General Surgery Drapes",
    image: "/meter/general-drape-pack.jpg",
    summary: "Drape packs and kits for general surgical procedures.",
    products: ["General Surgical Drape Pack", "Mini Drape Pack", "Universal Drape Pack", "HB SAG Drape Pack", "HIV Protection Drape Kit"],
    customizable: true,
  },
  {
    title: "Gynecology Surgery Drapes",
    image: "/meter/gynecology-drapes.jpg",
    summary: "Procedure packs and kits for gynecology and maternity care.",
    products: ["LSCS Drape Pack", "Delivery Drape Pack", "DNC Drape Kit", "Hystro Lap Pouch", "Perineal Drape Kit", "Maternity Mat"],
    customizable: true,
  },
  {
    title: "Orthopedic Surgery Drapes",
    image: "/meter/orthopedic-drapes.jpg",
    summary: "Drape packs for orthopedic and arthroscopy procedures.",
    products: ["Ortho Drape Pack (5-gown and 3-gown options)", "Knee O Drape", "Hip U Drape", "Knee Arthroscopy", "TKR and THR Drape Packs", "Shoulder Arthroscopy"],
    customizable: true,
  },
  {
    title: "Other Surgery Drapes",
    image: "/meter/other-drapes.jpg",
    summary: "Specialty packs for a broad range of surgical procedures.",
    products: ["CABG and Angio Drape Packs", "LAVH and Renal Transplant Packs", "Cystoscopy and Embryo Transplant Packs", "Egg Collection and Urology Drape Packs", "IVF and OCR-ET Packs", "Neurology and Laparoscopy Drape Packs", "PCNL Drape", "TURP Drape"],
    customizable: true,
  },
];

const disposables = ["Large Sheet", "Center Hole Sheet", "Mayo Cover", "C-Arm Cover", "Leggings", "Camera Cover", "Shoe Cover", "Trolley Sheet", "Apron", "Under Pad"];

function BrandMark() {
  return <svg className="meter-mark" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="24"/><path d="M27 43 10.6 27.2a9.3 9.3 0 0 1 13.1-13.1L27 17.4l3.3-3.3a9.3 9.3 0 0 1 13.1 13.1L27 43Z"/></svg>;
}

function Header() {
  return <header className="meter-header"><a className="meter-brand" href="/"><BrandMark/><span><b>METER SURGICALS</b><small>SAVING LIVES</small></span></a><nav aria-label="Main navigation"><a href="/services">Products</a><a href="/about">About</a><a href="/contact">Contact</a></nav><a className="meter-header-cta" href="/contact">Talk to our team <span>↗</span></a></header>;
}

function Footer() {
  return <footer className="meter-footer"><a className="meter-brand" href="/"><BrandMark/><span><b>METER SURGICALS</b><small>SAVING LIVES</small></span></a><p>Surgical disposables for hospitals and operating theatres.</p><div className="meter-footer-contact"><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a></div><small className="meter-copyright">© {new Date().getFullYear()} Meter Surgicals</small></footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="meter-site"><Header/>{children}<Footer/></div>;
}

function ProductCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => track.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  return <section className="meter-product-carousel" id="product-range"><div className="meter-section-heading"><div><p className="meter-eyebrow">THE PRODUCT RANGE</p><h2>Made for the<br/><i>work that matters.</i></h2></div><div className="meter-carousel-controls"><button type="button" aria-label="Previous product categories" onClick={()=>scroll(-1)}>←</button><button type="button" aria-label="Next product categories" onClick={()=>scroll(1)}>→</button></div></div><div className="meter-carousel-track" ref={track}>{categories.map((cat,index)=><a className="meter-range-card" href={`/services#category-${index}`} key={cat.title}><div className="meter-range-image"><Image src={cat.image} alt="" width={360} height={250}/><span>0{index+1}</span></div><div className="meter-range-copy"><h3>{cat.title}</h3><p>{cat.summary}</p><span className="meter-arrow">Explore range ↗</span></div></a>)}</div><div className="meter-carousel-foot"><span>01—05</span><span>Swipe or use the arrows to explore our product categories</span></div></section>;
}

function ContactStrip() {
  return <section className="meter-contact-strip"><div><p className="meter-eyebrow">LET’S TALK PRODUCTS</p><h2>Need a product list<br/><i>or a custom pack?</i></h2><p>Contact our team to discuss product details and customer-specific requirements.</p><a className="meter-button meter-button-light" href="/contact">Contact Meter Surgicals <span>↗</span></a></div><div className="meter-contact-details"><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a></div></section>;
}

export function MeterHome() {
  return <Shell><main>
    <section className="meter-hero"><Image className="meter-hero-photo" src="/meter/meter-hero-team.jpg" alt="Surgical team in an operating theatre" fill priority sizes="100vw"/><div className="meter-hero-shade"/><div className="meter-hero-content"><p className="meter-eyebrow">CE-CERTIFIED SURGICAL DISPOSABLES · EST. 2010</p><h1>Surgical drapes<br/>for <i>every procedure.</i></h1><p>Meter Surgicals supplies surgical drapes, procedure packs, wrapping sheets, and non-woven disposables for healthcare providers.</p><div className="meter-hero-actions"><a className="meter-button" href="/services">Explore products <span>↗</span></a><a className="meter-hero-secondary" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">View product brochure ↓</a></div></div><div className="meter-hero-caption"><span>01 / 03</span><span>Meter Surgicals · Saving Lives</span></div></section>
    <ProductCarousel/>
    <section className="meter-intro"><div className="meter-intro-image"><Image src="/meter/other-drapes.jpg" alt="Surgical drape being used by a clinical team" width={360} height={265}/><span className="meter-image-note">Designed around procedure needs</span></div><div className="meter-intro-copy"><p className="meter-eyebrow">WHO WE ARE</p><h2>Committed to quality,<br/><i>hygiene and care.</i></h2><p>Established in 2010, Meter Surgicals is a CE-certified surgical disposables manufacturer serving healthcare providers in India and around the world.</p><p>The product range includes drapes and kits for general and specialty surgery, surgeon gowns, disposable bed sheets, sterilization wrapping sheets, and other non-woven products used in hospitals and operating theatres.</p><a className="meter-text-link" href="/about">Learn about Meter Surgicals <span>↗</span></a></div></section>
    <section className="meter-disposables"><div className="meter-disposables-copy"><p className="meter-eyebrow">MORE FOR THE OPERATING ROOM</p><h2>Everyday<br/><i>essentials.</i></h2><p>The brochure also features a range of medical and surgical disposables.</p><a className="meter-text-link" href="/services#other-disposables">View all products <span>↗</span></a></div><Image src="/meter/surgical-disposables.jpg" alt="Selection of medical and surgical disposable products from the brochure" width={820} height={380}/></section>
    <section className="meter-brochure"><div><p className="meter-eyebrow">METER SURGICALS · SAVING LIVES</p><h2>Explore the<br/><i>product catalog.</i></h2><p>See the product categories and options featured in our brochure.</p></div><a className="meter-button" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">Open brochure PDF <span>↗</span></a></section>
    <ContactStrip/>
  </main></Shell>;
}

export function ProductsPage() {
  return <Shell><main className="meter-inner-page"><section className="meter-page-hero"><p className="meter-eyebrow">METER SURGICALS · PRODUCT CATALOG</p><h1>Surgical drapes<br/><i>& procedure packs.</i></h1><p>Browse the drape packs, kits, sterilization sheets, and other disposables featured in the Meter Surgicals brochure.</p><a className="meter-button" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">Download brochure <span>↗</span></a></section><div className="meter-product-list">{categories.map((cat,index)=><section className="meter-product-section" id={`category-${index}`} key={cat.title}><div className="meter-product-visual"><Image src={cat.image} alt="" width={360} height={250}/><span>0{index+1}</span></div><div className="meter-product-info"><p className="meter-eyebrow">PRODUCT CATEGORY 0{index+1}</p><h2>{cat.title}</h2><p>{cat.summary}</p><ul>{cat.products.map(item=><li key={item}>{item}</li>)}</ul>{cat.customizable&&<p className="meter-custom-note">Customisation available on request, as noted in the brochure.</p>}<a className="meter-text-link" href={`/contact?product=${encodeURIComponent(cat.title)}`}>Ask about this range <span>↗</span></a></div></section>)}</div><section className="meter-other-products" id="other-disposables"><p className="meter-eyebrow">OTHER MEDICAL & SURGICAL DISPOSABLES</p><h2>Additional products<br/><i>in the brochure.</i></h2><Image src="/meter/surgical-disposables.jpg" alt="Medical and surgical disposable product lineup" width={820} height={380}/><div className="meter-disposable-grid">{disposables.map((item,i)=><div key={item}><span>0{i+1}</span><b>{item}</b></div>)}</div></section><ContactStrip/></main></Shell>;
}

export function AboutMeterPage() {
  return <Shell><main className="meter-inner-page"><section className="meter-page-hero"><p className="meter-eyebrow">ABOUT METER SURGICALS</p><h1>Saving lives<br/><i>since 2010.</i></h1><p>Meter Surgicals is a CE-certified surgical disposables manufacturer serving healthcare providers in India and globally.</p></section><section className="meter-about-story"><Image src="/meter/meter-hero-team.jpg" alt="Surgical team in an operating theatre" width={893} height={680}/><div><p className="meter-eyebrow">OUR COMPANY</p><h2>Quality, hygiene<br/>and infection control.</h2><p>Incorporated in 2010, Meter Surgicals set out to support the standards of quality, hygiene, and infection control in surgical environments by supplying high-quality disposable surgical care products.</p><p>The brochure describes a full range of surgical disposable drapes and kits, general and specialty surgery drapes, surgeon gowns, disposable bed sheets, sterilization wrapping sheets, and other non-woven disposables for hospitals and operating theatres.</p><a className="meter-button" href="/meter/meter-surgicals-drapes.pdf" target="_blank" rel="noreferrer">Read our brochure <span>↗</span></a></div></section><section className="meter-facts"><div><b>2010</b><span>Incorporated</span></div><div><b>CE</b><span>Certified manufacturer, as stated in the brochure</span></div><div><b>India + Global</b><span>Healthcare providers served</span></div></section><ContactStrip/></main></Shell>;
}

export function ContactMeterPage() {
  return <Shell><main className="meter-inner-page"><section className="meter-page-hero"><p className="meter-eyebrow">CONTACT METER SURGICALS</p><h1>Let’s discuss<br/><i>your requirements.</i></h1><p>Contact our team about product information, brochure-listed ranges, and customer-specific packs.</p></section><section className="meter-contact-page"><div className="meter-contact-card"><span className="meter-contact-icon">☎</span><p className="meter-eyebrow">CALL OUR TEAM</p><a href="tel:+918925499953">+91 89254 99953</a><a href="tel:+919344991323">+91 93449 91323</a></div><div className="meter-contact-card"><span className="meter-contact-icon">✉</span><p className="meter-eyebrow">EMAIL</p><a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a></div><div className="meter-contact-card meter-address"><span className="meter-contact-icon">⌖</span><p className="meter-eyebrow">VISIT</p><p>No. 3, 2/151, Brindhavan Street,<br/>Balaya Garden, Madipakkam,<br/>Chennai – 600 091, India</p></div></section><section className="meter-contact-band"><div><p className="meter-eyebrow">PRODUCT DETAILS</p><h2>Need a customized<br/><i>product pack?</i></h2><p>Contact us directly to discuss a customer-specific requirement.</p></div><a className="meter-button" href="mailto:metersurgicals@gmail.com?subject=Meter%20Surgicals%20Product%20Enquiry">Email Meter Surgicals <span>↗</span></a></section></main></Shell>;
}
