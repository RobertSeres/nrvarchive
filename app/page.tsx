"use client";

import { useState, useEffect } from "react";
import HorizontalScroll from "@/components/HorizontalScroll";
import Hero from "@/components/Sections/Hero";
import RGBIntro from "@/components/Sections/RGBIntro";
import Gallery from "@/components/Sections/Gallery";
import LoadingScreen from "@/components/LoadingScreen";
import GalleryBar from "@/components/GalleryBar";
import CloseDarkIntro from "@/components/Sections/CloseDarkIntro";
import MarkIntro from "@/components/Sections/MarkIntro";
import SeresIntro from "@/components/Sections/SeresIntro";
import FullscreenPage from "@/components/Sections/FullscreenPage";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (hasEntered) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [hasEntered]);

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black">
      {!hasEntered && (
        <LoadingScreen onEnter={() => setHasEntered(true)} />
      )}
      
      <div className={hasEntered ? "opacity-100 transition-opacity duration-1000" : "opacity-0 invisible"}>
        <GalleryBar />
        
        <div 
          onClick={scrollToHero}
          className="fixed top-2.5 left-4 md:top-4 md:left-8 z-110 cursor-pointer group"
        >
          <span className="text-xl md:text-3xl font-extrabold tracking-tighter transition-transform duration-300 group-hover:scale-110 inline-block text-white">
            NRV
          </span>
        </div>

        {/* Fixed Instagram Handle at Bottom Center */}
        <div className="fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-110 pointer-events-none">
          <a 
            href="https://instagram.com/_nagyreveszvid_" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pointer-events-auto text-[8px] md:text-[10px] font-bold tracking-[0.8em] text-white/30 uppercase transition-colors duration-300 hover:text-white wide-text whitespace-nowrap"
          >
            ig: @_nagyreveszvid_
          </a>
        </div>

        <HorizontalScroll>
          <Hero />
          <RGBIntro />
          <Gallery />
          
          <SeresIntro />
          <FullscreenPage 
            title="SERES 1" 
            subtitle="hessz"
            imageSrc="/images/seres2.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="SERES 2" 
            subtitle="hessz"
            imageSrc="/images/seres3.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="SERES 3" 
            subtitle="hessz"
            imageSrc="/images/seres4.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="SERES 4" 
            subtitle="hessz"
            imageSrc="/images/seres5.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="SERES 5" 
            subtitle="hessz"
            imageSrc="/images/seres6.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="SERES 6" 
            subtitle="hessz"
            imageSrc="/images/seres7.jpeg" 
            titlePosition="bottom-left" 
          />

          <MarkIntro />
          <FullscreenPage 
            title="MARK 1" 
            subtitle="future olympic gold medalist"
            imageSrc="/images/mark1.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="MARK 2" 
            subtitle="future olympic gold medalist"
            imageSrc="/images/mark2.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="MARK 3" 
            subtitle="future olympic gold medalist"
            imageSrc="/images/mark3.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="MARK 4" 
            subtitle="future olympic gold medalist"
            imageSrc="/images/mark4.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="MARK 5" 
            subtitle="future olympic gold medalist"
            imageSrc="/images/mark5.jpeg" 
            titlePosition="bottom-left" 
          />

          <CloseDarkIntro />
          <FullscreenPage 
            title="CHRONOS" 
            imageSrc="/images/watch.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="OPTICS" 
            imageSrc="/images/camera.jpeg" 
            titlePosition="bottom-right" 
          />
          <FullscreenPage 
            title="LUNAR" 
            imageSrc="/images/moon.jpeg" 
            titlePosition="bottom-left" 
          />
          <FullscreenPage 
            title="URBAN" 
            imageSrc="/images/urban.jpeg" 
            titlePosition="bottom-right" 
          />
        </HorizontalScroll>
      </div>
    </main>
  );
}
