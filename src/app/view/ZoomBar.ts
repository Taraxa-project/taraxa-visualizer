import MyScale from "../../utils/MyScale";
import { Application, Container } from "pixi.js";
import { CircleButton } from "./ui/CircleButton";

export class ZoomBar extends Container {
  onChangeProc: Function;

  proc: number;

  zoomIn: Function;
  zoomOut: Function;
  autoMove: Function;
  disableMove: Function;

  constructor(app: Application) {
    super();
    // Check URL parameters for controls visibility
    const urlParams = new URLSearchParams(window.location.search);
    const showControls = urlParams.get("controls") !== "false";

    if (!showControls) {
      return; // Exit early if controls should be hidden
    }

    app.stage.addChild(this);
    let autoplay = true;
    let main = this;

    MyScale.setup(this, {
      scalePortrait: 1,
      scaleLandscape: 0.5,
      bottom: 600,
      right: 120,
      onRescale: () => {},
    });

    this.onChangeProc = (proc: number) => {
      if (this.proc != proc) {
      }
      this.proc = proc;
    };

    let zoomIn = new CircleButton(app);
    this.addChild(zoomIn);

    zoomIn.onClick = () => {
      main.zoomIn();
    };
    zoomIn.addIcon("plus");

    let zoomOut = new CircleButton(app);
    this.addChild(zoomOut);
    zoomOut.y = 150;
    zoomOut.onClick = () => {
      main.zoomOut();
    };
    zoomOut.addIcon("minus");

    let pauseBTn = new CircleButton(app);
    this.addChild(pauseBTn);
    pauseBTn.addIcon("pause");
    pauseBTn.y = 300;
    pauseBTn.onClick = () => {
      autoplay = false;
      playBtn.visible = true;
      pauseBTn.visible = false;
      main.autoMove(autoplay);
    };

    let playBtn = new CircleButton(app);
    this.addChild(playBtn);
    playBtn.addIcon("play");
    playBtn.y = 300;
    playBtn.onClick = () => {
      autoplay = true;
      playBtn.visible = false;
      pauseBTn.visible = true;
      main.autoMove(autoplay);
    };
    playBtn.visible = false;

    this.disableMove = () => {
      autoplay = false;
    };
  }
}
