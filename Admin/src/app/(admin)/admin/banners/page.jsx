"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaBalanceScale, FaEdit, FaTrash, FaArrowLeft, FaImage } from "react-icons/fa";

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    highlight: "",
    description: "",
    image: null,
    imageUrl: "",
  });

  const fetchBanners = async () => {
    try {
      const res = await fetch("http://localhost:5000/banners");
      if (!res.ok) throw new Error("Failed to fetch banners");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      toast.error("Failed to fetch banners. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({
      badge: banner.badge || "",
      title: banner.title || "",
      highlight: banner.highlight || "",
      description: banner.description || "",
      image: null,
      imageUrl: banner.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      badge: "",
      title: "",
      highlight: "",
      description: "",
      image: null,
      imageUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("badge", formData.badge);
    data.append("title", formData.title);
    data.append("highlight", formData.highlight);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    } else if (formData.imageUrl) {
      data.append("image", formData.imageUrl);
    }

    const url = editingId
      ? `http://localhost:5000/banners/${editingId}`
      : "http://localhost:5000/banners";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: data,
      });

      if (res.ok) {
        toast.success(editingId ? "Banner updated successfully!" : "Banner created successfully!");
        handleCancelEdit();
        fetchBanners();
      } else {
        toast.error("Failed to save banner");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this banner slide?")) return;
    try {
      const res = await fetch(`http://localhost:5000/banners/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Banner deleted");
        if (editingId === id) handleCancelEdit();
        fetchBanners();
      } else {
        toast.error("Failed to delete banner");
      }
    } catch (error) {
      toast.error("Error deleting banner");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-[#EA7A00] hover:underline inline-flex items-center gap-2 font-medium">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Hero Banners</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-1 h-fit border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingId ? "Edit Banner Slide" : "Add New Slide"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Badge Text
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="e.g. Experienced Advocate"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Title Text
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                placeholder="e.g. Committed To"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highlight Text (Orange Color)
              </label>
              <input
                type="text"
                name="highlight"
                value={formData.highlight}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm text-[#EA7A00] font-semibold"
                placeholder="e.g. Justice & Integrity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition text-sm"
                rows={3}
                placeholder="e.g. Every case is handled with professionalism, strategic planning, and complete confidentiality."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-[#EA7A00] hover:file:bg-orange-100 border rounded-lg p-1.5"
                accept="image/*"
              />
              <div className="mt-2 text-xs text-gray-500">
                Or enter Image URL / Path:
              </div>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg p-2 text-xs focus:ring-2 focus:ring-[#EA7A00]/20 outline-none"
                placeholder="/assets/BImg1.jpg or https://..."
              />
              {formData.imageUrl && !formData.image && (
                <div className="mt-2 relative h-20 w-full rounded-lg overflow-hidden border">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#EA7A00] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition shadow-sm"
            >
              {editingId ? "Update Banner Slide" : "Save Banner Slide"}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 text-gray-800">
            Existing Banner Slides ({banners.length})
          </h2>
          {loading ? (
            <div className="py-8 text-center text-gray-500">Loading banner slides...</div>
          ) : banners.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No banner slides found.</div>
          ) : (
            <div className="space-y-4">
              {banners.map((banner) => (
                <div
                  key={banner._id || banner.title}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border transition ${
                    editingId === banner._id ? "border-[#EA7A00] bg-orange-50/30" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden bg-slate-900 relative shrink-0">
                    <img
                      src={banner.image || "/assets/BImg1.jpg"}
                      alt="Banner background"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-1.5 bg-[#EA7A00]/10 text-[#EA7A00] px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1">
                      <FaBalanceScale className="text-xs" />
                      {banner.badge}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {banner.title}{" "}
                      <span className="text-[#EA7A00]">{banner.highlight}</span>
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                      {banner.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
