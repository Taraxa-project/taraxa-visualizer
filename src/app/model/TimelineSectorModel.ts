import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";

export class TimelineSectorModel {

    update: Function;
    add: Function;
    blocks: any = [];
    id: number;

    getLink:Function;

    constructor() {
        this.add = (block: BlockModel) => {
            this.blocks.push(block);
        }
        this.update = () => {
        }

        this.getLink = (block:BlockModel)=>{

        }
    }
}