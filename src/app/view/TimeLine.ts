import MyScale from "../../utils/MyScale";
import {Application, Container, Graphics, Sprite} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";

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

        const handle = new Graphics().circle(0, 0, 30).fill({color: Config.colors.green});
        handle.y = slider.height / 2;
        handle.x = 0;
        handle.eventMode = 'static';
        handle.cursor = 'pointer';
        handle.on('pointerdown', onDragStart).on('pointerup', onDragEnd).on('pointerupoutside', onDragEnd);
        sliderbar.addChild(slider);
        slider.addChild(handle);

        sliderbar.x = -(Config.DEFAULT_WIDTH - Config.DEFAULT_WIDTH / 20) / 2;
        sliderbar.y = 0;

        function onDragStart() {
            app.stage.eventMode = 'static';
            app.stage.addEventListener('pointermove', onDrag);


        }

        function onDragEnd(e: any) {
            app.stage.eventMode = 'auto';
            app.stage.removeEventListener('pointermove', onDrag);
        }

        function onDrag(e: any) {
            const halfHandleWidth = handle.width / 2;
            handle.x = Math.max(halfHandleWidth, Math.min(slider.toLocal(e.global).x, sliderWidth - halfHandleWidth));
            const t = (handle.x / sliderWidth);// - 0.0375;
            let value = -t * (main.cont.width) - 1920 / 2;
            main.onTimeLineDrag(value)
        }

        // const halfHandleWidth = handle.width / 2;
        // handle.x = Math.max(halfHandleWidth, Math.min(slider.toLocal({x: 0, y: 0}).x, sliderWidth - halfHandleWidth));
        // const t = (handle.x / sliderWidth);// - 0.0375;
        // let value = -t * (main.cont.width) - 1920 / 2;
        // console.log(handle.x, t, value);

    }
}