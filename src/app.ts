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

    var mainScene = new GardenScene(canvasElement);
    mainScene.start();

    mainScene.GUI.sceneTypeObservable.add((scene) => {
      console.log(scene);

      switch (scene.sceneType) {
        case "castle":
          mainScene.dispose("castle");
          mainScene = null;
          mainScene = new CastleScene(canvasElement);
          // garden.GUI.multiScenesButtons();
          mainScene.start();
          break;

        default:
          // console.log("scene");
          // mainScene = null;
          mainScene.dispose("garden");
          mainScene = null;
          mainScene = new GardenScene(canvasElement);
          // castle.GUI.multiScenesButtons();
          mainScene.start();
      }
    });
  },
};

app.init();
