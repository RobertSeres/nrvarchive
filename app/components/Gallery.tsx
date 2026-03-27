"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { id: 1018, w: 600, h: 400 },
  { id: 1015, w: 400, h: 600 },
  { id: 1039, w: 600, h: 400 },
  { id: 1036, w: 400, h: 600 },
  { id: 1043, w: 600, h: 400 },
  { id: 1044, w: 600, h: 400 },
  { id: 1047, w: 400, h: 600 },
  { id: 1049, w: 600, h: 400 },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items =
        sectionRef.current!.querySelectorAll<HTMLElement>(".gallery-item");
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox]);

  return (
    <>
      <section
        ref={sectionRef}
        className="shrink-0 flex flex-col justify-center px-8 md:px-16 py-20 lg:py-0 lg:w-[200vw] lg:h-screen"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase mb-12">
          Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.id}
              className="gallery-item relative overflow-hidden rounded-sm aspect-[3/2] cursor-zoom-in group"
              onClick={() => setLightbox(i)}
              aria-label={`View photo ${i + 1}`}
            >
              <Image
                src={`https://picsum.photos/id/${photo.id}/${photo.w}/${photo.h}`}
                alt={`Aerial photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl z-10"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <Image
            src={`https://picsum.photos/id/${PHOTOS[lightbox].id}/1600/1200`}
            alt={`Aerial photo ${lightbox + 1}`}
            width={1600}
            height={1200}
            className="object-contain max-h-[90vh]"
          />
        </div>
      )}
    </>
  );
}
