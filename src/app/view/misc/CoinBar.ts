import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";
import {MyContainer} from "../abstract/MyContainer";
import gsap from "gsap";

export class CoinBar extends MyContainer {

    constructor(app: Application) {
        super(app);

        const textureImg1 = Assets.get('coinbar_bg');
        const sprite = new Sprite(textureImg1);
        this.addChild(sprite);
        sprite.anchor.set(0.5);
        sprite.x = 40;

        const coin = new Sprite(Assets.get('coin'));
        this.addChild(coin);
        coin.anchor.set(0.5);
        coin.x = -200 + 40;

        const plus = new Sprite(Assets.get('icon_plus'));
        this.addChild(plus);
        plus.anchor.set(0.5);
        plus.x = 150 + 40;

        plus.interactive = true;
        let tw1 = gsap.to([plus], {
            duration: 0.15, // продолжительность анимации в секундах
            y: 10,      // конечная позиция y
            ease: "back.in",
            yoyo: true, paused: true,
            repeat: 1
        });
        plus.on('pointerdown', () => {
            tw1.restart();
        });
    }
}