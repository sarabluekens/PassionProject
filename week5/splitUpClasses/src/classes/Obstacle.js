import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

class Obstacle {
  constructor(obstacleModel) {
  this.obstacleModel = obstacleModel;
  }

  createObstacle () {
        const gameScene = this.gameScene;
        const obstacle = new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", this.obstacleModel, gameScene, newMeshes => {
          // this.obstacleBox = newMeshes[1];
          const box = new BABYLON.TransformNode();
          // this.boxes.playerBox = newMeshes[1];
          newMeshes.forEach(mesh => {
            if(!mesh.parent) {
              mesh.parent = box;
            }

            box.scaling = new BABYLON.Vector3(.5,.5,.5);
            box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
            console.log(box);


          });
          return obstacle;
        });
      };
}
export default Obstacle;
