import MyScale from "./utils/MyScale";
import {MainView} from "./app/view/MainView";
import {MainModel} from "./app/model/MainModel";
import {MainController} from "./app/controller/MainController";
import {Application, Assets, Ticker, UPDATE_PRIORITY} from "pixi.js";
import {WSClient} from "./net/WSClient";
import {BlockModel} from "./app/model/BlockModel";
import * as dat from 'dat.gui';
import {BlockInfoView} from "./app/view/BlockInfoView";
import Config from "./config/Config";
import CustomTextures from "./utils/CustomTextures";
import {Logo} from "./app/view/ui/Logo";
import {TimeLine} from "./app/view/TimeLine";

(async () => {
    const app = new Application();
    await app.init({
        roundPixels: true,
        resolution: 1,
        antialias: true,
        width: 1920,
        height: 1080,
        background: '#151824',
        preference: 'webgl',
    });
    app.ticker.maxFPS = 60;

    document.getElementById('canvas-game').appendChild(app.canvas);
    //@ts-ignore
    globalThis.__PIXI_APP__ = app;
    MyScale.app = app;
    window.addEventListener('resize', MyScale.resize);

    const blockTexture = await Assets.load('./block@4x_white.png');
    CustomTextures.textures.blockTexture = blockTexture;

    const logo = await Assets.load({
        src: './logo.svg', data: {
            parseAsGraphicsContext: false,
        }
    });

    CustomTextures.textures.logo = logo;

    const params = {
        zoom: 1.0,
    };
    const gui = new dat.GUI(/*{ autoPlace: false }*/);
    gui.domElement.id = 'gui';
    gui.add(params, 'zoom', 0.1, 5, 0.01).onChange((value: any) => {
        console.log(value);
        view.scale.set(value);
    });

    const colors = gui.addFolder('Color');
    colors.addColor(Config.colors, 'green').onChange((value: any) => {
        console.log(value);
    });
    colors.addColor(Config.colors, 'darkgreen').onChange((value: any) => {
        console.log(value);
    });
    colors.addColor(Config.colors, 'darkback').onChange((value: any) => {
        app.renderer.background.color = Config.colors.darkback;
    });
    colors.addColor(Config.colors, 'darkblue').onChange((value: any) => {
        console.log(value);
    });
    colors.addColor(Config.colors, 'yellow').onChange((value: any) => {
        console.log(value);
    });
    colors.addColor(Config.colors, 'blockcolor').onChange((value: any) => {
        Config.colors.blockcolor = value;
    });
    // gui.open();
    // colors.open();
    gui.close()
    // return;

    const view = new MainView(app);
    const model = new MainModel();
    const controller = new MainController();

    const loadJsonData = async (url: string): Promise<any> => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
            }
            return await response.json() as any;
        } catch (error) {
            throw error;  // Перебрасываем ошибку дальше
        }
    };
    MyScale.resize();
    loadJsonData('data_1000.json').then(data => {

        model.init(view);
        controller.init(model);

        for (let i = 0; i < 1; i++) {
            //   controller.addTestBlock(data[i]);
        }

        MyScale.resize();
        let t = 0;

        app.ticker.add((time) => {
            // if (t == 300) {
            view.update();
            t = 0;
            // }
            t++;
        });
    }).catch(error => {
    });
})();
