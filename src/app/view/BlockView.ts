import {Application, Assets, BitmapText, Container, Graphics, Sprite, Text} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockModel} from "../model/BlockModel";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";

export class BlockView extends Container {

    vid: number;
    model: BlockModel;
    debug: Function;
    update: Function;
    render: Function;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        let hexagonRadius = 50;

        /*       const circ = new Sprite(CustomTextures.textures.circ);
               circ.anchor.set(0.5);
               this.addChild(circ)*/


        const obj = new Sprite(CustomTextures.textures.hex);
        obj.anchor.set(0.5);
        obj.scale.set(0.298);
        this.addChild(obj)

        const img = new Sprite(CustomTextures.textures.blockTexture);
        img.anchor.set(0.5);
        img.scale.set(0.3);
        this.addChild(img)

        const img0 = new Sprite(CustomTextures.textures.blockTexture0);
        img0.anchor.set(0.5);
        img0.scale.set(0.3);
        this.addChild(img0)

        const img1 = new Sprite(CustomTextures.textures.blockTexture1);
        img1.anchor.set(0.5);
        img1.scale.set(0.3);
        this.addChild(img1)

        const img2 = new Sprite(CustomTextures.textures.blockTexture2);
        img2.anchor.set(0.5);
        img2.scale.set(0.3);
        this.addChild(img2)

        const img3 = new Sprite(CustomTextures.textures.blockTexture3);
        img3.anchor.set(0.5);
        img3.scale.set(0.3);
        this.addChild(img3)

        const img4 = new Sprite(CustomTextures.textures.blockTexture4);
        img4.anchor.set(0.5);
        img4.scale.set(0.3);
        this.addChild(img4)


        let offset = 5;
        let duration = 0.5;
        let delay = 0.05;

        let easy2: string = 'back.out';
        let easy: string = 'back.in';


        const restartAnimation2 = () => {
            gsap.to([img0], {x: 0, y: 0, ease: easy2, delay: delay, duration: duration});
            gsap.to([img1], {x: 0, y: 0, ease: easy2, delay: delay * 2, duration: duration});
            gsap.to([img2], {x: 0, y: 0, ease: easy2, delay: delay * 3, duration: duration});
            gsap.to([img3], {
                x: 0, y: 0, ease: easy2, delay: delay * 4, duration: duration, onComplete: () => {
                    if (this.model && this.model.finalized) {
                    } else {
                        restartAnimation();
                    }

                }
            });
        }
        const restartAnimation = () => {
            gsap.to([img0], {x: -offset, y: -offset, ease: easy, delay: delay, duration: duration});
            gsap.to([img1], {x: offset, y: -offset, ease: easy, delay: delay * 2, duration: duration});
            gsap.to([img2], {x: offset, y: offset, ease: easy, delay: delay * 3, duration: duration});
            gsap.to([img3], {
                x: -offset, y: offset, ease: easy, delay: delay * 4, duration: duration, onComplete: () => {
                    restartAnimation2();
                }
            });
        }

        if (Config.animateBlockSurface) {
            setTimeout(() => {
                restartAnimation();
            }, Math.random() * 1000)


            gsap.to(img0, {
                y: -100,
                x: -100,
                duration: 500, // продолжительность анимации в секундах
                ease: "back.out",
                repeat: -1,
                yoyo: true
            });


            gsap.to([img1], {
                y: -5,
                x: 5,
                duration: 500, // продолжительность анимации в секундах
                ease: "back.out",
                repeat: -1
            });
            gsap.to([img2], {
                y: 5,
                x: 5,
                duration: 500, // продолжительность анимации в секундах
                ease: "back.out",
                repeat: -1
            });

            gsap.to([img3], {
                y: 5,
                x: -5,
                duration: 500, // продолжительность анимации в секундах
                ease: "back.out",
                repeat: -1
            });
        }

        img.tint = Config.colors.blockcolor;

        obj.interactive = true;
        obj.on('pointerdown', () => {
            console.log(this.model);
        })

/*
        let basicText = new BitmapText({anchor: 0.5});
        basicText.x = 0;
        this.addChild(basicText);
*/

        this.debug = (value: number) => {
           // basicText.text = value.toString();
        }

        let v = 1;
        let s = 1;

        this.render = () => {

            if (this.model && this.model.finalized) {
                img0.tint = Config.colors.yellow;
                img1.tint = Config.colors.yellow;
                img2.tint = Config.colors.yellow;
                img3.tint = Config.colors.yellow;
                img4.tint = Config.colors.yellow;
            } else {
                img0.tint = Config.colors.blockcolor;
                img1.tint = Config.colors.blockcolor;
                img2.tint = Config.colors.blockcolor;
                img3.tint = Config.colors.blockcolor;
                img4.tint = Config.colors.blockcolor;
            }

            if (this.model?.finalized) {
                img.tint = Config.colors.yellow;
            } else {
                img.tint = Config.colors.blockcolor;
            }
            //  img.angle += 2;
        }
        this.update = () => {


            if (Config.animateBlock)
                if (this.model?.finalized) {
                    img.tint = Config.colors.yellow;
                } else {
                    img.tint = Config.colors.blockcolor;
                    img.angle += 2;
                }

            /*    v -= 0.03;
                s += 0.02;
                circ.scale.set(s);
                circ.alpha = v;
                if (v <= 0) {
                    v = 1;
                    s = 1;
                }*/
        }
    }
}