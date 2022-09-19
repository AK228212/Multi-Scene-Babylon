import * as BABYLON from "@babylonjs/core";

export default class Ground {
  private readonly mesh: BABYLON.Mesh;

  private readonly material: BABYLON.StandardMaterial;

  constructor(scene: BABYLON.Scene) {
    this.mesh = BABYLON.MeshBuilder.CreateTiledGround("gd", {
      xmin: -512,
      xmax: 512,
      zmin: -512,
      zmax: 512,
      subdivisions: {
        w: 30,
        h: 30,
      },
    });

    this.material = new BABYLON.StandardMaterial("groundMaterial", scene);
    this.material.diffuseTexture = new BABYLON.Texture(
      "assets/ground1_diffuse.jpg",
      scene
    );
    this.mesh.material = this.material;
  }
}
