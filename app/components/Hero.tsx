"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-screen flex items-center justify-center shrink-0"
    >
      <Image
        src="https://picsum.photos/id/1067/1920/1080"
        alt="Aerial drone photography"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6">
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-[0.25em] uppercase mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Dronera
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl tracking-[0.3em] uppercase text-white/70"
        >
          Aerial Photography
        </p>
      </div>
    </section>
  );
}
