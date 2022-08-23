import { Engine } from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";
import CastleScene from "./Entities/CastleScene";
import GardenScene from "./Entities/GardenScene";
import MultiSceneGUI from "./GUI/MultiSceneGUI";
import MainScene from "./MainScene";
// import MainScene from "./MainScene";

const app = {
  init() {
    const canvasElement = "canvas";

    // const multiSceneGUI = new MultiSceneGUI();

    // const mainScene = new MainScene(canvasElement)

    var castle = new CastleScene(canvasElement);
    castle.start();

    castle.GUI.sceneTypeObservable.add((scene) => {
      switch (scene.sceneType) {
        case "garden":
          const castle1 = new CastleScene(canvasElement);
          castle1.dispose();
          const garden = new GardenScene(canvasElement);
          // garden.GUI.multiScenesButtons();
          garden.start();
          break;

        default:
          console.log("scene");
          const castle = new CastleScene(canvasElement);
          // castle.GUI.multiScenesButtons();
          castle.start();
      }
    });
  },
};

app.init();
