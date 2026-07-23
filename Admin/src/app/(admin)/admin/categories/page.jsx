"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBalanceScale, FaBriefcase, FaFileContract, FaUsers, FaShieldAlt, FaAward } from "react-icons/fa";

const getIcon = (iconStr) => {
  if (!iconStr) return <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">None</div>;
  if (iconStr.startsWith("http")) return <img src={iconStr} alt="icon" className="w-10 h-10 object-cover rounded" />;
  
  switch(iconStr) {
    case "FaBriefcase": return <div className="text-xl text-[#EA7A00]"><FaBriefcase /></div>;
    case "FaBalanceScale": return <div className="text-xl text-[#EA7A00]"><FaBalanceScale /></div>;
    case "FaFileContract": return <div className="text-xl text-[#EA7A00]"><FaFileContract /></div>;
    case "FaUsers": return <div className="text-xl text-[#EA7A00]"><FaUsers /></div>;
    case "FaShieldAlt": return <div className="text-xl text-[#EA7A00]"><FaShieldAlt /></div>;
    case "FaAward": return <div className="text-xl text-[#EA7A00]"><FaAward /></div>;
    default: return <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">None</div>;
  }
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    description: "",
    services: "",
    icon: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:5000/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setFormData({ ...formData, icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("shortDesc", formData.shortDesc);
    data.append("description", formData.description);
    
    // Convert comma-separated string to array
    const servicesArray = formData.services.split(",").map(s => s.trim()).filter(Boolean);
    data.append("services", JSON.stringify(servicesArray));
    
    if (formData.icon) {
      data.append("icon", formData.icon);
    }

    try {
      const res = await fetch("http://localhost:5000/categories", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        toast.success("Category created successfully");
        setFormData({ title: "", shortDesc: "", description: "", services: "", icon: null });
        fetchCategories(); // Refresh list
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`http://localhost:5000/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Category deleted");
        fetchCategories();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Practice Areas (Categories)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-1 h-fit">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Add New Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200" placeholder="e.g. Cyber Law" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea name="shortDesc" value={formData.shortDesc} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200" rows={2} placeholder="Brief description for cards" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200" rows={4} placeholder="Detailed explanation for the category page" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Services (Comma Separated)</label>
              <input type="text" name="services" value={formData.services} onChange={handleChange} className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200" placeholder="e.g. Legal Advice, Litigation, Drafting" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Image)</label>
              <input type="file" name="icon" onChange={handleChange} className="w-full text-sm" accept="image/*" />
            </div>
            
            <button type="submit" className="w-full bg-[#111827] text-white py-2 rounded-lg hover:bg-gray-800 transition">
              Save Category
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Existing Categories</h2>
          {loading ? (
            <p>Loading...</p>
          ) : categories.length === 0 ? (
            <p className="text-gray-500">No categories found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b">
                    <th className="p-3">Icon</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Services</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        {getIcon(cat.icon)}
                      </td>
                      <td className="p-3 font-medium text-gray-800">{cat.title || cat.name}</td>
                      <td className="p-3 text-sm text-gray-600">
                        {cat.services?.length || 0} items
                      </td>
                      <td className="p-3">
                        <button onClick={() => handleDelete(cat._id)} className="text-red-500 hover:text-red-700 font-semibold text-sm">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
