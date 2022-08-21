import { Scene, SceneLoader, Vector3 } from "@babylonjs/core";

export default class CastleScene {
  public scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.assetsBuild();
  }

  public assetsBuild() {
    SceneLoader.LoadAssetContainer(
      "./assets/castle/",
      "scene.gltf",
      this.scene,
      function (container) {
        container.meshes[0].scaling = new Vector3(5, 5, 5);
        container.meshes[0].position = new Vector3(0, 0, 8.75);
        container.meshes[0].rotationQuaternion = null;
        container.meshes[0].rotation.y = Math.PI / 4;
        container.addAllToScene();
      }
    );
  }
}
