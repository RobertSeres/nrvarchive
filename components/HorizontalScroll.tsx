"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollProvider } from "./ScrollContext";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mainTween, setMainTween] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".horizontal-section") as HTMLElement[];
      
      if (!isMobile && containerRef.current && wrapperRef.current && sections.length > 0) {
        gsap.set(wrapperRef.current, { width: `${sections.length * 100}%` });
        
        const tween = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1.5,
            snap: 1 / (sections.length - 1),
            end: () => `+=${sections.length * window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        });
        
        setMainTween(tween);
      } else if (isMobile && wrapperRef.current) {
        gsap.set(wrapperRef.current, { width: "100%", xPercent: 0 });
        setMainTween(null);
      }
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  return (
    <ScrollProvider value={{ mainTween }}>
      <div ref={containerRef} className="overflow-x-hidden bg-black min-h-screen">
        <div 
          ref={wrapperRef} 
          className={isMobile ? "flex flex-col w-full" : "flex flex-nowrap"}
        >
          {children}
        </div>
      </div>
    </ScrollProvider>
  );
}
