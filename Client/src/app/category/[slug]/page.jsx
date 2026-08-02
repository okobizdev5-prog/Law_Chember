"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaArrowLeft, FaBalanceScale, FaBriefcase, FaFileContract, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";

const getIcon = (iconStr) => {
  if (!iconStr) return <FaBalanceScale />;
  if (iconStr.startsWith("http")) return <img src={iconStr} alt="icon" className="w-16 h-16 object-cover rounded-lg" />;
  
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

export default function CategoryDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`http://localhost:5000/categories/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCategory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load category from server:", err.message || err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="text-[#581C87] font-semibold text-sm tracking-wider uppercase animate-pulse">Loading Practice Area Details...</span>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 px-6">
        <div className="text-3xl font-serif font-bold text-slate-900 tracking-wide">Practice Area Not Found</div>
        <button
          onClick={() => router.push("/")}
          className="bg-[#581C87] hover:bg-[#3B0764] text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-28 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-slate-700 hover:text-[#581C87] transition-colors mb-8 group text-xs font-bold uppercase tracking-widest"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1.5 transition-transform text-[#581C87] text-xs" /> Back to Practice Areas
        </button>

        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-8 md:p-14 shadow-sm relative overflow-hidden">
          {/* Top gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient"></div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 border-b border-slate-200 pb-10">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-4xl text-[#581C87] shadow-sm shrink-0">
              {getIcon(category.icon)}
            </div>
            <div>
              <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-3 shadow-sm">
                Legal Practice Area
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 tracking-wide leading-tight">
                {category.title || category.name}
              </h1>
            </div>
          </div>

          <div className="text-slate-650 leading-relaxed text-base md:text-lg font-light mb-12">
            <p>{category.description || category.shortDesc}</p>
          </div>

          {category.services && category.services.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 border-l-2 border-[#581C87] pl-3">
                Key Legal Capabilities & Services
              </h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {category.services.map((service, index) => (
                  <li key={index} className="flex items-start text-slate-655 font-light text-sm md:text-base">
                    <FaCheckCircle className="text-[#581C87] mt-1 mr-3 flex-shrink-0 text-xs" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900">Require Immediate Counsel in This Jurisdiction?</h4>
              <p className="text-slate-600 text-xs font-light mt-1">Schedule a confidential consultation with our senior legal team.</p>
            </div>
            <button
              onClick={() => router.push("/#contact")}
              className="bg-[#581C87] hover:bg-[#3B0764] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105 shrink-0"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
