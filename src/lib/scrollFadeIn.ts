export function initScrollFadeIn(): () => void {
  const SPRING_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

  // Elements to animate on scroll (excluding hero, quote, our-services which have their own animations)
  const selectors = [
    // Headlines, subtitles, tags, badges
    'section:not(#hero):not(#quote):not(#our-services) h2',
    'section:not(#hero):not(#quote):not(#our-services) h3',
    'section:not(#hero):not(#quote):not(#our-services) h4',
    'section:not(#hero):not(#quote):not(#our-services) [data-framer-name="Headline"]',
    'section:not(#hero):not(#quote):not(#our-services) [data-framer-name="Tag"]',
    'section:not(#hero):not(#quote):not(#our-services) [data-framer-name="Badge"]',

    // Why Althea & Claims
    '[data-framer-name="Why Althea"] [data-framer-name="Claims Container"] > div',
    '[data-framer-name="Why Althea"] [data-framer-name^="Claim"]',
    '[data-framer-name="Ready to begin "]',

    // Bento / Our Approach
    '[data-framer-name="Our Approach"] [data-framer-name*="Bento"]',
    '[data-framer-name="Bento Container"]',

    // Testimonials
    '[data-framer-name="Testimonials"] [data-framer-name*="Card"]',
    '[data-framer-name="Testimonial Cards"] > div',

    // Pricing
    '[data-framer-name="Pricing"] [data-framer-name*="Card"]',
    '[data-framer-name="Pricing Cards"] > div',
    '[data-framer-name="Price"]',

    // Numbers / Statistics
    '[data-framer-name="Numbers"] [data-framer-name*="Container"] > div',
    '[data-framer-name="Counters Container"] > div',
    '[data-framer-name="Big Number Container"]',
    '[data-framer-name="Users"]',
    '[data-framer-name="Trustpoint"]',

    // Journal preview
    '[data-framer-name="Journal Preview"] a',
    '[data-framer-name="Journal Preview"] [data-framer-name*="Card"]',

    // FAQ items
    '[data-framer-name="FAQ"] [data-framer-name="Placeholder"]',
    '[data-framer-name="FAQ"] [data-framer-name="Collapsed"]',
    '[data-framer-name="FAQ"] [data-framer-name="Open"]',

    // CTA and Footer
    'div[data-framer-name="CTA"]',
    'div[data-framer-name="Footer"] [data-framer-name="Subscription Container"]',
    'div[data-framer-name="Footer"] [data-framer-name="Form Container"]',
    'div[data-framer-name="Footer"] [data-framer-name="Bottom Container"]',

    // Images and general cards
    'section:not(#hero):not(#quote):not(#our-services) [data-framer-name*="Image Container"]',
    'section:not(#hero):not(#quote):not(#our-services) [data-framer-name*="Card Container"]'
  ];

  const matched = document.querySelectorAll<HTMLElement>(selectors.join(", "));
  const elementsToWatch: HTMLElement[] = [];

  const windowHeight = window.innerHeight;

  matched.forEach((el) => {
    // Skip if already initialized or if inside quote/services/nav
    if (el.dataset.fadeWatched === "true") return;
    if (el.closest("#quote") || el.closest("#our-services") || el.closest("nav")) return;
    el.dataset.fadeWatched = "true";

    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < windowHeight * 0.88;

    if (isAboveFold) {
      // Elements already visible at top of page animate in gently on load
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    } else {
      // Elements below the fold start hidden and slightly shifted down
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.72s ${SPRING_EASE}, transform 0.8s ${SPRING_EASE}`;
      el.style.willChange = "opacity, transform";
      elementsToWatch.push(el);
    }
  });

  // Observe elements entering the viewport as you scroll down
  let staggerGroup = 0;
  let staggerTimer: NodeJS.Timeout | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        observer.unobserve(target);

        // Compute stagger delay for sibling cards appearing together
        const delay = staggerGroup * 70;
        staggerGroup++;

        if (staggerTimer) clearTimeout(staggerTimer);
        staggerTimer = setTimeout(() => {
          staggerGroup = 0;
        }, 180);

        setTimeout(() => {
          target.style.opacity = "1";
          target.style.transform = "translateY(0px)";
        }, delay);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elementsToWatch.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    if (staggerTimer) clearTimeout(staggerTimer);
  };
}

