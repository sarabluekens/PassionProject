import StartScene from './classes/StartScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';

let startScene;
let gameScene;
let gameOverScene;js

let currentScene;
let engine;

const init = () => {

  const engine = ....;

  startScene = new StartScene(engine, goToScene);
  gameScene = new GameScene(engine, goToScene);
  gameOverScene = new GameOverScene(engine, goToScene);

  goToScene('start');

  engine.runRenderLoop(() => {
    currentScene.render();
  });


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




// function something(x)
// {
//     if (x >= 10)
//         // this leaves the function if x is at least 10.
//         return;

//     // this message displays only if x is less than 10.
//     alert ("x is less than 10!");
// }