import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MyContainer} from "../abstract/MyContainer";
import Config from "../../../config/Config";

export class Back extends MyContainer {

    constructor(app: Application) {
        super(app);

        /*    const textureImg1 = Assets.get('bg');
            const back = new Sprite(textureImg1);
            this.addChild(back);
            back.anchor.set(0.5, 1);*/

        let obj = new Graphics()
            .rect(-Config.DEFAULT_WIDTH / 2, -Config.DEFAULT_HEIGHT / 2, Config.DEFAULT_WIDTH, Config.DEFAULT_HEIGHT)
            .stroke({width: 10, color: 0xfeeb77})
            .fill(0x666666);
        this.addChild(obj);
    }
}