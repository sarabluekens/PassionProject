import StartScene from './classes/StartScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';
import {Engine, Scene} from './node_modules/babylonjs/babylon.max.js';


let startScene;
let gameScene;
let gameOverScene;
let currentScene;
let engine;

const init = () => {

  engine = new BABYLON.Engine(canvas, true);

  startScene = new StartScene(engine, goToScene);
  gameScene = new GameScene(engine, goToScene);
  gameOverScene = new GameOverScene(engine, goToScene);

  goToScene('start');

  // engine.runRenderLoop(() => {
  //   currentScene.render();
  // });


};

const goToScene = name => {
  if (currentScene) {
    currentScene.stop();
  }
  if (name === 'start') {
    currentScene = startScene;
  } else if (name === 'game') {
    currentScene = gameScene;
  } else if (name === 'gameOver') {
    currentScene = gameOverScene;
  }
  if (currentScene) {
    currentScene.start();
  }
};



init();