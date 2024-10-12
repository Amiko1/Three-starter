import * as THREE from "three";

import App from "../App.js";
import Physics from "./physics.ts";
import Environment from "./Environment.ts";

export default class World {
  app: App;
  scene: THREE.Scene;
  physics: Physics;
  environment: Environment;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    // create world classes
    this.physics = new Physics();
    this.environment = new Environment();

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
