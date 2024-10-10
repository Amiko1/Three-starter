import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";

let instance: App | null = null;

export default class App {
  camera: Camera;
  canvas: HTMLCanvasElement;
  scene: Scene;
  renderer: Renderer;
  loop: Loop;

  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("#threejs") as HTMLCanvasElement;
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.loop = new Loop();
  }
}
