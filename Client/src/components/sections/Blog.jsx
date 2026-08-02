"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaUserTie, FaClock, FaArrowRight, FaBookOpen } from "react-icons/fa";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load blogs from server:", err.message || err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="min-h-0 lg:min-h-[calc(100vh-80px)] scroll-mt-[76px] flex flex-col justify-center py-10 sm:py-16 md:py-24 bg-white border-t border-slate-100 relative w-full overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-[#002855]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            Jurisprudence & Analysis
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-wide">
            Legal Insights & Chamber Publications
          </h2>
          <span className="gold-divider-center mt-4"></span>
          <p className="mt-4 text-base md:text-lg text-slate-650 leading-relaxed font-light">
            Authoritative commentary, statutory reviews, and courtroom strategies written by our senior advocates and constitutional specialists.
          </p>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-50 border border-slate-200 rounded-3xl h-96 animate-pulse flex flex-col justify-center items-center">
                <FaBookOpen className="text-3xl text-[#D4AF37]/35 mb-3 animate-bounce" />
                <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Loading Publication...</span>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 max-w-2xl mx-auto p-8">
            <FaBookOpen className="text-5xl text-[#D4AF37]/50 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-slate-900">No Publications Currently Available</h3>
            <p className="text-slate-600 text-sm mt-2">Our legal team is currently preparing new case analyses and statutory reviews. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {(showAll ? blogs : blogs.slice(0, 3)).map((blog) => (
              <article
                key={blog._id || blog.slug}
                className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden group flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 relative"
              >
                {/* Top metallic bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient z-20 opacity-70 group-hover:opacity-100 transition-opacity"></div>

                {/* Card Top / Image */}
                <div>
                  <Link href={`/blog/${blog.slug || blog._id}`} className="block relative h-40 sm:h-48 md:h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={blog.image || "/assets/BImg1.jpg"}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-purple-50 border border-purple-100 px-3 py-1 sm:px-3.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#581C87] shadow-sm">
                      {blog.category || "Legal Advisory"}
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-7">
                    <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-slate-550 font-medium mb-2 sm:mb-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-[#581C87] font-semibold">
                        <FaUserTie className="text-[10px] sm:text-xs" />
                        {blog.author || "Senior Advocate"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-[#581C87]/80" />
                        {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-[#581C87]/80" />
                        {blog.readTime || "5 min read"}
                      </span>
                    </div>

                    <Link href={`/blog/${blog.slug || blog._id}`}>
                      <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-slate-900 group-hover:text-[#581C87] transition-colors duration-200 leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="mt-2 md:mt-3 text-xs sm:text-sm text-slate-600 font-light line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.content}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-5 pb-5 pt-3 sm:px-7 sm:pb-7 sm:pt-4 border-t border-slate-150 flex items-center justify-between mt-auto">
                  <Link
                    href={`/blog/${blog.slug || blog._id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#581C87] group-hover:text-[#3B0764] transition-all duration-300 group-hover:gap-3"
                  >
                    <span>Read Full Article</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>

                  <span className="text-[10px] text-gray-500 font-mono uppercase">ID: {(blog._id || "001").toString().slice(-4)}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && blogs.length > 3 && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#581C87] hover:bg-[#3B0764] text-white px-8 py-3.5 sm:px-9 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-300 hover:scale-105"
            >
              {showAll ? "Show Less Publications" : "View All Publications"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
