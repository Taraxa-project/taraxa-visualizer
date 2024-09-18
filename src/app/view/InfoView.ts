import MyScale from "../../utils/MyScale";
import {Application, BitmapText, Container, Graphics, Sprite, Text, TextStyle} from "pixi.js";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";
import {BlockModel} from "../model/BlockModel";

export class InfoView extends Container {

    constructor(app: Application) {

        super();
        app.stage.addChild(this);

        MyScale.setup(this, {
            scalePortrait: 1,
            scaleLandscape: 1,
            top: 1,
            left: 1,
            onRescale: () => {
            }
        });

        let obj = new Graphics();
        obj.rect(0, 0, 400, Config.DEFAULT_HEIGHT)
            .fill(Config.colors.darkblue)
        this.addChild(obj);

        const data = {
            hash: '0xaaa5d883aa8bc27a7b63625b9d220248c0b686b30e9a0e4f14944a8ea7aff395',
            level: '0x22117ea',
            pivot: '0x073ed90d73bf121afc3968961f849c64bec71298f6d7ab45779472f3fc2c47cd',
            sector: {uid: 2530, isRenderGroupRoot: false},
            sender: '0xfbb3ee068e491e218d2cda595c23c6e3cc2f00f2',
            sig: '0xcdeb6c6765052019bc0be004af88c89571f946641a0ddf4a1e2a26931f8c36ff5f7d126fd09b9f45bb5fd517cf1f77e8c382d33312929a915535756123a9694f01',
            timestamp: '0x66a97735',
            tips: [
                '0x74bd09c10972eafa3dd128a0b5bc96b00145f374d2c16bea6334e3516a235138',
                '0xfbdde7c6b6530415f6b91bf7262b201d96252b2d7d2ff38c8f3cf1aa70c49534',
                '0x40531831befb092d7680266bd06d9043f75cad8bf7dd0fe22d74cb721b7adc9a'
            ],
            transactions: [
                '0x0cf819a7c82d3228885a8b19c6f32211b45dc44a2eeb1dac9375a842fabf141d',
                '0x956be1606c91fcda9fc650fd32d2adee5bed3d40bcf44d558ea1c21cab3aa541',
                '0x573970a99f5ba593207652d4e106a1224606c477453a767ed563b2eeaffebe56',
                '0x69135241e1f4e57f2bf1932b025e1fd4f6d1c5b2e903bb1e4bee3724d66dc2ec',
                '0x34da358c206495218e8032e7b1dd96a934cd5a94b1f2c451b71fa8ae13973626'
            ],
            trx_estimations: '0x19a28'
        };
        const style = new TextStyle({
            fontFamily: 'Inter',
            fontSize: 40,
            fill: Config.colors.green,
            wordWrap: false,
            wordWrapWidth: 440,
        });

        const style2 = new TextStyle({
            fontFamily: 'Inter',
            fontSize: 30,
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 440,
        });

        // Config.showBlock = (model: BlockModel) => {
        //     let basicText: any = new Text({style});
        //     basicText.anchor.set(0.5);
        //     basicText.text = 'hash:';
        //     this.addChild(basicText);
        // };
        //
        // function displayObjectProperties(obj: any) {
        //     let yOffset = 50; // Начальное смещение по Y
        //     for (const [key, value] of Object.entries(obj)) {
        //         let textValue;
        //         if (Array.isArray(value)) {
        //             textValue = `${key}: ${value.join(', ')}`;
        //         } else if (typeof value === 'object' && value !== null) {
        //             textValue = `${key}: ${JSON.stringify(value)}`;
        //         } else {
        //             textValue = `${key}: ${value}`;
        //         }
        //
        //         const text = new Text(textValue, style);
        //         text.anchor.set(0.5);
        //         text.x = app.view.width / 2;
        //         text.y = yOffset;
        //         app.stage.addChild(text);
        //
        //         yOffset += 40; // Увеличиваем смещение по Y для следующего текста
        //     }
        // }
        //
        // // Вызов функции с примером объекта
        // displayObjectProperties(data);

    }
}