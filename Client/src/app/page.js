import Banner from "@/components/sections/Banner";
import OurPracticeArea from "@/components/sections/OurPracticeArea";
import AboutUs from "@/components/sections/AboutUs";
import Gallery from "@/components/sections/Gallery";
import Blog from "@/components/sections/Blog";
import ContactUs from "@/components/sections/ContactUs";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      <Banner />
      <AboutUs />
      <OurPracticeArea />
      <Gallery />
      <Blog />
      <ContactUs />
    </main>
  );
}