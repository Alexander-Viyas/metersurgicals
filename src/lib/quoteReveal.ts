const WORDS = [
  'Incorporated', 'in', '2010,', 'Meter', 'Surgicals', 'manufactures', 'surgical',
  'disposable', 'products', 'for', 'healthcare', 'providers', 'in', 'India', 'and',
  'internationally.', 'Our', 'range', 'includes', 'surgical', 'drapes', 'and', 'kits,',
  'surgeon', 'gowns,', 'disposable', 'bed', 'sheets,', 'sterilization', 'wrapping',
  'sheets,', 'and', 'other', 'non-woven', 'disposables', 'for', 'hospitals', 'and',
  'operating', 'theatres.'
];

export function initQuoteReveal(quoteContainer: HTMLElement): () => void {
  // Clear any existing contents and build dedicated sticky runway
  quoteContainer.style.overflow = "visible";
  quoteContainer.style.height = "auto";
  quoteContainer.style.padding = "0";
  quoteContainer.style.position = "relative";
  quoteContainer.innerHTML = "";

  const runway = document.createElement("div");
  runway.id = "quote-scroll-runway";
  runway.style.position = "relative";
  runway.style.width = "100%";
  runway.style.maxWidth = "100%";
  runway.style.overflow = "visible";
  // 2600px runway for smooth, responsive, readable scrolling
  runway.style.height = "calc(100vh + 2600px)";

  const sticky = document.createElement("div");
  sticky.id = "quote-sticky-viewport";
  sticky.style.position = "sticky";
  sticky.style.top = "0";
  sticky.style.width = "100%";
  sticky.style.height = "100vh";
  sticky.style.display = "flex";
  sticky.style.alignItems = "center";
  sticky.style.justifyContent = "center";
  sticky.style.overflow = "hidden";
  sticky.style.padding = "0 24px";

  // Concentric circular ripple rings matching reference site
  const ringsWrap = document.createElement("div");
  ringsWrap.style.position = "absolute";
  ringsWrap.style.top = "50%";
  ringsWrap.style.left = "50%";
  ringsWrap.style.transform = "translate(-50%, -50%)";
  ringsWrap.style.width = "1800px";
  ringsWrap.style.height = "1800px";
  ringsWrap.style.pointerEvents = "none";
  ringsWrap.style.zIndex = "0";
  ringsWrap.style.opacity = "0.55";

  [320, 540, 780, 1040, 1320, 1600].forEach((diam) => {
    const ring = document.createElement("div");
    ring.style.position = "absolute";
    ring.style.top = "50%";
    ring.style.left = "50%";
    ring.style.transform = "translate(-50%, -50%)";
    ring.style.width = `${diam}px`;
    ring.style.height = `${diam}px`;
    ring.style.borderRadius = "50%";
    ring.style.border = "1px solid rgba(200, 215, 235, 0.65)";
    ring.style.boxShadow = "0 0 45px rgba(214, 222, 240, 0.22)";
    ringsWrap.appendChild(ring);
  });
  sticky.appendChild(ringsWrap);

  // Quote content stage
  const stage = document.createElement("div");
  stage.style.width = "100%";
  stage.style.maxWidth = "960px";
  stage.style.margin = "0 auto";
  stage.style.textAlign = "center";
  stage.style.position = "relative";
  stage.style.zIndex = "2";

  const heading = document.createElement("h5");
  heading.style.fontFamily = '"Instrument Serif", "Instrument Serif Placeholder", serif';
  heading.style.fontSize = "clamp(34px, 4.4vw, 48px)";
  heading.style.fontStyle = "normal";
  heading.style.fontWeight = "400";
  heading.style.letterSpacing = "0em";
  heading.style.lineHeight = "135%";
  heading.style.textAlign = "center";
  heading.style.margin = "0";
  heading.style.padding = "0";
  heading.style.width = "100%";
  heading.style.wordWrap = "break-word";
  heading.style.overflowWrap = "break-word";

  const spans: HTMLSpanElement[] = [];

  WORDS.forEach((word) => {
    const s = document.createElement("span");
    s.textContent = word;
    s.style.color = "rgb(35, 38, 45)";
    s.style.display = "inline-block";
    s.style.marginRight = "0";
    s.style.opacity = "0.15";
    s.style.filter = "blur(5px)";
    s.style.transform = "translateY(5px)";
    s.style.transition = "opacity 0.18s ease-out, filter 0.18s ease-out, transform 0.18s ease-out";
    s.style.willChange = "opacity, filter, transform";
    heading.appendChild(s);
    if (word !== WORDS[WORDS.length - 1]) heading.appendChild(document.createTextNode(" "));
    spans.push(s);
  });
  const eyebrow = document.createElement("p");
  eyebrow.textContent = "About Meter Surgicals";
  eyebrow.style.fontFamily = '"Inter Display", sans-serif';
  eyebrow.style.fontSize = "12px";
  eyebrow.style.letterSpacing = ".14em";
  eyebrow.style.textTransform = "uppercase";
  eyebrow.style.color = "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c)";
  eyebrow.style.margin = "0 0 20px";
  stage.appendChild(eyebrow);

  const title = document.createElement("h2");
  title.textContent = "Surgical essentials. A focused purpose.";
  title.style.fontFamily = '"Instrument Serif", Georgia, serif';
  title.style.fontSize = "clamp(38px, 6vw, 72px)";
  title.style.fontWeight = "400";
  title.style.lineHeight = "1.02";
  title.style.letterSpacing = "-.03em";
  title.style.margin = "0 0 24px";
  title.style.color = "rgb(35, 38, 45)";
  stage.appendChild(title);
  stage.appendChild(heading);

  const purpose = document.createElement("p");
  purpose.textContent = "Our purpose is to support quality, hygiene, and infection-control practices in surgical environments through disposable surgical-care products.";
  purpose.style.fontFamily = '"Inter Display", sans-serif';
  purpose.style.fontSize = "15px";
  purpose.style.lineHeight = "1.7";
  purpose.style.maxWidth = "720px";
  purpose.style.margin = "30px auto 0";
  purpose.style.opacity = "0";
  purpose.style.transition = "opacity 0.4s ease-out";
  stage.appendChild(purpose);

  // Company attribution
  const founder = document.createElement("div");
  founder.style.marginTop = "32px";
  founder.style.opacity = "0";
  founder.style.transform = "translateY(12px)";
  founder.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";

  const founderP = document.createElement("p");
  founderP.textContent = "Meter Surgicals";
  founderP.style.fontFamily = '"Inter Display", "Inter Display Placeholder", sans-serif';
  founderP.style.fontSize = "15px";
  founderP.style.fontWeight = "400";
  founderP.style.letterSpacing = "0em";
  founderP.style.lineHeight = "1.2em";
  founderP.style.textAlign = "center";
  founderP.style.color = "var(--token-a60debed-6b2e-4b06-b20d-076991233c4c, rgb(119, 123, 137))";
  founderP.style.margin = "0";
  founder.appendChild(founderP);
  stage.appendChild(founder);

  const aboutLink = document.createElement("a");
  aboutLink.href = "/about";
  aboutLink.textContent = "About Our Company";
  aboutLink.style.display = "inline-block";
  aboutLink.style.marginTop = "20px";
  aboutLink.style.padding = "13px 22px";
  aboutLink.style.borderRadius = "999px";
  aboutLink.style.background = "#34364a";
  aboutLink.style.color = "#fff";
  aboutLink.style.fontFamily = '"Inter Display", sans-serif';
  aboutLink.style.fontSize = "13px";
  aboutLink.style.textDecoration = "none";
  aboutLink.style.opacity = "0";
  aboutLink.style.transition = "opacity 0.4s ease-out";
  stage.appendChild(aboutLink);

  sticky.appendChild(stage);
  runway.appendChild(sticky);
  quoteContainer.appendChild(runway);

  // Active continuous progress tracking with lerp
  const totalWords = spans.length;
  let targetProgress = 0;
  let currentProgress = 0;
  let animId: number;

  const updateWords = (p: number) => {
    const startRange = 0.0;
    const endRange = 0.88;
    const fadeWindow = 0.045;

    spans.forEach((span, i) => {
      const threshold = startRange + (i / totalWords) * (endRange - startRange);

      if (p >= threshold + fadeWindow) {
        span.style.opacity = "1";
        span.style.filter = "none";
        span.style.transform = "translateY(0px)";
      } else if (p > threshold) {
        const t = (p - threshold) / fadeWindow;
        span.style.opacity = (0.15 + t * 0.85).toFixed(3);
        const blur = (1 - t) * 5;
        span.style.filter = `blur(${blur.toFixed(1)}px)`;
        const ty = (1 - t) * 5;
        span.style.transform = `translateY(${ty.toFixed(1)}px)`;
      } else {
        span.style.opacity = "0.15";
        span.style.filter = "blur(5px)";
        span.style.transform = "translateY(5px)";
      }
    });

    if (p >= 0.88) {
      const ft = Math.min(1, (p - 0.88) / 0.1);
      founder.style.opacity = ft.toFixed(3);
      founder.style.transform = `translateY(${((1 - ft) * 12).toFixed(1)}px)`;
      purpose.style.opacity = ft.toFixed(3);
      aboutLink.style.opacity = ft.toFixed(3);
    } else {
      founder.style.opacity = "0";
      founder.style.transform = "translateY(12px)";
      purpose.style.opacity = "0";
      aboutLink.style.opacity = "0";
    }
  };

  const measure = () => {
    const rect = runway.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDist = runway.offsetHeight - windowHeight;
    if (totalDist <= 0) return;

    // Scrolled distance into runway
    const scrolled = -rect.top;
    targetProgress = Math.min(1, Math.max(0, scrolled / totalDist));
  };

  const loop = () => {
    animId = requestAnimationFrame(loop);
    measure();

    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.001) {
      currentProgress += diff * 0.2;
      updateWords(currentProgress);
    }
  };

  measure();
  currentProgress = targetProgress;
  updateWords(currentProgress);
  animId = requestAnimationFrame(loop);

  window.addEventListener("scroll", measure, { passive: true });
  document.addEventListener("scroll", measure, { passive: true });

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener("scroll", measure);
    document.removeEventListener("scroll", measure);
  };
}
