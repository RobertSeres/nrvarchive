"use client";

import { createContext, useContext, useState } from "react";

const ScrollContext = createContext<{ mainTween: gsap.core.Tween | null }>({ mainTween: null });

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children, value }: { children: React.ReactNode, value: { mainTween: gsap.core.Tween | null } }) => (
  <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
);
