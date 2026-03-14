import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Destinations } from "@/components/sections/Destinations";
import { Accommodation } from "@/components/sections/Accommodation";
import { MapSection } from "@/components/sections/MapSection";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { TripPlanner } from "@/components/trip-planner/TripPlanner";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Accommodation />
        <MapSection />
        <About />
        <Team />
      </main>
      <Footer />
      <Chatbot />
      <TripPlanner />
    </div>
  );
};

export default Index;
