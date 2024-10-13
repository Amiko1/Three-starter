import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { sizesStore } from "./Utils/Store";
import App from "./App";
import { SizesStore } from "./types/utils";

export default class Camera {
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;
  app: App;
  sizes: SizesStore;
  constructor() {
    this.app = new App();
    this.sizes = sizesStore.getState();
    this.setInstance();
    this.setControls();
    this.setResizeLister();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );
    this.instance.position.z = 100;
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.enableDamping = true;
  }

  setResizeLister() {
    sizesStore.subscribe((sizes) => {
      this.instance.aspect = sizes.width / sizes.height;
      this.instance.updateProjectionMatrix();
    });
  }

  loop() {
    this.controls.update();
  }
}
