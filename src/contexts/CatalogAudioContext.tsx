"use client";

import { createContext, useContext, useState } from "react";

interface CatalogAudioContextValue {
  playingProductId: string | null;
  setPlayingProductId: (id: string | null) => void;
}

const CatalogAudioContext = createContext<CatalogAudioContextValue | null>(null);

export function CatalogAudioProvider({ children }: { children: React.ReactNode }) {
  const [playingProductId, setPlayingProductId] = useState<string | null>(null);
  return (
    <CatalogAudioContext.Provider value={{ playingProductId, setPlayingProductId }}>
      {children}
    </CatalogAudioContext.Provider>
  );
}

export function useCatalogAudio() {
  const ctx = useContext(CatalogAudioContext);
  return ctx ?? { playingProductId: null, setPlayingProductId: () => {} };
}
