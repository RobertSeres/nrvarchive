import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Grainient from "../Grainient";
import { useScroll } from "../ScrollContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { mainTween } = useScroll();

  useGSAP(() => {
    if (!mainTween || !titleRef.current) return;

    gsap.to(titleRef.current, {
      x: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        containerAnimation: mainTween,
        start: "left left",
        end: "right left",
        scrub: true,
      }
    });
  }, { dependencies: [mainTween], scope: containerRef });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-section relative bg-black overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#1a1a1a"
          color2="#333333"
          color3="#e8e4df"
          timeSpeed={0.03}
          grainAmount={0.1}
          warpSpeed={0.3}
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div ref={titleRef} className="flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-8xl md:text-[14rem] font-extrabold tracking-[-0.05em] leading-[0.8]">
            NRV
          </h1>
          <p className="text-lg md:text-2xl tracking-[0.8em] text-white/50 uppercase wide-text font-bold">
            Archive
          </p>
          <p className="text-[10px] md:text-xs tracking-[1.2em] text-white/30 uppercase mt-8 wide-text">
            VISUAL CORE — EST. 2026
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 z-30 hidden md:block">
        <div className="flex items-center gap-6 text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">
          <div className="w-12 h-px bg-white/20" />
          <span>GÖRGESS A BELÉPÉSHEZ</span>
        </div>
      </div>
    </section>
  );
}
