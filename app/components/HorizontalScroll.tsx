"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 1024 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !scrollRef.current || !containerRef.current) return;

    const sections = scrollRef.current;
    const scrollWidth = sections.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: vertical stack
  if (isMobile) {
    return <div className="flex flex-col">{children}</div>;
  }

  // Desktop: horizontal scroll
  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={scrollRef} className="flex h-screen w-max">
        {children}
      </div>
    </div>
  );
}
