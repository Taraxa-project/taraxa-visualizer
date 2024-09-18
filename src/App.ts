import MyScale from "./utils/MyScale";
import {MainView} from "./app/view/MainView";
import {MainModel} from "./app/model/MainModel";
import {MainController} from "./app/controller/MainController";
import {Application, Assets, Container, Ticker, UPDATE_PRIORITY} from "pixi.js";
import {WSClient} from "./net/WSClient";
import {BlockModel} from "./app/model/BlockModel";
import * as dat from 'dat.gui';
import {BlockInfoView} from "./app/view/BlockInfoView";
import Config from "./config/Config";
import CustomTextures from "./utils/CustomTextures";
import {Logo} from "./app/view/ui/Logo";
import {TimeLine} from "./app/view/TimeLine";
import gsap from "gsap";
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
        // background: '#da32d7',
        preference: 'webgl',
    });
    app.ticker.minFPS = 60;
    app.ticker.maxFPS = 60;
    //gsap.ticker.fps(0);


    document.getElementById('canvas-game').appendChild(app.canvas);
    //@ts-ignore
    // globalThis.__PIXI_APP__ = app;
    MyScale.app = app;
    window.addEventListener('resize', MyScale.resize);

    /* const textureFiles = [
         'block@4x_white.png',
         'block@4x_white_0.png',
         'block@4x_white_1.png',
         'block@4x_white_2.png',
         'block@4x_white_3.png',
         'block@4x_white_4.png'
     ];

     const textureKeys = [
         'blockTexture',
         'blockTexture0',
         'blockTexture1',
         'blockTexture2',
         'blockTexture3',
         'blockTexture4'
     ];*/
    // Assets.addBundle('fonts', [
    //     {alias: 'Inter-Regular', src: './fonts/static/Inter-Regular.ttf'},
    // ]);
    //
    // await Assets.loadBundle('fonts');

    /*   const loadTextures = async () => {
           for (let i = 0; i < textureFiles.length; i++) {
               CustomTextures.textures[textureKeys[i]] = await Assets.load(`./${textureFiles[i]}`);
           }
       };

       await loadTextures();
   */
    const logo = await Assets.load({
        src: './logo_min.png',
        /* data: {
             parseAsGraphicsContext: false,
         }*/
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
