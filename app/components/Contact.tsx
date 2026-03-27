"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-form", {
        opacity: 0,
        y: 50,
        duration: 1,
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
      className="shrink-0 flex items-center justify-center px-8 md:px-16 py-20 lg:py-0 lg:w-screen lg:h-screen"
    >
      <div className="contact-form w-full max-w-lg space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-[0.15em] uppercase">
          Contact
        </h2>
        <p className="text-white/50 text-base">
          Interested in working together? Send a message.
        </p>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm uppercase tracking-widest text-white/40 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-3 text-white transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm uppercase tracking-widest text-white/40 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-3 text-white transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm uppercase tracking-widest text-white/40 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-white/20 focus:border-white/60 outline-none py-3 text-white transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <button
            type="submit"
            className="uppercase tracking-[0.2em] text-sm border border-white/30 px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
