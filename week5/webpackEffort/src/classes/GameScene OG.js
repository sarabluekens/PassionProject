import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

class GameScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
    this.playScene = null;
    this.box = null;
    this.playerBox = null;
    this.player = null;
  }

    // this.goToScene('game')

    spawnRandomObstacle () {

    //random obstakel selecteren
    let randomNumber = Math.random();

    if (randomNumber < 0.25) {
      this.box = BABYLON.Mesh.CreateBox("Box1", 1.5, 0, this.playScene);
        const material1 = new BABYLON.StandardMaterial("material1", this.playScene);
        material1.emissiveColor = BABYLON.Color3.Red();
        randomPosition(this.box);
        this.box.material = material1;
        console.log("1");

        moveForward(this.box);
    }
    else if (randomNumber <= 0.50) {

      this.box = BABYLON.Mesh.CreateBox("Box2", 1.5, 0, this.playScene);
        const material2 = new BABYLON.StandardMaterial("material1", this.playScene);
        material2.emissiveColor = BABYLON.Color3.Blue();
        this.box.material = material2;
        randomPosition(this.box);
        console.log("2");


        moveForward();
    }
    else if (randomNumber < 0.75) {

      this.box = BABYLON.Mesh.CreateBox("Box3", 1, 0, this.playScene);
        const material3 = new BABYLON.StandardMaterial("material1", this.playScene);
        material3.emissiveColor = BABYLON.Color3.Green();
        this.box.material = material3;
        randomPosition(this.box);

        console.log("3");


        moveForward(this.box);
    }
    else if (randomNumber >= 0.75) {

      this.box = BABYLON.Mesh.CreateBox("Box4", .5, 0, this.playScene);
        const material4 = new BABYLON.StandardMaterial("material1", this.playScene);
        material4.emissiveColor = BABYLON.Color3.Yellow();
        this.box.material = material4;
        randomPosition(this.box);

        console.log("4");

        moveForward(this.box);
    }
    return this.box;

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

      function checkCollisions (box){
        console.log("test");
        if (box.intersectsMesh(box, false)) {
            console.log("boem");
            // boem = false;
        }
    };

    function moveForward (box) {
      let start = Date.now();

      let timer = setInterval(() => {}, 100);
      let timePassed = Date.now() - start;
      if (timePassed > 10000) clearInterval(timer);
      box.position.z -= 1;
      this.checkCollisions(box, playerBox);

    };

}

    spawnRandomObstacles ( ) {

      let spawnRate1 = 3000;
      let spawnRate2 = 1400;

        setInterval(() => {this.spawnRandomObstacle()},  spawnRate1);
        setInterval(() => {this.spawnRandomObstacle()},  spawnRate2);

    };

  sceneSetup () {
    const playScene = new BABYLON.Scene(this.engine);
    playScene.clearColor = new BABYLON.Color3(0.65, 0.81, 0.67);
  //   BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (loader) {
  //         loader.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.ALL;
  // });

    BABYLON.SceneLoader.ImportMesh("","./assets/models/","test.gltf", this.playScene, function(newMeshes){
     this.playerBox = newMeshes[1];
      player = new BABYLON.TransformNode();
      newMeshes.forEach(mesh => {
          if (!mesh.parent) {
              mesh.parent = player;
          }
          player.position = new BABYLON.Vector3(0,0,-4);
          player.scaling = new BABYLON.Vector3(.5, .5, .5);
      });
    });
    // position of the camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), this.playScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    //ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 9, subdivisions: 4});
    ground.position = new BABYLON.Vector3(0,0,7);

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this.playScene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = groundMaterial;


    //Add camera, light and meshes for scene1
    console.log("play");
    this.spawnRandomObstacles();
  }

  render() {
    const gameScene = this.start();
    this.engine.runRenderLoop(() => {
      gameScene.render();
    });
  }
  stop() {
    return;
  };


}

export default GameScene;

