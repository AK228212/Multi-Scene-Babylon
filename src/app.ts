import { Engine } from "@babylonjs/core";
import MainScene from "./MainScene";

const app = {
  init() {
    const canvasElement = "canvas";
    const scene = new MainScene(canvasElement);
    scene.start();
  },
};

app.init();
