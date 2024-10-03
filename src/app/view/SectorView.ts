import {Application, Container} from "pixi.js";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockView} from "./BlockView";
import Config from "../../config/Config";
import {BlockModel} from "../model/BlockModel";

export class SectorView extends Container {
    vid: number;
    model: TimelineSectorModel;
    blocks: BlockView[] = [];
    init: Function;
    createUniformBlocks: Function;
    onRescale: Function;
    update: Function;
    render: Function;

    clean: Function;
    finalized: boolean = false;
    hashPBFT: string;


    constructor(app: Application) {
        super();
        app.stage.addChild(this);
        let totalVis = 0;
        let prevVis = 0;

        this.clean = () => {
            this.blocks.forEach((b) => {
                b.clean();
            })
            this.blocks = [];
        }

        // let obj2 = new Graphics();
        // obj2.rect(0, -5000, Config.SECTOR_WIDTH, 10000)
        //     //  .fill(0x292c3f)
        //     .fill({color: 0x292c3f, alpha: 1})
        // this.addChild(obj2);
        // obj2.alpha = 0;

        // let obj = new Graphics();
        // obj.rect(0, -850 * 30 / 2, Config.SECTOR_WIDTH, 850 * 30)
        // obj.fill({color: 0, alpha: 0})
        // // obj.stroke({width: 5, color: 0x0000ff})
        // this.addChild(obj);


        let cont = new Container();
        this.addChild(cont);
        cont.y = 400;

        // let basicText = new BitmapText();
        // basicText.x = 80;
        // basicText.y = 50;
        // basicText.scale = 2;
        //  this.addChild(basicText);

        // obj.interactive = true;
        // obj.on('pointerdown', () => {
        //     console.log('sector on pointerdown')
        //     this.emit('onSector', this.vid);
        // })

        /*        obj.on('pointerover', () => {
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
                })*/

        this.init = (model: TimelineSectorModel) => {
            this.model = model;
        }

        this.createUniformBlocks = (numBlocks: number) => {
            const centerY = 0; // Центральная позиция Y для первого блока
            const spacingY = 120; // Расстояние между блоками
            let startY = centerY - (numBlocks - 1) / 2 * spacingY;

            for (let i = 0; i < numBlocks; i++) {
                let blockView = new BlockView(app);
                blockView.debug(i);
                blockView.vid = i;
                blockView.view = this;
                cont.addChild(blockView);
                if (i % 2 == 0) {
                    this.blocks.push(blockView);
                } else {
                    this.blocks.unshift(blockView);
                }
            }
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView = this.blocks[i];
                blockView.x = Config.SECTOR_WIDTH / 2;
                blockView.y = 0;//startY + i * spacingY;
                blockView.visible = false;
            }
        }

        let reposition = () => {
            const centerY = 0;
            const spacingY = 120;
            let tmp: any = [];

            for (let i = 0; i < this.blocks.length; i++) {
                let block = this.blocks[i];
                if (block.visible) {
                    totalVis++;
                    if (i % 2 == 0) {
                        tmp.push(block);
                    } else {
                        tmp.unshift(block);
                    }
                }
            }
            let d = 0.2;
            let startY = centerY - (tmp.length - 1) / 2 * spacingY;
            for (let i = 0; i < tmp.length; i++) {
                let blockView = tmp[i];
                let finpos = startY + i * spacingY;
                //           blockView.y = startY + i * spacingY;

                // blockView.y = centerY;
                blockView.moveTo(finpos)
                // if (!gsap.isTweening(blockView)) {
                // if (Math.floor(blockView.y) != Math.floor(startY + i * spacingY)) {
                //     blockView.y = centerY;
                //     let finpos = startY + i * spacingY;
                //     gsap.to(blockView, {
                //         y: finpos,
                //         duration: d, // продолжительность анимации в секундах
                //         ease: "sine.out",
                //     });
                // }
                //  }
            }
        }

        this.render = () => {
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView: BlockView = this.blocks[i];
                blockView.render();
            }
        }

        this.update = () => {
            if (!this.model) {
                return;
            }
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView = this.blocks[i];
                blockView.visible = false;
            }
            if (this.model) {
                let i = 0;
                let arr = this.model.getBlocksArray();
                arr.forEach((blockModel: BlockModel) => {
                    let blockView = this.blocks[i];
                    blockView.model = blockModel;
                    blockModel.view = blockView;
                    blockModel.sector = this;
                    if (blockModel.finalized) {
                        this.finalized = true;
                        this.hashPBFT = blockModel.hashPBFT;
                    }
                    blockView.update();
                    blockView.visible = true;
                    i++;
                    //  console.log(blockModel)

                });
                reposition();
            }
        }

        this.onRescale = (w: number, h: number) => {
        }
    }
}