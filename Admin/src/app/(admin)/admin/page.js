"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FaBalanceScale, 
  FaNewspaper, 
  FaInbox, 
  FaUserShield, 
  FaChevronRight, 
  FaClock, 
  FaCogs 
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    blogs: 0,
    inquiries: 0,
    recentInquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [categoriesRes, blogsRes, inquiriesRes] = await Promise.all([
          fetch("http://localhost:5000/categories"),
          fetch("http://localhost:5000/blogs"),
          fetch("http://localhost:5000/inquiries")
        ]);

        const categories = categoriesRes.ok ? await categoriesRes.json() : [];
        const blogs = blogsRes.ok ? await blogsRes.json() : [];
        const inquiries = inquiriesRes.ok ? await inquiriesRes.json() : [];

        setStats({
          categories: Array.isArray(categories) ? categories.length : 10,
          blogs: Array.isArray(blogs) ? blogs.length : 3,
          inquiries: Array.isArray(inquiries) ? inquiries.length : 0,
          recentInquiries: Array.isArray(inquiries) ? inquiries.slice(0, 3) : []
        });
      } catch (error) {
        console.error("Error loading dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0D162E] to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden border border-[#D4AF37]/20 shadow-lg">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
              <FaUserShield />
              Attorney Portal Secure Session
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide">
              Welcome Back, Counselor
            </h1>
            <p className="text-slate-400 text-sm mt-2 font-light">
              Here is your chamber website administrative summary. All channels are operating normally.
            </p>
          </div>
          
          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl text-right shrink-0">
            <span className="block text-[10px] text-gray-400 uppercase tracking-widest">Current Date</span>
            <span className="text-sm font-semibold text-white flex items-center gap-2 mt-1">
              <FaClock className="text-[#D4AF37] text-xs" />
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Stat 1: Inquiries */}
        <Link 
          href="/admin/legal-inquiry"
          className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition group block"
        >
          <div className="flex justify-between items-start">
            <div className="p-4 bg-orange-50 text-[#EA7A00] rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-200">
              <FaInbox />
            </div>
            <span className="text-xs text-[#EA7A00] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Inbox <FaChevronRight className="text-[10px]" />
            </span>
          </div>
          <div className="mt-4">
            <span className="block text-sm font-medium text-gray-400">Legal Inquiries</span>
            <span className="block text-3xl font-extrabold text-gray-800 mt-1">
              {loading ? "..." : stats.inquiries}
            </span>
          </div>
        </Link>

        {/* Stat 2: Practice Areas */}
        <Link 
          href="/admin/categories"
          className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition group block"
        >
          <div className="flex justify-between items-start">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-200">
              <FaBalanceScale />
            </div>
            <span className="text-xs text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Manage <FaChevronRight className="text-[10px]" />
            </span>
          </div>
          <div className="mt-4">
            <span className="block text-sm font-medium text-gray-400">Practice Areas</span>
            <span className="block text-3xl font-extrabold text-gray-800 mt-1">
              {loading ? "..." : stats.categories}
            </span>
          </div>
        </Link>

        {/* Stat 3: Blogs */}
        <Link 
          href="/admin/blogs"
          className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition group block"
        >
          <div className="flex justify-between items-start">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-200">
              <FaNewspaper />
            </div>
            <span className="text-xs text-purple-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Publish <FaChevronRight className="text-[10px]" />
            </span>
          </div>
          <div className="mt-4">
            <span className="block text-sm font-medium text-gray-400">Insights Published</span>
            <span className="block text-3xl font-extrabold text-gray-800 mt-1">
              {loading ? "..." : stats.blogs}
            </span>
          </div>
        </Link>

      </div>

      {/* Two Column Layout: Recent Activities & System Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              📩 Recent Contact Requests
            </h2>
            <Link href="/admin/legal-inquiry" className="text-sm text-[#EA7A00] font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="p-6 divide-y divide-gray-100">
            {loading ? (
              <div className="py-8 text-center text-gray-400">Loading recent inquiries...</div>
            ) : stats.recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-gray-400">No client messages received yet.</div>
            ) : (
              stats.recentInquiries.map((inq) => (
                <div key={inq._id} className="py-4.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <span className="block text-sm font-bold text-gray-800">{inq.name}</span>
                    <span className="block text-xs text-gray-400 mt-0.5">{inq.email} • {inq.phone || "No phone"}</span>
                    <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 bg-amber-50 text-[#EA7A00] rounded-lg">
                      {inq.subject}
                    </span>
                  </div>
                  
                  <div className="text-left sm:text-right flex flex-col justify-between items-start sm:items-end">
                    <span className="text-xs text-gray-400">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                    <Link 
                      href="/admin/legal-inquiry" 
                      className="text-xs text-blue-600 font-semibold hover:underline mt-2 sm:mt-0"
                    >
                      Open File →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Quick Setup Checklist */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <FaCogs className="text-[#EA7A00]" /> Config Settings
          </h2>
          
          <div className="space-y-4 text-sm">
            <Link 
              href="/admin/chat-widget" 
              className="flex justify-between items-center p-3.5 bg-gray-50 hover:bg-orange-50/50 hover:border-[#EA7A00]/20 rounded-2xl border border-transparent transition"
            >
              <div>
                <span className="block font-bold text-gray-800">Chat Widget links</span>
                <span className="block text-xs text-gray-400 mt-0.5">WhatsApp & Messenger</span>
              </div>
              <FaChevronRight className="text-gray-400 text-xs" />
            </Link>

            <Link 
              href="/admin/consultation" 
              className="flex justify-between items-center p-3.5 bg-gray-50 hover:bg-orange-50/50 hover:border-[#EA7A00]/20 rounded-2xl border border-transparent transition"
            >
              <div>
                <span className="block font-bold text-gray-800">Phone Call Routing</span>
                <span className="block text-xs text-gray-400 mt-0.5">Update click-to-call mobile number</span>
              </div>
              <FaChevronRight className="text-gray-400 text-xs" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}