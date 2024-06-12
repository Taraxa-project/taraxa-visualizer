import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import {MainView} from "../view/MainView";
import {MainModel} from "../model/MainModel";
import {WSClient} from "../../net/WSClient";
import {BlockModel} from "../model/BlockModel";

export class MainController {

    client: WSClient;
    model: MainModel;
    init: Function;
    update: Function;
    addTestBlock: Function;

    constructor() {
        console.log('main controller init');
        this.update = () => {
        }

        this.addTestBlock = (block: BlockModel) => {
            this.model.addBlock(block)
        }
        this.init = (model: MainModel) => {
            this.model = model;
            this.client = new WSClient('wss://ws.mainnet.taraxa.io', model.addBlock, model.onBlockFinalized);
        }
    }
}