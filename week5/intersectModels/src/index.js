import StartScene from './classes/StartScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';

import {Engine} from '@babylonjs/core/Engines/engine';
import * as BABYLON from '@babylonjs/core';

import "@babylonjs/loaders/glTF";
import './css/style.css';
import './index.js';

// import testVideo from './assets/video/testVideo.mp4';

let startScene;
let gameScene;
let gameOverScene;
let currentScene;
let engine;
let canvas;

const speelFilmpje = () => {
  const canvas = document.getElementById("canvas");
  canvas.classList.add("hidden");
  console.log("deleted");

  const video = document.createElement("video");
  video.setAttribute("autoplay","");
  video.setAttribute("class", "introVideo");
  video.setAttribute("controls","");

  const source = document.createElement("source");
  source.setAttribute("src", "./src/assets/video/testVideo.mp4");
  source.setAttribute("type", "video/mp4");
  video.appendChild(source);

  const videoP = document.getElementById("videoP");
  videoP.appendChild(video);
}

const deleteFilmpje = () => {
  const canvas = document.getElementById("canvas");
  canvas.classList.remove("hidden");
  console.log("canvas added");

  const videoP = document.getElementById("videoP");
  videoP.innerHTML = "";

}
const init = () => {
  canvas = document.getElementById('canvas');
  engine = new BABYLON.Engine(canvas, true);

  startScene = new StartScene(engine, goToScene);
  gameScene = new GameScene(engine, goToScene);
  gameOverScene = new GameOverScene(engine, goToScene);

  goToScene('game');
};

const goToScene = name => {
  if (currentScene) {
    currentScene.stop();
  }
  if (name === 'start') {
    currentScene = startScene;
  } if (name === 'game') {
    speelFilmpje();
    setTimeout(() => {
      deleteFilmpje();
      currentScene = gameScene;
      console.log("redirect");
    }, 5000);

  }
  if (name === 'gameOver') {
    currentScene = gameOverScene;
  }
  if (currentScene) {
    currentScene.start();
  }
};

init();
