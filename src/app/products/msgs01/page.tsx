import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Code MSGS01 | Meter Surgicals",
  description: "Product details and pack image for Meter Surgicals Product Code MSGS01, General Surgery Kit.",
};

export default function Msgs01Page() {
  return (
    <main className="meter-pack-page">
      <div className="meter-pack-page-inner">
        <a className="meter-pack-back" href="/">← Back to product brochure</a>
        <header className="meter-pack-header">
          <p className="meter-eyebrow">METER SURGICALS · PRODUCT DETAILS</p>
          <h1>Product Code MSGS01</h1>
          <p>General Surgery Kit</p>
        </header>
        <section className="meter-pack-images" aria-label="Product pack images">
          <figure className="meter-pack-image-card">
            <Image
              src="/meter/product-code-msgs01.jpg"
              alt="Meter Surgicals Product Code MSGS01 general surgery kit pack sheet"
              width={361}
              height={508}
            />
            <figcaption>Product Code MSGS01 · General Surgery Kit</figcaption>
          </figure>
        </section>
      </div>
    </main>
  );
}
