import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {SectorView} from "../view/SectorView";

export class TimelineSectorModel {
    getBlocksArray: Function;
    getSize: Function;
    add: Function;
    id: number;
    blocksMap = new Map<string, BlockModel>();
    view: SectorView;

    constructor() {
        this.add = (block: BlockModel) => {
            this.blocksMap.set(block.hash, block);
        }

        this.getSize = () => {
            return this.blocksMap.size;
        }

        this.getBlocksArray = () => {
            let arr = [];
            try {
                for (const key of this.blocksMap.keys()) {
                    let blockModel: BlockModel = this.blocksMap.get(key);
                    arr.push(blockModel);
                }
            } catch (e) {
                console.log(this.id, 'some error')
            }
            return arr;
        }
    }
}