"use client";

import { useState } from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="min-h-0 lg:min-h-[calc(100vh-80px)] scroll-mt-[76px] flex items-center justify-center py-10 sm:py-16 md:py-24 bg-white border-t border-slate-100 relative w-full overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            Confidential Inquiry
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-wide">
            Get In Touch With Our Chamber
          </h2>

          <span className="gold-divider-center"></span>

          <p className="mt-6 text-base md:text-lg text-slate-650 leading-relaxed font-light">
            Whether you require immediate courtroom intervention, corporate legal counseling, or private dispute resolution, our senior associates are prepared to assist.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-12 md:mt-16 items-start">
          {/* Left Side: Info Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 h-fit">
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 md:p-5 group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg group-hover:border-[#581C87] group-hover:text-[#581C87] group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#581C87] transition-colors">Direct Telephone</h3>
                <p className="text-slate-600 mt-0.5 text-[11px] sm:text-xs font-light break-all">+880 1700-000000</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 md:p-5 group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg group-hover:border-[#581C87] group-hover:text-[#581C87] group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#581C87] transition-colors">Chamber Email</h3>
                <p className="text-slate-600 mt-0.5 text-[11px] sm:text-xs font-light break-all">info@jurispoint.com</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 md:p-5 group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg group-hover:border-[#581C87] group-hover:text-[#581C87] group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#581C87] transition-colors">Chamber Address</h3>
                <p className="text-slate-600 mt-0.5 text-[11px] sm:text-xs font-light leading-snug">
                  Supreme Court Bar, Dhaka-1000
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 md:p-5 group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-base sm:text-lg group-hover:border-[#581C87] group-hover:text-[#581C87] group-hover:scale-105 transition-all duration-300 shadow-sm shrink-0">
                <FaClock />
              </div>
              <div>
                <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-slate-900 group-hover:text-[#581C87] transition-colors">Chamber Hours</h3>
                <p className="text-slate-600 mt-0.5 text-[11px] sm:text-xs font-light leading-snug">
                  Sat – Thu: 9AM – 7PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-md">
            {/* Top gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gold-gradient"></div>

            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Submit Legal Inquiry
            </h3>
            <p className="text-[#581C87] text-[10px] sm:text-xs font-semibold tracking-wide uppercase mb-5 sm:mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#581C87] inline-block animate-pulse"></span>
              Protected by Attorney-Client Confidentiality
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-700 mb-1 sm:mb-2 font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Adv. John Doe"
                    className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-[#581C87] focus:ring-1 focus:ring-[#581C87] transition-all text-xs sm:text-sm shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-700 mb-1 sm:mb-2 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-[#581C87] focus:ring-1 focus:ring-[#581C87] transition-all text-xs sm:text-sm shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-700 mb-1 sm:mb-2 font-semibold">Telephone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1700..."
                    className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-[#581C87] focus:ring-1 focus:ring-[#581C87] transition-all text-xs sm:text-sm shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-slate-700 mb-1 sm:mb-2 font-semibold">Legal Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Commercial Arbitration / Litigation"
                    className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-[#581C87] focus:ring-1 focus:ring-[#581C87] transition-all text-xs sm:text-sm shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-700 mb-1 sm:mb-2 font-semibold">Case Summary / Message *</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Please provide a brief outline of the legal matter, jurisdictional details, and timelines..."
                  className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3.5 text-slate-900 placeholder-slate-400 outline-none resize-none focus:border-[#581C87] focus:ring-1 focus:ring-[#581C87] transition-all text-xs sm:text-sm shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#581C87] hover:bg-[#3B0764] text-white font-bold py-3 sm:py-4 rounded-xl uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:scale-[1.01] mt-2"
              >
                Submit Legal Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;