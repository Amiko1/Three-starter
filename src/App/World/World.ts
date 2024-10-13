import * as THREE from "three";

import App from "../App.js";
import Physics from "./physics.ts";
import Environment from "./Environment.ts";
import { appStateSTore } from "../Utils/Store.ts";
import { AppStateSTore } from "../types/utils/index.ts";

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

    appStateSTore.subscribe((state) => {
      console.log(state);
      if (state.isPhysicisReady) {
        console.log("?");
        new Environment();
      }
    });
  }

  loop(deltaTime: number, elapsedTime: number) {
    this.physics.loop();
  }
}
