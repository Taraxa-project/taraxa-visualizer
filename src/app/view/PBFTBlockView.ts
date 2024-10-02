import {Application, Assets, BitmapText, Container, Graphics, Sprite, Text, TextStyle} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockModel} from "../model/BlockModel";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";
import {SectorView} from "./SectorView";
import {MainController} from "../controller/MainController";

export class PBFTBlockView extends Container {

    view: SectorView;
    vid: number;
    model: BlockModel;
    debug: Function;
    update: Function;
    render: Function;
    clean: Function;
    moveTo: Function;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);
        this.clean = () => {
            this.model = null;
            this.vid = undefined;
        }
        let hexagonRadius = 50;
        let fin = 0;
        let colored = false;

        const obj = new Sprite(CustomTextures.textures.hex);
        obj.anchor.set(0.5);
        // obj.scale.set(0.298);
        this.addChild(obj)

        /*   const img = new Sprite(CustomTextures.textures.blockTexture);
           img.anchor.set(0.5);
           img.scale.set(0.3);
           this.addChild(img)*/

        obj.interactive = true;
        obj.on('pointerdown', () => {
            // Config.showBlock(this.model);
            (window as any).showblock(this.model);
        })

        obj.interactive = true;
        obj.on('pointerover', () => {
            gsap.to(obj.scale, {
                duration: 0.3, // продолжительность анимации в секундах
                x: 1.1,
                y: 1.1,
                ease: "sine.out",
            });
            // gsap.to(basicText, {
            //     duration: 0.3, // продолжительность анимации в секундах
            //     y: 60,
            //     ease: "sine.out",
            // });
        })

        obj.on('pointerout', () => {
            gsap.to(obj.scale, {
                duration: 0.3, // продолжительность анимации в секундах
                x: 1,
                y: 1,
                ease: "sine.in",
            });
            // gsap.to(basicText, {
            //     duration: 0.3, // продолжительность анимации в секундах
            //     y: 50,
            //     ease: "sine.in",
            // });
        })

        this.debug = (value: number) => {
        }

        obj.tint = Config.colors.PBFTBlock;

        this.moveTo = (pos: number) => {
            if (fin != pos) {
                fin = pos;
                gsap.to(this, {
                    y: fin,
                    duration: 0.5, // продолжительность анимации в секундах
                    ease: "sine.out",
                });
            }
        }

        const style = new TextStyle({
            fontFamily: 'Inter',
            fontSize: 20,
            fill: Config.colors.white,
            wordWrap: false,
            wordWrapWidth: 440,
        });

        let basicText: any = new Text({style});
        basicText.anchor.set(0.5);
        this.addChild(basicText);
        basicText.y = -15;

        let basicText2: any = new Text({style});
        basicText2.anchor.set(0.5);
        this.addChild(basicText2);
        basicText2.y = basicText.y + 30;

        this.render = () => {
           /* if (this.model?.finalized && !colored && Config.showFinalized) {
                colored = true;
                obj.tint = Config.colors.white;
            }*/
        }

        this.update = () => {
            if (this.model) {
                basicText.text = this.model.hash.slice(0, 5);
                basicText2.text = "..." + this.model.hash.slice(-3);
            }
        }
    }
}