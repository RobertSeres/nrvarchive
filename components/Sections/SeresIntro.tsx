import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScroll } from "../ScrollContext";
import Grainient from "../Grainient";

export default function SeresIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { mainTween } = useScroll();

  useGSAP(() => {
    if (!mainTween || !textRef.current) return;

    gsap.to(textRef.current, {
      x: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        containerAnimation: mainTween,
        start: "left right",
        end: "right left",
        scrub: true,
      }
    });
  }, { dependencies: [mainTween], scope: containerRef });

  return (
    <section ref={containerRef} className="horizontal-section relative bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#0a1a0a"
          color2="#000000"
          color3="#052a05" // Subtle green hint
          timeSpeed={0.02}
          grainAmount={0.08}
          warpSpeed={0.25}
        />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4">
        <h1 className="text-7xl md:text-[12rem] font-black tracking-[-0.05em] leading-[0.8] text-white">
          SERES
        </h1>
        <p className="text-sm md:text-lg tracking-[0.6em] text-white/40 uppercase mt-8 wide-text font-bold">
          hessz
        </p>
      </div>
    </section>
  );
}
