import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import AnimeBrowser from "@/components/AnimeBrowser";
import MangaBrowser from "@/components/MangaBrowser";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Featured />
      <AnimeBrowser />
      <MangaBrowser />
      <Gallery />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
