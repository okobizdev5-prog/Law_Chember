"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaArrowLeft } from "react-icons/fa";

export default function ConsultationPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/settings/consultation")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP status error");
        return res.json();
      })
      .then((data) => {
        if (data && data.phoneNumber) {
          setPhoneNumber(data.phoneNumber);
        }
      })
      .catch((err) => {
        toast.error("Failed to load consultation settings. Is backend running?");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("http://localhost:5000/settings/consultation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      if (res.ok) {
        toast.success("Consultation phone number updated successfully!");
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
          <FaPhoneAlt />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Consultation Settings</h1>
          <p className="text-gray-500 text-sm">Configure the main phone number visitors call for a Free Consultation.</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading settings...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consultation Phone Number
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="+8801700000000"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Use a format that works directly with telephone dialing links, including the country code (e.g. <code>+8801700000000</code>).
              </p>
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-8 py-3 bg-[#EA7A00] hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-md"
              >
                {saving ? "Saving Changes..." : "Save Phone Number"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
