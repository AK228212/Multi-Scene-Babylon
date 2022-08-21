import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export default class GardenScene {
  public scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.assetsBuild();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/Garden/",
      "scene.gltf",
      this.scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(0.05, 0.05, 0.05);
        container.meshes[0].position = new Vector3(0, 0, 19.043);
        container.addAllToScene();
      }
    );
  }
}
