import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default class Camera {
  instance!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {
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
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  setResizeLister() {}

  loop() {}
}
