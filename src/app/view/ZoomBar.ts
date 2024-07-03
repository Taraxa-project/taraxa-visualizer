import MyScale from "../../utils/MyScale";
import {Application, Container, Graphics, Sprite} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";

export class ZoomBar extends Container {

    onChangeProc: Function;
    onTimeLineDrag: Function;
    cont: Container;
    proc: number;

    zoomIn: Function;
    zoomOut: Function;
    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        let main = this;

        MyScale.setup(this, {
            scalePortrait: 1,
            scaleLandscape: 1,
            bottom: 375,
            right: 150,
            onRescale: () => {
            }
        });

        this.onChangeProc = (proc: number) => {
            if (this.proc != proc) {
            }
            this.proc = proc;
        }

        let sliderbar = new Container();
        this.addChild(sliderbar);

        let obj = new Graphics();
        obj.rect(0, 0, 100, 100)
            .fill(0x666666)
            .stroke({width: 5, color: 0xffffff});
        this.addChild(obj);

        let obj2 = new Graphics();
        obj2.rect(0, 100, 100, 100)
            .fill(0x202020)
            .stroke({width: 5, color: 0xffffff});
        this.addChild(obj2);

        obj.interactive = true;
        obj.on('pointerdown', () => {
            main.zoomIn();
        })
        obj2.interactive = true;
        obj2.on('pointerdown', () => {
            main.zoomOut();
        })
    }
}