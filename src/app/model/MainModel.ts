import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {TimelineSectorModel} from "./TimelineSectorModel";

export class MainModel {
    init: Function;
    addBlock: Function;

    dataMap = new Map<number, TimelineSectorModel>();
    viewMap = new Map<number, TimelineSectorModel>();

    view: MainView;

    debugBlocks: BlockModel[] = [];

    constructor() {
        console.log('main model init');
        this.init = (view: MainView) => {
            this.view = view;
        }

        this.addBlock = (block: BlockModel) => {
            /* console.log(this.debugBlocks.length)
             this.debugBlocks.push(block)

             if (this.debugBlocks.length >= 1000) {

                 const jsonData = JSON.stringify(this.debugBlocks, null, 2);

                 const blob = new Blob([jsonData], {type: 'application/json'});
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = 'data_' + this.debugBlocks.length + '.json';
                 a.click();
                 return;

             }*/
/*
            if (this.dataMap.size >= 30) {
                const firstKey = this.dataMap.keys().next().value;
                this.dataMap.delete(firstKey);
            }*/
            let sector;
            if (this.dataMap.has(block.level)) {
                sector = this.dataMap.get(block.level);
            } else {
                sector = new TimelineSectorModel();
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