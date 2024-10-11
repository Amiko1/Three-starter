import { createStore } from "zustand/vanilla";
import { AssetStore, AssetToLoad } from "../types/utils";

const assetsToLoad: AssetToLoad[] = [
  {
    path: "/textures/2k_earth_daymap.jpg",
    id: "earth",
    type: "texture",
  },
  {
    path: "/textures/2k_mars.jpg",
    id: "mars",
    type: "texture",
  },
  {
    path: "/textures/2k_mercury.jpg",
    id: "mercury",
    type: "texture",
  },
  {
    path: "/textures/2k_sun.jpg",
    id: "sun",
    type: "texture",
  },
];

const assetStore = createStore<AssetStore>((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => {
      return {
        loadedAssets: {
          ...state.loadedAssets,
          [id]: asset,
        },
      };
    }),
}));

export default assetStore;
