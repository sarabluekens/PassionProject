
import * as BABYLON from '@babylonjs/core';
import {Scene} from '@babylonjs/core';
import '@babylonjs/loaders/glTF';


class GameScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
    this.box = null;
    this.object = null;
    let obstacleBox;
    // this.playerBox = null;
  }

  spawnRandomObstacle () {
    const randomNumber = Math.random();
    const moveForward = box => {
      const start = Date.now();
      const timer = setInterval(() => {

        const timePassed = Date.now() - start;
        if (timePassed > 10000) clearInterval(timer);
        box.position.z -= 0.1;
        if (timePassed >= 10000) {
          box.dispose();
        }
      }, 10);
    };

    const randomPosition = box => {
      const randomNumberX = Math.random();
      console.log(randomNumberX);

      if (randomNumberX < 0.33 && randomNumberX > 0) {
        // new BABYLON.Vector3(-3, 0, 40);
        box.position = new BABYLON.Vector3(- 5, 0, 80);
        console.log('baan 1');
      }
      else if (randomNumberX >= 0.33 && randomNumberX <= 0.66) {
        // new BABYLON.Vector3(0, 0, 40);
        box.position = new BABYLON.Vector3(0, 0, 80);
        console.log('baan 2');
      }
      else if (randomNumberX > 0.66 && randomNumberX <= 1) {
        // new BABYLON.Vector3(3, 0, 40);
        box.position = new BABYLON.Vector3(5, 0, 80);
        console.log('baan 3');
      }
    };

    const checkCollisions = box => {
      this.player();
      console.log(box);
      console.log('test');
      if (this.player().intersectsMesh(this.spawnRandomObstacle(), false)) {
        console.log('boem');
      }
    };

    if (randomNumber < 0.25) {
      // this.box =  BABYLON.SceneLoader.ImportMeshAsync("", "./src/assets/models/", "speakers.glb", this.gameScene).playerMeshes[1];
      let obstacleBox;
      const gameScene = this.gameScene;
      const obstacle = new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.gltf', gameScene, objectMeshes => {
        obstacleBox = objectMeshes[1];
        const box = new BABYLON.TransformNode();
        // this.boxes.playerBox = objectMeshes[1];
        objectMeshes.forEach(mesh => {
          if (!mesh.parent) {
            mesh.parent = box;
          }

          box.scaling = new BABYLON.Vector3(.5, .5, .5);
          box.rotation = new BABYLON.Vector3 (0, 1.5, 0);


          console.log(box);

        });
        randomPosition(box);
        moveForward(box);

        return obstacleBox;
      });
      return obstacleBox;

    }
    else if (randomNumber <= 0.50) {
      let obstacleBox;
      const gameScene = this.gameScene;
      new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.gltf', gameScene, objectMeshes => {
        obstacleBox = objectMeshes[1];
        const box = new BABYLON.TransformNode();
        objectMeshes.forEach(mesh => {
          if (!mesh.parent) {
            mesh.parent = box;
          }

          box.scaling = new BABYLON.Vector3(.5, .5, .5);
          box.rotation = new BABYLON.Vector3 (0, 1.5, 0);

          console.log(box);
        });
        randomPosition(box);
        moveForward(box);
        checkCollisions(box);

        return obstacleBox;
      });
      return obstacleBox;
    }

    else if (randomNumber < 0.75) {
      let obstacleBox;
      const gameScene = this.gameScene;
      new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.gltf', gameScene,  objectMeshes => {
        obstacleBox = objectMeshes[1];
        const box = new BABYLON.TransformNode();
        objectMeshes.forEach(mesh => {
          if (!mesh.parent) {
            mesh.parent = box;
          }

          box.scaling = new BABYLON.Vector3(.5, .5, .5);
          box.rotation = new BABYLON.Vector3 (0, 1.5, 0);

          console.log(box);
        });
        randomPosition(box);
        moveForward(box);
        // checkCollisions(collisionBox)
        checkCollisions(box);


        return obstacleBox;
      });
      return obstacleBox;

    }
    else if (randomNumber >= 0.75) {
      let obstacleBox;
      const gameScene = this.gameScene;
      new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.gltf', gameScene, objectMeshes => {

        obstacleBox = objectMeshes[1];
        const box = new BABYLON.TransformNode();
        objectMeshes.forEach(mesh => {
          if (!mesh.parent) {
            mesh.parent = box;
          }
          box.scaling = new BABYLON.Vector3(.5, .5, .5);
          box.rotation = new BABYLON.Vector3 (0, 1.5, 0);

          console.log(box);
        });
        randomPosition(box);
        moveForward(box);
        // checkCollisions(box);
        checkCollisions(box);

        return obstacleBox;
      });
      return obstacleBox;
    }
  }

  spawnRandomModels () {
    const spawnRate1 = 3000;
    const spawnRate2 = 1400;

    this.obstacle1 = setInterval(() => {this.spawnRandomObstacle();},  spawnRate1);
    this.obstacle2 = setInterval(() => {this.spawnRandomObstacle();},  spawnRate2);
  }

  // player () {
  //   const gameScene = this.gameScene;
  //   let playerBox;
  //   const model = new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.glb', gameScene, playerMeshes => {
  //     playerBox = playerMeshes[1];
  //     const player = new BABYLON.TransformNode();
  //     playerMeshes.forEach(mesh => {
  //       if (!mesh.parent) {
  //         mesh.parent = player;
  //       }

  //       player.position = new BABYLON.Vector3(0, 0, - 4);
  //       player.scaling = new BABYLON.Vector3(.5, .5, .5);
  //       player.rotation = new BABYLON.Vector3 (0, 1.5, 0);


  //     });
  //     return playerBox;
  //   });
  // //   return playerBox;
  // }


  sceneSetup () {
    const gameScene =  new BABYLON.Scene(this.engine);
    gameScene.collisionsEnabled = true;
    gameScene.clearColor = new BABYLON.Color3(1, 0.4, 0.4);
    // position of the camera
    const camera = new BABYLON.UniversalCamera('UniversalCamera', new BABYLON.Vector3(0, 5, - 10), gameScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light


    const model = new BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', 'speakers.glb', gameScene, playerMeshes => {
      playerBox = playerMeshes[1];
      const player = new BABYLON.TransformNode();
      playerMeshes.forEach(mesh => {
        if (!mesh.parent) {
          mesh.parent = player;
        }

        player.position = new BABYLON.Vector3(0, 0, - 4);
        player.scaling = new BABYLON.Vector3(.5, .5, .5);
        player.rotation = new BABYLON.Vector3 (0, 1.5, 0);
      });
      model.playerBox;
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), gameScene);

    // testplayer
    const boxBlue = BABYLON.Mesh.CreateBox('Box1', 1.5, 0, gameScene);
    const material1 = new BABYLON.StandardMaterial('material1', gameScene);
    material1.emissiveColor = BABYLON.Color3.Red();
    boxBlue.material = material1;

    //ground
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {height: 150, width: 20, subdivisions: 4}, gameScene);
    ground.position = new BABYLON.Vector3(0, 0, 7);

    const wood = new BABYLON.StandardMaterial('wood', gameScene);
    wood.diffuseTexture = new BABYLON.Texture('./src/assets/img/wood2.jpg', gameScene);
    // const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", gameScene);
    // groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = wood;

    let t = 0;
    gameScene.onBeforeRenderObservable.add(() => {
      wood.diffuseTexture.vOffset = t;
      t += 0.0015;

    });
    this.spawnRandomModels();
    this.player();
    return gameScene;
  }

  start() {
    const gameScene = this.sceneSetup();

    this.engine.runRenderLoop(() => {
      gameScene.render();

    });

    setInterval(() => {
      this.goToScene('gameOver');
    }, 50000);
  }

  stop() {
    console.log('dit werkt');
    clearInterval(this.obstacle1);
    clearInterval(this.obstacle2);
    this.engine.stopRenderLoop(
    );
  }


}

export default GameScene;

