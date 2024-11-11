import MyScale from "../../../utils/MyScale";
import { Application, Container, Sprite } from "pixi.js";
import CustomTextures from "../../../utils/CustomTextures";

export class Logo extends Container {
  constructor(app: Application) {
    super();

    const urlParams = new URLSearchParams(window.location.search);
    const showLogo = urlParams.get("logo") !== "false";

    if (showLogo) {
      app.stage.addChild(this);

      MyScale.setup(this, {
        scalePortrait: 0.5,
        scaleLandscape: 0.25,
        top: 300,
        left: 700,
        onRescale: () => {},
      });

      const img = new Sprite(CustomTextures.textures.logo);
      img.anchor.set(0.5);
      img.scale.set(0.3);
      img.cursor = "pointer";
      this.addChild(img);

      img.interactive = true;
      img.on("pointerdown", () => {
        window.open("https://www.taraxa.io/");
      });
    }
  }
}
