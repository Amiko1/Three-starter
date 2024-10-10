import { BoxGeometry, Mesh, MeshBasicMaterial } from "three";
import App from "../App";

export default class World {
  app: App;
  cubeMesh: Mesh;
  constructor() {
    this.app = new App();
    this.setCube();
  }

  setCube() {
    this.cubeMesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xff000 })
    );

    this.app.scene.add(this.cubeMesh);
  }

  loop() {
    this.cubeMesh.rotation.y += 0.01;
  }
}
