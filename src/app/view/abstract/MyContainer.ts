import {Application, Assets, Container, Graphics, Sprite} from "pixi.js";
import Config from "../../../config/Config";

export abstract class MyContainer extends Container {

    defX?: number;
    defY?: number;

    isBG ?: boolean;

    top ?: number;
    right ?: number;
    left ?: number;
    bottom ?: number;

    key?: string;

    scalePortrait?: number;
    scaleLandscape?: number;
    wide?: boolean;

    center?: boolean;
    visiblePortrait?: boolean;
    visibleLandscape?: boolean;
    topPortrait?: number;
    topLandscape?: number;
    rightLandscape?: number;
    botPortrait?: number;
    botLandscape?: number;
    onRescale?: Function;


    constructor(app: Application) {
        super();
    }
}