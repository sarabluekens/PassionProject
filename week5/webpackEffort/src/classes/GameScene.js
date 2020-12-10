import * as BABYLON from 'babylonjs';

class GameScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
  }

    // this.goToScene('game')

    spawnRandomObstacle (box) {

    //random obstakel selecteren
    let randomNumber = Math.random();



    if (randomNumber < 0.25) {
        box = BABYLON.Mesh.CreateBox("Box1", 1.5, 0, playScene);
        const material1 = new BABYLON.StandardMaterial("material1", playScene);
        material1.emissiveColor = BABYLON.Color3.Red();
        randomPosition(box);
        box.material = material1;
        console.log("1");

        moveForward(box);
    }
    else if (randomNumber <= 0.50) {

        box = BABYLON.Mesh.CreateBox("Box2", 1.5, 0, playScene);
        const material2 = new BABYLON.StandardMaterial("material1", playScene);
        material2.emissiveColor = BABYLON.Color3.Blue();
        box.material = material2;
        randomPosition(box);
        console.log("2");


        moveForward(box);
    }
    else if (randomNumber < 0.75) {

        box = BABYLON.Mesh.CreateBox("Box3", 1, 0, playScene);
        const material3 = new BABYLON.StandardMaterial("material1", playScene);
        material3.emissiveColor = BABYLON.Color3.Green();
        box.material = material3;
        randomPosition(box);

        console.log("3");


        moveForward(box);
    }
    else if (randomNumber >= 0.75) {

        box = BABYLON.Mesh.CreateBox("Box4", .5, 0, playScene);
        const material4 = new BABYLON.StandardMaterial("material1", playScene);
        material4.emissiveColor = BABYLON.Color3.Yellow();
        box.material = material4;
        randomPosition(box);

        console.log("4");

        moveForward(box);
    }
    return box;
    };

    randomPosition (box) {
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
    };

    checkCollisions (box, playerBox){
        console.log("test");
        if (box.intersectsMesh(playerBox, false)) {
            console.log("boem");
            boem = false;
        }
    };

    moveForward (box) {
            let start = Date.now();

            let timer = setInterval(function() {
                let timePassed = Date.now() - start;

                if (timePassed > 10000) clearInterval(timer);
                box.position.z -= 1;
                checkCollisions(box, playerBox);

            }, 100);

    };

    spawnRandomObstacles ( ) {

      let spawnRate1 = 3000;
      let spawnRate2 = 1400;

        setInterval(spawnRandomObstacle,  spawnRate1);
        setInterval(spawnRandomObstacle,  spawnRate2);

    };

  start () {
    let box;

    const playScene = new BABYLON.Scene(this.engine);
    playScene.clearColor = new BABYLON.Color3(0.65, 0.81, 0.67);

    let playerBox;
    BABYLON.SceneLoader.OnPluginActivatedObservable.addOnce(function (plugin) {
      plugin.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.ALL;
    });

    BABYLON.SceneLoader.ImportMesh("","./models/","bodyTest.glb", playScene, function(newMeshes){
        playerBox = newMeshes[1];
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
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), playScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    //ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 9, subdivisions: 4});
    ground.position = new BABYLON.Vector3(0,0,7);

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", playScene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = groundMaterial;


    //Add camera, light and meshes for scene1
    console.log("play");

    spawnRandomObstacles(box, playerBox);
  }

  stop() {
    return;
  }
}

export default GameScene;

