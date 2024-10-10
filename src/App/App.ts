import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";
import World from "./World/World";

let instance: App | null = null;

export default class App {
  camera: Camera;
  canvas: HTMLCanvasElement;
  scene: Scene;
  renderer: Renderer;
  loop: Loop;
  world: World;

  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("#threejs") as HTMLCanvasElement;
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.loop = new Loop();
  }
}
