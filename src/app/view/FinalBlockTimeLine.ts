import MyScale from "../../utils/MyScale";
import {Application, Text, Container, Graphics, Sprite, TextStyle, Point} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";
import {SectorView} from "./SectorView";
import {BlockView} from "./BlockView";
import {PBFTBlockView} from "./PBFTBlockView";
import DrawUtil from "../../utils/DrawUtil";
import {BlockModel} from "../model/BlockModel";

export class FinalBlockTimeLine extends Container {

    onChangeZoom: Function;
    render: Function;
    sectors: SectorView[] = [];
    cont: Container;
    addSector: Function;

    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        let main = this;

        MyScale.setup(this, {
            scalePortrait: 2,
            scaleLandscape: 1,
            bottom: 75,
            left: -1,
            onRescale: () => {
            }
        });

        let zoom = 1;
        let labels: any = [];

        this.onChangeZoom = (value: number) => {
            zoom = value;
            updateZoom();
        }

        let contGraphics = new Container();
        this.addChild(contGraphics);

        let cont = new Container();
        this.addChild(cont);

        const graphics = new Graphics();
        contGraphics.addChild(graphics);

        let updateZoom = () => {
        }

        let updateLabels = () => {
            for (let i = 0; i < this.sectors.length; i++) {
                let sector = this.sectors[i];
                if (labels[i]) {
                    let basicText = labels[i];
                    basicText.x = sector.x + 100;
                    basicText.text = sector.model.id;
                } else {
                    let blockView = new PBFTBlockView(app);
                    cont.addChild(blockView);
                    labels.push(blockView);
                }
                if (sector.finalized) {
                    labels[i].hashPBFT = sector.hashPBFT;
                    labels[i].setHashPBFT();
                    labels[i].visible = true;
                } else {
                    labels[i].visible = false;
                }
            }
            contGraphics.x = cont.x;
            contGraphics.scale.x = cont.scale.x;
            contGraphics.scale.y = cont.scale.y;
        }

        this.addSector = (sector: SectorView) => {
        }

        const drawConnect = () => {
            let temp = [];
            for (let i = 0; i < labels.length; i++) {
                let current = labels[i];
                if (current && current.visible) {
                    temp.push(current)
                }
            }

            for (let i = temp.length - 1; i >= 0; i--) {
                let current = temp[i];
                let prev = temp[i - 1];
                if (temp[i - 1]) {
                    DrawUtil.drawLine(
                        graphics,
                        new Point(current.x + 35, 0),
                        new Point(prev.x, 0),
                        true,
                        true
                    );
                }
            }
        }
        this.render = () => {
            graphics.clear();

            cont.x = this.cont.x;
            cont.scale.x = this.cont.scale.x;
            cont.scale.y = this.cont.scale.y;

            contGraphics.x = cont.x;
            contGraphics.scale.x = cont.scale.x;
            contGraphics.scale.y = cont.scale.y;

            updateLabels();

            drawConnect();
        }
    }
}