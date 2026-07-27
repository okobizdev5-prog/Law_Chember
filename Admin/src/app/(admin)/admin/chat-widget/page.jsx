"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaWhatsapp, FaFacebookMessenger, FaInstagram, FaArrowLeft, FaComments } from "react-icons/fa";

export default function ChatWidgetPage() {
  const [formData, setFormData] = useState({
    whatsapp: "https://wa.me/8801700000000",
    messenger: "https://m.me/yourpage",
    instagram: "https://instagram.com/yourprofile",
    enabled: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/settings/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            whatsapp: data.whatsapp || "",
            messenger: data.messenger || "",
            instagram: data.instagram || "",
            enabled: data.enabled !== undefined ? data.enabled : true,
          });
        }
      })
      .catch((err) => {
        toast.error("Failed to load chat settings. Is backend running?");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("http://localhost:5000/settings/chat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Chat Widget settings updated successfully!");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-[#EA7A00] hover:underline inline-flex items-center gap-2 font-medium">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-orange-100 text-[#EA7A00] flex items-center justify-center rounded-xl text-2xl shadow-sm">
          <FaComments />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Social Chat Widget Settings</h1>
          <p className="text-gray-500 text-sm">Configure the floating chatbot links in the bottom right corner of the website.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading settings...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enable Widget Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="font-semibold text-gray-800 block">Enable Floating Chat Widget</span>
                <span className="text-xs text-gray-500">When disabled, the chatbot icon will be hidden from visitors.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EA7A00]"></div>
              </label>
            </div>

            {/* WhatsApp Link */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaWhatsapp className="text-green-500 text-lg" /> WhatsApp Link / URL
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="https://wa.me/8801700000000"
              />
              <p className="text-xs text-gray-400 mt-1">Example: https://wa.me/YOUR_PHONE_NUMBER (with country code, without + or spaces)</p>
            </div>

            {/* Messenger Link */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaFacebookMessenger className="text-blue-500 text-lg" /> Facebook Messenger Link / URL
              </label>
              <input
                type="text"
                name="messenger"
                value={formData.messenger}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="https://m.me/yourpage"
              />
              <p className="text-xs text-gray-400 mt-1">Example: https://m.me/yourfacebookpageusername or direct profile link</p>
            </div>

            {/* Instagram Link */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <FaInstagram className="text-pink-500 text-lg" /> Instagram Profile / DM Link
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="https://instagram.com/yourprofile"
              />
              <p className="text-xs text-gray-400 mt-1">Example: https://instagram.com/yourprofile or https://ig.me/m/yourprofile</p>
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-8 py-3 bg-[#EA7A00] hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md"
              >
                {saving ? "Saving Changes..." : "Save Chat Settings"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
