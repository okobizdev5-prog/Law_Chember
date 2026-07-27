import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/categories" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
          <div className="w-12 h-12 bg-orange-100 text-[#EA7A00] flex items-center justify-center rounded-lg mb-4">
            <span className="text-2xl">⚖️</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[#EA7A00] transition">Practice Areas</h2>
          <p className="text-gray-500 text-sm">Manage your practice areas, edit descriptions, and add new services.</p>
        </Link>

        <Link href="/admin/banners" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
          <div className="w-12 h-12 bg-orange-100 text-[#EA7A00] flex items-center justify-center rounded-lg mb-4">
            <span className="text-2xl">🖼️</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[#EA7A00] transition">Hero Banners</h2>
          <p className="text-gray-500 text-sm">Manage dynamic texts, badges, highlighted words, and background banner images.</p>
        </Link>

        <Link href="/admin/chat-widget" className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition group">
          <div className="w-12 h-12 bg-orange-100 text-[#EA7A00] flex items-center justify-center rounded-lg mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:text-[#EA7A00] transition">Chat Widget</h2>
          <p className="text-gray-500 text-sm">Configure WhatsApp, Messenger, and Instagram chat links and toggle visibility.</p>
        </Link>
        
        {/* Placeholder for other admin sections */}
        <div className="bg-gray-50 p-6 rounded-xl border border-dashed flex flex-col items-center justify-center text-gray-400">
          <span className="text-2xl mb-2">🔜</span>
          <p>More features coming soon</p>
        </div>
      </div>
    </div>
  );
}
