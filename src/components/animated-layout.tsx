"use client";
import React, { ReactNode } from "react";
export const AnimatedLayout = ({ children }: { children: ReactNode }) => (
  <div className="transition-all duration-300 delay-700">{children}</div>
);
