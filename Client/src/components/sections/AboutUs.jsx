"use client";

import {
  FaAward,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaAward />,
    title: "Expert Courtroom Advocacy",
    description:
      "Decades of distinguished courtroom experience with mastery over complex statutory procedures, high-stakes litigation, and authoritative client defense.",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Client-Centric Strategy",
    description:
      "We conduct exhaustive case assessments, prioritize absolute attorney-client confidentiality, and engineer tailored legal solutions focused on definitive success.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Uncompromising Integrity",
    description:
      "A proven track record of securing decisive verdicts across civil litigation, corporate governance, constitutional petitions, and private arbitration.",
  },
];

const AboutUs = () => {
  return (
    <section id="about" className="min-h-0 lg:min-h-[calc(100vh-80px)] scroll-mt-[76px] flex items-center justify-center py-10 sm:py-16 md:py-24 bg-white border-t border-slate-100 relative w-full overflow-hidden">
      {/* Subtle background glow for executive depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-purple-50 border border-purple-100 text-[#581C87] px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            About Our Chamber
          </span>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-wide">
            Committed to Justice & Excellence
          </h2>

          <span className="gold-divider-center"></span>

          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed font-light">
            We deliver uncompromising legal advocacy and strategic counsel, guided by decades of courtroom excellence and a relentless commitment to safeguarding your legal and financial interests.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-slate-50 border border-slate-200/60 rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Subtle top gold accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient opacity-70 group-hover:opacity-100 transition-opacity"></div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-white border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-2xl group-hover:border-[#581C87] group-hover:text-[#581C87] group-hover:scale-105 transition-all duration-300 shadow-sm">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif mt-6 text-xl md:text-2xl font-bold text-slate-900 group-hover:text-[#581C87] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-slate-650 leading-relaxed text-sm md:text-base font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;