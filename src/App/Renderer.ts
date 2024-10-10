import { WebGLRenderer } from "three";
import { SizesStore } from "./types/utils";
import App from "./App";
import { sizesStore } from "./Utils/Store";

export default class Renderer {
  instance: WebGLRenderer;
  app: App;
  sizes: SizesStore;
  constructor() {
    this.app = new App();
    this.sizes = sizesStore.getState();
    this.setInstance();
    this.setResizeLister();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  setResizeLister() {
    sizesStore.subscribe((sizes) => {
      this.instance.setSize(sizes.width, sizes.height);
      this.instance.setPixelRatio(sizes.pixelRatio);
    });
  }

  loop() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
