"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-text", {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "left 80%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(".about-image", {
        opacity: 0,
        x: 40,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "left 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="shrink-0 flex items-center px-8 md:px-16 py-20 lg:py-0 lg:w-screen lg:h-screen"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
        <div className="about-text lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase">
            About
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-lg">
            Dronera captures the world from perspectives unseen. We specialize
            in professional aerial photography — from sweeping landscapes to
            architectural surveys — delivering cinematic imagery that transforms
            how you see your projects.
          </p>
          <p className="text-white/40 text-base leading-relaxed max-w-lg">
            Based in Lithuania. Available worldwide. FAA Part 107 certified.
          </p>
        </div>
        <div className="about-image relative w-full lg:w-1/2 aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src="https://picsum.photos/id/1058/800/600"
            alt="Drone pilot at work"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
