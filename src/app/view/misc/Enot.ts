import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";

export class Enot extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('img1');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);

    }
}