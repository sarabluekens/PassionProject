import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from  'react-webcam';
import { drawKeypoints, drawSkeleton } from './utilities';
import FPSStats from "react-fps-stats";

function App() {

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //load poseNet
  const rundPoseNet = async () => {
    const net = await posenet.load({
      inputResolution:{width:640, height:480},
      scale: 0.5
    });

    setInterval(() => {
      detect(net);
    }, 100 );
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4){

    // properties
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    //set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    //make detections
    const pose = await net.estimateSinglePose(video);
    console.log(pose);

    drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => { 
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  rundPoseNet();

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>"hello world"</h1> 
          <Webcam ref= {webcamRef} style= {{position:"absolute", marginLeft:"auto", marginRight: "auto", left: 0, right: 0, textAlign:"center", zindex: 9, width: 640, height: 480}} />
          <canvas ref= {canvasRef} style= {{position:"absolute", marginLeft:"auto", marginRight: "auto", left: 0, right: 0, textAlign:"center", zindex: 9, width: 640, height: 480}} />
        </header>
      </div>
      <div>
        <FPSStats />
      </div>
     
    </>
  );
}

export default App;
