import {Text, Application, Assets, Container, Graphics, Sprite, BitmapText, curveEps, Point} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockView} from "./BlockView";
import gsap from "gsap";
import Config from "../../config/Config";

export class SectorHighlightView extends Container {

    update: Function;
    render: Function;
    model: TimelineSectorModel;
    blocks: BlockView[] = [];
    debug: Function;
    init: Function;
    drawConnect: Function;
    create: Function;
    createUniformBlocks: Function;
    createCenteredBlocks: Function;
    onRescale: Function;
    vid: number;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        let obj = new Graphics();
        obj.rect(0, -5000, Config.SECTOR_WIDTH, 10000)
            .fill({color:0x666666,alpha:0})
        this.addChild(obj);

        let obj2 = new Graphics();
        obj2.rect(0, -5000, Config.SECTOR_WIDTH, 10000)
          //  .fill(0x292c3f)
            .fill({color:0x292c3f,alpha:1})
        this.addChild(obj2);
        obj2.alpha = 0;

        obj.interactive = true;
        obj.on('pointerdown', () => {
            // this.emit('onSector', this.vid);
            // new EventEmitter().context = {this.vid}
        })
        obj.on('pointerover', () => {
            gsap.to([obj2], {
                duration: 0.2, // продолжительность анимации в секундах
                alpha: 1,      // конечная позиция y
                ease: "sine.in",
            });
        })
        obj.on('pointerout', () => {
            gsap.to([obj2], {
                duration: 0.2, // продолжительность анимации в секундах
                alpha: 0,      // конечная позиция y
                ease: "sine.in",
            });
        })

        this.init = (model: TimelineSectorModel) => {
            this.model = model;
        }
    }
}