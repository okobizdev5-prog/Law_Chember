"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+8801700000000");
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/settings/consultation")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP status error");
        return res.json();
      })
      .then((data) => {
        if (data && data.phoneNumber) {
          setPhoneNumber(data.phoneNumber);
        }
      })
      .catch((err) => console.warn("Could not load consultation settings from server:", err.message || err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/blog")) {
      setActiveSection("blog");
      return;
    }
    if (pathname.startsWith("/category")) {
      setActiveSection("services");
      return;
    }

    const sections = ["home", "about", "services", "gallery", "blog", "contact"];
    
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About Us", href: "/#about" },
    { name: "Practice Areas", href: "/#services" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Blog", href: "/#blog" },
  ];

  const mobileLinks = [
    ...navLinks,
    { name: "Contact Us", href: "/#contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[#0069D9] border-b border-sky-500/20 shadow-[0_4px_20px_rgba(0,105,217,0.2)] py-1" 
        : "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.05)] py-2 lg:py-2.5"
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo Area - Compact and crisp */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-2 lg:mr-6">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shrink-0">
            <Image
              src="/logo_transparent.png"
              alt="Nasrullah Law Associates Logo"
              fill
              priority
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className={`font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-200 leading-none ${
              scrolled 
                ? "text-white group-hover:text-purple-100" 
                : "text-[#581C87] group-hover:text-[#3B0764]"
            }`}>
              Nasrullah Law Associates
            </h2>
            <p className={`text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-[0.18em] uppercase mt-1.5 ${
              scrolled ? "text-purple-100" : "text-[#4C1D95]"
            }`}>
              Advocates & Legal Consultants
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.split("#")[1] || "home";
              const isActive = activeSection === sectionId;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-2.5 xl:px-3.5 py-1.5 rounded-lg text-[12px] xl:text-[13px] font-bold tracking-wide transition-all duration-200 block whitespace-nowrap ${
                      isActive
                        ? scrolled
                          ? "text-[#0069D9] bg-white border border-white shadow-sm"
                          : "text-[#581C87] bg-purple-50 border border-purple-100/50 shadow-sm"
                        : scrolled
                          ? "text-white hover:text-white hover:bg-white/10"
                          : "text-slate-700 hover:text-[#581C87] hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={`h-5 w-px mx-1.5 xl:mx-2.5 ${scrolled ? "bg-white/20" : "bg-slate-200"}`}></div>

          <Link
            href="/#contact"
            className="bg-[#581C87] hover:bg-[#3B0764] text-white font-bold px-4 xl:px-5 py-2.5 rounded-full text-[11px] xl:text-[12px] uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md transition-all duration-300 hover:scale-[1.02] shrink-0 whitespace-nowrap"
          >
            <span>Schedule Consultation</span>
            <span className="text-[10px] xl:text-[11px] font-bold">↗</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className={`lg:hidden p-2 rounded-lg border transition-all duration-200 focus:outline-none shrink-0 ${
            scrolled
              ? "text-white hover:text-purple-100 border-transparent hover:bg-white/10"
              : "text-[#3B0764] hover:text-[#581C87] border-slate-200 hover:bg-slate-50"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation"
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className={`lg:hidden border-t shadow-2xl animate-in slide-in-from-top duration-300 ${
          scrolled ? "bg-[#0069D9] border-sky-400/30" : "bg-white border-slate-100"
        }`}>
          <div className="flex flex-col gap-1.5 p-5 max-w-lg mx-auto">
            {mobileLinks.map((link) => {
              const sectionId = link.href.split("#")[1] || "home";
              const isActive = activeSection === sectionId;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-between ${
                    isActive
                      ? scrolled
                        ? "text-[#0069D9] font-semibold bg-white border border-white shadow-sm"
                        : "text-[#581C87] font-semibold bg-purple-50 border border-purple-100/50 shadow-sm"
                      : scrolled
                        ? "text-white hover:bg-white/10 hover:text-white"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#581C87]"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className={`w-1.5 h-1.5 rounded-full ${scrolled ? "bg-[#0069D9]" : "bg-[#581C87]"}`}></span>}
                </Link>
              );
            })}

            <div className={`pt-3 mt-2 border-t ${scrolled ? "border-white/20" : "border-slate-100"}`}>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="w-full bg-[#581C87] hover:bg-[#3B0764] text-white font-bold py-3.5 px-6 rounded-full text-center text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all duration-300"
              >
                <span>Schedule Consultation</span>
                <span className="text-xs font-bold">↗</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;