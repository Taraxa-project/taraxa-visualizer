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
import {SectorTimeLine} from "./SectorTimeLine";
import {InfoView} from "./InfoView";

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

        let active = true;
        app.stage.addChild(this);
        app.stage.hitArea = app.screen;

        let obj = new Graphics();
        obj.rect(0, -Config.DEFAULT_HEIGHT / 2, Config.DEFAULT_WIDTH, Config.DEFAULT_HEIGHT)
        // obj.stroke({width: 5, color: '0x00ff00'})
        this.addChild(obj);

        let liner = new Graphics();
        liner.rect(0, -Config.DEFAULT_HEIGHT / 2, Config.DEFAULT_WIDTH / 2, Config.DEFAULT_HEIGHT)
        //  liner.stroke({width: 5, color: '0x00ff00'})
        this.addChild(liner);


        MyScale.setup(this, {
            left: 1,
            scalePortrait: 2,
            scaleLandscape: 1,
            onRescale: () => {
                this.onRescale(app.screen.width, app.screen.height);
                this.sectors.forEach((sector: SectorView) => {
                    sector.onRescale(app.screen.width, app.screen.height);
                })
                this.sectorsHighLights.forEach((sector: SectorHighlightView) => {
                    sector.onRescale(app.screen.width, app.screen.height);
                })
            }
        });

        let contHighlight = new Container();
        this.addChild(contHighlight);
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

        /*     const timeline = new TimeLine(app);
             timeline.cont = cont;*/

        const timeline = new SectorTimeLine(app);
        timeline.cont = cont;
        timeline.sectors = this.sectors;

        const zoomBar = new ZoomBar(app);

        //     const info = new InfoView(app);


        /*  timeline.onTimeLineDrag = (proc: number) => {
              let value = Math.floor(proc * (Config.SECTOR_WIDTH * 9 + Config.SECTOR_WIDTH / 2 - (this.sectors.length) * Config.SECTOR_WIDTH));
              console.log(Math.floor(proc), value);
              contHighlight.x = contGraphics.x = contGraphicsFinal.x = cont.x = value + 10;
          }*/

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
                    // sector.on('onSector', (vid: number) => {
                    //     console.log('onSector', vid);
                    //     selectedSector = vid;
                    //     active = false;
                    //     moveSectorsTo();
                    // });
                    sector.createUniformBlocks(16);
                    sector.x = Config.SECTOR_WIDTH * this.sectors.length;
                    sector.y = 150
                    cont.addChild(sector);
                    sector.model = sectorModel;
                    sectorModel.view = sector;
                    this.sectors.push(sector);

                    let sectorHighlight = new SectorHighlightView(app);
                    sectorHighlight.x = sector.x;
                    sectorHighlight.y = sector.y;
                    contHighlight.addChild(sectorHighlight);
                    this.sectorsHighLights.push(sectorHighlight);

                    sectorHighlight.on('onSector', (vid: number) => {
                        selectedSector = vid;
                        active = false;
                        moveSectorsTo();
                    });

                    sector.update()
                }
            }
            if (this.sectors.length > Config.MAX_SECTORS) {
                let first = this.sectors.shift();
                first.model.view = null;
                first.model = null;
                gsap.to(first, {
                    x: -Config.SECTOR_WIDTH,
                    duration: 0, // продолжительность анимации в секундах
                    ease: "sine.out",
                    onComplete: () => {
                        cont.removeChild(first);
                        first.clean();
                        first.destroy();
                        first = null;
                    }
                });

                let firstHightlight = this.sectorsHighLights.shift();
                gsap.to(firstHightlight, {
                    x: -Config.SECTOR_WIDTH,
                    duration: 0, // продолжительность анимации в секундах
                    ease: "sine.out",
                    onComplete: () => {
                        contHighlight.removeChild(firstHightlight);
                        firstHightlight.destroy();
                        firstHightlight = null;
                    }
                });

                for (let i = 0; i < this.sectors.length; i++) {
                    let s = this.sectors[i];
                    let f = i * Config.SECTOR_WIDTH;
                    gsap.to(s, {
                        x: f,
                        duration: 0, // продолжительность анимации в секундах
                        ease: "sine.out",
                    });

                    gsap.to(this.sectorsHighLights[i], {
                        x: f,
                        duration: 0, // продолжительность анимации в секундах
                        ease: "sine.out",
                    });

                }

            }

            selectedSector = selectedSector + 1;
            if (selectedSector >= this.sectors.length) {
                selectedSector = this.sectors.length - 1;
            }

            if (active) moveSectorsTo();

            timeline.addSector();
        }

        this.updateData = (model: MainModel) => {
            this.mainModel = model;
            this.mapData = model.dataMap;
            addSector();
            this.update();
        }

        const drawArrow = (graphics: Graphics, from: Point, to: Point, color: any) => {
            const offset = 32;
            const angle = Math.atan2(to.y - from.y, to.x - from.x);

            // Уменьшаем длину "головы" стрелки
            const headLength = 15; // Например, 15 вместо 25
            const headWidth = 13;

            // Позиция конца стрелки с учётом смещения
            const endX = to.x - offset * Math.cos(angle);
            const endY = to.y - offset * Math.sin(angle);

            // Рисуем стрелку
            graphics.moveTo(endX, endY);
            graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));
            graphics.lineTo(endX - headLength * Math.cos(angle + Math.PI / headWidth), endY - headLength * Math.sin(angle + Math.PI / headWidth));
            graphics.lineTo(endX, endY);
            graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));

            // Задаём цвет и уменьшаем толщину линии
            graphics.fill({color: color, alpha: 1});
            graphics.stroke({color: color, width: 1}); // Толщина линии уменьшена до 1
        };


        const drawLine = (graphics: Graphics, p1: Point, p2: Point, final: boolean, pivot: boolean = false) => {
            let color = final && Config.showFinalized ? Config.colors.white : Config.lines.tipColor;
            if (pivot) {
                color = final && Config.showFinalized ? Config.colors.white : Config.lines.pivotColor;
            }
            graphics.moveTo(p1.x, p1.y);
            graphics.lineTo(p2.x, p2.y);
            graphics.stroke({
                width: pivot ? Config.lines.pivotWidth : Config.lines.tipWidth,
                color: color
            });
            drawArrow(graphics, p1, p2, color);
        }

        this.drawConnect = () => {
            for (let i = this.sectors.length - 1; i >= 0; i--) {
                let current = this.sectors[i];
                if (current.model && current.model.view) {
                    let arr = current.model.getBlocksArray();
                    arr.forEach((bm: BlockModel) => {

                        if (bm && bm.view && bm.view.model) {

                            const links: BlockModel[] = [];
                            const pivotBlock: BlockModel = this.mainModel.getSectorByHash(bm);
                            if (pivotBlock) {
                                links.push(pivotBlock)
                            }
                            const byTips: BlockModel[] = this.mainModel.getSectorByTips(bm);
                            const totalLinks = links.concat(byTips);

                            let block = bm.view;
                            for (let i = 0; i < totalLinks.length; i++) {
                                let prevBlock: BlockView = totalLinks[i].view;
                                try {
                                    drawLine(
                                        block.model.finalized ? graphicsFinal : graphics,
                                        new Point(Config.SECTOR_WIDTH / 2 + block.view.x, 550 + block.y),
                                        new Point(Config.SECTOR_WIDTH / 2 + prevBlock.view.x, 550 + prevBlock.y),
                                        block.model.finalized,
                                        pivotBlock && i == 0 ? true : false
                                    );
                                } catch (e) {
                                    //  console.log(e, prevBlock)
                                }

                            }
                        }
                    })
                }
            }
        }

        this.onRescale = (w: number, h: number) => {
        }

        this.render = () => {
            for (let i = 0; i < this.sectors.length; i++) {
                let sector = this.sectors[i];
                sector.render();
            }
            timeline.render();
        }

        this.update = () => {
            graphics.clear();
            graphicsFinal.clear();
            for (let i = 0; i < this.sectors.length; i++) {
                let s = this.sectors[i];
                s.vid = i;
                s.update();
            }
            for (let i = 0; i < this.sectorsHighLights.length; i++) {
                let s = this.sectorsHighLights[i];
                s.vid = i;
            }
            this.drawConnect();
            repos();
        }

        contHighlight.x = contGraphics.x = contGraphicsFinal.x = cont.x = Config.DEFAULT_WIDTH / 2 - 100;
        let zoom = 1;
        let selectedSector: number = 0;
        let easeType = 'sine.out';

        let repos = () => {
        }
        let reposVertical = () => {
            contHighlight.y = contGraphics.y = contGraphicsFinal.y = cont.y = -Config.DEFAULT_HEIGHT * zoom / 2;
            // let val = -Config.DEFAULT_HEIGHT * zoom / 2;
            // let speed = Config.SECTOR_MOVE_SPEED / 2;
            // gsap.to([
            //     contHighlight,
            //     contGraphics,
            //     contGraphicsFinal,
            //     cont
            // ], {
            //     y: val,
            //     duration: speed, // продолжительность анимации в секундах
            //     ease: easeType,
            // });
        }

        let moveSectorsTo = (instant = false) => {
            // contHighlight.x = contGraphics.x = contGraphicsFinal.x = cont.x = Config.DEFAULT_WIDTH / 2 - (selectedSector.x + 100) * zoom;
            let val = Config.DEFAULT_WIDTH / 2 - (this.sectors[selectedSector].x + 100) * zoom;
            let speed = Config.SECTOR_MOVE_SPEED;

            if (active)
                val = Config.DEFAULT_WIDTH - (this.sectors[selectedSector].x) * zoom;
            else
                val = Config.DEFAULT_WIDTH / 2 - (this.sectors[selectedSector].x + 100) * zoom;

            if (instant)
                speed = 0;
            gsap.to([
                contHighlight,
                contGraphics,
                contGraphicsFinal,
                cont
            ], {
                x: val,
                duration: speed, // продолжительность анимации в секундах
                ease: easeType,
            });
        }

        zoomBar.zoomIn = (instant = false) => {
            if (this.sectors.length == 0)
                return;
            zoom += 0.1;
            contHighlight.scale = contGraphics.scale = contGraphicsFinal.scale = cont.scale = zoom;

            // let speed = Config.SECTOR_MOVE_SPEED ;
            // gsap.to([
            //     contHighlight.scale,
            //     contGraphics.scale,
            //     contGraphicsFinal.scale,
            //     cont.scale,
            // ], {
            //     x: zoom, y: zoom,
            //     duration: speed, // продолжительность анимации в секундах
            //     ease: easeType,
            // });

            timeline.onChangeZoom(zoom);
            reposVertical();
            moveSectorsTo(true);
        }

        zoomBar.zoomOut = (instant = false) => {
            if (this.sectors.length == 0)
                return;
            zoom -= 0.1;
            if (zoom <= 0.2) {
                zoom = 0.2;
            }
            contHighlight.scale = contGraphics.scale = contGraphicsFinal.scale = cont.scale = zoom;
            // let speed = Config.SECTOR_MOVE_SPEED / 2;
            // gsap.to([
            //     contHighlight.scale,
            //     contGraphics.scale,
            //     contGraphicsFinal.scale,
            //     cont.scale,
            // ], {
            //     x: zoom,
            //     y: zoom,
            //     duration: speed, // продолжительность анимации в секундах
            //     ease: easeType,
            // });

            timeline.onChangeZoom(zoom);

            reposVertical();
            moveSectorsTo(true);
        }
        zoomBar.autoMove = (value = false) => {
            active = value;
            if(value){
                selectedSector = this.sectors.length - 1;
                moveSectorsTo(true);
            }
        }
    }
}
