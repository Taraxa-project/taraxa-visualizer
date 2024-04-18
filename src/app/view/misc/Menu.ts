import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";
import gsap from "gsap";

export class Menu extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('menu');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);
        sprite.anchor.set(0.5,0.5);

        sprite.interactive = true;
        let tw1 = gsap.to([sprite], {
            duration: 0.15, // продолжительность анимации в секундах
            y: 10,      // конечная позиция y
            ease: "back.in",
            yoyo: true, paused: true,
            repeat: 1
        });
        sprite.on('pointerdown', () => {
            tw1.restart();
        });
    }
}