import * as THREE from "three";
import App from "../App.js";

export default class Loop {
  app: App;
  constructor() {
    this.app = new App();
    this.loop();
  }

  loop() {
    this.app.camera.loop();
    this.app.renderer.loop();
    this.app.world.loop();
    window.requestAnimationFrame(() => this.loop());
  }
}
