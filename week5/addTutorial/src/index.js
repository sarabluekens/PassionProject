import StartScene from './classes/StartScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';
import Tutorial from './classes/Tutorial.js';
import IntroFilmpje from './classes/IntroFilmpje.js';
import TutorialFilmpje from './classes/TutorialFilmpje.js';
import {Engine} from '@babylonjs/core/Engines/engine';
import * as BABYLON from '@babylonjs/core';

import "@babylonjs/loaders/glTF";
import './css/style.css';


let startScene;
let gameScene;
let gameOverScene;
let introFilmpje;
let tutorialFilmpje
let currentScene;
let tutorial;
let engine;
let canvas;

const init = () => {
  canvas = document.getElementById('canvas');
  engine = new BABYLON.Engine(canvas, true);
  startScene = new StartScene(engine, goToScene);

  gameScene = new GameScene(engine, goToScene);
  gameOverScene = new GameOverScene(engine, goToScene);
  tutorial = new Tutorial(engine,goToScene);

  goToScene('game');
};

const goToScene = name => {
  if (currentScene) {
    currentScene.stop();
  }
  if (name === 'start') {
    currentScene = startScene;
  }
  else if ( name === "introFilmpje") {
    currentScene = introFilmpje;
  }
  else if ( name === "tutorial") {
    currentScene = tutorial;
  }
  else if ( name === "tutorialFilmpje"){
    currentScene = tutorialFilmpje;
  }
  else if (name === 'game') {
    currentScene = gameScene;
  }
  else if (name === 'gameOver') {
    currentScene = gameOverScene;
  }
  if (currentScene) {
    currentScene.start();
  }
};

init();
