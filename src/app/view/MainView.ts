import {Application, Assets, Container, Graphics, Point, RenderTexture, Sprite} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {SectorView} from "./SectorView";
import {BlockModel} from "../model/BlockModel";
import CustomTextures from "../../utils/CustomTextures";
import {SectorHighlightView} from "./SectorHighlightView";
import Config from "../../config/Config";
import {TimeLine} from "./TimeLine";
import {Logo} from "./ui/Logo";

export class MainView extends Container {

    update: Function;
    render: Function;
    drawConnect: Function;
    mapData: Map<number, TimelineSectorModel> = new Map<number, TimelineSectorModel>();
    updateData: Function;
    onRescale: Function;

    sectorsHighLights: SectorHighlightView[] = [];
    sectors: SectorView[] = [];

    constructor(app: Application) {
        console.log('main view init');

        super();
        app.stage.addChild(this);
        app.stage.hitArea = app.screen;

        MyScale.setup(this, {
            scalePortrait: 0.6,
            scaleLandscape: 0.8,
            onRescale: () => {
                this.onRescale(app.screen.width, app.screen.height);
                this.sectors.forEach((sector: SectorView) => {
                    sector.onRescale(app.screen.width, app.screen.height);
                })
            }
        });

        let contHighlight = new Container();
        this.addChild(contHighlight);
        contHighlight.x = -1920 / 2;
        contHighlight.y = -1080 / 2;

        let contGraphics = new Container();
        this.addChild(contGraphics);
        contGraphics.x = -1920 / 2;
        contGraphics.y = -1080 / 2;
        const graphics = new Graphics();
        contGraphics.addChild(graphics);


        let cont = new Container();
        this.addChild(cont);
        cont.x = -1920 / 2;
        cont.y = -1080 / 2;

        const logoview = new Logo(app);
        const timeline = new TimeLine(app);
        timeline.cont = cont;

        timeline.onTimeLineDrag = (value: number) => {
            contHighlight.x = contGraphics.x = cont.x = value;
        }

        let circ = new Graphics()
        circ.circle(0, 0, 50);
        circ.fill(0xffffff)
        CustomTextures.textures.circ = app.renderer.generateTexture(circ);

        let hexagonRadius = 50;
        let hexagonHeight = hexagonRadius * Math.sqrt(3);
        let hx = new Graphics();
        /* hx.poly([
             -hexagonRadius, 0,
             -hexagonRadius / 2, hexagonHeight / 2,
             hexagonRadius / 2, hexagonHeight / 2,
             hexagonRadius, 0,
             hexagonRadius / 2, -hexagonHeight / 2,
             -hexagonRadius / 2, -hexagonHeight / 2,])
             .fill(0x666666)
             .stroke({width: 5, color: 0xffffff});*/

        hx.roundRect(0, 0, 200, 200, 25)
            .fill('#151824')
        // this.addChild(hx);
        CustomTextures.textures.hex = app.renderer.generateTexture(hx);

        for (let i = 0; i < 100; i++) {
            let shl = new SectorHighlightView(app);
            shl.x = 400 * i;
            shl.y = 150;
            contHighlight.addChild(shl);
            this.sectorsHighLights.push(shl);

            let sector = new SectorView(app);
            sector.createUniformBlocks(1 + Math.floor(Math.random() * 16));
            // sector.render();
            sector.debug('Level:\r' + new Date().getTime());
            sector.x = 400 * i;
            sector.y = 150;
            sector.vid = i;
            cont.addChild(sector);
            this.sectors.push(sector);
            timeline.onChangeProc((cont.x / (-cont.width)));
        }

        this.on('onSector', (vid: number) => {
        });

        let clear = () => {
            for (let i = 0; i < this.sectors.length; i++) {
                let sector = this.sectors[i];
                cont.removeChild(sector);
                sector.destroy()
                sector = null;
            }
            /*          contLines.children.forEach((child: any) => {
                          contLines.removeChild(child);
                          child.destroy();
                          child = null;
                      })*/

            contGraphics.children.forEach((child: Graphics) => {
                // child.clear();
                contGraphics.removeChild(child);
            });

            this.sectors = [];
        }
        this.updateData = (viewMap: any) => {
            this.mapData = viewMap;
            this.update();
        }

        function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
            return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
        }

        this.drawConnect = () => {
            graphics.clear();
            for (let i = 0; i < this.sectors.length; i++) {
                let current = this.sectors[i];
                if (i - 1 < this.sectors.length - 1) {
                    let prev = this.sectors[i - 1];
                    if (prev && current) {
                        for (let v = 0; v < current.blocks.length; v++) {
                            let block = current.blocks[v];
                            //  let pivot = block.model.pivot;
                            for (let h = 0; h < prev.blocks.length; h++) {
                                let blockPrev = prev.blocks[h];
                                if (block.visible && blockPrev.visible) {
                                    //       let hash = blockPrev.model.hash;
                                    //  if (hash == pivot) {
                                    graphics.fill({color: 0xffff0b, alpha: 0.5});
                                    graphics.moveTo(current.x + 200, current.y + 400 + block.y);
                                    graphics.lineTo(prev.x + 200, prev.y + 400 + blockPrev.y);
                                    if (h == 0) {
                                        graphics.stroke({width: 4, color: Config.colors.yellow});
                                    } else {
                                        graphics.stroke({width: 2, color: Config.colors.darkblue});
                                    }

                                    // contGraphics.addChild(graphics);
                                    //}
                                }
                            }
                        }
                    }
                }
            }
        }
        this.onRescale = (w: number, h: number) => {

            if (w > h) {
                this.x = 760;
            } else {
                this.x = 560;
            }
        }
        this.update = () => {
            for (let i = 0; i < 100; i++) {
                let sector = this.sectors[i];
                sector.update();
            }
            this.drawConnect();
            return;

            //  clear();

            if (this.mapData) {
                let i = 0;
                for (const key of this.mapData.keys()) {
                    let sectorModel: TimelineSectorModel = this.mapData.get(key);
                    let sector = new SectorView(app);
                    sector.model = sectorModel;
                    sector.render();
                    sector.debug(i + '\r' + key);
                    sector.x = 400 * i;
                    sector.y = 150;
                    cont.addChild(sector);
                    this.sectors.push(sector);
                    i++;
                }
                timeline.onChangeProc((cont.x / (-cont.width)));
            }

            //  this.drawConnect();
        }
        this.drawConnect();
    }
}