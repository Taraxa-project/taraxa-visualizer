import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";
import gsap from "gsap";

export class Bot extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('bot');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);
        sprite.anchor.set(0.5, 1);

        const green = new Sprite(Assets.get('green'));
        this.addChild(green);
        green.anchor.set(0.5, 1);
        gsap.to([green], {
            duration: 0.5, // продолжительность анимации в секундах
            alpha: 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });

        const btn = new Sprite(Assets.get('btn'));
        this.addChild(btn);
        btn.y = -160;
        btn.x = -5;
        btn.anchor.set(0.5);
        btn.scale = 0.65;

        const home = new Sprite(Assets.get('icon_dice'));
        this.addChild(home);
        home.anchor.set(0.5);
        home.y = -180;
        home.x = -10;
        home.scale = 0.75;


        btn.interactive = true;

        let tw1 = gsap.to([btn], {
            duration: 0.15, // продолжительность анимации в секундах
            y: -150,      // конечная позиция y
            ease: "back.in",
            yoyo: true, paused: true,
            repeat: 1
        });
        let tw2 = gsap.to([home], {
            duration: 0.15, // продолжительность анимации в секундах
            y: -170,      // конечная позиция y
            // scale: 0.7,
            ease: "back.in", paused: true,
            yoyo: true, repeat: 1
        });
        btn.on('pointerdown', () => {
            tw1.restart();
            tw2.restart();
        });
    }
}