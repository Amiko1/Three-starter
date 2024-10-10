import { Scene } from "three";
import Camera from "./Camera";

let instance: App | null = null;

export default class App {
  camera!: Camera;

  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    const canvas = document.querySelector("#threejs");
    const scene = new Scene();
    this.camera = new Camera();
    console.log(this.camera);
  }
}
