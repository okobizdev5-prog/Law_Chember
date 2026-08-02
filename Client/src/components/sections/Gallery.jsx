"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaChevronLeft, FaChevronRight, FaTimes, FaCamera, FaCalendarAlt, FaSearchPlus } from "react-icons/fa";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/gallery")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPhotos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load gallery from server:", err.message || err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="gallery" className="min-h-0 lg:min-h-[calc(100vh-80px)] scroll-mt-[76px] flex flex-col justify-center py-10 sm:py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative w-full overflow-hidden">
      {/* Ambient gold glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-6 sm:mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            Chamber Chronicle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-wide">
            Our Gallery & Milestones
          </h2>
          <span className="gold-divider mt-4"></span>
          <p className="mt-4 text-base md:text-lg text-slate-650 leading-relaxed font-light max-w-2xl">
            A visual retrospective of our courtroom triumphs, executive chamber proceedings, international arbitration summits, and pro bono legal initiatives.
          </p>
        </div>

        {/* Custom Navigation Arrows */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0 mt-4 md:mt-0">
          <button
            ref={prevRef}
            aria-label="Previous Slide"
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-250 text-slate-700 hover:border-[#581C87] hover:text-[#581C87] transition-all duration-300 flex items-center justify-center text-sm sm:text-lg shadow-sm hover:scale-110"
          >
            <FaChevronLeft />
          </button>
          <button
            ref={nextRef}
            aria-label="Next Slide"
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-250 text-slate-700 hover:border-[#581C87] hover:text-[#581C87] transition-all duration-300 flex items-center justify-center text-sm sm:text-lg shadow-sm hover:scale-110"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Centered Horizontal Scrolling Carousel */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-80 w-full bg-white rounded-3xl border border-slate-200 animate-pulse">
            <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <FaCamera className="animate-bounce text-lg" /> Loading Chamber Gallery...
            </span>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 w-full bg-white rounded-3xl border border-slate-200 text-center p-8">
            <FaCamera className="text-4xl text-[#D4AF37]/50 mb-3" />
            <p className="text-slate-900 font-serif text-xl">Gallery currently updating</p>
            <p className="text-slate-600 text-sm mt-1">Please check back soon for courtroom photos and chamber highlights.</p>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            centeredSlides={true}
            loop={photos.length >= 3}
            grabCursor={true}
            speed={600}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="pb-8 w-full"
          >
            {photos.map((photo) => (
              <SwiperSlide
                key={photo._id || photo.title}
                className="!w-[280px] sm:!w-[310px] md:!w-[340px] h-auto py-3 transition-all duration-300"
              >
                <div
                  onClick={() => setSelectedPhoto(photo)}
                  className="bg-white rounded-3xl overflow-hidden group flex flex-col h-[460px] cursor-pointer relative transition-all duration-500 hover:-translate-y-2 border border-slate-200 shadow-sm hover:shadow-md"
                >
                  {/* Top gold line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient z-20 opacity-80 group-hover:opacity-100 transition-opacity"></div>

                  {/* Image Area - Sleek 3:2 photography framing */}
                  <div className="relative w-full h-[52%] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={photo.image || "/assets/BImg1.jpg"}
                      alt={photo.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 bg-purple-50 border border-purple-100 px-3.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-widest text-[#581C87] z-10 shadow-sm">
                      {photo.category || "Chamber"}
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full bg-[#581C87] text-white flex items-center justify-center text-xl shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <FaSearchPlus />
                      </div>
                    </div>
                  </div>

                  {/* Content Area with ample breathing room */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#581C87] font-semibold uppercase tracking-wider mb-2">
                        <FaCalendarAlt className="text-xs" />
                        <span>{photo.date || "2025"}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#581C87] transition-colors duration-200 line-clamp-1">
                        {photo.title}
                      </h3>
                      <p className="text-slate-650 font-light text-sm mt-2 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-150 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#581C87] group-hover:text-[#3B0764] transition-colors">
                      <span>View Full Preview</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">↗</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Lightbox / Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close Preview"
              className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/80 border border-slate-200 text-slate-700 hover:border-[#581C87] hover:text-[#581C87] transition-all duration-200 flex items-center justify-center text-lg shadow-lg hover:scale-110"
            >
              <FaTimes />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center min-h-[280px] md:min-h-[450px] overflow-hidden">
              <img
                src={selectedPhoto.image || "/assets/BImg1.jpg"}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[70vh]"
                onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
              />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-2/5 p-5 sm:p-7 md:p-9 flex flex-col justify-between bg-white border-l border-slate-100 overflow-y-auto">
              <div>
                <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-4 shadow-sm">
                  {selectedPhoto.category || "Chamber Gallery"}
                </span>

                <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 tracking-wide leading-snug">
                  {selectedPhoto.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[#581C87] font-semibold uppercase tracking-wider mt-3 mb-6">
                  <FaCalendarAlt />
                  <span>Date: {selectedPhoto.date || "2025"}</span>
                </div>

                <div className="w-12 h-0.5 bg-gold-gradient mb-6"></div>

                <p className="text-slate-650 text-sm md:text-base leading-relaxed font-light">
                  {selectedPhoto.caption}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-150">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full bg-[#581C87] hover:bg-[#3B0764] text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
