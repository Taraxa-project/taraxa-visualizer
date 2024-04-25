import {Application, Assets, BitmapText, Container, Graphics, Sprite, Text} from "pixi.js";
import MyScale from "../../utils/MyScale";
import {Block} from "./misc/Block";
import {TimelineSectorModel} from "../model/TimelineSectorModel";
import {BlockModel} from "../model/BlockModel";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";

export class BlockView extends Container {

    vid: number;
    model: BlockModel;
    debug: Function;
    update: Function;

    constructor(app: Application) {
        super();
        app.stage.addChild(this);

        let hexagonRadius = 50;

       /* const circ = new Sprite(CustomTextures.textures.circ);
        circ.anchor.set(0.5);
        this.addChild(circ)
*/
        const obj = new Sprite(CustomTextures.textures.hex);
        obj.anchor.set(0.5);
        obj.scale.set(0.298);
        this.addChild(obj)

        const img = new Sprite(CustomTextures.textures.blockTexture);
        img.anchor.set(0.5);
        img.scale.set(0.3);
        this.addChild(img)

        img.tint = Config.colors.blockcolor;

        /*   obj.interactive = true;
           obj.on('pointerdown', () => {
               console.log(this);
           })*/

     /*   let basicText = new BitmapText({anchor: 0.5});
        basicText.x = 0;
        this.addChild(basicText);
*/
        this.debug = (value: number) => {
          //  basicText.text = value.toString();
        }

        let v = 1;
        let s = 1;
        this.update = () => {

            // obj.angle += 2;

            /*  v -= 0.03;
              s += 0.02;
              circ.scale.set(s);
              circ.alpha = v;
              if (v <= 0) {
                  v = 1;
                  s = 1;
              }*/
        }
    }
}