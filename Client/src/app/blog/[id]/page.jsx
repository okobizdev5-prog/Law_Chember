"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaUserTie, FaClock, FaShareAlt, FaLinkedin, FaTwitter, FaFacebook, FaBookmark, FaQuoteLeft, FaPhoneAlt } from "react-icons/fa";

export default function BlogDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load blog post from server:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-[#581C87] animate-spin"></div>
          <span className="text-[#581C87] font-semibold tracking-widest uppercase text-sm animate-pulse">
            Loading Legal Publication...
          </span>
        </div>
      </div>
    );
  }

  if (!blog || !blog.title) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-[#581C87] text-3xl mb-6 border border-purple-100 shadow-sm">
          ⚖️
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">Publication Not Found</h1>
        <p className="text-slate-650 max-w-md mb-8 font-light">
          The requested legal article or commentary may have been archived, moved, or removed from our jurisprudence database.
        </p>
        <Link
          href="/#blog"
          className="bg-[#581C87] hover:bg-[#3B0764] text-white font-bold px-8 py-3.5 rounded-full uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
        >
          <FaArrowLeft /> Return to Legal Insights
        </Link>
      </div>
    );
  }

  // Format content paragraphs
  const renderFormattedContent = (contentStr) => {
    if (!contentStr) return null;
    const paragraphs = contentStr.split("\n\n");
    return paragraphs.map((para, idx) => {
      if (para.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4 tracking-wide flex items-center gap-3">
            <span className="w-2 h-8 bg-gold-gradient rounded-full inline-block"></span>
            {para.replace("### ", "")}
          </h3>
        );
      } else if (para.startsWith("- ") || para.startsWith("1. ")) {
        const lines = para.split("\n");
        return (
          <ul key={idx} className="space-y-3 my-6 pl-4 border-l-2 border-[#581C87]/40">
            {lines.map((line, lIdx) => (
              <li key={lIdx} className="text-slate-755 text-base md:text-lg leading-relaxed font-light pl-2">
                {line.replace(/^(-\s|\d+\.\s)/, "")}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <p key={idx} className="text-slate-755 text-base md:text-lg leading-relaxed font-light mb-6">
            {para}
          </p>
        );
      }
    });
  };

  return (
    <main className="min-h-screen bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-[#002855]/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Navigation Bar */}
        <div className="mb-10 flex items-center justify-between border-b border-slate-150 pb-6">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#581C87] hover:text-[#3B0764] transition-colors group"
          >
            <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Publications</span>
          </Link>

          <div className="flex items-center gap-3 text-gray-500">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: blog.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-[#581C87] hover:text-[#581C87] hover:scale-110 transition-all duration-200 shadow-sm"
              title="Share Article"
            >
              <FaShareAlt />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
            {blog.category || "Legal Advisory"}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-wide leading-tight mb-8">
            {blog.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex items-center justify-between flex-wrap gap-6 py-6 px-7 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#581C87] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#581C87] text-xl font-bold">
                  <FaUserTie />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{blog.author || "Senior Advocate"}</h4>
                <p className="text-xs text-[#581C87] font-medium uppercase tracking-wider">Chamber Partner & Specialist</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-550 font-medium">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#581C87] text-sm" />
                <span>Published: {blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-[#581C87] text-sm" />
                <span>{blog.readTime || "5 min read"}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="mb-14 rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 max-h-[520px] relative group">
          <img
            src={blog.image || "/assets/BImg1.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700"
            onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Excerpt / Lead Paragraph */}
        {blog.excerpt && (
          <div className="mb-10 p-7 bg-purple-50/50 border-l-4 border-[#581C87] rounded-r-2xl shadow-sm relative">
            <FaQuoteLeft className="absolute top-4 right-6 text-4xl text-[#581C87]/10 pointer-events-none" />
            <p className="font-serif text-lg md:text-xl text-[#3B0764] leading-relaxed italic font-normal">
              "{blog.excerpt}"
            </p>
          </div>
        )}

        {/* Main Article Body */}
        <article className="prose max-w-none text-slate-700 space-y-6">
          {renderFormattedContent(blog.content || blog.excerpt)}
        </article>

        {/* Article Footer / Share Bar */}
        <div className="mt-16 pt-8 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Share Publication:</span>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#0077b5] hover:border-transparent transition-all duration-200 flex items-center justify-center text-sm shadow-sm"
                title="Share on LinkedIn"
              >
                <FaLinkedin />
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`, "_blank")}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#1da1f2] hover:border-transparent transition-all duration-200 flex items-center justify-center text-sm shadow-sm"
                title="Share on Twitter"
              >
                <FaTwitter />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-[#1877f2] hover:border-transparent transition-all duration-200 flex items-center justify-center text-sm shadow-sm"
                title="Share on Facebook"
              >
                <FaFacebook />
              </button>
            </div>
          </div>

          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#581C87] hover:text-[#3B0764] transition-colors"
          >
            <span>Explore More Insights ↗</span>
          </Link>
        </div>

        {/* Call to Action Box */}
        <div className="mt-16 p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Require Legal Counsel on This Matter?
          </h3>
          <p className="text-slate-650 font-light max-w-xl mx-auto text-sm md:text-base mb-8">
            Our senior partners provide confidential executive consultations and strategic legal structuring tailored to your enterprise needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="w-full sm:w-auto bg-[#581C87] hover:bg-[#3B0764] text-white font-bold px-8 py-4 rounded-full uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <span>Schedule Consultation</span>
              <span>↗</span>
            </Link>
            <a
              href="tel:+8801700000000"
              className="w-full sm:w-auto bg-white border border-slate-350 text-slate-800 hover:bg-slate-50 font-bold px-8 py-4 rounded-full uppercase tracking-wider text-xs transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <FaPhoneAlt className="text-xs text-[#581C87]" />
              <span>Direct Chamber Line</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
