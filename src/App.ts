import MyScale from "./utils/MyScale";
import {MainView} from "./app/view/MainView";
import {MainModel} from "./app/model/MainModel";
import {MainController} from "./app/controller/MainController";
import {Application, Ticker, UPDATE_PRIORITY} from "pixi.js";
import {WSClient} from "./net/WSClient";
import {BlockModel} from "./app/model/BlockModel";
// import * as dat from 'dat.gui';
(async () => {
    const app = new Application();
    await app.init({
        roundPixels: true,
        resolution: 3,
        antialias: true,
        width: 1920,
        height: 1080,
        background: '#949494',
        preference: 'webgl',
    });
    document.getElementById('canvas-game').appendChild(app.canvas);
    //@ts-ignore
    globalThis.__PIXI_APP__ = app;
    MyScale.app = app;
    window.addEventListener('resize', MyScale.resize);

    let view = new MainView(app);
    const model = new MainModel();
    const controller = new MainController();
    // const gui = new dat.GUI();

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
        app.ticker.maxFPS = 60;
        app.ticker.add((time) => {
            // if (t == 300) {
            // view.update();
            t = 0;
            // }
            t++;
        });
    }).catch(error => {
    });
})();
