export default class MusicToggler {
  musicToggler: HTMLButtonElement | null;
  isMusicOn = true;
  audio: HTMLAudioElement;

  constructor() {
    // Select the music toggle button
    this.musicToggler = document.querySelector(".music-toggler");

    this.audio = new Audio("/sounds/background.mp3");
    this.audio.loop = true;
    this.turnOffMusic();
    this.musicToggler?.addEventListener("click", () => {
      this.isMusicOn ? this.turnOffMusic() : this.turnOnMusic();
      this.isMusicOn = !this.isMusicOn;
    });
  }

  turnOffMusic() {
    const waves = document.querySelectorAll(
      ".wave"
    ) as NodeListOf<HTMLDivElement>;
    if (waves.length > 0) {
      waves.forEach((wave) => {
        wave.style.animationPlayState = "paused";
      });
    }

    this.audio.pause();
  }

  turnOnMusic() {
    const waves = document.querySelectorAll(
      ".wave"
    ) as NodeListOf<HTMLDivElement>;

    if (waves.length > 0) {
      waves.forEach((wave) => {
        wave.style.animationPlayState = "running"; // Resume the wave animations
      });
    }

    this.audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  }
}
