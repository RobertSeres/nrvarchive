import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScroll } from "../ScrollContext";
import Grainient from "../Grainient";

export default function RGBIntro() {
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
          color1="#1a0505"
          color2="#051a05"
          color3="#05051a"
          timeSpeed={0.03}
          grainAmount={0.1}
          warpSpeed={0.3}
        />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4">
        <h1 className="text-7xl md:text-[12rem] font-extrabold tracking-[-0.05em] leading-[0.8]">
          <span className="text-red-500">R</span>
          <span className="text-green-500">G</span>
          <span className="text-blue-500">B</span>
        </h1>
        <p className="text-sm md:text-lg tracking-[0.6em] text-white/40 uppercase mt-8 wide-text font-bold">
          bemutatkozo protre kollekcio
        </p>
      </div>
    </section>
  );
}
