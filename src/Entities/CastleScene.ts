import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Client } from "colyseus.js";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

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

export default class CastleScene {
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
    this.camera = new Camera(this._scene, this._canvas);

    this.ground = new Ground(this._scene);

    this.light = new Sunlight(this._scene);
    this.light.intensity = 1;

    this.environment = new Environment(this._scene);

    var spawnPosition: Vector3;

    spawnPosition = new Vector3(2, 4.5, 2);

    this.spawnPoint = new SpawPoint(this._scene, spawnPosition);

    this.GUI = new MultiSceneGUI();
    this.GUI.multiScenesButtons();

    this.assetsBuild();

    this._scene.registerBeforeRender(() => {
      this.player.update();
    });

    this.setupSocket();
    this._canvas.focus();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/",
      "Full.glb",
      this._scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.5, 0.5, 0.5);
        container.meshes[0].position = new Vector3(0, 0, 8.75);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 4;
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
