import {Application, Assets, Container, Sprite} from "pixi.js";
import {MyContainer} from "../abstract/MyContainer";
import Config from "../../../config/Config";
import gsap from "gsap";

export class Clouds extends MyContainer {
    size?: Function;

    constructor(app: Application) {
        super(app);

        let clouds = new Container();
        this.addChild(clouds);

        const c1 = new Sprite(Assets.get('cloud'));
        clouds.addChild(c1);
        const c2 = new Sprite(Assets.get('cloud'));
        clouds.addChild(c2);

        const c3 = new Sprite(Assets.get('cloud2'));
        clouds.addChild(c3);
        const c4 = new Sprite(Assets.get('cloud2'));
        clouds.addChild(c4);

        const c5 = new Sprite(Assets.get('cloud3'));
        clouds.addChild(c5);
        const c6 = new Sprite(Assets.get('cloud3'));
        clouds.addChild(c6);

        clouds.scale = 1.5;
        // clouds.position.set(-1000, 0);


        c1.position.set(200, -700);
        c2.position.set(1200, -700);

        c3.position.set(-200, -400);
        c4.position.set(800, -400);

        c5.position.set(-350, -800);
        c6.position.set(650, -800);

       gsap.to([c2], {
            duration: 10, // продолжительность анимации в секундах
            x: 200,      // конечная позиция y
           ease: "none",
            repeat: -1
        });
        gsap.to([c1], {
            duration: 10, // продолжительность анимации в секундах
            x: -1000,      // конечная позиция y
            ease: "none",
            repeat: -1
        });

        gsap.to([c3], {
            duration: 7, // продолжительность анимации в секундах
            x: -1200,      // конечная позиция y
            ease: "none",
            repeat: -1
        });
        gsap.to([c4], {
            duration: 7, // продолжительность анимации в секундах
            x: -200,      // конечная позиция y
            ease: "none",
            repeat: -1
        });
        gsap.to([c5], {
            duration: 5, // продолжительность анимации в секундах
            x: -1350,      // конечная позиция y
            ease: "none",
            repeat: -1
        });
        gsap.to([c6], {
            duration: 5, // продолжительность анимации в секундах
            x: -350,      // конечная позиция y
            ease: "none",
            repeat: -1
        });

    }
}