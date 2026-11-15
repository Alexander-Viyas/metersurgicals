/**
 * ScrollQuoteAnimation:
 * Handles the word-by-word fade-in reveal as user scrolls down the Quote section.
 * Replicates the reference site behavior (Attachment 2).
 */
export function initScrollQuote(): () => void {
  // Find all quote containers across responsive variants
  const quoteSection = document.querySelector<HTMLElement>('#quote, [data-framer-name="Quote"]');
  if (!quoteSection) return () => {};

  // Find the sticky scroll track (Desktop: height: calc(100vh + 1200px))
  const stickyTrack = quoteSection.querySelector<HTMLElement>(
    'div[style*="calc(100vh + 1200px)"], div[style*="calc(100vh + 1400px)"]'
  );

  // Find all word spans inside all variants
  const allWordSpans = quoteSection.querySelectorAll<HTMLElement>("h5 span");
  const allAuthorCredits = quoteSection.querySelectorAll<HTMLElement>("div[style*='margin-top']");

  // Initial state: dim all words and author credits
  allWordSpans.forEach((span) => {
    span.style.opacity = "0.16";
    span.style.filter = "blur(0.5px)";
    span.style.transition = "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease";
    span.style.willChange = "opacity, filter";
  });

  allAuthorCredits.forEach((credit) => {
    credit.style.opacity = "0.16";
    credit.style.transform = "translateY(10px)";
    credit.style.transition = "opacity 0.35s ease, transform 0.35s ease";
  });

  let ticking = false;

  const updateScroll = () => {
    ticking = false;

    // 1. DESKTOP STICKY SCROLL TRACK
    if (stickyTrack && stickyTrack.offsetParent !== null) {
      const rect = stickyTrack.getBoundingClientRect();
      const totalScrollDist = stickyTrack.offsetHeight - window.innerHeight;

      if (totalScrollDist > 0) {
        const scrolled = -rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollDist));

        // Get word spans specific to this sticky container
        const spans = stickyTrack.querySelectorAll<HTMLElement>("h5 span");
        const author = stickyTrack.querySelector<HTMLElement>("div[style*='margin-top']");
        const total = spans.length;

        // Sequence: start revealing at 4% scroll, complete by 86%
        const startRange = 0.04;
        const endRange = 0.86;

        spans.forEach((span, i) => {
          const threshold = startRange + (i / total) * (endRange - startRange);
          const isLit = progress >= threshold;

          // Continuous micro-fade for ultra-smooth transition
          const fadeWindow = 0.018;
          if (progress < threshold) {
            span.style.opacity = "0.16";
            span.style.filter = "blur(0.5px)";
          } else if (progress >= threshold + fadeWindow) {
            span.style.opacity = "1";
            span.style.filter = "none";
          } else {
            const frac = (progress - threshold) / fadeWindow;
            span.style.opacity = (0.16 + 0.84 * frac).toFixed(3);
            span.style.filter = frac > 0.5 ? "none" : "blur(0.3px)";
          }
        });

        // Author credit reveal after quote is fully read
        if (author) {
          if (progress >= 0.86) {
            const authorFrac = Math.min(1, (progress - 0.86) / 0.08);
            author.style.opacity = (0.16 + 0.84 * authorFrac).toFixed(3);
            author.style.transform = `translateY(${((1 - authorFrac) * 10).toFixed(1)}px)`;
          } else {
            author.style.opacity = "0.16";
            author.style.transform = "translateY(10px)";
          }
        }
      }
    } else {
      // 2. MOBILE / TABLET (NON-STICKY) FALLBACK
      // Stagger words into view as the section enters viewport
      const rect = quoteSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
      if (inView) {
        const spans = quoteSection.querySelectorAll<HTMLElement>("h5 span");
        const scrollFraction = Math.min(
          1,
          Math.max(0, (window.innerHeight * 0.8 - rect.top) / (rect.height * 0.7))
        );
        const activeCount = Math.floor(scrollFraction * spans.length);
        spans.forEach((span, i) => {
          if (i <= activeCount) {
            span.style.opacity = "1";
            span.style.filter = "none";
          } else {
            span.style.opacity = "0.16";
            span.style.filter = "blur(0.5px)";
          }
        });
        allAuthorCredits.forEach((credit) => {
          if (scrollFraction > 0.8) {
            credit.style.opacity = "1";
            credit.style.transform = "translateY(0px)";
          }
        });
      }
    }
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Initial check
  updateScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

