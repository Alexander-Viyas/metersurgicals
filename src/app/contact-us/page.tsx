import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Meter Surgicals",
  description: "Contact Meter Surgicals for product information, documentation, quotations, and partnership enquiries.",
};

const address = "Plot No. 43, Puzhuthivakkam Main Road, Puzhuthivakkam, Chennai, Tamil Nadu 600091, India";

export default function ContactPage() {
  return (
    <main className="ms-contact-page">
      <header className="ms-contact-nav">
        <Link className="ms-contact-brand" href="/" aria-label="Meter Surgicals home">
          <Image className="ms-contact-brand-logo" src="/meter/meter-surgicals-logo.png" alt="" width={40} height={40} />
          <span><b>METER SURGICALS</b><small>SAVING LIVES</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/#our-services">Products</Link>
          <Link href="/#journal-preview">Brochure</Link>
          <a className="ms-contact-nav-cta" href="#message">Request a Quote</a>
        </nav>
      </header>

      <section className="ms-contact-hero">
        <div className="ms-contact-hero-copy">
          <p className="ms-contact-eyebrow">METER SURGICALS · SAVING LIVES</p>
          <h1>Contact Us</h1>
          <span className="ms-contact-underline" />
          <p>Get in touch for products, documentation,<br className="ms-contact-desktop-break" /> or partnership enquiries.</p>
        </div>
        <div className="ms-contact-hero-art" aria-hidden="true">
          <span className="ms-contact-art-icon ms-contact-art-mail">✉</span>
          <span className="ms-contact-art-icon ms-contact-art-phone">☎</span>
          <span className="ms-contact-art-icon ms-contact-art-at">@</span>
          <span className="ms-contact-art-orbit" />
        </div>
      </section>

      <section className="ms-contact-methods" aria-label="Contact details">
        <a className="ms-contact-method" href="tel:+918925499953">
          <span className="ms-contact-method-icon">☎</span>
          <b>Phone</b>
          <span>+91 89254 99953</span>
          <span>+91 93449 91323</span>
        </a>
        <a className="ms-contact-method" href="mailto:metersurgicals@gmail.com">
          <span className="ms-contact-method-icon">✉</span>
          <b>Email</b>
          <span>metersurgicals@gmail.com</span>
        </a>
        <a className="ms-contact-method" href="https://wa.me/918925499953" target="_blank" rel="noreferrer">
          <span className="ms-contact-method-icon ms-contact-whatsapp-icon">◉</span>
          <b>WhatsApp</b>
          <span>+91 89254 99953</span>
          <span>Chat with our team</span>
        </a>
        <a className="ms-contact-method ms-contact-address" href="https://maps.google.com/?q=Plot+No+43+Puzhuthivakkam+Main+Road+Chennai+600091" target="_blank" rel="noreferrer">
          <span className="ms-contact-method-icon">⌖</span>
          <b>Our Address</b>
          <span>{address}</span>
        </a>
      </section>

      <section className="ms-contact-main" id="message">
        <div className="ms-contact-form-wrap">
          <p className="ms-contact-pill">ENQUIRE NOW</p>
          <h2>Send Us a Message</h2>
          <span className="ms-contact-underline" />
          <p className="ms-contact-form-intro">Tell us what you need and our team will be happy to help.</p>
          <ContactForm />
        </div>
        <div className="ms-contact-map-wrap">
          <iframe
            title="Map to Meter Surgicals in Puzhuthivakkam, Chennai"
            src="https://maps.google.com/maps?q=Plot%20No%2043%20Puzhuthivakkam%20Main%20Road%20Chennai%20600091&t=&z=14&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href="https://maps.google.com/?q=Plot+No+43+Puzhuthivakkam+Main+Road+Chennai+600091" target="_blank" rel="noreferrer">
            Open address in Google Maps ↗
          </a>
        </div>
      </section>

      <section className="ms-contact-chat">
        <p className="ms-contact-eyebrow">NEED A QUICK ANSWER?</p>
        <h2>Prefer to Chat?</h2>
        <p>Connect with us on WhatsApp for product queries, information, or to request samples.</p>
        <a href="https://wa.me/918925499953" target="_blank" rel="noreferrer">◉&nbsp; Chat on WhatsApp</a>
      </section>

      <footer className="ms-contact-footer">
        <Link className="ms-contact-brand" href="/">
          <Image className="ms-contact-brand-logo" src="/meter/meter-surgicals-logo.png" alt="" width={40} height={40} />
          <span><b>METER SURGICALS</b><small>SAVING LIVES</small></span>
        </Link>
        <p>Surgical drapes, procedure packs, and non-woven disposables for hospitals and operating theatres.</p>
        <div>
          <a href="tel:+918925499953">+91 89254 99953</a>
          <a href="tel:+919344991323">+91 93449 91323</a>
          <a href="mailto:metersurgicals@gmail.com">metersurgicals@gmail.com</a>
        </div>
        <small>© {new Date().getFullYear()} Meter Surgicals</small>
      </footer>
    </main>
  );
}
