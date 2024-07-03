import MyScale from "../../utils/MyScale";
import {Application, Container, Graphics, Sprite} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";

export class TimeLine extends Container {

    onChangeProc: Function;
    onTimeLineDrag: Function;
    cont: Container;
    proc: number;

    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        let main = this;

        MyScale.setup(this, {
            scalePortrait: 1,
            scaleLandscape: 1,
            bottom: 75,
            left: 50,
            onRescale: () => {
            }
        });

        this.onChangeProc = (proc: number) => {
            if (this.proc != proc) {
            }
            this.proc = proc;
        }

        let sliderbar = new Container();
        this.addChild(sliderbar);
        const sliderWidth = Config.DEFAULT_WIDTH - Config.DEFAULT_WIDTH / 20;
        const slider = new Container();

        let pull = new Graphics().rect(0, 0, sliderWidth, 10).fill({color: Config.colors.darkgreen});
        slider.x = 0;
        slider.y = 0;
        slider.addChild(pull);

        const handleWave = new Graphics().circle(0, 0, 30).fill({color: Config.colors.yellow});
        const handle = new Graphics().circle(0, 0, 30).fill({color: Config.colors.green});

        let dragger = new Container();
        dragger.setSize(30, 30);
        dragger.addChild(handleWave);
        dragger.addChild(handle);

        dragger.y = slider.height / 2;
        dragger.x = 0;
        dragger.eventMode = 'static';
        dragger.cursor = 'pointer';

        dragger.on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd);
        sliderbar.addChild(slider);
        slider.addChild(dragger);

        sliderbar.x = 0;
        sliderbar.y = 0;
        handle.scale = 0.8;
        handleWave.scale = 0.8;

        function onDragStart() {
            app.stage.eventMode = 'static';
            app.stage.addEventListener('pointermove', onDrag);

            handleWave.scale = 0.8;
            handleWave.visible = true;
            handleWave.alpha = 1;

            gsap.to(handle.scale, {
                x: 0.6,
                y: 0.6,
                duration: 0.3, // продолжительность анимации в секундах
                ease: "back.out",
            });
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
        }


        function onDragEnd(e: any) {
            gsap.to(handle.scale, {
                x: 0.8,
                y: 0.8,
                duration: 0.5, // продолжительность анимации в секундах
                ease: "back.out",
            });
            handleWave.scale = 0.8;
            handleWave.visible = false;
            handleWave.alpha = 1;

            app.stage.eventMode = 'auto';
            app.stage.removeEventListener('pointermove', onDrag);
        }

        function onDrag(e: any) {
            const halfHandleWidth = 15;
            dragger.x = Math.max(halfHandleWidth, Math.min(slider.toLocal(e.global).x, sliderWidth));
            const proc = (dragger.x / sliderWidth);
            main.onTimeLineDrag(proc)
        }

        // const halfHandleWidth = handle.width / 2;
        // handle.x = Math.max(halfHandleWidth, Math.min(slider.toLocal({x: 0, y: 0}).x, sliderWidth - halfHandleWidth));
        // const t = (handle.x / sliderWidth);// - 0.0375;
        // let value = -t * (main.cont.width) - 1920 / 2;
        // console.log(handle.x, t, value);

    }
}