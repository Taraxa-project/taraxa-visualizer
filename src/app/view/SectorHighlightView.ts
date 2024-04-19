import {Text, Application, Assets, Container, Graphics, Sprite, BitmapText, curveEps, Point} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockView} from "./BlockView";
import gsap from "gsap";
import Config from "../../config/Config";

export class SectorView extends Container {

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
        obj.rect(0, -5000, 400, 10000)
            .fill(0x666666,0)
        this.addChild(obj);

        let obj2 = new Graphics();
        obj2.rect(0, -5000, 400, 10000)
            .fill(0x292c3f)
        this.addChild(obj2);
        obj2.alpha = 0;

        let cont = new Container();
        this.addChild(cont);
        cont.y = 400;

        let basicText = new BitmapText();
        basicText.x = 50;
        basicText.y = 850;
        this.addChild(basicText);

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

        this.debug = (value: number) => {
            basicText.text = value.toString();
        }

        this.createUniformBlocks = (numBlocks: number) => {
            const centerY = 0; // Центральная позиция Y для первого блока
            const spacingY = 100; // Расстояние между блоками
            let startY = centerY - (numBlocks - 1) / 2 * spacingY;

            for (let i = 0; i < numBlocks; i++) {
                let blockView = new BlockView(app);
                blockView.debug(i);
                blockView.vid = i;
                cont.addChild(blockView);
                if (i % 2 == 0) {
                    this.blocks.push(blockView);
                } else {
                    this.blocks.unshift(blockView);
                }
            }
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView = this.blocks[i];
                blockView.x = 200;
                blockView.y = startY + i * spacingY;
            }
        }
        this.update = () => {
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView = this.blocks[i];
                blockView.update();
            }
        }

        this.create = () => {
            let difY = 100;
            let totalMinus = 0;
            let totalPlus = 0;
            for (let i = 0; i < 11; i++) {
                let blockView = new BlockView(app);
                blockView.debug(i);
                cont.addChild(blockView);
                this.blocks.push(blockView);
                blockView.x = 200;
                if (i != 0) {
                    let direction = (i % 2 === 0) ? -1 : 1; // Четные индексы - вверх, нечетные - вниз
                    let deltaY = direction * i * difY;
                    if (direction == -1) {
                        totalMinus++;
                        blockView.y = direction * i - 100 * totalMinus;
                    } else {
                        totalPlus++;
                        blockView.y = direction * i + 100 * totalPlus;
                    }
                }
            }
        }


        this.onRescale = (w: number, h: number) => {
            if (w > h) {
            } else {
            }

            /*    let p = new Point();
                let pos = basicText.toGlobal(p);

                basicText.y = h;
                basicText.y = pos.y;

                let size = {width: window.innerWidth, height: window.innerHeight};
                let defScaleX = Config.DEFAULT_WIDTH / size.width;
                let defScaleY = Config.DEFAULT_HEIGHT / size.height;
                let scale = Math.max(defScaleX, defScaleY);
    */
            let width = w;
            let height = h;
            let newScaleX = (Math.floor(width / Config.DEFAULT_WIDTH * 100)) / 100;
            let newScaleY = (Math.floor(height / Config.DEFAULT_HEIGHT * 100)) / 100;

            //  basicText.y = 900;///(h-this.parent.parent.y) * newScaleY
        }
        this.render = (sectors: any) => {

            this.blocks.forEach((block: BlockView) => {
                block.destroy();
                this.removeChild(block);
            })
            this.blocks = [];
            let difY = 100;

            let totalMinus = 0;
            let totalPlus = 0;
            for (let i = 0; i < this.model.blocks.length; i++) {

                let blockModel = this.model.blocks[i];
                let blockView = new BlockView(app);
                blockView.debug(i);
                cont.addChild(blockView);
                this.blocks.push(blockView);
                blockView.x = 200;

                if (i != 0) {
                    let direction = (i % 2 === 0) ? -1 : 1; // Четные индексы - вверх, нечетные - вниз
                    let deltaY = direction * i * difY;
                    if (direction == -1) {
                        totalMinus++;
                        blockView.y = direction * i - 100 * totalMinus;
                    } else {
                        totalPlus++;
                        blockView.y = direction * i + 100 * totalPlus;
                    }
                } else {
                }
                blockView.model = blockModel;
                // block.render();
            }

        }
    }
}