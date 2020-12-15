import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

class Tutorial {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;

  }

  firstObstacles () {
    const tutorialScene = this.tutorialScene;

    new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.glb", tutorialScene,  newMeshes =>{
      this.obstacleBox = newMeshes[1];
      const box = new BABYLON.TransformNode();
      newMeshes.forEach(mesh => {
        if(!mesh.parent) {
          mesh.parent = box;
        }

        box.position = new BABYLON.Vector3(0,0,1);
        box.scaling = new BABYLON.Vector3(.5,.5,.5);
        box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
      });
    });
  };

  firstExplanation () {
    const tutorial = document.querySelector("div");
    tutorial.classList.add("tutorial");
    const text = document.createElement("h1");
    text.classList.add("explanation");
    text.textContent = " Spring opzij om de kist te ontwijken.";
    tutorial.appendChild(text);
    console.log("test");
  };

  player () {
    const tutorialScene = this.tutorialScene;
    new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.glb", tutorialScene,  newMeshes =>{
      this.obstacleBox = newMeshes[1];
      const player2 = new BABYLON.TransformNode();
      newMeshes.forEach(mesh => {
        if(!mesh.parent) {
          mesh.parent = player2;
        }

        player2.position = new BABYLON.Vector3(0,0,-4);
        player2.scaling = new BABYLON.Vector3(.5,.5,.5);
        player2.rotation = new BABYLON.Vector3 (0, 1.5, 0);


      });
      return player2;

    });


  };

  sceneSetup () {
    const tutorialScene =  new BABYLON.Scene(this.engine);
    tutorialScene.clearColor = new BABYLON.Color3(1, 0.4, 0.4);
    //Position of the camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), tutorialScene);

    //Where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    //Attach the camera to the canvas
    camera.attachControl(canvas, true);

    //Light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), tutorialScene);

    //Ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 20, subdivisions: 4}, tutorialScene);
    ground.position = new BABYLON.Vector3(0,0,7);

    const wood = new BABYLON.StandardMaterial("wood", tutorialScene);
    wood.diffuseTexture = new BABYLON.Texture("./src/assets/img/wood2.jpg", tutorialScene);
    // const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", tutorialScene);
    // groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = wood;
    this.player(this.player2);

    this.firstObstacles();
    this.firstExplanation();

    return tutorialScene;
  }

  start() {
    const tutorialScene = this.sceneSetup();

    setTimeout(() => {
      this.goToScene('tutorialFilmpje');
      console.log("switching");
    }, 5000);

    this.engine.runRenderLoop(() => {
      tutorialScene.render();
    });

  }

  stop() {
    this.engine.stopRenderLoop(
    );
  };

}

export default Tutorial;

