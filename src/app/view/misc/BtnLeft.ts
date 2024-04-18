import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";
import gsap from "gsap";

export class BtnLeft extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('btnL');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);
        sprite.anchor.set(0.5, 1);
        sprite.y = -30;

        const home = new Sprite(Assets.get('icon_home'));
        this.addChild(home);
        home.anchor.set(0.5);
        home.y = -110;
        home.x = 0;
        home.scale = 1;


        sprite.interactive = true;
        let tw1 = gsap.to([sprite], {
            duration: 0.15, // продолжительность анимации в секундах
            y: -20,      // конечная позиция y
            ease: "back.in",
            yoyo: true, paused: true,
            repeat: 1
        });
        let tw2 = gsap.to([home], {
            duration: 0.15, // продолжительность анимации в секундах
            y: -100,      // конечная позиция y
            ease: "back.in", paused: true,
            yoyo: true, repeat: 1
        });
        sprite.on('pointerdown', () => {
            tw1.restart();
            tw2.restart()
        });

    }
}