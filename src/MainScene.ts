import { Scene } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

import Camera from "./Entities/Camera";
import Environment from "./Entities/Environment";
import GardenScene from "./Entities/GardenScene";
import Ground from "./Entities/Ground";
import Sunlight from "./Entities/Lights";
import CastleScene from "./Entities/CastleScene";
import MultiSceneGUI from "./GUI/MultiSceneGUI";

export default class MainScene {
  public static _canvas: HTMLCanvasElement;

  public static _engine: Engine;

  public _scene: Scene;

  public ground: Ground;

  public camera: Camera;

  public environment: Environment;

  public light: Sunlight;

  public sceneClass: any;

  constructor(canvas?: string) {
    MainScene._canvas = document.getElementById(canvas) as HTMLCanvasElement;

    MainScene._engine = new Engine(MainScene._canvas, true);

    this._scene = new Scene(MainScene._engine);

    this.init();
  }

  public init() {
    new MultiSceneGUI();
    this.camera = new Camera(this._scene, MainScene._canvas);

    this.ground = new Ground(this._scene);

    this.light = new Sunlight(this._scene);
    this.light.intensity = 1;

    this.environment = new Environment(this._scene);

    // this.sceneClass = new GardenScene();
    // this.sceneClass.scene = this._scene;
    // this.sceneClass = new CastleScene();
    // this.sceneClass.scene = this._scene;

    // this.sceneClass = new CastleScene(this._scene);
    this.setupListeners();
    // this._scene.debugLayer.show();
  }

  public start() {
    this.startGameLoop(this.sceneClass.scene);
  }

  public startGameLoop(scene: Scene) {
    MainScene._engine.runRenderLoop(() => {
      scene.render();

      let fpsLabel = document.getElementById("fps_label");
      fpsLabel.innerHTML = MainScene._engine.getFps().toFixed() + " - FPS";
    });
  }

  public stopGameLoop(scene: Scene) {
    scene.detachControl();
    MainScene._engine.stopRenderLoop();
  }

  private setupListeners() {
    window.addEventListener("resize", function () {
      MainScene._engine.resize();
    });
  }
}
