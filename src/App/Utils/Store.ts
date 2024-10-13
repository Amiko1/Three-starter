import { createStore } from "zustand/vanilla";
import { AppStateSTore, SizesStore } from "../types/utils";

export const sizesStore = createStore<SizesStore>(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
}));

export const appStateSTore = createStore<AppStateSTore>(() => ({
  isPhysicisReady: false,
}));
