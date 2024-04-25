import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {TimelineSectorModel} from "./TimelineSectorModel";
import {Block} from "../view/misc/Block";

export class MainModel {
    init: Function;
    addBlock: Function;
    onBlockFinalized: Function;
    dataMap = new Map<number, TimelineSectorModel>();
    viewMap = new Map<number, TimelineSectorModel>();
    view: MainView;
    getParentBlock: Function;


    constructor() {
        console.log('main model init');
        this.init = (view: MainView) => {
            this.view = view;
        }

        this.getParentBlock = (block: BlockModel) => {
            //this.viewMap
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


            //   this.debugBlocks.push(block)
            /*  if (this.debugBlocks.length >= 1000) {

                  const jsonData = JSON.stringify(this.debugBlocks, null, 2);

                  const blob = new Blob([jsonData], {type: 'application/json'});
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'data_' + this.debugBlocks.length + '.json';
                  a.click();
                  return;

              }*/

            if (this.dataMap.size >= 100) {
                const firstKey = this.dataMap.keys().next().value;
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
            this.viewMap = new Map(sortedArray);


            if (this.view) {
                this.view.updateData(this.viewMap);
            }
        }
    }
}