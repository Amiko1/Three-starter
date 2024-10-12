import { World } from "@dimforge/rapier3d";
import App from "../App.js";
import { Scene } from "three";

export default class Physics {
  app: App;
  scene: Scene;
  world: World;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    import("@dimforge/rapier3d").then((RAPIER) => {
      const gravity = { x: 0, y: -9.85, z: 0 };
      this.world = new RAPIER.World(gravity);
      console.log(this.world);
    });
  }

  loop() {}
}
