"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to({}, {
        duration: 1.5,
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          setIsLoaded(true);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-[0.15em] text-center">
          NRV
        </h1>
        <p className="text-xs md:text-sm tracking-[0.6em] text-white/40 uppercase text-center">
          Archive
        </p>
        
        <div className="relative w-full h-px bg-white/10 overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {isLoaded ? (
          <button 
            onClick={onEnter}
            className="text-xs tracking-[0.5em] uppercase border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 animate-pulse text-center"
          >
            BELÉPÉS
          </button>
        ) : (
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase text-center">
            Töltés {progress}%
          </span>
        )}
      </div>
    </div>
  );
}
