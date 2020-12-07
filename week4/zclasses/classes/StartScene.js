class StartScene {
  constructor(engine, goToScene) {
    this.engine = engine;
    this.goToScene = goToScene;
  }

  start() {
    setTimeout(() => {
      this.goToScene('game');
    }, 5000);
  }

  stop() {
  }

  render() {
  }
}

export default StartScene;