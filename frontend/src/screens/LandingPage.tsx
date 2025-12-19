import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const navItems = ["Home", "About", "Help", "Dashboard", "Download", "Credits"];

export function LandingPage() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const navEl = navRef.current;
    const highlightEl = highlightRef.current;
    if (!navEl || !highlightEl) return;

    const links = Array.from(navEl.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const listeners: Array<() => void> = [];

    const moveHighlight = (link: HTMLAnchorElement) => {
      const linkRect = link.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();

      gsap.to(highlightEl, {
        duration: 0.35,
        ease: "expo.out",
        opacity: 1,
        x: linkRect.left - navRect.left,
        y: linkRect.top - navRect.top,
        width: linkRect.width,
        height: linkRect.height,
        scale: 1,
      });
    };

    const handleLeave = () => {
      gsap.to(highlightEl, {
        duration: 0.25,
        ease: "power2.out",
        opacity: 0,
        scale: 0.96,
      });
    };

    links.forEach((link) => {
      const handler = () => moveHighlight(link);
      link.addEventListener("mouseenter", handler);
      listeners.push(() => link.removeEventListener("mouseenter", handler));
    });
    navEl.addEventListener("mouseleave", handleLeave);
    listeners.push(() => navEl.removeEventListener("mouseleave", handleLeave));

    return () => {
      listeners.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -32, opacity: 0, scaleX: 1.08 },
        { duration: 0.8, ease: "expo.out", y: 0, opacity: 1, scaleX: 1 },
      );
    }

    const handleScroll = () => {
      const shouldFloat = window.scrollY > 12;
      if (headerRef.current) {
        headerRef.current.classList.toggle("header-floating", shouldFloat);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page" data-collection-1-mode="dark">
      <header className="main-header">
        <div className="header-container" ref={headerRef}>
          <a href="#" className="brand">
            <span className="brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.09446 0.0396324C5.33751 0.158721 4.62568 0.518475 4.05775 1.06901C3.4662 1.6424 3.14371 2.25324 2.95751 3.15294C2.91321 3.36694 2.79676 3.92972 2.6987 4.40359C2.60065 4.87745 2.51411 5.29287 2.50639 5.3267L2.4924 5.38824H7.75178H13.0112V2.69412V0L9.66153 0.00270777C7.12626 0.00475913 6.25902 0.0137306 6.09446 0.0396324ZM15.4572 2.69412V5.38824H17.6966H19.9361L19.9659 5.25832C20.0181 5.03109 21.0286 0.0413555 21.0286 0.010968C21.0286 0.00492329 19.775 0 18.2429 0H15.4572V2.69412ZM2.01725 7.93879C2.00459 7.97367 1.93979 8.28474 1.51452 10.3525C1.38146 10.9994 1.17349 12.0087 1.05239 12.5954C0.365013 15.9247 0.0538294 17.4844 0.0182539 17.7785C-0.0186533 18.0836 0.000941992 18.4564 0.0721745 18.8045C0.275817 19.7996 0.984582 20.6344 1.90775 20.9665C2.43163 21.1549 1.88511 21.1427 9.78059 21.1427C13.7099 21.1427 16.9247 21.1328 16.9247 21.1207C16.9247 21.1086 17.0339 20.5579 17.1672 19.8968C17.6198 17.6532 17.9847 15.8184 17.9847 15.7864C17.9847 15.7621 16.5491 15.7545 12.0328 15.7545C8.66599 15.7545 6.08088 15.7441 6.08088 15.7306C6.08088 15.7175 6.19094 15.1545 6.32547 14.4796C6.46 13.8046 6.57007 13.2494 6.57007 13.2458C6.57007 13.2422 8.59106 13.2359 11.0612 13.2318L15.5523 13.2244L15.8784 13.1357C16.8555 12.8699 17.7637 12.14 18.2015 11.2688C18.3928 10.888 18.4625 10.6259 18.7319 9.2756C18.8768 8.54944 18.9911 7.95176 18.986 7.94741C18.9809 7.94306 15.1636 7.93168 10.5032 7.92208C3.74137 7.90816 2.02717 7.91155 2.01725 7.93879Z"
                  fill="#0062FF"
                />
              </svg>
            </span>
            <span className="header-logo">Roblex</span>
          </a>

          <div className="main-nav" ref={navRef}>
            <span className="nav-highlight" ref={highlightRef} />
            {navItems.map((item, idx) => (
              <a
                key={item}
                href={item === "Dashboard" ? "#dashboard" : "#"}
                className={`nav-link ${idx === 0 ? "active" : ""}`}
              >
                {item}
              </a>
            ))}
          </div>

          <a href="#" className="cta-link">
            <img className="cta-icon" src="/assets/images/Discord-Icon-White.png" alt="Discord" />
            <span className="cta-text">Join Discord</span>
          </a>
        </div>
      </header>

      <main className="landing-main">
        <div className="scroll-area" aria-hidden="true" />
      </main>
    </div>
  );
}
