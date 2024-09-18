import MyScale from "../../../utils/MyScale";
import {Application, Container, Sprite} from "pixi.js";
import CustomTextures from "../../../utils/CustomTextures";

export class Logo extends Container {

    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        MyScale.setup(this, {
            scalePortrait: 0.5,
            scaleLandscape: 0.25,
            top: 200,
            right: 200,
            onRescale: () => {
            }
        });

        const img = new Sprite(CustomTextures.textures.logo);
        img.anchor.set(0.5);
        img.scale.set(1);
        this.addChild(img)

        img.interactive = true;
        img.on('pointerdown', () => {
            window.open('https://www.taraxa.io/')
        })
    }
}