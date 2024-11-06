import { Application, Container, Sprite, Text, TextStyle } from "pixi.js";
import { BlockModel } from "../model/BlockModel";
import CustomTextures from "../../utils/CustomTextures";
import Config from "../../config/Config";
import gsap from "gsap";
import { SectorView } from "./SectorView";

export class BlockView extends Container {
  view: SectorView;
  vid: number;
  model: BlockModel;
  debug: Function;
  update: Function;
  render: Function;
  clean: Function;
  moveTo: Function;
  forceGreen: Function;

  constructor(app: Application) {
    super();
    app.stage.addChild(this);
    this.clean = () => {
      this.model = null;
      this.vid = undefined;
    };
    let hexagonRadius = 50;
    let fin = 0;
    let colored = false;

    const obj = new Sprite(CustomTextures.textures.hex);
    obj.anchor.set(0.5);
    this.addChild(obj);

    obj.interactive = true;
    obj.on("pointerdown", () => {
      const blockData = { ...this.model, type: "DAG" };
      (window as any).showblock(blockData);
    });
    obj.cursor = 'pointer';

    obj.interactive = true;
    obj.on("pointerover", () => {
      gsap.to(obj.scale, {
        duration: 0.3, // продолжительность анимации в секундах
        x: 1.1,
        y: 1.1,
        ease: "sine.out",
      });
    });

    obj.on("pointerout", () => {
      gsap.to(obj.scale, {
        duration: 0.3, // продолжительность анимации в секундах
        x: 1,
        y: 1,
        ease: "sine.in",
      });
    });

    this.debug = (value: number) => {};

    obj.tint = Config.colors.blockInactive;

    this.moveTo = (pos: number) => {
      if (fin != pos) {
        fin = pos;
        gsap.to(this, {
          y: fin,
          duration: 0.5, // продолжительность анимации в секундах
          ease: "sine.out",
        });
      }
    };

    const style = new TextStyle({
      fontFamily: "Inter",
      fontSize: Config.FONTS.block,
      fill: Config.colors.white,
      wordWrap: false,
      wordWrapWidth: 440,
    });

    let basicText: any = new Text({ style });
    basicText.anchor.set(0.5);
    this.addChild(basicText);
    basicText.y = -15;

    let basicText2: any = new Text({ style });
    basicText2.anchor.set(0.5);
    this.addChild(basicText2);
    basicText2.y = basicText.y + 30;

    this.render = () => {
      if (this.view?.finalized && !colored) {
        colored = true;
        obj.tint = Config.colors.blockActive;
      }
    };

    this.forceGreen = () => {
      if (!colored) {
        colored = true;
        obj.tint = Config.colors.blockActive;
      }
    };
    this.update = () => {
      if (this.model) {
        basicText.text = this.model.hash.slice(0, 5);
        basicText2.text = "..." + this.model.hash.slice(-3);
      }
    };
  }
}
