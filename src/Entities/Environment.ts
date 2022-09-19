import * as BABYLON from "@babylonjs/core";

export default class Environment {
  private readonly mesh: BABYLON.Mesh;

  private readonly material: BABYLON.StandardMaterial;

  constructor(scene: BABYLON.Scene) {
    this.mesh = BABYLON.MeshBuilder.CreateBox(
      "skyBox",
      { size: 10000.0 },
      scene
    );
    this.material = new BABYLON.StandardMaterial("skyBox", scene);

    this.material.backFaceCulling = false;
    this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    this.material.specularColor = new BABYLON.Color3(0, 0, 0);

    this.material.reflectionTexture = new BABYLON.CubeTexture(
      "./assets/sky.env",
      scene
    );
    this.material.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;

    this.mesh.material = this.material;
  }
}
