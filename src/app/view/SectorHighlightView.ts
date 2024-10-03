import {Application, Container, Graphics} from "pixi.js";
import gsap from "gsap";
import Config from "../../config/Config";

export class SectorHighlightView extends Container {
    update: Function;
    onRescale: Function;
    vid: number;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        let obj2 = new Graphics();
        obj2.rect(0, -850 * 30 / 2, Config.SECTOR_WIDTH, 850 * 30)
        obj2.fill({color: Config.colors.darkbacklight, alpha: 1})
        obj2.alpha = 0;

        let obj = new Graphics();
        obj.rect(0, -850 * 30 / 2, Config.SECTOR_WIDTH, 850 * 30)
        obj.fill({color: Config.colors.darkback, alpha: 1})

        this.addChild(obj);
        this.addChild(obj2);

        obj.interactive = true;
        obj.on('pointerover', () => {
            gsap.to(obj2, {
                duration: 0.2, // продолжительность анимации в секундах
                alpha: 1,      // конечная позиция y
                ease: "sine.in",
            });
        })
        obj.on('pointerout', () => {
            gsap.to(obj2, {
                duration: 0.2, // продолжительность анимации в секундах
                alpha: 0,      // конечная позиция y
                ease: "sine.out",
            });
        })

        obj.interactive = true;
        obj.on('pointerdown', () => {
            this.emit('onSector', this.vid);
        })

        this.onRescale = (w: number, h: number) => {
        }
    }
}