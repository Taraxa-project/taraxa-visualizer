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

export class MainView extends Container {

    updateData: Function;
    onRescale: Function;
    update: Function;
    drawConnect: Function;

    mapData: Map<number, TimelineSectorModel> = new Map<number, TimelineSectorModel>();
    sectorsHighLights: SectorHighlightView[] = [];
    sectors: SectorView[] = [];

    constructor(app: Application) {
        console.log('main view init');

        super();
        app.stage.addChild(this);
        app.stage.hitArea = app.screen;

        MyScale.setup(this, {
            scalePortrait: 0.6,
            scaleLandscape: 0.6,
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

        for (let i = 0; i < 100; i++) {
            let shl = new SectorHighlightView(app);
            shl.x = 400 * i;
            shl.y = 150;
            contHighlight.addChild(shl);
            this.sectorsHighLights.push(shl);

            let sector = new SectorView(app);
            sector.createUniformBlocks(16);
            sector.x = 400 * i;
            sector.y = 150;
            sector.vid = i;
            cont.addChild(sector);
            this.sectors.push(sector);
            timeline.onChangeProc((cont.x / (-cont.width)));
        }

        this.on('onSector', (vid: number) => {
        });

        this.updateData = (viewMap: any) => {
            this.mapData = viewMap;
            this.update();
        }

        const drawArrow = (from: Point, to: Point, color: any) => {
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

        const drawLine = (p1: Point, p2: Point, final:boolean) => {
            graphics.moveTo(p1.x, p1.y);
            graphics.lineTo(p2.x, p2.y);
            if(final){
                graphics.stroke({width: 6, color: Config.colors.yellow});
                drawArrow(p2, p1, Config.colors.yellow);
            }else{
                graphics.stroke({width: 4, color: Config.colors.darkgreen});
                drawArrow(p2, p1, Config.colors.darkgreen);
            }


        }
        const tipsExist = (hash: string, tips: string[]) => {
            for (let v = 0; v < tips.length; v++) {
                if (hash == tips[v]) {
                    return true;
                }
            }
            return false;
        }

        const findParent = (from: number, child: BlockView): BlockView => {
            for (let i = 0; i < from; i++) {
                let current = this.sectors[i];
                for (let v = 0; v < current.blocks.length; v++) {
                    let block = current.blocks[v];
                    if (block.model) {
                        if (block.model.hash == child.model.pivot || tipsExist(block.model.hash, child.model.tips)) {

                            if (block.model.finalized) {
                                block.tint = 0xffffff;
                            }

                            drawLine(new Point(200 + block.parent.parent.x, 550 + block.y), new Point(200 + child.parent.parent.x, 550 + child.y), block.model.finalized)

                            return block;
                        }
                    }
                }
            }
            return null;
        }

        this.drawConnect = () => {
            for (let i = this.sectors.length - 1; i >= 0; i--) {
                let current = this.sectors[i];
                if (current.model) {
                    for (let v = 0; v < current.blocks.length; v++) {
                        let block = current.blocks[v];
                        if (block.model) {
                            if (i >= 0) {
                                findParent(i, block);
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

        Config.onCustomUpdate = () => {
            graphics.clear();
            this.drawConnect();
        }

        this.update = () => {
            graphics.clear();
            for (let i = 0; i < 100; i++) {
                let sector = this.sectors[i];
                sector.model = null;
                sector.update();
            }

            let i = 0;
            for (const key of this.mapData.keys()) {
                let sectorModel: TimelineSectorModel = this.mapData.get(key);
                let sector = this.sectors[i];
                sector.model = sectorModel;
                sector.update();
                i++;
            }


            this.drawConnect();
        }
    }
}
