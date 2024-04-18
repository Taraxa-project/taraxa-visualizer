import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";

export class City extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('city');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);
        sprite.anchor.set(0.5, 0.5);
        sprite.y = 50;
    }
}