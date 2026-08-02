"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { 
  FaArrowLeft, 
  FaTrash, 
  FaEnvelope, 
  FaPhone, 
  FaSearch, 
  FaEye, 
  FaUser, 
  FaCalendarAlt, 
  FaInbox, 
  FaBriefcase,
  FaFileCsv,
  FaTimes
} from "react-icons/fa";

export default function LegalInquiryAdminPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Fetch Inquiries
  const fetchInquiries = async (isSilent = false) => {
    try {
      const res = await fetch("http://localhost:5000/inquiries");
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      const data = await res.json();
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (error) {
      if (!isSilent) {
        toast.error("Failed to load inquiries. Is backend server running?");
      }
      console.warn("Auto-update inquiry fetch failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries(false);

    // Auto-update table in background every 5 seconds
    const interval = setInterval(() => {
      fetchInquiries(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle Search Filtering
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredInquiries(inquiries);
      return;
    }

    const filtered = inquiries.filter((inq) => 
      (inq.name && inq.name.toLowerCase().includes(term)) ||
      (inq.email && inq.email.toLowerCase().includes(term)) ||
      (inq.phone && inq.phone.includes(term)) ||
      (inq.subject && inq.subject.toLowerCase().includes(term)) ||
      (inq.message && inq.message.toLowerCase().includes(term))
    );
    setFilteredInquiries(filtered);
  }, [searchTerm, inquiries]);

  // Delete Inquiry
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this legal inquiry? This action is permanent.")) return;

    try {
      const res = await fetch(`http://localhost:5000/inquiries/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        toast.success("Inquiry deleted successfully.");
        // Close modal if deleted inquiry was open
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(null);
        }
        fetchInquiries();
      } else {
        toast.error("Failed to delete inquiry.");
      }
    } catch (error) {
      toast.error("Error communicating with server.");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) {
      toast.warning("No inquiries to export.");
      return;
    }

    // CSV Headers
    const headers = ["Date", "Name", "Email", "Phone", "Subject", "Message"];
    
    // CSV Rows
    const rows = filteredInquiries.map((inq) => [
      inq.createdAt ? new Date(inq.createdAt).toLocaleString("en-US") : "N/A",
      inq.name || "",
      inq.email || "",
      inq.phone || "",
      inq.subject || "",
      (inq.message || "").replace(/"/g, '""') // Escape quotes for CSV
    ]);

    // Construct CSV Content
    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    // Download Link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Legal_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file downloaded successfully!");
  };

  // Stats calculation
  const totalCount = inquiries.length;
  
  // Calculate today's inquiries count
  const todayCount = inquiries.filter((inq) => {
    if (!inq.createdAt) return false;
    const today = new Date().toDateString();
    const inqDate = new Date(inq.createdAt).toDateString();
    return today === inqDate;
  }).length;

  // Calculate unique clients (by email)
  const uniqueClientsCount = new Set(inquiries.map(inq => inq.email?.toLowerCase().trim())).size;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/admin" className="text-[#EA7A00] hover:underline inline-flex items-center gap-2 font-medium transition duration-200">
          <FaArrowLeft /> Back to Dashboard
        </Link>
      </div>

      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Client Legal Inquiries
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review, search, and manage incoming attorney-client privileged inquiries.
          </p>
        </div>
        
        {/* Action Button */}
        <button
          onClick={handleExportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl transition duration-200 shadow-sm flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
        >
          <FaFileCsv className="text-lg" />
          Export to CSV
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        {/* Stat 1: Total */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-orange-100 text-[#EA7A00] rounded-2xl text-2xl">
            <FaInbox />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-400">Total Inquiries</span>
            <span className="block text-2xl font-bold text-gray-800">{totalCount}</span>
          </div>
        </div>

        {/* Stat 2: Today */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl text-2xl">
            <FaCalendarAlt />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-400">Received Today</span>
            <span className="block text-2xl font-bold text-gray-800">{todayCount}</span>
          </div>
        </div>

        {/* Stat 3: Unique Clients */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-2xl text-2xl">
            <FaUser />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-400">Unique Clients</span>
            <span className="block text-2xl font-bold text-gray-800">{uniqueClientsCount}</span>
          </div>
        </div>

      </div>

      {/* Table Section Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Search bar wrapper */}
        <div className="p-5 border-b border-gray-100 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📩 Message Inbox
            <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              {filteredInquiries.length} matching
            </span>
          </h2>
          
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search by name, email, subject, keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-300 rounded-xl text-sm outline-none focus:bg-white focus:border-[#EA7A00] focus:ring-1 focus:ring-[#EA7A00] transition duration-200"
            />
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#EA7A00] mb-3"></div>
              <p className="text-gray-500 text-sm">Loading legal inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-gray-300 text-5xl mb-4 flex justify-center">
                <FaInbox />
              </div>
              <p className="text-gray-800 font-medium">No inquiries found</p>
              <p className="text-gray-400 text-sm mt-1">
                {searchTerm ? "Try modifying your search criteria." : "New client messages will appear here."}
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-[11px] uppercase tracking-wider font-semibold border-b border-gray-100">
                  <th className="py-4 px-6">Client / Contact</th>
                  <th className="py-4 px-6">Legal Subject</th>
                  <th className="py-4 px-6">Message Snippet</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredInquiries.map((inq) => (
                  <tr 
                    key={inq._id} 
                    className="hover:bg-gray-50/70 transition duration-150 group"
                  >
                    
                    {/* Name & Contact */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        {inq.name}
                      </div>
                      <div className="text-gray-500 text-xs mt-1 flex flex-col gap-0.5">
                        <span className="flex items-center gap-1">
                          <FaEnvelope className="text-gray-400 text-[10px]" />
                          {inq.email}
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1">
                            <FaPhone className="text-gray-400 text-[10px]" />
                            {inq.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="py-4 px-6 font-medium text-gray-800 max-w-[200px] truncate border-none">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block shrink-0"></span>
                        {inq.subject}
                      </span>
                    </td>

                    {/* Message Snippet */}
                    <td className="py-4 px-6 text-gray-500 max-w-[280px] truncate">
                      {inq.message}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-gray-500 text-xs whitespace-nowrap">
                      {inq.createdAt ? (
                        <div className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-gray-400" />
                          {new Date(inq.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-2 text-[#EA7A00] hover:bg-orange-50 rounded-xl transition duration-150 cursor-pointer"
                          title="View Details"
                        >
                          <FaEye className="text-base" />
                        </button>
                        <button
                          onClick={() => handleDelete(inq._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition duration-150 cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 relative">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition duration-150 text-xl cursor-pointer"
              >
                <FaTimes />
              </button>
              
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-500/10 text-amber-400 border border-amber-400/20 rounded-xl text-lg">
                  <FaBriefcase />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-wide">Legal Inquiry Details</h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    Attorney-Client Privilege Protected
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Client Name</span>
                  <span className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                    <FaUser className="text-[#EA7A00] text-xs" />
                    {selectedInquiry.name}
                  </span>
                </div>
                
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Date Received</span>
                  <span className="text-gray-800 text-sm flex items-center gap-1.5 font-medium">
                    <FaCalendarAlt className="text-[#EA7A00] text-xs" />
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short"
                    }) : "N/A"}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Email Address</span>
                  <a 
                    href={`mailto:${selectedInquiry.email}`} 
                    className="text-blue-600 hover:underline text-sm flex items-center gap-1.5 font-medium break-all"
                  >
                    <FaEnvelope className="text-blue-500 text-xs" />
                    {selectedInquiry.email}
                  </a>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Telephone</span>
                  {selectedInquiry.phone ? (
                    <a 
                      href={`tel:${selectedInquiry.phone}`} 
                      className="text-blue-600 hover:underline text-sm flex items-center gap-1.5 font-medium"
                    >
                      <FaPhone className="text-blue-500 text-xs" />
                      {selectedInquiry.phone}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Not Provided</span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Legal Subject</span>
                <div className="bg-amber-500/5 text-[#9A5000] border border-amber-500/10 py-2.5 px-4 rounded-xl text-sm font-semibold">
                  {selectedInquiry.subject}
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1.5">Case Summary / Message</span>
                <div className="bg-white border border-gray-200 p-5 rounded-2xl text-gray-700 text-sm leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap font-sans shadow-inner">
                  {selectedInquiry.message}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4.5 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={() => handleDelete(selectedInquiry._id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-2.5 px-4 rounded-xl transition duration-150 flex items-center gap-2 cursor-pointer"
              >
                <FaTrash className="text-[10px]" />
                Delete Case File
              </button>
              
              <button
                onClick={() => setSelectedInquiry(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs py-2.5 px-5 rounded-xl transition duration-150 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
