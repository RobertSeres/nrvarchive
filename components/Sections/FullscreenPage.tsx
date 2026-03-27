import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScroll } from "../ScrollContext";

interface FullscreenPageProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  titlePosition: "bottom-left" | "bottom-right";
}

export default function FullscreenPage({ title, subtitle, imageSrc, titlePosition }: FullscreenPageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { mainTween } = useScroll();

  useGSAP(() => {
    if (!mainTween || !textRef.current || !sectionRef.current) return;

    const xMove = titlePosition === "bottom-left" ? 150 : -150;

    gsap.fromTo(textRef.current, 
      { x: -xMove / 2 },
      {
        x: xMove / 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          containerAnimation: mainTween,
          start: "left right",
          end: "right left",
          scrub: true,
        }
      }
    );
  }, { dependencies: [mainTween], scope: sectionRef });

  const positionClasses = titlePosition === "bottom-left" 
    ? "bottom-8 left-8 text-left" 
    : "bottom-8 right-8 text-right";

  return (
    <section ref={sectionRef} className="horizontal-section relative bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 lg:bg-transparent lg:bg-linear-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div ref={textRef} className={`absolute z-10 p-4 md:p-12 ${positionClasses}`}>
        <h2 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.8]">
          {title}
        </h2>
        <p className="text-[10px] md:text-xs tracking-[1em] text-white/50 uppercase mt-4 wide-text font-bold">
          {subtitle || "art of 2026"}
        </p>
      </div>
    </section>
  );
}
