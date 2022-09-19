import * as BABYLON from "@babylonjs/core";
import { Scene } from "@babylonjs/core";

export default class Camera {
  // private static readonly CAMERA_DISTANCE = 145;

  private readonly camera: BABYLON.FreeCamera;

  constructor(scene: Scene, canvas: HTMLElement) {
    this.camera = new BABYLON.FreeCamera(
      "PlayerCam",
      new BABYLON.Vector3(200, 20, 0),
      scene
    );

    this.camera.checkCollisions = true;
    // this.camera.collisionRadius = new BABYLON.Vector3(1, 0.5, 1);

    // this.camera.lowerBetaLimit = this.camera.beta;
    // this.camera.upperBetaLimit = this.camera.beta;
    // this.camera.lowerRadiusLimit = 2.8;
    // this.camera.upperRadiusLimit = 6;

    this.camera.attachControl(canvas, true);
  }

  // public lockTarget(target: BABYLON.AbstractMesh): void {
  //   this.camera.lockedTarget = target;
  //   // this.camera.targetScreenOffset = new BABYLON.Vector2(0, -2);
  // }
}
