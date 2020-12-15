import StartScene from './classes/StartScene.js';
import GameScene from './classes/GameScene.js';
import GameOverScene from './classes/GameOverScene.js';
import Tutorial from './classes/Tutorial.js';
import IntroFilmpje from './classes/IntroFilmpje.js';
import TutorialFilmpje from './classes/TutorialFilmpje.js';
import {Engine} from '@babylonjs/core/Engines/engine';
import * as BABYLON from '@babylonjs/core';

import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';

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
  // ------------------------------------ globaal ------------------------------------
  const $webcam = document.getElementById("webcam");

  const leftEyeX = document.createElement("p");
  leftEyeX.classList.add("xCO");
  leftEyeX.textContent = '';

  const leftEyeY = document.createElement("p");
  leftEyeY.classList.add("yCO");
  leftEyeY.textContent = '';

  let xValue;
  let player;

   // ------------------------------------ camera ------------------------------------

   const camera = async () => {
    requestAnimationFrame(render);
    const options = { audio: false, video: { width: 320, height: 180} };
    let stream = await navigator.mediaDevices.getUserMedia(options);
    $webcam.srcObject = stream;

    if(!$webcam.captureStream) {
        $webcam.captureStream = () => stream;
    }
}

const render = (time) => {
    time *= 0.001;
    requestAnimationFrame(render);
}

// ------------------------------------ posenet ------------------------------------

    const runPoseNet = async () => {
        await camera();
        const net = await posenet.load({
        inputResolution:{width:640, height:480},
        scale: 0.5
        });

        setInterval(() => {
            detect(net );
        }, 100 );
    };

const detect = async (net) => {
    //make detections
    const pose = await net.estimateSinglePose(webcam);
    // console.log(pose);

    const outputX = pose.keypoints[1].position.x;
    const outputY = pose.keypoints[1].position.y;

    if (outputX >= 200 && outputX < 350) {
        gameScene.player.postion.z = 3;
        } else if (outputX >= 130 && outputX < 200){
            xValue = 0
            } else if (outputX >= 0 && outputX < 130){
                xValue = -3;
    };

    leftEyeX.textContent = outputX
    leftEyeY.textContent = outputY;
    document.body.appendChild(leftEyeX);
    document.body.appendChild(leftEyeY);

    return xValue ;
}

const init = () => {
  camera();
  tf.ready( runPoseNet(gameScene));
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
