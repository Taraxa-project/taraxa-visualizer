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
import {BlockView} from "./BlockView";
import gsap from "gsap";
import {MainModel} from "../model/MainModel";
import {add} from "@tweenjs/tween.js";
import {ZoomBar} from "./ZoomBar";

export class MainView extends Container {

    updateData: Function;
    onRescale: Function;
    update: Function;
    drawConnect: Function;
    render: Function;

    mainModel: MainModel;
    mapData: Map<number, TimelineSectorModel> = new Map<number, TimelineSectorModel>();
    sectorsHighLights: SectorHighlightView[] = [];
    sectors: SectorView[] = [];


    test: number = 0;

    constructor(app: Application) {
        console.log('main view init');

        super();
        let main = this;

        app.stage.addChild(this);
        app.stage.hitArea = app.screen;

        let obj = new Graphics();
        obj.rect(0, -Config.DEFAULT_HEIGHT / 2, Config.DEFAULT_WIDTH, Config.DEFAULT_HEIGHT)
        obj.stroke({width: 5, color: '0x00ff00'})
        this.addChild(obj);

        MyScale.setup(this, {
            left: 1,
            scalePortrait: 1,
            scaleLandscape: 1,
            onRescale: () => {
                this.onRescale(app.screen.width, app.screen.height);
                this.sectors.forEach((sector: SectorView) => {
                    sector.onRescale(app.screen.width, app.screen.height);
                })
            }
        });

        let contHighlight = new Container();
        //  this.addChild(contHighlight);
        contHighlight.x = -Config.DEFAULT_WIDTH / 2;
        contHighlight.y = -Config.DEFAULT_HEIGHT / 2;

        let contGraphics = new Container();
        this.addChild(contGraphics);
        contGraphics.x = -Config.DEFAULT_WIDTH / 2;
        contGraphics.y = -Config.DEFAULT_HEIGHT / 2;
        const graphics = new Graphics();
        contGraphics.addChild(graphics);

        let contGraphicsFinal = new Container();
        this.addChild(contGraphicsFinal);
        contGraphicsFinal.x = -Config.DEFAULT_WIDTH / 2;
        contGraphicsFinal.y = -Config.DEFAULT_HEIGHT / 2;
        const graphicsFinal = new Graphics();
        contGraphicsFinal.addChild(graphicsFinal);

        let cont = new Container();
        this.addChild(cont);
        cont.x = -Config.DEFAULT_WIDTH / 2;
        cont.y = -Config.DEFAULT_HEIGHT / 2;

        const logoview = new Logo(app);
        const timeline = new TimeLine(app);
        timeline.cont = cont;
        const zoomBar = new ZoomBar(app);

        timeline.onTimeLineDrag = (proc: number) => {
            let value = Math.floor(proc * (Config.SECTOR_WIDTH * 9 + Config.SECTOR_WIDTH / 2 - (this.sectors.length) * Config.SECTOR_WIDTH));
            console.log(Math.floor(proc), value);
            contHighlight.x = contGraphics.x = contGraphicsFinal.x = cont.x = value + 10;
        }

        let circ = new Graphics()
        circ.circle(0, 0, 50);
        circ.fill(0xffffff)
        CustomTextures.textures.circ = app.renderer.generateTexture(circ);

        let hexagonRadius = 50;
        let hexagonHeight = hexagonRadius * Math.sqrt(3);
        let hx = new Graphics();
        /*   hx.poly([
               -hexagonRadius, 0,
               -hexagonRadius / 2, hexagonHeight / 2,
               hexagonRadius / 2, hexagonHeight / 2,
               hexagonRadius, 0,
               hexagonRadius / 2, -hexagonHeight / 2,
               -hexagonRadius / 2, -hexagonHeight / 2,])
               .fill(0x666666)
               .stroke({width: 5, color: 0xffffff});
  */
        hx.roundRect(0, 0, 200, 200, 25)
            .fill('#151824')
        CustomTextures.textures.hex = app.renderer.generateTexture(hx);

        let addSector = () => {

            for (const key of this.mapData.keys()) {
                let sectorModel: TimelineSectorModel = this.mapData.get(key);
                if (!sectorModel.view) {
                    let sector = new SectorView(app);
                    sector.createUniformBlocks(16);
                    sector.x = Config.SECTOR_WIDTH * this.sectors.length;
                    sector.y = 150
                    cont.addChild(sector);

                    sector.model = sectorModel;
                    sectorModel.view = sector;

                    this.sectors.push(sector);
                    sector.update()
                }
            }

            if (this.sectors.length > Config.MAX_SECTORS) {
                let first = this.sectors.shift();
                first.model.view = null;
                first.model = null;


                gsap.to(first, {
                    x: -Config.SECTOR_WIDTH,
                    duration: Config.SECTOR_MOVE_SPEED, // продолжительность анимации в секундах
                    ease: "sine.out",
                    onComplete: () => {
                        cont.removeChild(first);
                        first.clean();
                        first.destroy();
                        first = null;

                    }
                });


                for (let i = 0; i < this.sectors.length; i++) {

                    let s = this.sectors[i];
                    let f = i * Config.SECTOR_WIDTH;

                    gsap.to(s, {
                        x: f,
                        duration: Config.SECTOR_MOVE_SPEED, // продолжительность анимации в секундах
                        ease: "sine.out",
                    });
                }

            }
        }

        this.on('onSector', (vid: number) => {
        });

        this.updateData = (model: MainModel) => {
            this.mainModel = model;
            this.mapData = model.dataMap;

            addSector();

            this.update();
        }

        const drawArrow = (graphics: Graphics, from: Point, to: Point, color: any) => {
            const offset = 32;
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            const headLength = 25; // Длина "головы" стрелки
            const headWidth = 13;
            const endX = to.x - offset * Math.cos(angle);
            const endY = to.y - offset * Math.sin(angle);

            graphics.moveTo(endX, endY);
            graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));
            graphics.lineTo(endX - headLength * Math.cos(angle + Math.PI / headWidth), endY - headLength * Math.sin(angle + Math.PI / headWidth));
            graphics.lineTo(endX, endY);
            graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));

            graphics.fill({color: color, alpha: 1});
            graphics.stroke({color: color, width: 2});
        };

        const drawLine = (graphics: Graphics, p1: Point, p2: Point, final: boolean) => {
            graphics.moveTo(p1.x, p1.y);
            graphics.lineTo(p2.x, p2.y);
            if (final) {
                graphics.stroke({width: 6, color: Config.colors.yellow});
                drawArrow(graphics, p1, p2, Config.colors.yellow);
            } else {
                graphics.stroke({width: 4, color: Config.colors.darkblue});
                drawArrow(graphics, p1, p2, Config.colors.darkblue);
            }
        }

        const tipsExist = (hash: string, tips: string[]) => {
            if (tips == null) return false;
            for (let v = 0; v < tips.length; v++) {
                if (hash == tips[v]) {
                    return true;
                }
            }
            return false;
        }

        this.drawConnect = () => {
            for (let i = this.sectors.length - 1; i >= 0; i--) {
                let current = this.sectors[i];
                if (current.model && current.model.view) {
                    let arr = current.model.getBlocksArray();
                    arr.forEach((bm: BlockModel) => {

                        if (bm && bm.view && bm.view.model) {
                            let prevBlockModel: BlockModel = this.mainModel.getSectorByHash(bm) ? this.mainModel.getSectorByHash(bm) : this.mainModel.getSectorByTips(bm);

                            if (prevBlockModel && prevBlockModel.sector && prevBlockModel.sector.model) {
                                let block = bm.view;
                                let prevBlock: BlockView = prevBlockModel.view;
                                // if (block.model.finalized) {
                                //  block.tint = 0xffffff;
                                //}
                                try {
                                    drawLine(
                                        block.model.finalized ? graphicsFinal : graphics,
                                        new Point(Config.SECTOR_WIDTH / 2 + block.view.x, 550 + block.y),
                                        new Point(Config.SECTOR_WIDTH / 2 + prevBlock.view.x, 550 + prevBlock.y),
                                        block.model.finalized
                                    );
                                } catch (e) {
                                    console.log(e, prevBlock)
                                }
                            }
                        }
                    })
                }
            }
        }
        this.onRescale = (w: number, h: number) => {
            /*  if (w > h) {
                  this.x = 760;
              } else {
                  this.x = 560;
              }
              //FIXME
              this.x = 0;*/
        }

        /* Config.onCustomUpdate = () => {
             graphics.clear();
             graphicsFinal.clear();
             this.drawConnect();
         }*/

        this.render = () => {
            for (let i = 0; i < this.sectors.length; i++) {
                let sector = this.sectors[i];
                sector.render();
            }
        }

        this.update = () => {
            graphics.clear();
            graphicsFinal.clear();
            for (let i = 0; i < this.sectors.length; i++) {
                let s = this.sectors[i];
                s.vid = i;
                s.update();
            }
            this.drawConnect();
        }
        contHighlight.x = contGraphics.x = contGraphicsFinal.x = cont.x = 0;


        let zoom = 1;
        zoomBar.zoomIn = () => {
            console.log('zoom in')
            zoom += 0.1;
            main.scale.set(zoom)
        }

        zoomBar.zoomOut = () => {
            console.log('zoom out')
            zoom -= 0.1;
            main.scale.set(zoom)
        }


    }
}
