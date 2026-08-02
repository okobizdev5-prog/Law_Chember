import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/ui/Cursor";
import ChatWidget from "@/components/ui/ChatWidget";
import HashScrollHandler from "@/components/ui/HashScrollHandler";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Nasrullah Law Associates | Premier Legal Counsel & Advocacy",
  description:
    "Distinguished Lawyer Chamber offering strategic legal counsel, courtroom representation, and comprehensive legal solutions with integrity and excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-slate-800 selection:bg-purple-100 selection:text-[#581C87]"
      >
        <HashScrollHandler />
        <Navbar></Navbar>
        <Cursor></Cursor>
        <ChatWidget></ChatWidget>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
