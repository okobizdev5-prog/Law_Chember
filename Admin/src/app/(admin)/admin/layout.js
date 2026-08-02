"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  FaBalanceScale, 
  FaImage, 
  FaComments, 
  FaPhone, 
  FaImages, 
  FaNewspaper, 
  FaInbox, 
  FaGlobe, 
  FaUserShield,
  FaHome,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard Overview",
      href: "/admin",
      icon: <FaHome />,
    },
    {
      name: "Legal Inquiries",
      href: "/admin/legal-inquiry",
      icon: <FaInbox />,
    },
    {
      name: "Practice Areas",
      href: "/admin/categories",
      icon: <FaBalanceScale />,
    },
    {
      name: "Hero Banners",
      href: "/admin/banners",
      icon: <FaImage />,
    },
    {
      name: "Chat Widget",
      href: "/admin/chat-widget",
      icon: <FaComments />,
    },
    {
      name: "Consultation Number",
      href: "/admin/consultation",
      icon: <FaPhone />,
    },
    {
      name: "Chamber Gallery",
      href: "/admin/gallery",
      icon: <FaImages />,
    },
    {
      name: "Insights & Blogs",
      href: "/admin/blogs",
      icon: <FaNewspaper />,
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Responsive Left Sidebar */}
      <aside className={`w-72 bg-[#0D162E] text-slate-300 border-r border-[#D4AF37]/20 flex flex-col fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        
        {/* Sidebar Header / Logo with Mobile Close Button */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#D4AF37]/15 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FCE6A8] to-[#D4AF37] flex items-center justify-center text-[#0D162E] text-xl font-bold shadow-md">
              ⚖️
            </div>
            <div>
              <h2 className="font-serif text-white font-bold text-sm tracking-wide leading-tight">
                Nasrullah Law
              </h2>
              <p className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase mt-0.5">
                Admin Console
              </p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 -mr-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
            aria-label="Close Sidebar"
          >
            <FaTimes className="text-base" />
          </button>
        </div>

        {/* User Identity Info */}
        <div className="px-6 py-4 bg-[#080E1E]/50 border-b border-[#D4AF37]/10 flex items-center gap-3.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center text-white">
            <FaUserShield className="text-sm text-[#D4AF37]" />
          </div>
          <div>
            <span className="block text-xs font-semibold text-white">Senior Administrator</span>
            <span className="block text-[10px] text-gray-400">Authenticated Access</span>
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Auto-close sidebar on mobile after clicking
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 group ${
                  isActive
                    ? "bg-[#D4AF37]/15 text-[#FCE6A8] border border-[#D4AF37]/35 shadow-sm"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className={`text-base transition-colors duration-200 ${
                  isActive ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-[#D4AF37]"
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Link (Back to live site) */}
        <div className="p-4 border-t border-[#D4AF37]/15 bg-[#080E1E]/40 shrink-0">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition duration-200"
          >
            <FaGlobe className="text-[#D4AF37]" />
            Go to Live Website ↗
          </a>
        </div>

      </aside>

      {/* Main Right Content Section (Responsive Margin) */}
      <main className="flex-1 lg:pl-72 w-full min-h-screen flex flex-col overflow-x-hidden">
        
        {/* Unified Top Navigation Header with Hamburger Toggle */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20 shadow-sm">
          
          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile/Tablet */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-[#EA7A00] focus:outline-none rounded-xl hover:bg-gray-55 transition-colors cursor-pointer"
              aria-label="Open Sidebar"
            >
              <FaBars className="text-lg" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">System Status:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Sync Active
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 truncate max-w-[180px] sm:max-w-none">
              Nasrullah Law Associates
            </span>
          </div>
        </header>

        {/* Content Body (Responsive Padding) */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
          {children}
        </div>

      </main>

      {/* Global Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
    </div>
  );
}
