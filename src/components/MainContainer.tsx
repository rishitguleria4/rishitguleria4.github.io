import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    // --- Elite Dynamic Color Engine ---
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const themes = [
          { selector: "#landingDiv", accent: "#a855f7", bg: "#0f0518", glow: "rgba(168,85,247,0.15)" }, // Purple / Nebula
          { selector: "#about", accent: "#d946ef", bg: "#130419", glow: "rgba(217,70,239,0.15)" },     // Magenta / Deep Void
          { selector: ".whatIDO", accent: "#ec4899", bg: "#190518", glow: "rgba(236,72,153,0.15)" },   // Pink / Cosmic Red
          { selector: ".career-section", accent: "#8b5cf6", bg: "#0f0518", glow: "rgba(139,92,246,0.15)" }, // Violet / Nebula
          { selector: "#work", accent: "#f59e0b", bg: "#140800", glow: "rgba(245,158,11,0.15)" },      // Amber / Crimson Black
          { selector: "#contact", accent: "#eab308", bg: "#0a0a0a", glow: "rgba(234,179,8,0.15)" }     // Gold / Obsidian
        ];

        themes.forEach((theme) => {
          ScrollTrigger.create({
            trigger: theme.selector,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => applyTheme(theme),
            onEnterBack: () => applyTheme(theme),
          });
        });

        const applyTheme = (theme: any) => {
          gsap.to(document.documentElement, {
            "--accentColor": theme.accent,
            "--backgroundColor": theme.bg,
            "--glowEffect": `0 0 30px ${theme.glow}`,
            duration: 1.5,
            ease: "power2.out"
          });
        };
      });
    });
    // ----------------------------------

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
