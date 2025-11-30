import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Destinations } from "@/components/sections/Destinations";
import { Accommodation } from "@/components/sections/Accommodation";
import { MapSection } from "@/components/sections/MapSection";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Accommodation />
        <MapSection />
        <About />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
