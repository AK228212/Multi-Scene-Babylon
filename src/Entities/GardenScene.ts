import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

import MultiSceneGUI from "../GUI/MultiSceneGUI";
import Camera from "./Camera";
import Environment from "./Environment";
import Ground from "./Ground";
import Sunlight from "./Lights";

export default class GardenScene {
  public _canvas: HTMLCanvasElement;

  public _engine: Engine;

  public _scene: Scene;

  public camera: Camera;

  public ground: Ground;

  public light: Sunlight;

  public environment: Environment;

  public GUI: MultiSceneGUI;

  constructor(canvas: string) {
    this._canvas = document.getElementById(canvas) as HTMLCanvasElement;

    this._engine = new Engine(this._canvas, true);

    this._scene = new Scene(this._engine);

    this.init();
  }

  public init() {
    this.camera = new Camera(this._scene, this._canvas);

    this.ground = new Ground(this._scene);

    this.light = new Sunlight(this._scene);
    this.light.intensity = 1;

    this.environment = new Environment(this._scene);

    this.assetsBuild();

    this.GUI = new MultiSceneGUI();
    this.GUI.multiScenesButtons();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/Garden/",
      "scene.gltf",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.05, 0.05, 0.05);
        container.meshes[0].position = new Vector3(0, 0, 19.043);
        container.addAllToScene();
      }
    );
  }

  public start() {
    this.startGameLoop();
  }

  public startGameLoop() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
      let fpsLabel = document.getElementById("fps_label");
      fpsLabel.innerHTML = this._engine.getFps().toFixed() + " - FPS";
    });
  }

  public dispose(sceneType: string) {
    this._engine.onDisposeObservable.add(() => {
      this.GUI.sceneTypeObservable.notifyObservers({ sceneType: sceneType });
    });
    // this._engine.dispose();
  }
}
