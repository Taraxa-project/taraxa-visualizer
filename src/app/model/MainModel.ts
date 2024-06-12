import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {TimelineSectorModel} from "./TimelineSectorModel";
import {Block} from "../view/misc/Block";
import Config from "../../config/Config";

export class MainModel {
    init: Function;
    addBlock: Function;
    onBlockFinalized: Function;
    getParentBlock: Function;
    dataMap = new Map<number, TimelineSectorModel>();
    viewMap = new Map<number, TimelineSectorModel>();
    view: MainView;

    constructor() {
        console.log('main model init');
        this.init = (view: MainView) => {
            this.view = view;
        }

        this.getParentBlock = (block: BlockModel) => {
            let i = 0;
            for (const key of this.viewMap.keys()) {
                let sectorModel: TimelineSectorModel = this.viewMap.get(key);
                if (key == block.level) {
                    break;
                }
                i++;
            }
        }

        this.onBlockFinalized = (blockData: any) => {
            if (this.dataMap) {
                for (const key of this.dataMap.keys()) {
                    let sector: TimelineSectorModel = this.dataMap.get(key);
                    for (let i = 0; i < sector.blocks.length; i++) {
                        let block: BlockModel = sector.blocks[i]
                        if (block.hash == blockData.block) {
                            block.finalized = true;
                            return;
                        }
                    }
                }
            }
        }

        this.addBlock = (block: BlockModel) => {
            if (this.dataMap.size >= Config.MAX_SECTORS) {
                const firstKey = this.dataMap.keys().next().value;
                this.dataMap.delete(firstKey);
            }
            let sector;
            if (this.dataMap.has(block.level)) {
                sector = this.dataMap.get(block.level);
            } else {
                sector = new TimelineSectorModel();
                sector.id = block.level;
                if (block.level == null) {
                    console.log(block, block.level)
                }
                this.dataMap.set(block.level, sector);
            }
            sector.add(block);
            const sortedArray = Array.from(this.dataMap.entries()).sort((a, b) => a[0] - b[0]);
            this.viewMap = new Map(sortedArray);
            if (this.view) {
                this.view.updateData(this.viewMap);
            }
        }
    }
}