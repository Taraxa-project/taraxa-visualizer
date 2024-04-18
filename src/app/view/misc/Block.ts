import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MyContainer} from "../abstract/MyContainer";
import Config from "../../../config/Config";

export class Block extends MyContainer {

    constructor(app: Application) {
        super(app);

        let hexagonRadius = 120;
        let hexagonHeight = hexagonRadius * Math.sqrt(3);

        let obj = new Graphics();
        obj.poly([
            -hexagonRadius, 0,
            -hexagonRadius / 2, hexagonHeight / 2,
            hexagonRadius / 2, hexagonHeight / 2,
            hexagonRadius, 0,
            hexagonRadius / 2, -hexagonHeight / 2,
            -hexagonRadius / 2, -hexagonHeight / 2,])
            .fill(0x666666)
            .stroke({width: 5, color: 0xffffff});
        this.addChild(obj);

        obj.interactive = true;
        obj.on('pointerdown', () => {
            console.log(this);
        })

    }
}