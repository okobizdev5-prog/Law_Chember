"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBalanceScale, FaBriefcase, FaFileContract, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";

const getIcon = (iconStr) => {
  if (!iconStr) return <FaBalanceScale />;
  if (iconStr.startsWith("http")) return <img src={iconStr} alt="icon" className="w-12 h-12 object-contain" />;
  
  switch(iconStr) {
    case "FaBriefcase": return <FaBriefcase />;
    case "FaBalanceScale": return <FaBalanceScale />;
    case "FaFileContract": return <FaFileContract />;
    case "FaUsers": return <FaUsers />;
    case "FaShieldAlt": return <FaShieldAlt />;
    case "FaAward": return <FaAward />;
    default: return <FaBalanceScale />;
  }
};

export default function OurPracticeArea() {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPracticeAreas(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load categories from server:", err.message || err);
        setLoading(false);
      });
  }, []);

  const displayedCards = showAll ? practiceAreas : practiceAreas.slice(0, 6);

  return (
    <section id="services" className="min-h-0 lg:min-h-[calc(100vh-80px)] scroll-mt-[76px] flex items-center justify-center py-10 sm:py-16 md:py-24 bg-white border-t border-slate-100 relative w-full overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            Areas of Expertise
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-wide">
            Our Practice Areas
          </h2>
          <span className="gold-divider-center"></span>
          <p className="mt-6 text-base md:text-lg text-slate-650 leading-relaxed font-light">
            Comprehensive legal acumen designed to safeguard your commercial and personal rights, resolve intricate disputes, and provide authoritative advocacy across all jurisdictions.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-48 mt-16">
            <span className="text-[#D4AF37] font-semibold text-sm tracking-wider uppercase animate-pulse">Loading Practice Areas...</span>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
            {displayedCards.map((item) => (
              <Link
                href={`/category/${item.slug || item.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                key={item._id || item.slug}
                className="bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden group flex flex-col h-full cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image / Header Area */}
                <div className="relative w-full h-52 bg-slate-100 overflow-hidden border-b border-slate-200">
                  {item.icon && item.icon.startsWith("http") ? (
                    <>
                      <img 
                        src={item.icon} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                       <div className="text-5xl text-[#D4AF37] group-hover:scale-110 group-hover:text-[#581C87] transition-all duration-300">
                         {getIcon(item.icon)}
                       </div>
                    </div>
                  )}
                  {/* Category badge over image */}
                  <div className="absolute top-4 right-4 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#581C87] shadow-sm">
                    Legal Practice
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#581C87] transition-colors duration-200">
                    {item.title || item.name}
                  </h3>
                  
                  <p className="text-slate-600 font-light leading-relaxed mt-3.5 line-clamp-3 flex-1 text-sm">
                    {item.shortDesc || item.description || "Authoritative representation and specialized legal counsel tailored to achieve decisive resolutions in this practice area."}
                  </p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-150 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#581C87] group-hover:text-[#3B0764] transition-colors duration-200">
                    <span>Explore Expertise</span> 
                    <span className="text-sm transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && practiceAreas.length > 6 && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#581C87] hover:bg-[#3B0764] text-white px-9 py-4 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105"
            >
              {showAll ? "Show Less Practice Areas" : "View All Practice Areas"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}