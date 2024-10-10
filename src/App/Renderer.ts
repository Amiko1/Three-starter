import { WebGLRenderer } from "three";
import { WebGL } from "three/examples/jsm/Addons.js";
import App from "./App";

export default class Renderer {
  instance: WebGLRenderer;
  app: App;
  constructor() {
    this.app = new App();
    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.app.canvas,
      antialias: true,
    });

    this.instance.setSize(window.innerWidth, window.innerHeight);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  setResizeLister() {}

  loop() {
    this.instance.render(this.app.scene, this.app.camera.instance);
  }
}
