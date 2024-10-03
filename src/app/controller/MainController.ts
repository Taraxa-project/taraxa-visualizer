import {MainModel} from "../model/MainModel";
import {WSClient} from "../../net/WSClient";
import {BlockModel} from "../model/BlockModel";
import Config from "../../config/Config";

export class MainController {

    client: WSClient;
    model: MainModel;
    init: Function;
    update: Function;
    addTestBlock: Function;

    constructor() {
        this.update = () => {
        }

        this.addTestBlock = (block: BlockModel) => {
            this.model.addBlock(block)
        }
        this.init = (model: MainModel) => {
            this.model = model;
            this.client = new WSClient(Config.SERVER, model.addBlock, model.onBlockFinalized, model.onNewPBFT);
        }
    }
}