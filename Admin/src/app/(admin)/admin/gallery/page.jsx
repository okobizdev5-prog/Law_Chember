"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaImage, FaCalendarAlt, FaSortNumericDown } from "react-icons/fa";

export default function GalleryAdminPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    category: "Courtroom",
    order: 1,
  });

  const fetchPhotos = async () => {
    try {
      const res = await fetch("http://localhost:5000/gallery");
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      toast.error("Failed to load gallery photos. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? parseInt(value) || 1 : value,
    }));
  };

  const handleEdit = (photo) => {
    setEditingId(photo._id);
    setFormData({
      title: photo.title || "",
      caption: photo.caption || "",
      image: photo.image || "",
      date: photo.date || new Date().toISOString().split("T")[0],
      category: photo.category || "Courtroom",
      order: photo.order || 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      caption: "",
      image: "",
      date: new Date().toISOString().split("T")[0],
      category: "Courtroom",
      order: photos.length + 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/gallery/${editingId}`
        : "http://localhost:5000/gallery";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Photo updated successfully!" : "Photo added to gallery!");
        handleCancelEdit();
        fetchPhotos();
      } else {
        toast.error("Failed to save photo");
      }
    } catch (error) {
      toast.error("Error communicating with server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const res = await fetch(`http://localhost:5000/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Photo deleted");
        fetchPhotos();
      } else {
        toast.error("Failed to delete photo");
      }
    } catch (error) {
      toast.error("Error deleting photo");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-[#EA7A00] hover:underline inline-flex items-center gap-2 font-medium">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Chamber Gallery Management</h1>
          <p className="text-gray-500 text-sm mt-1">Upload and organize courtroom photos and events for the horizontal scrolling gallery.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
            <FaImage className="text-[#EA7A00]" />
            {editingId ? "Edit Gallery Photo" : "Add New Photo"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Photo Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Supreme Court Advocacy"
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Image URL *</label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
              />
              {formData.image && (
                <div className="mt-2 h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Category / Tag</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Courtroom"
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Display Order</label>
                <input
                  type="number"
                  name="order"
                  min="1"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Caption / Short Description *</label>
              <textarea
                name="caption"
                rows={3}
                required
                value={formData.caption}
                onChange={handleChange}
                placeholder="Brief outline of the photo or event..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#EA7A00] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition shadow-sm text-sm flex items-center justify-center gap-2"
              >
                <FaPlus className="text-xs" />
                {editingId ? "Update Photo" : "Add to Gallery"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl transition text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Photos Grid */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 pb-2 border-b flex items-center justify-between">
            <span>Existing Gallery ({photos.length})</span>
            <span className="text-xs font-normal text-gray-500">Sorted by Order</span>
          </h2>

          {loading ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border">Loading gallery photos...</div>
          ) : photos.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border">No gallery photos found. Add one on the left!</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo._id || photo.title}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                    editingId === photo._id ? "border-[#EA7A00] ring-2 ring-[#EA7A00]/20" : "border-gray-200"
                  }`}
                >
                  <div className="relative h-44 bg-gray-100 overflow-hidden group">
                    <img
                      src={photo.image || "/assets/BImg1.jpg"}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {photo.category || "Courtroom"}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-[#EA7A00] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                      #{photo.order || 1}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base leading-snug">{photo.title}</h3>
                      <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{photo.caption}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400" />
                        {photo.date || "2025"}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(photo)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(photo._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
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
