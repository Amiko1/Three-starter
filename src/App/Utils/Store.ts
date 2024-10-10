import { createStore } from "zustand/vanilla";
import { SizesStore } from "../types/utils";

export const sizesStore = createStore<SizesStore>(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
}));
