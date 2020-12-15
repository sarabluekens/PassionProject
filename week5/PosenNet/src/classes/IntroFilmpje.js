import "@babylonjs/loaders/glTF";

class IntroFilmpje {
  constructor(goToScene) {

    this.goToScene = goToScene;

  }
  speelFilmpje () {
    const canvas = document.getElementById('canvas');
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

    deleteFilmpje () {
    const canvas = document.getElementById('canvas');
    canvas.classList.remove("hidden");
    console.log("canvas added");
    const videoP = document.getElementById("videoP");
    videoP.innerHTML = "";
    }

  sceneSetup () {
   this.speelFilmpje();
  }

  start() {
   this.sceneSetup();

   setTimeout(() => {
     this.deleteFilmpje();
      this.goToScene("game");

      console.log("shoot");
    }, 5000)
  }

  stop() {
    console.log("dit werkt");
  };


}

export default IntroFilmpje;

