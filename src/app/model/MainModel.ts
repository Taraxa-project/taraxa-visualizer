import {MainView} from "../view/MainView";
import {BlockModel} from "./BlockModel";
import {TimelineSectorModel} from "./TimelineSectorModel";
import Config from "../../config/Config";

export class MainModel {
    init: Function;
    addBlock: Function;
    onNewPBFT: Function;
    onBlockFinalized: Function;
    getParentBlock: Function;
    getSectorByHash: Function;
    getSectorByTips: Function;
    dataMap = new Map<number, TimelineSectorModel>();
    allBlocksMap = new Map<string, BlockModel>();
    view: MainView;


    blockTimeout: number = 1000;

    constructor() {
        this.init = (view: MainView) => {
            this.view = view;
        }
        this.getParentBlock = (block: BlockModel) => {
        }
        this.onBlockFinalized = (blockData: any) => {
        }
        this.onNewPBFT = (blockData: any) => {
            const hash = blockData.block_hash.slice(2) == "0x"
                ? blockData.block_hash
                : "0x" + blockData.block_hash;
            const dag_block_hash_as_pivot = blockData.dag_block_hash_as_pivot;
            const dagBlockPivot = dag_block_hash_as_pivot.slice(2) == "0x"
                ? dag_block_hash_as_pivot
                : "0x" + dag_block_hash_as_pivot;
            try {
                if (this.allBlocksMap.has(dagBlockPivot)) {
                    const block = this.allBlocksMap.get(dagBlockPivot);
                    block.finalized = true;
                    block.hashPBFT = hash;
                }
            } catch (e) {
                console.log('error:', e);
            }
            //     console.log('dag_block_hash_as_pivot:', hash, dagBlockPivot, this.allBlocksMap.get(dagBlockPivot) != null);
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

        // const intervalId = setInterval(() => {
        //
        // }, 1000); // Выполнять каждые 1000 миллисекунд (1 секунда)
    }
}