import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

let hasRun = false;

export function initialFX() {
  if (hasRun) return;
  hasRun = true;

  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", { backgroundColor: "#0a0e17", duration: 0.5, delay: 1 });

  // --- Intro text animation (Hello, name, h3) ---
  // Split text FIRST, then immediately hide chars, THEN reveal parents.
  // This ensures parents reveal with everything already invisible.
  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" }
  );
  gsap.set(landingText.chars, { opacity: 0, y: 80, filter: "blur(5px)" });

  // NOW safe to reveal parent containers
  gsap.set([".landing-intro", ".landing-info"], { opacity: 1 });

  // Animate h3, name chars in
  gsap.to(landingText.chars, {
    opacity: 1,
    duration: 1.2,
    filter: "blur(0px)",
    ease: "power3.inOut",
    y: 0,
    stagger: 0.025,
    delay: 0.3,
  });

  // Animate the solid h2 wrapper in (contains all role divs which are opacity:0)
  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", y: 0, delay: 0.8 }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 }
  );

  // --- Role cycling ---
  // All role divs are opacity:0 in CSS. GSAP controls them entirely.
  const solidRoles = [
    document.querySelector<HTMLElement>(".landing-h2-1"),
    document.querySelector<HTMLElement>(".landing-h2-2"),
    document.querySelector<HTMLElement>(".landing-h2-3"),
  ].filter(Boolean) as HTMLElement[];

  const shadowRoles = [
    document.querySelector<HTMLElement>(".landing-h2-info"),
    document.querySelector<HTMLElement>(".landing-h2-info-1"),
    document.querySelector<HTMLElement>(".landing-h2-info-2"),
  ].filter(Boolean) as HTMLElement[];

  if (solidRoles.length) LoopText(solidRoles, true);
  if (shadowRoles.length) LoopText(shadowRoles, false);
}

function LoopText(els: HTMLElement[], useSplitIntro: boolean) {
  const visibleDuration = 3;
  const fadeDuration = 0.7;
  const cycleDuration = visibleDuration + fadeDuration;

  // Ensure all divs are hidden (in case CSS was overridden)
  gsap.set(els, { opacity: 0 });

  if (useSplitIntro) {
    // Nice char-by-char entrance for first role text
    const split = new SplitText(els[0], { type: "chars,lines", linesClass: "split-h2" });
    gsap.set(split.chars, { opacity: 0, y: 30 });
    gsap.set(els[0], { opacity: 1 });
    gsap.to(split.chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power2.out",
      delay: 1.0,
      onComplete: () => split.revert(),
    });
  } else {
    gsap.to(els[0], { opacity: 1, duration: 0.8, delay: 1.0 });
  }

  // Cycling timeline with absolute positions = no drift, no gaps
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
  els.forEach((el, i) => {
    const next = els[(i + 1) % els.length];
    const t = i * cycleDuration;
    tl.to(el, { opacity: 0, duration: fadeDuration, ease: "power1.in" }, t + visibleDuration);
    tl.to(next, { opacity: 1, duration: fadeDuration, ease: "power1.out" }, t + visibleDuration);
  });
}
