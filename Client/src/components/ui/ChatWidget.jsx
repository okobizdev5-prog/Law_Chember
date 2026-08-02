"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaComments, FaTimes } from "react-icons/fa";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    whatsapp: "https://wa.me/8801700000000",
    messenger: "https://m.me/yourpage",
    enabled: true,
  });

  useEffect(() => {
    fetch("http://localhost:5000/settings/chat")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data) {
          setSettings({
            whatsapp: data.whatsapp || "",
            messenger: data.messenger || "",
            enabled: data.enabled !== undefined ? data.enabled : true,
          });
        }
      })
      .catch((err) => {
        console.warn("Could not load chat settings from server:", err.message || err);
      });
  }, []);

  if (!settings.enabled) return null;

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Social Buttons List that pop upwards serially */}
      <div className="flex flex-col items-end gap-3 mb-3 pointer-events-none">

        {/* Messenger */}
        {settings.messenger && (
          <a
            href={settings.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 transition-all duration-300 ease-out transform pointer-events-auto ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100 delay-75"
                : "opacity-0 translate-y-6 scale-50 pointer-events-none"
            }`}
            title="Chat on Messenger"
          >
            <span className="bg-[#080E1E] border border-[#D4AF37]/35 text-[#FCE6A8] shadow-gold text-xs font-bold px-3 py-1.5 rounded-lg">
              Messenger
            </span>
            <div className="w-12 h-12 rounded-full bg-[#0084FF] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform duration-200">
              <FaFacebookMessenger />
            </div>
          </a>
        )}

        {/* WhatsApp */}
        {settings.whatsapp && (
          <a
            href={settings.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 transition-all duration-300 ease-out transform pointer-events-auto ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100 delay-0"
                : "opacity-0 translate-y-3 scale-50 pointer-events-none"
            }`}
            title="Chat on WhatsApp"
          >
            <span className="bg-[#080E1E] border border-[#D4AF37]/35 text-[#FCE6A8] shadow-gold text-xs font-bold px-3 py-1.5 rounded-lg">
              WhatsApp
            </span>
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform duration-200">
              <FaWhatsapp />
            </div>
          </a>
        )}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleChat}
        aria-label="Toggle Support Chat"
        className="w-14 h-14 rounded-full bg-[#00BFFF] hover:opacity-95 text-[#080E1E] flex items-center justify-center text-2xl shadow-gold-lg hover:scale-105 transition-all duration-300 focus:outline-none relative border border-[#FCE6A8]/40"
      >
        <div className={`absolute transition-all duration-300 transform ${isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
          <FaComments />
        </div>
        <div className={`absolute transition-all duration-300 transform ${isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}>
          <FaTimes />
        </div>
        
        {/* Notification dot when closed */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#080E1E] rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
}
