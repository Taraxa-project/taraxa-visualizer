import MyScale from "./utils/MyScale";
import {MainView} from "./app/view/MainView";
import {MainModel} from "./app/model/MainModel";
import {MainController} from "./app/controller/MainController";
import {Application, Assets} from "pixi.js";
import CustomTextures from "./utils/CustomTextures";
import TWEEN from "@tweenjs/tween.js";

(async () => {
    const app = new Application();
    await app.init({
        roundPixels: true,
        resolution: 1, /*window.devicePixelRatio || 1,*/
        antialias: true,
        width: 1920,
        height: 1080,
        background: '#151824',
        preference: 'webgl',
    });
    app.ticker.minFPS = 60;
    app.ticker.maxFPS = 60;

    document.getElementById('canvas-game').appendChild(app.canvas);
    //@ts-ignore
    MyScale.app = app;
    window.addEventListener('resize', MyScale.resize);
    const logo = await Assets.load({
        src: './logo_min.png',
    });

    CustomTextures.textures.logo = logo;

    const view = new MainView(app);
    const model = new MainModel();
    const controller = new MainController();
    model.init(view);
    controller.init(model);

    app.ticker.add((time) => {
        view.update();
        view.render();
        TWEEN.update();
    });
    MyScale.resize();
})();
