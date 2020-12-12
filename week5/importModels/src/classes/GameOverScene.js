import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
class GameOverScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
  }



  sceneSetup() {
    const gameOverScene = new BABYLON.Scene(this.engine);

    // position of the camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), gameOverScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    //ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 9, subdivisions: 4});
    ground.position = new BABYLON.Vector3(0,0,7);

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", gameOverScene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = groundMaterial;

    const boxBlue = BABYLON.Mesh.CreateBox("Box1", 1.5, 0, gameOverScene);
    const material1 = new BABYLON.StandardMaterial("material1", gameOverScene);
    material1.emissiveColor = BABYLON.Color3.Green();
    boxBlue.material = material1;
    console.log("hier ook?");
    //Add camera, light and meshes for scene1
    return gameOverScene;
  };

  start() {
    const gameOverScene = this.sceneSetup();
    this.engine.runRenderLoop(() => {
      gameOverScene.render();

    });
  }
  stop() {
    // console.log("deze werkt ook");
    // this.engine.stopRenderLoop(() => {
    //   gameScene.render();
    // });
  }



}

export default GameOverScene;

