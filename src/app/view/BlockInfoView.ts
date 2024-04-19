import {Text, Application, Assets, Container, Graphics, Sprite, BitmapText, curveEps, Point} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockView} from "./BlockView";
import gsap from "gsap";
import Config from "../../config/Config";
import {SectorView} from "./SectorView";

export class BlockInfoView extends Container {

    onRescale: Function;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);
        app.stage.hitArea = app.screen;

        MyScale.setup(this, {
            left: 1,
            top: 1,
            scalePortrait: 1,
            scaleLandscape: 1,
            onRescale: () => {
            }
        });

        let obj = new Graphics();
        obj.rect(0, 0, 600, 1080)
            .fill(0x666666)
            .stroke({width: 5, color: 0xffffff});
        this.addChild(obj);
    }
}