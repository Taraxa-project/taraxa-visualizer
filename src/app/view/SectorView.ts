import {Text, Application, Assets, Container, Graphics, Sprite, BitmapText, curveEps, Point} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockView} from "./BlockView";
import gsap from "gsap";
import Config from "../../config/Config";
import * as Util from "util";
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
    nextSector: SectorView;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        /*   let obj = new Graphics();
           obj.rect(0, -5000, 400, 10000)
               .fill(0x666666, 0)
           this.addChild(obj);

           let obj2 = new Graphics();
           obj2.rect(0, -5000, 400, 10000)
               .fill(0x292c3f)
           this.addChild(obj2);
           obj2.alpha = 0;*/

        let cont = new Container();
        this.addChild(cont);
        cont.y = 400;

        let basicText = new BitmapText();
        basicText.x = Config.SECTOR_WIDTH / 4;
        basicText.y = 850;
        this.addChild(basicText);

        this.init = (model: TimelineSectorModel) => {
            this.model = model;
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
                blockView.x = Config.SECTOR_WIDTH / 2;
                blockView.y = startY + i * spacingY;
                blockView.visible = false;
            }
        }

        let totalVis = 0;
        let prevVis = 0;

        let reposition = () => {
            const centerY = 0;
            const spacingY = 100;
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
            let d = 0.5;
            let startY = centerY - (tmp.length - 1) / 2 * spacingY;
            for (let i = 0; i < tmp.length; i++) {
                let blockView = tmp[i];
                //  if (needAnimation) {
                //blockView.y = startY + i * spacingY;
                gsap.to([blockView], {
                    y: startY + i * spacingY,
                    duration: d, // продолжительность анимации в секундах
                    ease: "back.out"
                });
                // } else {
                //    blockView.y = startY + i * spacingY;
                //    Config.onCustomUpdate()
                // }
            }
        }

        this.render = () => {
            for (let i = 0; i < this.blocks.length; i++) {
                let blockView: BlockView = this.blocks[i];
                blockView.render();
            }
        }

        this.update = () => {

            for (let i = 0; i < this.blocks.length; i++) {
                let blockView = this.blocks[i];
                blockView.visible = false;
                blockView.y = 0;
            }

            if (this.model) {

                let i = 0;
                let arr = this.model.getBlocksArray();
                arr.forEach((blockModel: BlockModel) => {
                    let blockView = this.blocks[i];
                    blockView.model = blockModel;
                    blockModel.view = blockView;
                    blockModel.sector = this;
                    blockView.update();
                    blockView.visible = true;
                    i++;
                    //  console.log(blockModel)

                });
                /*  for (let i = 0; i < this.model.getSize(); i++) {
                      let blockView = this.blocks[i];
                      blockView.model = this.model.blocks[i];
                      blockView.update();
                      blockView.visible = true;
                  }*/
                //   basicText.visible = false;
                /* for (let i = 0; i < this.model.blocks.length; i++) {
                     let blockView = this.blocks[i];
                     blockView.model = this.model.blocks[i];
                  //   blockView.update();
                     blockView.visible = true;
                 }*/
                // basicText.visible = true;
                reposition();
            }
        }

        this.onRescale = (w: number, h: number) => {
        }
    }
}