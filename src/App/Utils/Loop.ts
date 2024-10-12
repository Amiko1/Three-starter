import { Clock } from "three";
import App from "../App.js";

export default class Loop {
  app: App;
  clock: Clock;
  previousElapsedTime = 0;
  constructor() {
    this.app = new App();
    this.clock = new Clock();
    this.loop();
  }

  loop() {
    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = elapsedTime - this.previousElapsedTime;
    this.previousElapsedTime = elapsedTime;

    this.app.camera.loop();
    this.app.renderer.loop();
    this.app.world.loop(deltaTime, elapsedTime);
    window.requestAnimationFrame(() => this.loop());
  }
}
