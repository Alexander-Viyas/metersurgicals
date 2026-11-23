"use client";

import type { FormEvent } from "react";

export default function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Product enquiry: ${String(formData.get("product") || "General")}`;
    const body = [
      `Name: ${String(formData.get("name") ?? "")}`,
      `Company / Hospital: ${String(formData.get("company") ?? "")}`,
      `Email: ${String(formData.get("email") ?? "")}`,
      `Phone / WhatsApp: ${String(formData.get("phone") ?? "")}`,
      `Country: ${String(formData.get("country") ?? "")}`,
      `Product of interest: ${String(formData.get("product") ?? "")}`,
      "",
      "Message:",
      String(formData.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:metersurgicals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="ms-contact-form" onSubmit={handleSubmit}>
      <div className="ms-contact-form-grid">
        <label>
          Full name *
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Company / Hospital
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          Email address *
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Phone / WhatsApp
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label>
          Country
          <select name="country" defaultValue="">
            <option value="">Select country</option>
            <option>India</option>
            <option>United Arab Emirates</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Product of interest
          <select name="product" defaultValue="">
            <option value="">Select product</option>
            <option>General surgery drapes</option>
            <option>Gynecology surgery drapes</option>
            <option>Orthopedic surgery drapes</option>
            <option>Other surgery drapes</option>
            <option>Medical and surgical disposables</option>
            <option>Product Code MSGS01</option>
            <option>Ortho Pack A-1</option>
          </select>
        </label>
        <label className="ms-contact-message">
          Message *
          <textarea name="message" rows={5} required />
        </label>
      </div>
      <button type="submit">Send message</button>
      <small>Your email app will open with your enquiry details ready to send.</small>
    </form>
  );
}
