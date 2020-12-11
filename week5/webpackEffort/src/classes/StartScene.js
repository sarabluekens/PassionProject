import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

class StartScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
  }

  start() {

    this.render();
    setTimeout(() => {
      this.goToScene('game');
    }, 5000);

  }

  sceneSetup() {
    const startScene = new BABYLON.Scene(this.engine);

    // position of the camera
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 5, -10), startScene);

    //  where does the camera rotate to? in dit geval richt hij zich naar het middelpunt van de canvas
    camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    // light
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
    //ground
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 9, subdivisions: 4});
    ground.position = new BABYLON.Vector3(0,0,7);

    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", startScene);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.85, 0.77, 0.60);
    ground.material = groundMaterial;

    const boxBlue = BABYLON.Mesh.CreateBox("Box1", 1.5, 0, startScene);
    const material1 = new BABYLON.StandardMaterial("material1", startScene);
    material1.emissiveColor = BABYLON.Color3.Blue();
    boxBlue.material = material1;
    //Add camera, light and meshes for scene1
    return startScene;
  };

  stop() {
    return;
  }

  render() {
    const startscene = this.sceneSetup()
    this.engine.runRenderLoop(() => {
      startscene.render();
    });
  }
}

export default StartScene;
