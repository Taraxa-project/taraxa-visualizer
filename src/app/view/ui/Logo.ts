import MyScale from "../../../utils/MyScale";
import {Application, Container, Sprite} from "pixi.js";
import CustomTextures from "../../../utils/CustomTextures";

export class Logo extends Container {

    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        MyScale.setup(this, {
            scalePortrait: 1,
            scaleLandscape: 1,
            top: 50,
            right: 120,
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