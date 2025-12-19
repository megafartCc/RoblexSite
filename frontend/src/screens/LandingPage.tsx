import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const navItems = ["Home", "About", "Help", "Executor", "Download", "Credits", "Donate"];

export function LandingPage() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navEl = navRef.current;
    const pillEl = pillRef.current;
    if (!navEl || !pillEl) return;

    const links = Array.from(navEl.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const handlers: Array<[HTMLAnchorElement, () => void, () => void]> = [];

    const movePill = (link: HTMLAnchorElement) => {
      const linkRect = link.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      pillEl.style.opacity = "1";
      pillEl.style.transform = `translate(${linkRect.left - navRect.left}px, ${linkRect.top - navRect.top}px)`;
      pillEl.style.width = `${linkRect.width}px`;
      pillEl.style.height = `${linkRect.height}px`;
    };

    const hidePill = () => {
      pillEl.style.opacity = "0";
    };

    links.forEach((link) => {
      const enter = () => movePill(link);
      const leave = () => hidePill();
      link.addEventListener("mouseenter", enter);
      link.addEventListener("focus", enter);
      link.addEventListener("mouseleave", leave);
      link.addEventListener("blur", leave);
      handlers.push([link, enter, leave]);
    });
    navEl.addEventListener("mouseleave", hidePill);

    return () => {
      handlers.forEach(([link, enter, leave]) => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("focus", enter);
        link.removeEventListener("mouseleave", leave);
        link.removeEventListener("blur", leave);
      });
      navEl.removeEventListener("mouseleave", hidePill);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.set(bar, { y: -140, opacity: 0, scaleX: 1.08 });
    let played = false;

    const playIn = () => {
      if (played) return;
      played = true;
      const tl = gsap.timeline();
      tl.to(bar, { duration: 0.65, y: 0, opacity: 1, ease: "power3.out" })
        .to(bar, { duration: 0.4, scaleX: 0.94, ease: "power2.out" }, "+=0.3")
        .to(bar, { duration: 0.3, scaleX: 1, ease: "power1.out" });
    };

    const handleScroll = () => {
      const triggerPoint = (bar.offsetHeight || 80) + 40;
      if (window.scrollY > triggerPoint) {
        playIn();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-shell">
      <header className="topbar">
        <div className="topbar-inner" ref={barRef}>
          <a className="brand" href="#">
            <span className="brand-mark" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.09446 0.0396324C5.33751 0.158721 4.62568 0.518475 4.05775 1.06901C3.4662 1.6424 3.14371 2.25324 2.95751 3.15294C2.91321 3.36694 2.79676 3.92972 2.6987 4.40359C2.60065 4.87745 2.51411 5.29287 2.50639 5.3267L2.4924 5.38824H7.75178H13.0112V2.69412V0L9.66153 0.00270777C7.12626 0.00475913 6.25902 0.0137306 6.09446 0.0396324ZM15.4572 2.69412V5.38824H17.6966H19.9361L19.9659 5.25832C20.0181 5.03109 21.0286 0.0413555 21.0286 0.010968C21.0286 0.00492329 19.775 0 18.2429 0H15.4572V2.69412ZM2.01725 7.93879C2.00459 7.97367 1.93979 8.28474 1.51452 10.3525C1.38146 10.9994 1.17349 12.0087 1.05239 12.5954C0.365013 15.9247 0.0538294 17.4844 0.0182539 17.7785C-0.0186533 18.0836 0.000941992 18.4564 0.0721745 18.8045C0.275817 19.7996 0.984582 20.6344 1.90775 20.9665C2.43163 21.1549 1.88511 21.1427 9.78059 21.1427C13.7099 21.1427 16.9247 21.1328 16.9247 21.1207C16.9247 21.1086 17.0339 20.5579 17.1672 19.8968C17.6198 17.6532 17.9847 15.8184 17.9847 15.7864C17.9847 15.7621 16.5491 15.7545 12.0328 15.7545C8.66599 15.7545 6.08088 15.7441 6.08088 15.7306C6.08088 15.7175 6.19094 15.1545 6.32547 14.4796C6.46 13.8046 6.57007 13.2494 6.57007 13.2458C6.57007 13.2422 8.59106 13.2359 11.0612 13.2318L15.5523 13.2244L15.8784 13.1357C16.8555 12.8699 17.7637 12.14 18.2015 11.2688C18.3928 10.888 18.4625 10.6259 18.7319 9.2756C18.8768 8.54944 18.9911 7.95176 18.986 7.94741C18.9809 7.94306 15.1636 7.93168 10.5032 7.92208C3.74137 7.90816 2.02717 7.91155 2.01725 7.93879Z"
                  fill="#0062FF"
                />
              </svg>
            </span>
            <span className="brand-name">Roblex</span>
          </a>

          <nav className="nav-links" aria-label="Primary" ref={navRef}>
            <span className="nav-hover-pill" ref={pillRef} aria-hidden="true" />
            {navItems.map((item, idx) => (
              <a key={item} className={`nav-link ${idx === 0 ? "active" : ""}`} href="#">
                {item}
              </a>
            ))}
          </nav>

          <a className="cta-discord" href="#">
            <span className="discord-icon" aria-hidden="true">
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.317 1.7A19.791 19.791 0 0 0 15.89.5l-.216.23c2.176.53 3.314 1.29 4.35 2.214-1.82-.93-3.616-1.4-5.403-1.608-.68-.08-1.359-.16-2.038-.16s-1.358.08-2.038.16c-1.786.208-3.582.678-5.403 1.607 1.036-.924 2.19-1.684 4.35-2.214L8.11.5A19.643 19.643 0 0 0 3.683 1.7C1.322 5.18.537 8.56.81 11.89a19.58 19.58 0 0 0 5.953 2.904l.844-1.14c-.462-.16-.9-.356-1.318-.574l.26-.186c.009-.007.018-.013.027-.02l.003-.003.002-.001.001-.001h.001L7.6 12l.205.118c1.255.714 2.624 1.1 4.194 1.1 1.57 0 2.94-.386 4.194-1.1l.205-.118.334.246c-.418.22-.857.416-1.32.576l.844 1.14A19.56 19.56 0 0 0 23.19 11.89c.315-3.74-.534-7.09-2.873-10.19ZM8.707 10.95c-.82 0-1.49-.76-1.49-1.69 0-.93.66-1.69 1.49-1.69.84 0 1.51.77 1.49 1.69 0 .93-.66 1.69-1.49 1.69Zm6.586 0c-.82 0-1.49-.76-1.49-1.69 0-.93.66-1.69 1.49-1.69.84 0 1.51.77 1.49 1.69 0 .93-.65 1.69-1.49 1.69Z"
                  fill="#ffffff"
                />
              </svg>
            </span>
            <span className="cta-text">Join Discord</span>
          </a>
        </div>
      </header>
      <div className="topbar-spacer" />
      <div className="scroll-fill" />
    </div>
  );
}
