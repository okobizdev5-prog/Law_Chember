"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-55 text-slate-700 border-t border-slate-200 relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Logo & About */}
          <div className="lg:col-span-5">
            <Link href="/#home" className="flex items-center gap-3.5 group">
              <Image
                src="/logo_transparent.png"
                alt="Nasrullah Law Associates Logo"
                width={50}
                height={50}
              />
              <div>
                <h2 className="font-serif text-xl font-bold text-[#3B0764] group-hover:text-[#581C87] transition-colors">
                  Nasrullah Law Associates
                </h2>
                <p className="text-[#4C1D95] text-[10px] font-bold tracking-[0.18em] uppercase">
                  Advocates & Legal Consultants
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-slate-600 max-w-md font-light">
              Providing distinguished legal counsel, corporate consultation, and authoritative courtroom advocacy with integrity and dedication. Our primary objective is to safeguard your constitutional and commercial rights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-slate-900 text-base font-bold mb-5 border-l-2 border-[#D4AF37] pl-3">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/#home" className="hover:text-[#581C87] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#581C87] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#581C87] transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#581C87] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-slate-900 text-base font-bold mb-5 border-l-2 border-[#D4AF37] pl-3">
              Chamber Contact
            </h3>

            <div className="space-y-3.5 text-sm font-light">
            

              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#D4AF37] mt-1 flex-shrink-0 text-xs" />

                <p>
                  <a
                    href="tel:+8801911796813"
                    className="hover:text-[#581C87] transition-colors"
                  >
                    +880 1911-796813
                  </a>
                  {', '}
                    <a
                      href="tel:+8801711201339"
                      className="hover:text-[#581C87] transition-colors"
                    >
                      +880 1711-201339
                    </a>
                  </p>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#D4AF37] mt-1 flex-shrink-0 text-xs" />
                <a href="mailto:adv.quazinasrullah@gmail.com" className="hover:text-[#581C87] transition-colors">
                  adv.quazinasrullah@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-1 flex-shrink-0 text-xs" />
                <span className="leading-relaxed">
                  Advocate, Supreme Court of Bangladesh <br />
                  (High Court Division), Dhaka
                </span>
                
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-7">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-[#581C87] hover:text-[#581C87] hover:scale-110 flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-[#581C87] hover:text-[#581C87] hover:scale-110 flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-[#581C87] hover:text-[#581C87] hover:scale-110 flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
                aria-label="Twitter"
              >
                <FaTwitter />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 hover:border-[#581C87] hover:text-[#581C87] hover:scale-110 flex items-center justify-center transition-all duration-300 text-sm shadow-sm"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-light">
          <p>
            © {new Date().getFullYear()} Nasrullah Law Associates. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/#home" className="hover:text-[#581C87] transition-colors">Privacy Policy</Link>
            <Link href="/#home" className="hover:text-[#581C87] transition-colors">Terms of Service</Link>
            <Link href="/#home" className="hover:text-[#581C87] transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;