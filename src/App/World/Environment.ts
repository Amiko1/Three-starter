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
    this.addMeshes();
  }

  addMeshes() {
    const geometry = new BoxGeometry(4, 4, 4);
    const material = new MeshStandardMaterial({ color: "blue" });
    this.cubemesh = new Mesh(geometry, material);
    this.cubemesh.position.y = 10;
    this.cubemesh.position.x = 0.5;
    this.cubemesh.position.z = 0.5;

    const groundGeometry = new BoxGeometry(10, 1, 10);
    const groundMaterial = new MeshStandardMaterial({ color: "yellow" });
    const groundMesh = new Mesh(groundGeometry, groundMaterial);

    this.scene.add(groundMesh);
    this.scene.add(this.cubemesh);
    this.physics.add(this.cubemesh, "dynamic", "cuboid");
    this.physics.add(groundMesh, "fixed", "trimesh");
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
