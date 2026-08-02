"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Link from "next/link";
import { FaArrowRight, FaBalanceScale } from "react-icons/fa";

const defaultSlides = [
  {
    id: 1,
    image: "/assets/BImg1.jpg",
    badge: "Distinguished Courtroom Advocates",
    title: "Your Trusted Partner",
    highlight: "In Every Legal Matter",
    description:
      "From consultation to high-stakes courtroom representation, we deliver strategic legal counsel tailored to protect your rights with integrity, authority, and excellence.",
  },
  {
    id: 2,
    image: "/assets/BImg2.jpg",
    badge: "Strategic Legal Counsel",
    title: "Protecting Your",
    highlight: "Legal & Commercial Rights",
    description:
      "Authoritative counsel and elite advocacy across corporate litigation, constitutional law, family disputes, and complex property arbitration.",
  },
  {
    id: 3,
    image: "/assets/BImg3.jpg",
    badge: "Supreme Court Bar Association",
    title: "Committed To",
    highlight: "Justice & Uncompromising Integrity",
    description:
      "Every matter is conducted with meticulous strategic analysis, absolute confidentiality, and unwavering professional rigor.",
  },
  {
    id: 4,
    image: "/assets/BImg4.jpg",
    badge: "Premier Legal Associates",
    title: "Your Reliable",
    highlight: "Long-Term Legal Counsel",
    description:
      "Serving corporate entities, families, and individuals with distinguished legal acumen and transparent, result-driven representation.",
  },
];

export default function Banner() {
  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    fetch("http://localhost:5000/banners")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setSlides(data);
        }
      })
      .catch((err) => {
        console.warn("Could not load banners from server, using default slides:", err.message || err);
      });
  }, []);

  return (
    <section id="home" className="w-full relative scroll-mt-[76px]">
      <Swiper
        effect="fade"
        loop
        centeredSlides
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        modules={[
          Autoplay,
          Pagination,
          Navigation,
          EffectFade,
        ]}
        className="bannerSwiper w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id || slide.id || index}>
            <div className="relative min-h-[520px] sm:min-h-[600px] md:min-h-[calc(100vh-76px)] w-full flex items-center justify-center overflow-hidden">
              {/* Background Image with improved brightness, contrast, and scaling */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-1000 scale-[1.02]"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Luxury Executive White overlay with modified opacity for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/40 to-transparent z-10"></div>

              {/* Content */}
              <div className="relative z-10 w-full py-12 sm:py-16 md:py-20">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
                  <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#F3E8FF] border border-[#DDD6FE] text-[#7C3AED] px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-4 sm:mb-6 shadow-sm animate-in fade-in duration-500">
                      <FaBalanceScale className="text-sm text-[#7C3AED]" />
                      {slide.badge}
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif text-[#111827] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-wide drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]">
                      {slide.title}
                      <br />
                      <span className="text-[#581C87] drop-shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="text-[#4B5563] text-sm sm:text-base md:text-lg leading-relaxed mt-4 sm:mt-6 max-w-2xl font-medium drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)]">
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-8 sm:mt-10">
                      <Link
                        href="/#contact"
                        className="bg-[#581C87] hover:from-[#6D28D9] hover:to-[#7C3AED] text-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg flex items-center justify-center gap-3 shadow-md shadow-purple-500/25 transition-all duration-300 uppercase text-xs tracking-wider group hover:scale-105 w-full sm:w-auto text-center"
                      >
                        Schedule Consultation
                        <FaArrowRight className="group-hover:translate-x-1.5 transition-transform text-xs text-white" />
                      </Link>

                      <Link
                        href="/#services"
                        className="text-[#111827] hover:text-[#7C3AED] font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg border border-[#7C3AED]/40 bg-white transition-all duration-300 uppercase text-xs tracking-wider shadow-sm hover:scale-105 flex items-center justify-center w-full sm:w-auto text-center"
                      >
                        Our Practice Areas
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}