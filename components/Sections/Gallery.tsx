import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScroll } from "../ScrollContext";
import Image from "next/image";
import Grainient from "../Grainient";

interface GalleryPageProps {
  title: string;
  titleColor?: string;
  subtitle: string;
  images: { src: string; alt: string }[];
  grainColors: [string, string, string];
}

function GalleryPage({ title, titleColor, subtitle, images, grainColors }: GalleryPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { mainTween } = useScroll();

  useGSAP(() => {
    if (!mainTween || !textRef.current) return;

    gsap.to(textRef.current, {
      x: 80, // Slightly subtler parallax for these
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
          color1={grainColors[0]}
          color2={grainColors[1]}
          color3={grainColors[2]}
          timeSpeed={0.03}
          grainAmount={0.1}
          warpSpeed={0.3}
        />
      </div>

      <div ref={textRef} className="relative z-10 w-full h-full flex flex-col items-center justify-center px-12 md:px-24">
        <div className="mb-12 text-center">
          <h2
            className="text-6xl md:text-9xl font-extrabold tracking-[-0.05em] leading-[0.8]"
            style={titleColor ? { color: titleColor } : undefined}
          >
            {title}
          </h2>
          <p className="text-[10px] tracking-[0.8em] text-white/30 uppercase mt-4 wide-text font-bold">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-6 md:gap-10 w-full max-w-7xl justify-center">
          {images.map((img) => {
            const height = "h-[60vh]";

            return (
              <div
                key={img.src}
                className={`relative flex-1 ${height} max-w-[32%]`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="30vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  return (
    <>
      {/* RED — Vörös */}
      <GalleryPage
        title="RED"
        titleColor="#ef4444"
        subtitle="Vörös sorozat"
        images={[
          { src: "/images/Piros 1.jpeg", alt: "Piros 1" },
          { src: "/images/Piros 2.jpeg", alt: "Piros 2" },
          { src: "/images/Piros 3.jpeg", alt: "Piros 3" },
        ]}
        grainColors={["#4a0a0a", "#1a0000", "#2a0505"]}
      />

      {/* GREEN — Zöld */}
      <GalleryPage
        title="GREEN"
        titleColor="#22c55e"
        subtitle="Zöld sorozat"
        images={[
          { src: "/images/1.jpeg", alt: "Portré 1" },
          { src: "/images/2.jpeg", alt: "Portré 2" },
          { src: "/images/3.jpeg", alt: "Portré 3" },
        ]}
        grainColors={["#0a4a0a", "#001a00", "#052a05"]}
      />

      {/* BLUE — Kék */}
      <GalleryPage
        title="BLUE"
        titleColor="#3b82f6"
        subtitle="Kék sorozat"
        images={[
          { src: "/images/G1.jpeg", alt: "G1" },
          { src: "/images/G2.jpeg", alt: "G2" },
          { src: "/images/G3.jpeg", alt: "G3" },
        ]}
        grainColors={["#0a0a4a", "#00001a", "#05052a"]}
      />
    </>
  );
}
