import MyScale from "../../utils/MyScale";
import {Application, Text, Container, Graphics, Sprite, TextStyle} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";
import {SectorView} from "./SectorView";
import {BlockView} from "./BlockView";
import {PBFTBlockView} from "./PBFTBlockView";

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

        let cont = new Container();
        this.addChild(cont);

        let updateZoom = () => {
            for (let i = 0; i < labels.length; i++) {
                let basicText = labels[i];
                basicText.visible = true;
                basicText.scale.x = zoom;
                basicText.scale.y = zoom;

                /*  if (zoom < 1) {
                      basicText.visible = false;
                      if (i % 2 == 0 && zoom >= 0.6 && zoom < 1) {
                          basicText.visible = true;
                      } else if (i % 6 == 0 && zoom >= 0.3 && zoom < 0.6) {
                          basicText.visible = true;
                      } else if (i % 8 == 0 && zoom >= 0 && zoom < 0.3) {
                          basicText.visible = true;
                      }
                  }*/
            }
        }

        let updateLabels = () => {
            for (let i = 0; i < this.sectors.length; i++) {
                let sector = this.sectors[i];
                let basicText = labels[i];
                basicText.x = sector.x + 100;
                basicText.text = sector.model.id;
            }
        }

        this.addSector = (sector: SectorView) => {
            if (this.sectors.length > Config.MAX_SECTORS) {
                updateLabels();
                return;
            }

            let blockView = new PBFTBlockView(app);
            cont.addChild(blockView);
            labels.push(blockView);
            updateLabels();
            updateZoom();
        }

        this.render = () => {
            cont.x = this.cont.x;
            cont.scale.x = this.cont.scale.x;
            cont.scale.y = this.cont.scale.y;
        }
    }
}