import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders/glTF";

class GameScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
    this.box = null;
    this.boem = false;
  }

    // this.goToScene('game')

  spawnRandomObstacle () {

    //random obstakel selecteren
    let randomNumber = Math.random();

    if (randomNumber < 0.25) {
      // this.box =  BABYLON.SceneLoader.ImportMeshAsync("", "./src/assets/models/", "speakers.glb", this.gameScene).newMeshes[1];

        const gameScene = this.gameScene;
        const box2 = new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.gltf", gameScene, function (newMeshes){
          const playerBox = newMeshes[1];
          const box = new BABYLON.TransformNode();
          newMeshes.forEach(mesh => {
            if(!mesh.parent) {
              mesh.parent = box;
            }

            box.scaling = new BABYLON.Vector3(.5,.5,.5);
            box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
            console.log(box);

          });
          randomPosition(box);
          moveForward(box);
          console.log(playerBox);
          return playerBox;
        });
      // console.log(box2);
      return box2;

    }
    else if (randomNumber <= 0.50) {

       const gameScene = this.gameScene;
        new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.gltf", gameScene, function (newMeshes){
          // const playerBox = newMeshes[1];
          const box = new BABYLON.TransformNode();
          newMeshes.forEach(mesh => {
            if(!mesh.parent) {
              mesh.parent = box;
            }

            box.scaling = new BABYLON.Vector3(.5,.5,.5);
            box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
            console.log(box);
          });
          randomPosition(box);
          moveForward(box);

        });

        const cube = new BABYLON.SceneLoader.ImportMesh(["Cube"], "./src/assets/models/", "speakers.gltf", gameScene, function (){});
        console.log("cube");
        return cube;
        // console.log(box2);

        // });
    }

    else if (randomNumber < 0.75) {
      const gameScene = this.gameScene;
      const box2 = new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.gltf", gameScene, function (newMeshes){
        const playerBox = newMeshes[1];
        const box = new BABYLON.TransformNode();
        newMeshes.forEach(mesh => {
          if(!mesh.parent) {
            mesh.parent = box;
          }

          box.scaling = new BABYLON.Vector3(.5,.5,.5);
          box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
          console.log(box);
        });
        randomPosition(box);
        moveForward(box);
        console.log(playerBox);
      return playerBox;
      });
      // console.log(box2);
      return box2;

    }
    else if (randomNumber >= 0.75) {

      const gameScene = this.gameScene;

      //  const box2 = function createNewMeshes (newMeshes) {

      //   const playerBox = newMeshes[1];
      //   const box = new BABYLON.TransformNode();
      //   newMeshes.forEach(mesh => {
      //     if(!mesh.parent) {
      //       mesh.parent = box;
      //     }
      //     box.scaling = new BABYLON.Vector3(.5,.5,.5);
      //     box.rotation = new BABYLON.Vector3 (0, 1.5, 0);
      //     console.log(box);
      //   });
      //   randomPosition(box);
      //   moveForward(box);
      //   console.log(playerBox);
      //   return playerBox;

      // }
      // new BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.gltf", gameScene, createNewMeshes(newMeshes));

      // return box2;
    }


    function randomPosition(box) {
        let randomNumberX = Math.random();
        console.log(randomNumberX);

        if (randomNumberX < 0.33 && randomNumberX > 0) {
          // new BABYLON.Vector3(-3, 0, 40);
          box.position = new BABYLON.Vector3(-3, 1, 80);
          console.log("baan 1");
        }
        else if (randomNumberX >= 0.33 && randomNumberX <= 0.66) {
          // new BABYLON.Vector3(0, 0, 40);
          box.position = new BABYLON.Vector3(0, 1, 80);
          console.log("baan 2");
        }
        else if (randomNumberX > 0.66 && randomNumberX <= 1) {
          // new BABYLON.Vector3(3, 0, 40);
          box.position = new BABYLON.Vector3(3, 1, 80);
          console.log("baan 3");
        }
      }
      function moveForward (box) {
        let start = Date.now();
        let timer = setInterval(() => {

          let timePassed = Date.now() - start;
          if (timePassed > 10000) clearInterval(timer);
          box.position.z -= 1;
        }, 100);

      };
  }
  checkCollisions (object){
    console.log("test");

    const object = this.spawnRandomObstacle();
    const player = this.player();
    if (player.intersectsMesh(object, false)) {
        // boem = true;
        console.log("boem");
    }
  };

  player () {
    const gameScene = this.gameScene;
    const object = BABYLON.SceneLoader.ImportMesh("", "./src/assets/models/", "speakers.glb", gameScene, function (newMeshes){

      // this.playerBox = newMeshes[1];
      const player = new BABYLON.TransformNode();
      newMeshes.forEach(mesh => {
        if(!mesh.parent) {
          mesh.parent = player;
        }

        player.position = new BABYLON.Vector3(0,0,-4);
        player.scaling = new BABYLON.Vector3(.5,.5,.5);
        player.rotation = new BABYLON.Vector3 (0, 1.5, 0);
        console.log(player);
      });
      return;
    });

    return object;
  };

  spawnRandomModels ( ) {
      let spawnRate1 = 3000;
      let spawnRate2 = 1400;

      this.obstacle1 = setInterval(() => {this.spawnRandomObstacle()},  spawnRate1);
      this.obstacle2 = setInterval(() => {this.spawnRandomObstacle()},  spawnRate2);
  };

  sceneSetup () {
    const gameScene =  new BABYLON.Scene(this.engine);
    gameScene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
    // position of the camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), gameScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), gameScene);

    // testplayer
    const boxBlue = BABYLON.Mesh.CreateBox("Box1", 1.5, 0, gameScene);
    const material1 = new BABYLON.StandardMaterial("material1", gameScene);
    material1.emissiveColor = BABYLON.Color3.Red();
    boxBlue.material = material1;

    // player

    //ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 9, subdivisions: 4}, gameScene);
    ground.position = new BABYLON.Vector3(0,0,7);

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", gameScene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = groundMaterial;

    this.spawnRandomModels();
    this.player();
    return gameScene;
  }

  start() {
    const gameScene = this.sceneSetup();
    this.engine.runRenderLoop(() => {
      gameScene.render();
      // this.checkCollisions();

    });

    setInterval(() => {
      this.goToScene("gameOver");
    }, 50000)
  }

  stop() {
    console.log("dit werkt");
    clearInterval(this.obstacle1);
    clearInterval(this.obstacle2);
    this.engine.stopRenderLoop(
    );
  };


}

export default GameScene;

