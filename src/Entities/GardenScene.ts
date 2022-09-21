import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/loaders";
import "@babylonjs/inspector";
import { Client } from "colyseus.js";

import MultiSceneGUI from "../GUI/MultiSceneGUI";
import Camera from "./Camera";
import Environment from "./Environment";
import Ground from "./Ground";
import Sunlight from "./Lights";
import SpawPoint from "./SpawnPoint";
import Player from "../Player/Player";
import OtherPlayer from "../Player/OtherPlayer";
import Config from "../Config";
import GameRoom from "../Networking/Rooms/GameRoom";
import { PlayerSchema } from "../networking/schema/PlayerSchema";

export default class GardenScene {
  public _canvas: HTMLCanvasElement;

  public _engine: Engine;

  public _scene: Scene;

  public camera: Camera;

  public ground: Ground;

  public light: Sunlight;

  public environment: Environment;

  public GUI: MultiSceneGUI;

  public spawnPoint: SpawPoint;

  public player: Player;

  public otherPlayersMap: Map<string, OtherPlayer>;

  public client: Client;

  public gameRoom: GameRoom;

  public isFrozen: boolean;

  constructor(canvas: string) {
    this._canvas = document.getElementById(canvas) as HTMLCanvasElement;

    this._engine = new Engine(this._canvas, true);

    this._scene = new Scene(this._engine);

    this.otherPlayersMap = new Map();

    this.player = new Player(this);

    this.isFrozen = false;

    this.init();
  }

  public init() {
    // this.camera = new Camera(this._scene, this._canvas);

    this.ground = new Ground(this._scene);

    this.light = new Sunlight(this._scene);
    this.light.intensity = 1;

    this.environment = new Environment(this._scene);

    this.assetsBuild();

    this.GUI = new MultiSceneGUI();
    this.GUI.multiScenesButtons();

    var spawnPosition: Vector3;

    spawnPosition = new Vector3(-340, 4.5, 60);

    this.spawnPoint = new SpawPoint(this._scene, spawnPosition);

    this._scene.registerBeforeRender(() => {
      this.player.update();
    });

    this.setupSocket();

    // this._scene.debugLayer.show();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "building_concept.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(6.5, 6.5, 6.5);
        container.meshes[0].position = new Vector3(30, 0, 70);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 2;
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
        container.meshes[0].scaling = new Vector3(3.5, 3.5, 3.5);
        container.meshes[0].position = new Vector3(-140, 0.2, 68);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "ford_mondeo_police_ver.2.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        container.meshes[0].position = new Vector3(0, 3, -127);
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
        container.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
        container.meshes[0].position = new Vector3(-156, 3, 155);
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "derby_car._free.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(6, 6, 6);
        container.meshes[0].position = new Vector3(-270, 1, 45);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 2;
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

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "building__interior_effect.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(1.5, 1.5, 1.5);
        container.meshes[0].position = new Vector3(-232.5, 23, 18);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = 0;
        container.addAllToScene();
      }
    );

    SceneLoader.LoadAssetContainer(
      "./assets/New models/",
      "old_industrial_building.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.05, 0.05, 0.05);
        container.meshes[0].position = new Vector3(297, 34, 103);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = 0;
        container.addAllToScene();
      }
    );
  }

  public async start() {
    if (Config.useNetworking) {
      this.gameRoom = new GameRoom(this);
      await Promise.all([this.gameRoom.connect()]);
    }

    await Promise.all([this.player.build()]);

    this.startGameLoop();
  }

  public startGameLoop() {
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
    if (Config.useNetworking) {
      this.gameRoom.updatePlayerToServer();
    }
    this._engine.runRenderLoop(() => {
      this._scene.render();

      if (Config.useNetworking) {
        this.gameRoom.updatePlayerToServer();
      }

      let fpsLabel = document.getElementById("fps_label");
      fpsLabel.innerHTML = this._engine.getFps().toFixed() + " - FPS";
    });
  }

  public async addNewOtherPlayer(playerSchema: PlayerSchema) {
    const otherPlayer = new OtherPlayer(playerSchema.sessionId, this);
    await otherPlayer.build();
    otherPlayer.update(playerSchema);
    this.otherPlayersMap.set(playerSchema.sessionId, otherPlayer);
  }

  public removeOtherPlayer(playerSchema: PlayerSchema) {
    this.otherPlayersMap.get(playerSchema.sessionId).dispose();
    this.otherPlayersMap.delete(playerSchema.sessionId);
  }

  public updateOtherPlayer(playerSchema: PlayerSchema) {
    const otherPlayer = this.otherPlayersMap.get(playerSchema.sessionId);
    if (otherPlayer) {
      otherPlayer.update(playerSchema);
    }
  }

  private setupSocket() {
    this.client = new Client(Config.socketAddressProduction);
  }

  public dispose(sceneType: string) {
    this._engine.onDisposeObservable.add(() => {
      this.GUI.sceneTypeObservable.notifyObservers({ sceneType: sceneType });
    });
    // this._engine.dispose();
  }
}
