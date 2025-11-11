"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CraftContextType {
  selectedComponent: string;
  setSelectedComponent: (id: string) => void;
}

const CraftContext = createContext<CraftContextType | undefined>(undefined);

export function CraftProvider({ children }: { children: ReactNode }) {
  const [selectedComponent, setSelectedComponentState] = useState<string>("origin-aware-cards");

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("craft-selected-component");
    if (saved) {
      setSelectedComponentState(saved);
    }
  }, []);

  // Save to sessionStorage when changed
  const setSelectedComponent = (id: string) => {
    setSelectedComponentState(id);
    sessionStorage.setItem("craft-selected-component", id);
  };

  return (
    <CraftContext.Provider value={{ selectedComponent, setSelectedComponent }}>
      {children}
    </CraftContext.Provider>
  );
}

export function useCraft() {
  const context = useContext(CraftContext);
  if (context === undefined) {
    throw new Error("useCraft must be used within a CraftProvider");
  }
  return context;
}
