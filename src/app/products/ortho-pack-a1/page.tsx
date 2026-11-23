import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ortho Pack A-1 | Meter Surgicals",
  description: "Product details and pack image for Meter Surgicals Ortho Pack A-1.",
};

export default function OrthoPackA1Page() {
  return (
    <main className="meter-pack-page">
      <div className="meter-pack-page-inner">
        <a className="meter-pack-back" href="/">← Back to product brochure</a>
        <header className="meter-pack-header">
          <p className="meter-eyebrow">METER SURGICALS · PRODUCT DETAILS</p>
          <h1>Ortho Pack A-1</h1>
        </header>
        <section className="meter-pack-images" aria-label="Ortho Pack A-1 image">
          <figure className="meter-pack-image-card">
            <Image
              src="/meter/ortho-pack-a1.jpg"
              alt="Meter Surgicals Ortho Pack A-1 pack sheet"
              width={477}
              height={618}
            />
            <figcaption>Ortho Pack A-1</figcaption>
          </figure>
        </section>
      </div>
    </main>
  );
}
