"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import FlowingMenu from "./FlowingMenu";

export default function GalleryBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        duration: 0.6,
        ease: "power4.out",
        opacity: 1,
        visibility: "visible",
      });
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power4.in",
        opacity: 0,
        onComplete: () => {
          if (dropdownRef.current) {
            dropdownRef.current.style.visibility = "hidden";
          }
        },
      });
    }
  }, [isOpen]);

  const scrollToSection = (index: number) => {
    setIsOpen(false);
    
    // Check if we are on mobile (where sections are stacked vertically)
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // On mobile, we can use scrollIntoView or simple vertical targeting
      const sections = document.querySelectorAll(".horizontal-section");
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On desktop, we follow the GSAP horizontal scrub logic
      // Total scroll distance is N * innerWidth
      window.scrollTo({
        top: index * window.innerWidth,
        behavior: "smooth",
      });
    }
  };

  const menuItems = [
    { 
      link: "#", 
      text: "RGB",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection(1); // RGBIntro is the true "Page 2"
      }
    },
    {
      link: "#",
      text: "SERES",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection(5); // SeresIntro is at index 5
      }
    },
    {
      link: "#",
      text: "MARK",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection(12); // MarkIntro is at index 12
      }
    },
    {
      link: "#",
      text: "ART 2026",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        scrollToSection(18); // ArtIntro is at index 18
      }
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-100">
      {/* Top Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 md:h-16 flex items-center justify-center cursor-pointer group transition-colors duration-500 ${isOpen ? "bg-black" : "bg-transparent hover:bg-black"}`}
      >
        <span className={`text-sm md:text-base font-bold tracking-[0.5em] uppercase transition-colors duration-500 ${isOpen ? "text-white" : "text-white/50 group-hover:text-white"}`}>
          GALÉRIA
        </span>
      </div>

      {/* Dropdown Panel */}
      <div 
        ref={dropdownRef}
        className="w-full bg-black overflow-hidden opacity-0 invisible border-b border-white/10 shadow-2xl"
        style={{ height: 0 }}
      >
        <div className="h-[20vh] md:h-[30vh]">
          <FlowingMenu 
            items={menuItems.map(item => ({ ...item, link: item.link }))}
            textColor="#fff"
            bgColor="transparent"
            marqueeBgColor="#fff"
            marqueeTextColor="#000"
            borderColor="rgba(255,255,255,0.1)"
            // The RGB items should have the gradient background
          />
        </div>
      </div>

      <style jsx global>{`
        /* RGB Item Gradient */
        .flowing-menu__item:nth-child(1) {
          background: linear-gradient(
            to right, 
            #ff0000 0%, 
            #ff0000 33.33%, 
            #00ff00 33.33%, 
            #00ff00 66.66%, 
            #0000ff 66.66%, 
            #0000ff 100%
          ) !important;
        }
        
        /* SERES Item Gradient: Dark Green to Black */
        .flowing-menu__item:nth-child(2) {
          background: linear-gradient(
            to right, 
            #0a2a0a 0%, 
            #000000 100%
          ) !important;
        }

        /* MARK Item Gradient: Dark Gold to Black */
        .flowing-menu__item:nth-child(3) {
          background: linear-gradient(
            to right, 
            #2a2a00 0%, 
            #000000 100%
          ) !important;
        }

        /* ART 2026 Item Gradient: Dark Blue to Black */
        .flowing-menu__item:nth-child(4) {
          background: linear-gradient(
            to right, 
            #000033 0%, 
            #000000 100%
          ) !important;
        }

        /* Override FlowingMenu internal styles for this specific case if needed */
        .flowing-menu__item-link {
          font-weight: 900 !important;
        }
      `}</style>
    </div>
  );
}
