import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";
import World from "./World/World";
import Resize from "./Utils/Resize";
import AssetLoader from "./Utils/AssetLoader";
import Preloader from "./ui/Preloader";
import musicToggler from "./ui/MusicTogller";

let instance: App | null = null;

export default class App {
  camera: Camera;
  canvas: HTMLCanvasElement;
  scene: Scene;
  renderer: Renderer;
  loop: Loop;
  world: World;
  resize: Resize;
  assetLoader: AssetLoader;
  preloader: Preloader;
  musicToggler: musicToggler;
  constructor() {
    if (instance) return instance;
    instance = this;

    this.canvas = document.querySelector("#threejs") as HTMLCanvasElement;
    this.scene = new Scene();
    this.assetLoader = new AssetLoader();
    this.preloader = new Preloader();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.resize = new Resize();
    this.loop = new Loop();
    this.musicToggler = new musicToggler();
  }
}
