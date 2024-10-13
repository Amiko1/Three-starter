import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from "three";
import App from "../App.js";
import Physics from "./physics.js";

export default class Environment {
  app: App;
  scene: Scene;
  directionalLight: DirectionalLight;
  cubemesh: Mesh;
  physics: Physics;
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    console.log(this.physics.add);
    this.loadEnvironment();
    this.addMeshed();
  }

  addMeshed() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: "blue" });
    this.cubemesh = new Mesh(geometry, material);
    ``;
    this.cubemesh.position.y = 10;
    this.cubemesh.position.x = 0.5;
    this.cubemesh.position.z = 0.5;

    this.scene.add(this.cubemesh);
    this.physics.add(this.cubemesh);
  }

  loadEnvironment() {
    const ambientLight = new AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    this.directionalLight = new DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }
}
