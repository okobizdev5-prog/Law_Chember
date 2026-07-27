"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaNewspaper, FaCalendarAlt, FaUserTie } from "react-icons/fa";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "Adv. Tariq Rahman",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "5 min read",
    category: "Corporate Arbitration",
    image: "",
    excerpt: "",
    content: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blog posts. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && !editingId) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      return updated;
    });
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      author: blog.author || "Adv. Tariq Rahman",
      date: blog.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: blog.readTime || "5 min read",
      category: blog.category || "Corporate Arbitration",
      image: blog.image || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      author: "Adv. Tariq Rahman",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read",
      category: "Corporate Arbitration",
      image: "",
      excerpt: "",
      content: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/blogs/${editingId}`
        : "http://localhost:5000/blogs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Blog post updated successfully!" : "New blog post published!");
        handleCancelEdit();
        fetchBlogs();
      } else {
        toast.error("Failed to save blog post");
      }
    } catch (error) {
      toast.error("Error communicating with server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) return;
    try {
      const res = await fetch(`http://localhost:5000/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog post deleted");
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog post");
      }
    } catch (error) {
      toast.error("Error deleting blog post");
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
          <h1 className="text-3xl font-bold text-gray-800">Legal Insights & Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">Publish authoritative legal articles, case updates, and jurisprudence commentary.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b flex items-center gap-2">
            <FaNewspaper className="text-[#EA7A00]" />
            {editingId ? "Edit Blog Post" : "Write New Article"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Article Title *</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Navigating Commercial Arbitration..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-slug"
                  className="w-full border border-gray-300 rounded-xl p-3 text-xs text-gray-500 focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Corporate Law"
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Author Name *</label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Adv. Tariq Rahman"
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g. 5 min read"
                  className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Cover Image URL *</label>
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
                <div className="mt-2 h-32 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }} />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Excerpt / Short Summary *</label>
              <textarea
                name="excerpt"
                rows={2}
                required
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief introductory summary displayed on the card..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Full Article Content (Markdown Supported) *</label>
              <textarea
                name="content"
                rows={8}
                required
                value={formData.content}
                onChange={handleChange}
                placeholder="Write the full article here. Use paragraphs, bullet points, and headers..."
                className="w-full border border-gray-300 rounded-xl p-3 text-sm font-mono focus:ring-2 focus:ring-[#EA7A00]/20 focus:border-[#EA7A00] outline-none transition resize-y"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#EA7A00] hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition shadow-sm text-sm flex items-center justify-center gap-2"
              >
                <FaPlus className="text-xs" />
                {editingId ? "Update Blog Post" : "Publish Article"}
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

        {/* Blogs List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 pb-2 border-b flex items-center justify-between">
            <span>Published Articles ({blogs.length})</span>
            <span className="text-xs font-normal text-gray-500">Most Recent First</span>
          </h2>

          {loading ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border">Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div className="py-12 text-center text-gray-500 bg-white rounded-2xl border">No articles published yet. Write your first post on the left!</div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog._id || blog.slug}
                  className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5 items-stretch ${
                    editingId === blog._id ? "border-[#EA7A00] ring-2 ring-[#EA7A00]/20" : "border-gray-200"
                  }`}
                >
                  <div className="w-full md:w-44 h-36 md:h-auto rounded-xl overflow-hidden bg-gray-100 shrink-0 relative group">
                    <img
                      src={blog.image || "/assets/BImg1.jpg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = "/assets/BImg1.jpg"; }}
                    />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {blog.category || "Legal"}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-1.5 flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-gray-600">
                          <FaUserTie className="text-[#EA7A00]" />
                          {blog.author || "Senior Advocate"}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {blog.date}
                        </span>
                        <span>•</span>
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-[#EA7A00] transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {blog.excerpt || blog.content}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`http://localhost:3000/blog/${blog.slug || blog._id}`}
                        target="_blank"
                        className="text-xs text-[#EA7A00] font-bold hover:underline"
                      >
                        Preview Live Page ↗
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Article"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Article"
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
