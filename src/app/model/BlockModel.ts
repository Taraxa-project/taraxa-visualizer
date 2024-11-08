import {BlockView} from "../view/BlockView";
import {SectorView} from "../view/SectorView";

export class BlockModel {

    hash: string;
    level: number;
    pivot: string;
    tips: string[] = [];
    timestamp: number;
    finalized: boolean = false;
    view: BlockView;
    sector: SectorView;
    hashPBFT: string;

    constructor(data: any) {
        this.hash = data.hash;
        this.level = parseInt(data.level, 10);
        this.pivot = data.pivot;
        this.tips = data.tips ? data.tips : [];
        this.timestamp = parseInt(data.timestamp, 16);
    }
}