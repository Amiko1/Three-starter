export type SizesStore = {
  width: number;
  height: number;
  pixelRatio: number;
};

export type AssetToLoad = {
  path: string;
  id: string;
  type: string;
};

export type AssetStore = {
  assetsToLoad: AssetToLoad[];
  loadedAssets: { [key: string]: AssetToLoad };
  addLoadedAsset: (asset: AssetToLoad, id: string) => void;
};

export type AppStateSTore = {
  isPhysicisReady: boolean;
};
