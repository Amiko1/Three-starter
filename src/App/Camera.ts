import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import App from "./App";

export default class Camera {
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  app: App;

  constructor() {
    this.app = new App();
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    this.instance.position.z = 5;
  }

  setControls() {
    console.log(this.app, "app");
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  setResizeLister() {}

  loop() {
    this.controls.update();
  }
}
