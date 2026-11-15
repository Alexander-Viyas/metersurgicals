/**
 * ServicesWheel: Controls Framer's authentic 4100px circular wheel carousel.
 * The 5 cards ("Skin Health", "Aesthetic Care", "Wellness & Recovery",
 * "Personal Consultation", "Long-Term Care Plans") lie along the gentle 2000px-radius
 * top perimeter arch, 100% right-side up, forming the elegant dome arch matching
 * the reference site (media_1794715459894_7bd6f786.jpg).
 */

export function initServicesWheel(servicesContainer: HTMLElement): () => void {
  // The original page uses a separate swipeable carousel on small screens.
  // Leave that Framer variant intact instead of forcing the desktop wheel onto it.
  if (window.matchMedia("(max-width: 1199.98px)").matches) return () => {};

  // Locate Framer's existing 4100px circular wheel container
  const wheel = servicesContainer.querySelector<HTMLElement>(
    'div[style*="width:4100px"], div[style*="width: 4100px"]'
  );

  // Locate the outer sticky runway
  const runway =
    servicesContainer.querySelector<HTMLElement>("[data-services-runway='true']") ||
    servicesContainer.querySelector<HTMLElement>(
      'div[style*="height:4000px"], div[style*="height: 4000px"]'
    ) ||
    servicesContainer.querySelector<HTMLElement>(".framer-1g3njoe-container") ||
    servicesContainer;

  // Locate the sticky 100vh viewport
  const sticky =
    servicesContainer.querySelector<HTMLElement>(
      'div[style*="position:sticky"], div[style*="position: sticky"]'
    ) || servicesContainer;

  if (!wheel) {
    console.warn("[servicesWheel] 4100px wheel element not found in DOM");
    return () => {};
  }
  const interactions = new AbortController();

  // ═══════════════════════════════════════════════════════════════
  // GUARANTEE CONTAINER HIERARCHY & STICKY BEHAVIOR
  // ═══════════════════════════════════════════════════════════════
  servicesContainer.style.height = "auto";
  servicesContainer.style.minHeight = "4000px";
  servicesContainer.style.overflow = "visible";
  servicesContainer.style.position = "relative";

  runway.dataset.servicesRunway = "true";
  runway.style.position = "relative";
  runway.style.width = "100%";
  runway.style.height = "4200px";
  runway.style.overflow = "visible";

  sticky.style.position = "sticky";
  sticky.style.top = "0";
  sticky.style.width = "100%";
  sticky.style.height = "100vh";
  sticky.style.overflow = "hidden";
  sticky.style.display = "flex";
  sticky.style.alignItems = "center";
  sticky.style.justifyContent = "center";

  // Ensure desktop container is active in document flow
  const desktopContainer = servicesContainer.querySelector<HTMLElement>(".framer-1g3njoe-container");
  if (desktopContainer) {
    desktopContainer.style.position = "relative";
    desktopContainer.style.top = "0";
    desktopContainer.style.bottom = "auto";
    desktopContainer.style.width = "100%";
    desktopContainer.style.height = "auto";
    desktopContainer.style.display = "block";
    desktopContainer.style.zIndex = "1";
    desktopContainer.style.overflow = "visible";
  }

  // Ensure section headline floats cleanly at top of sticky viewport
  const headline = servicesContainer.querySelector<HTMLElement>(".framer-41ir97");
  if (headline) {
    headline.style.zIndex = "4";
    headline.style.position = "absolute";
    headline.style.top = "20px";
    headline.style.left = "50%";
    headline.style.transform = "translateX(-50%)";
    headline.style.width = "100%";
    headline.style.maxWidth = "800px";
    headline.style.textAlign = "center";
  }

  // ═══════════════════════════════════════════════════════════════
  // CONCENTRIC RIPPLE RINGS IN BACKGROUND (MATCHING ATTACHMENT)
  // ═══════════════════════════════════════════════════════════════
  let rippleWrap = sticky.querySelector<HTMLElement>("#services-concentric-ripples");
  if (!rippleWrap) {
    rippleWrap = document.createElement("div");
    rippleWrap.id = "services-concentric-ripples";
    rippleWrap.style.position = "absolute";
    rippleWrap.style.top = "50%";
    rippleWrap.style.left = "50%";
    rippleWrap.style.transform = "translate(-50%, -50%)";
    rippleWrap.style.width = "2600px";
    rippleWrap.style.height = "2600px";
    rippleWrap.style.pointerEvents = "none";
    rippleWrap.style.zIndex = "0";
    rippleWrap.style.opacity = "0.5";

    [360, 580, 820, 1080, 1360, 1660, 1980, 2320].forEach((diam) => {
      const ring = document.createElement("div");
      ring.style.position = "absolute";
      ring.style.top = "50%";
      ring.style.left = "50%";
      ring.style.transform = "translate(-50%, -50%)";
      ring.style.width = `${diam}px`;
      ring.style.height = `${diam}px`;
      ring.style.borderRadius = "50%";
      ring.style.border = "1px solid rgba(255, 255, 255, 0.55)";
      ring.style.boxShadow = "0 0 30px rgba(255, 255, 255, 0.22)";
      rippleWrap!.appendChild(ring);
    });

    sticky.prepend(rippleWrap);
  }

  // ═══════════════════════════════════════════════════════════════
  // WHEEL POSITIONING & ROTATION ANCHOR (TOP ARCH - RIGHT-SIDE UP)
  // Circle Center: cx = 2050px, cy = 4050px
  // Radius R = 2000px.
  // Top apex of the circle (when rotated right-side up) is at y = 2050px.
  // We offset top by -1620px so apex sits comfortably at screenY ≈ 430px.
  // ═══════════════════════════════════════════════════════════════
  wheel.style.position = "absolute";
  wheel.style.left = "calc(50% - 2050px)";
  const positionWheel = () => {
    // Center the active cards vertically in the middle of the viewport
    wheel.style.top = `${Math.round(window.innerHeight * 0.50 - 2050)}px`;
  };
  positionWheel();
  wheel.style.transformOrigin = "2050px 4050px";
  // The reference starts with the first card centered before the scroll runway begins.
  // Apply this first rotation immediately; otherwise equal current/target values leave
  // the unrotated card arc outside the viewport until the user has already scrolled.
  wheel.style.transform = "rotate(-140deg)";
  wheel.style.willChange = "transform";
  wheel.style.zIndex = "2";
  wheel.style.pointerEvents = "auto";

  // Rotation angles that center each card at the top apex, 100% right-side up:
  // Card 0 ("Skin Health")          => -140 deg
  // Card 1 ("Aesthetic Care")       => -153 deg
  // Card 2 ("Wellness & Recovery")   => -166 deg
  // Card 3 ("Personal Consultation") => -179 deg
  // Card 4 ("Long-Term Care Plans")  => -192 deg
  const CARD_ANGLES = [-140, -153, -166, -179, -192];

  let currentAngle = -140;
  let targetAngle = -140;
  let isDragging = false;
  let startX = 0;
  let dragStartAngle = -140;
  let animId: number;

  // Configure individual cards inside wheel
  const cardDivs = wheel.querySelectorAll<HTMLElement>(":scope > div");
  cardDivs.forEach((card, idx) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      if (idx < CARD_ANGLES.length) {
        // Smoothly scroll runway to center clicked card
        const rect = runway.getBoundingClientRect();
        const runwayTop = window.scrollY + rect.top;
        const totalDist = runway.offsetHeight - window.innerHeight;
        const p = idx / (CARD_ANGLES.length - 1);
        window.scrollTo({
          top: runwayTop + p * totalDist,
          behavior: "smooth",
        });
      }
    }, { signal: interactions.signal });

    // Add subtle hover lift
    card.addEventListener("mouseenter", () => {
      card.style.transition = "filter 0.25s ease";
      card.style.filter = "drop-shadow(0 16px 36px rgba(180, 195, 220, 0.45))";
    }, { signal: interactions.signal });
    card.addEventListener("mouseleave", () => {
      card.style.filter = "";
    }, { signal: interactions.signal });
  });

  // ═══════════════════════════════════════════════════════════════
  // SCROLL SYNC
  // ═══════════════════════════════════════════════════════════════
  const updateFromScroll = () => {
    if (isDragging) return;

    const rect = runway.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDist = runway.offsetHeight - windowHeight;
    if (totalDist <= 0) return;

    const scrolled = -rect.top;
    const p = Math.min(1, Math.max(0, scrolled / totalDist));

    // Progress smoothly from Card 0 (-140deg) to Card 4 (-192deg)
    targetAngle = -140 - p * 52;
  };

  // ═══════════════════════════════════════════════════════════════
  // DRAG INTERACTION (SMOOTH HORIZONTAL SWIPE)
  // ═══════════════════════════════════════════════════════════════
  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    dragStartAngle = targetAngle;
    sticky.style.cursor = "grabbing";
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Drag left advances to next card (- deg)
    const angleDelta = deltaX * 0.035;
    targetAngle = Math.min(-136, Math.max(-196, dragStartAngle + angleDelta));
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;
    sticky.style.cursor = "default";

    // Snap to closest card progress on release
    const rect = runway.getBoundingClientRect();
    const runwayTop = window.scrollY + rect.top;
    const totalDist = runway.offsetHeight - window.innerHeight;

    let closestIdx = 0;
    let minDiff = 999;
    CARD_ANGLES.forEach((ang, i) => {
      const diff = Math.abs(targetAngle - ang);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });

    const p = closestIdx / (CARD_ANGLES.length - 1);
    window.scrollTo({
      top: runwayTop + p * totalDist,
      behavior: "smooth",
    });
  };

  sticky.addEventListener("pointerdown", onPointerDown, { signal: interactions.signal });
  window.addEventListener("pointermove", onPointerMove, { signal: interactions.signal });
  window.addEventListener("pointerup", onPointerUp, { signal: interactions.signal });
  window.addEventListener("scroll", updateFromScroll, { passive: true, signal: interactions.signal });
  window.addEventListener("resize", positionWheel, { passive: true, signal: interactions.signal });

  updateFromScroll();

  // ═══════════════════════════════════════════════════════════════
  // RENDER / LERP LOOP
  // ═══════════════════════════════════════════════════════════════
  const tick = () => {
    animId = requestAnimationFrame(tick);

    const diff = targetAngle - currentAngle;
    if (Math.abs(diff) > 0.005) {
      currentAngle += diff * 0.12;
      wheel.style.transform = `rotate(${currentAngle.toFixed(3)}deg)`;
    }
  };

  animId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(animId);
    interactions.abort();
    window.removeEventListener("scroll", updateFromScroll);
    sticky.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    if (rippleWrap) rippleWrap.remove();
  };
}
