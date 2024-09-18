import {Application, BitmapText, Color, Container, Graphics, Sprite} from "pixi.js";
import gsap from "gsap";
import Config from "../../../config/Config";

export class CircleButton extends Container {

    onClick: Function;
    onOver: Function;
    onOut: Function;
    addIcon: Function;
    icon: Graphics;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        let main = this;
        const handleWave = new Graphics().circle(0, 0, 60).fill({color: Config.colors.white});
        this.addChild(handleWave);
        let icon = new Graphics();

        this.addIcon = (value: string) => {
            if (value == 'plus') {
                icon.circle(0, 0, 60)
                    .fill(Config.colors.blockcolor)

                let plus = new Graphics();
                plus.roundRect(-35, -6, 70, 12, 6)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus);
                let plus2 = new Graphics();
                plus2.roundRect(-6, -35, 12, 70, 6)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus2);
            }
            if (value == 'minus') {
                icon.circle(0, 0, 60)
                    .fill(Config.colors.blockcolor)
                let plus = new Graphics();
                plus.roundRect(-35, -6, 70, 12, 6)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus);
            }
            if (value == 'play') {
                icon.circle(0, 0, 60)
                    .fill(Config.colors.blockcolor)

                let plus = new Graphics();
                plus.roundPoly(0, 0, 40, 3, 20)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus);
                plus.angle = 90;
            }
            if (value == 'pause') {
                icon.circle(0, 0, 60)
                    .fill(Config.colors.white)
                let plus2 = new Graphics();
                plus2.roundRect(-20, -25, 12, 50, 6)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus2);
                let plus3 = new Graphics();
                plus3.roundRect(10, -25, 12, 50, 6)
                    .fill(Config.colors.darkgreen)
                icon.addChild(plus3);
            }
        }
        this.addChild(icon);
        icon.interactive = true;
        icon.on('pointerdown', () => {
            if (main.onClick) main.onClick();
            icon.scale = 1;
            gsap.to(icon.scale, {
                x: 0.9,
                y: 0.9,
                duration: 0.2, // продолжительность анимации в секундах
                ease: "sine.in",
                yoyo: true,
                repeat: 1,
            });

            handleWave.scale = 1;
            handleWave.visible = true;
            handleWave.alpha = 1;
            gsap.to(handleWave.scale, {
                x: 1.5,
                y: 1.5,
                duration: 0.3, // продолжительность анимации в секундах
                ease: "back.out",
            });
            gsap.to(handleWave, {
                alpha: 0,
                duration: 0.3, // продолжительность анимации в секундах
                ease: "back.out",
            });
        })
        icon.on('pointerout', () => {
            if (main.onOut) main.onOut();
            gsap.to(icon.scale, {
                x: 1,
                y: 1,
                duration: 0.2, // продолжительность анимации в секундах
                ease: "sine.in",
            });
        })
        icon.on('pointerover', () => {
            if (main.onOver) main.onOver();

            icon.scale = 1;
            gsap.to(icon.scale, {
                x: 1.1,
                y: 1.1,
                duration: 0.2, // продолжительность анимации в секундах
                ease: "sine.out",
            });
        })
    }
}