import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {TimelineSectorModel} from "./TimelineSectorModel";
import {Block} from "../view/misc/Block";
import Config from "../../config/Config";

export class MainModel {
    init: Function;
    addBlock: Function;
    onNewHeads: Function;
    onBlockFinalized: Function;
    getParentBlock: Function;
    getSectorByHash: Function;
    getSectorByTips: Function;
    dataMap = new Map<number, TimelineSectorModel>();
    // viewMap = new Map<number, TimelineSectorModel>();
    allBlocksMap = new Map<string, BlockModel>();
    view: MainView;

    constructor() {
        console.log('main model init');
        this.init = (view: MainView) => {
            this.view = view;
        }

        this.getParentBlock = (block: BlockModel) => {
            // let i = 0;
            // for (const key of this.viewMap.keys()) {
            //     let sectorModel: TimelineSectorModel = this.viewMap.get(key);
            //     if (key == block.level) {
            //         break;
            //     }
            //     i++;
            // }
        }

        this.onBlockFinalized = (blockData: any) => {
            try {
                if (this.allBlocksMap.has(blockData?.block)) {
                    this.allBlocksMap.get(blockData.block).finalized = true;
                }
            } catch (e) {
                console.log('onBlockFinalized error:', e, blockData);
            }
        }
        this.onNewHeads = (blockData: any) => {
            // try {
            //     if (this.allBlocksMap.has(blockData?.block)) {
            //         this.allBlocksMap.get(blockData.block).finalized = true;
            //     }
            // } catch (e) {
            //     console.log('onBlockFinalized error:', e, blockData);
            // }
            console.log('onNewHeads :', blockData);
        }
        this.getSectorByHash = (block: BlockModel): any => {
            if (this.allBlocksMap.has(block.pivot)) {
                return this.allBlocksMap.get(block.pivot);
            }
            return null;
        }
        this.getSectorByTips = (block: BlockModel): BlockModel[] => {
            const tips: BlockModel[] = [];
            block.tips.forEach((tip: string) => {
                const tipBlock: BlockModel = this.allBlocksMap.get(tip);
                if (tipBlock) {
                    tips.push(tipBlock)
                }
            })
            return tips;
        }
        this.addBlock = (block: BlockModel) => {
            //  console.log(block)

            this.allBlocksMap.set(block.hash, block);

            if (this.dataMap.size >= Config.MAX_SECTORS + 1) {
                const firstKey = this.dataMap.keys().next().value;
                let sector = this.dataMap.get(firstKey);
                for (const key of sector.blocksMap.keys()) {
                    this.allBlocksMap.delete(key);
                }
                sector.blocksMap = null;
                sector.view = null;
                this.dataMap.delete(firstKey);
            }

            let sector;
            if (this.dataMap.has(block.level)) {
                sector = this.dataMap.get(block.level);
            } else {
                sector = new TimelineSectorModel();
                sector.id = block.level;
                this.dataMap.set(block.level, sector);
            }

            sector.add(block);
            const sortedArray = Array.from(this.dataMap.entries()).sort((a, b) => a[0] - b[0]);

            this.dataMap = new Map(sortedArray);

            if (this.view) {
                this.view.updateData(this);
            }
        }
    }
}