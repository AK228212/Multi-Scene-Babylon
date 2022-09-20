import {
  Color3,
  CubeTexture,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export default class SpawPoint {
  public position: Vector3;

  constructor(scene: Scene, position: Vector3) {
    var shape = MeshBuilder.CreateBox("Spawn", {}, scene);
    var shapeMaterial = new StandardMaterial("mat", scene);

    shapeMaterial.backFaceCulling = true;
    shapeMaterial.reflectionTexture = new CubeTexture(
      "./assets/sky.env",
      scene
    );
    this.position = position;
    shapeMaterial.reflectionTexture.coordinatesMode = Texture.CUBIC_MODE;
    shapeMaterial.diffuseColor = new Color3(0, 0, 0);
    shapeMaterial.specularColor = new Color3(0, 0, 0);
    shape.material = shapeMaterial;
    shape.position = new Vector3(0, 8, 0);
    shape.position = this.position;
  }
}
