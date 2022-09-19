import * as BABYLON from "@babylonjs/core";
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

    this._scene.debugLayer.show();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/Garden/",
      "scene.gltf",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.08, 0.08, 0.08);
        container.meshes[0].position = new Vector3(30, -3, 70);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "road_traffic_sign.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
        container.meshes[0].position = new Vector3(230, 0.2, 170);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "bus_stop.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(5, 5, 5);
        container.meshes[0].position = new Vector3(-140, 0.2, 68);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "ford_mondeo_police_ver.2.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.15, 0.15, 0.15);
        container.meshes[0].position = new Vector3(0, 4.57, -127);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 2;
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "ford_ranger_2019_blue.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.15, 0.15, 0.15);
        container.meshes[0].position = new Vector3(-156, 4.57, 155);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "residential_building.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(3, 3, 3);
        container.meshes[0].position = new Vector3(-66, 0, -200.7);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "ruin_city.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(4, 4, 4);
        container.meshes[0].position = new Vector3(-40, 0, 313);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 2;
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
