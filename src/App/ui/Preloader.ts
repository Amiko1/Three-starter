import assetStore from "../Utils/AssetStore";

export default class Preloader {
  progress: number;
  loaderOverlay!: HTMLDivElement | null;
  loader: HTMLDivElement | null;
  startButton: HTMLButtonElement | null;

  constructor() {
    this.loaderOverlay = document.querySelector(".loader-overlay");
    this.loader = document.querySelector(".loader");
    this.startButton = document.querySelector(".start-button");

    assetStore.subscribe((state) => {
      const numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
      const numberOfAssetToLoad = state.assetsToLoad.length;
      this.progress = numberOfLoadedAssets / numberOfAssetToLoad;
      this.progress = Math.trunc(this.progress * 100);

      if (this.startButton) this.startButton.innerHTML = this.progress + "%";

      if (this.progress === 100) {
        this.ready();
      }
    });
  }

  ready() {
    if (this.startButton) {
      this.startButton.disabled = false;
      this.startButton.innerHTML = "START";
    }

    this.startButton?.addEventListener("click", () => {
      this.loaderOverlay?.classList.add("fade");

      window.setTimeout(() => {
        this.loaderOverlay?.remove();
      }, 2000);
    });
  }
}
