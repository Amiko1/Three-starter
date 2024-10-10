import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import assetStore from "./AssetStore";
import { AssetStore } from "../types/utils/index";

export default class AssetLoader {
  gltfLoader: GLTFLoader;
  textureLoader: TextureLoader;
  assetStore: AssetStore;

  constructor() {
    this.assetStore = assetStore.getState();
    this.instantiateLoaders();
    this.startLoading();
  }

  instantiateLoaders() {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");

    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setDRACOLoader(dracoLoader);

    this.textureLoader = new TextureLoader();
  }

  startLoading() {
    this.assetStore.assetsToLoad.forEach((asset) => {
      if (asset.type === "texture") {
        this.textureLoader.load(asset.path, () => {
          this.assetStore.addLoadedAsset(asset, asset.id);
        });
      }

      if (asset.type === "model") {
        this.gltfLoader.load(asset.path, () => {
          this.assetStore.addLoadedAsset(asset, asset.id);
        });
      }
    });
  }
}
