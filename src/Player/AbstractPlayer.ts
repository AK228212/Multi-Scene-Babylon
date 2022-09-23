import { Vector3 } from "@babylonjs/core";
import CastleScene from "../Entities/CastleScene";
import GardenScene from "../Entities/GardenScene";
import { IMoveKeys } from "./PlayerControls";
import PlayerMesh from "./PlayerMesh";
import Spawn from "./Spawn";

export enum MoveDirection {
  FORWARD,
  FORWARD_LEFT,
  FORWARD_RIGHT,
  BACK,
  BACK_LEFT,
  BACK_RIGHT,
  LEFT,
  RIGHT,
  IDLE,
  WAVE,
}

export default abstract class AbstractPlayer {
  public static readonly HEIGHT = 8;
  public static readonly DIAMETER = 4; // of cylinder
  public static readonly CROUCH_Y_SCALING = 0.65;

  public level: GardenScene | CastleScene;
  public mesh: PlayerMesh;

  protected standMesh: PlayerMesh;
  public spawn: Spawn;

  constructor(level: GardenScene | CastleScene, isOtherPlayer: boolean) {
    this.level = level;

    const modelScaling = 55;
    const standAnimSpeedRatio = 1;
    const crouchAnimSpeedRatio = 1.3;
    this.standMesh = new PlayerMesh(
      "playerStand",
      "man.glb",
      AbstractPlayer.HEIGHT,
      AbstractPlayer.DIAMETER,
      modelScaling,
      standAnimSpeedRatio,
      this.level._scene,
      isOtherPlayer
    );
  }

  public async build() {
    await Promise.all([this.standMesh.build()]);

    // start by standing up
    this.mesh = this.standMesh;
    this.setupSpawn();
    this.mesh.get().position = this.spawn.spawnPoint.clone();
  }

  public dispose() {
    this.standMesh.dispose();
  }

  private setupSpawn() {
    let spawnMesh = this.level._scene.getMeshByName("Spawn");
    if (spawnMesh == null) {
      throw new Error("No mesh in scene with a 'Spawn' ID!");
    }
    const spawnPos = spawnMesh.position.clone();
    // get lookAt mesh for initial player view direction
    let lookAtMesh = this.level._scene.getMeshByName("LookAt");
    let lookAt = Vector3.Zero();
    if (lookAtMesh != null) {
      lookAt = new Vector3(1, 4.5, 2);
    }
    this.spawn = new Spawn(spawnPos, lookAt);
  }

  public getMoveDirection(keys: IMoveKeys): MoveDirection {
    if (keys.up && keys.left && !keys.down && !keys.right) {
      return MoveDirection.FORWARD_LEFT;
    } else if (keys.up && keys.right && !keys.down && !keys.left) {
      return MoveDirection.FORWARD_RIGHT;
    } else if (keys.down && keys.left && !keys.up && !keys.right) {
      return MoveDirection.BACK_LEFT;
    } else if (keys.down && keys.right && !keys.up && !keys.left) {
      return MoveDirection.BACK_RIGHT;
    }

    if (keys.up && !keys.down) {
      return MoveDirection.FORWARD;
    } else if (keys.down && !keys.up) {
      return MoveDirection.BACK;
    } else if (keys.left && !keys.right) {
      return MoveDirection.LEFT;
    } else if (keys.right && !keys.left) {
      return MoveDirection.RIGHT;
    } else if (keys.wave) {
      return MoveDirection.WAVE;
    }
    return MoveDirection.IDLE;
  }
}
