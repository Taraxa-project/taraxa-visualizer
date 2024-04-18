import Config from "../config/Config";
import {Application, Sprite} from "pixi.js";

class ScaleConfig {
    x?: number;
    y?: number;
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
}

export default class MyScale {
    public static objectsForScale: any[] = [];
    static app: Application;

    static resize(): void {
        let app = MyScale.app;

        //  if (app && app.renderer && app.renderer.view) {
        let size = {width: window.innerWidth, height: window.innerHeight};
        let defScaleX = Config.DEFAULT_WIDTH / size.width;
        let defScaleY = Config.DEFAULT_HEIGHT / size.height;
        let scale = Math.max(defScaleX, defScaleY);
        if (size.width >= size.height) {
            defScaleY = Config.DEFAULT_WIDTH / size.height;
            defScaleX = Config.DEFAULT_HEIGHT / size.width;
            scale = Math.max(defScaleX, defScaleY);
        }
        let window_width = Math.floor(size.width * scale);
        let window_height = Math.floor(size.height * scale);
        (app.renderer.view as any).canvas.style.width = `100%`;
        (app.renderer.view as any).canvas.style.height = `100%`;
        app.renderer.resize(window_width, window_height);
        // }


        let width = window_width;
        let height = window_height;
        let newScaleX = (Math.floor(width / Config.DEFAULT_WIDTH * 100)) / 100;
        let newScaleY = (Math.floor(height / Config.DEFAULT_HEIGHT * 100)) / 100;

        MyScale.objectsForScale.forEach((data: any) => {
                let obj: Sprite = data.obj as Sprite;
                if (data.isBG) {
                    /*   if (width > height) {
                           obj.width = width;
                           obj.scale.x = obj.scale.y;
                           if (obj.displayHeight < height) {
                               obj.displayHeight = height;
                               obj.scaleX = obj.scaleY;
                           }
                       } else {
                           obj.displayHeight = height;
                           obj.scaleX = obj.scaleY;
                           if (obj.displayWidth < width) {
                               obj.displayWidth = width;
                               obj.scaleY = obj.scaleX;
                           }

                       }
                       obj.setPosition(width / 2 - obj.displayWidth / 2, height / 2 - obj.displayHeight / 2);*/
                } else {
                    let scale = Math.min(newScaleX, newScaleY);
                    let s = scale;
                    if (data.config.center) {
                        if (s <= 1 || scale <= 1) {
                            scale = 1;
                            s = 1;
                        }
                    }

                    if (width >= height) {
                        if (data.myScaleLandscape) {
                            s = scale * data.myScaleLandscape;
                            if (data.myScaleLandscape > s) {
                                s = data.myScaleLandscape;
                            }
                        }
                    } else {
                        if (data.myScalePortrait) {
                            s = scale * data.myScalePortrait;
                        }
                    }
                    obj.position.set(width / 2, height / 2);

                    // obj.position.set(width / 2, 0);
                    if (data.config.top) {
                        obj.y = data.config.top * s;
                    }
                    if (data.config.topLandscape) {
                        if (width >= height) {
                            if (data.config.topLandscape) {
                                obj.y = data.config.topLandscape * s;
                            }
                        }
                    }

                    if (data.config.bottom) {
                        obj.y = height - data.config.bottom * s;
                    }

                    if (data.config.botLandscape) {
                        if (width >= height) {
                            if (data.config.botLandscape) {
                                obj.y = height - data.config.botLandscape * s;
                            }
                        }
                    }

                    if (data.config.left) {
                        obj.x = data.config.left * s;
                    }
                    if (data.config.right) {
                        obj.x = width - data.config.right * s;
                    }

                    if (data.config.rightLandscape) {
                        if (width >= height) {
                            if (data.config.rightLandscape) {
                                obj.x = width - data.config.rightLandscape * s;
                            }
                        }

                    }

                    obj.scale = s;


                    if (data.config.wide) {
                        obj.scale = newScaleX;
                        if (data.config.top)
                            obj.y = data.config.top * newScaleX;

                        if (data.config.bottom)
                            obj.y = height - data.config.bottom * newScaleX;
                    }

                    /*   if (width / height < 1.7) {
                           obj.setScale(s - s / 3);
                       }*/
                }
                if (data.config.onRescale)
                    data.config.onRescale(width, height);
            }
        )
    }

    public static setup(obj: any, config: ScaleConfig = new ScaleConfig()) {
        let data: any = {
            key: config.key,
            isBG: config.isBG,
            defX: config.x,
            defY: config.y,
            myScale: obj.scale,
            center: obj.center,
            myScalePortrait: config.scalePortrait,
            myScaleLandscape: config.scaleLandscape,
            config: config,
            obj: obj,
            visiblePortrait: config.visiblePortrait,
            visibleLandscape: config.visibleLandscape,
            topPortrait: config.topPortrait,
            topLandscape: config.topLandscape,

            botPortrait: config.botPortrait,
            botLandscape: config.botLandscape,


            rightLandscape: config.rightLandscape,

            onRescale: config.onRescale,
        }
        this.objectsForScale.push(data);
        // MyScale.rescale(Config.GAME.scale.gameSize);
    }


    public static rescale(gameSize: any, baseSize?: any, displaySize?: any, previousWidth?: any, previousHeight?: any) {
        let width = gameSize.width;
        let height = gameSize.height;
        let newScaleX = (Math.floor(width / Config.DEFAULT_WIDTH * 100)) / 100;
        let newScaleY = (Math.floor(height / Config.DEFAULT_HEIGHT * 100)) / 100;

        MyScale.objectsForScale.forEach((data: any) => {
                let obj: any = data.obj;
                if (data.isBG) {
                    if (width > height) {
                        obj.displayWidth = width;
                        obj.scaleY = obj.scaleX;
                        if (obj.displayHeight < height) {
                            obj.displayHeight = height;
                            obj.scaleX = obj.scaleY;
                        }
                    } else {
                        obj.displayHeight = height;
                        obj.scaleX = obj.scaleY;
                        if (obj.displayWidth < width) {
                            obj.displayWidth = width;
                            obj.scaleY = obj.scaleX;
                        }

                    }
                    obj.setPosition(width / 2 - obj.displayWidth / 2, height / 2 - obj.displayHeight / 2);
                } else {
                    let scale = Math.min(newScaleX, newScaleY);
                    let s = scale;
                    if (data.config.center) {
                        if (s <= 1 || scale <= 1) {
                            scale = 1;
                            s = 1;
                        }
                    }

                    if (width >= height) {
                        if (data.myScaleLandscape) {
                            s = scale * data.myScaleLandscape;
                        }
                    } else {
                        if (data.myScalePortrait) {
                            s = scale * data.myScalePortrait;
                        }
                    }
                    obj.setPosition(width / 2, height / 2);
                    if (data.config.top) {
                        obj.y = data.config.top * s;
                    }
                    if (data.config.topLandscape) {
                        if (width >= height) {
                            if (data.config.topLandscape) {
                                obj.y = data.config.topLandscape * s;
                            }
                        }
                    }

                    if (data.config.bottom) {
                        obj.y = height - data.config.bottom * s;
                    }

                    if (data.config.botLandscape) {
                        if (width >= height) {
                            if (data.config.botLandscape) {
                                obj.y = height - data.config.botLandscape * s;
                            }
                        }
                    }

                    if (data.config.left) {
                        obj.x = data.config.left * s;
                    }
                    if (data.config.right) {
                        obj.x = width - data.config.right * s;
                    }

                    if (data.config.rightLandscape) {
                        if (width >= height) {
                            if (data.config.rightLandscape) {
                                obj.x = width - data.config.rightLandscape * s;
                            }
                        }

                    }

                    obj.setScale(s);
                    if (data.config.wide) {
                        obj.setScale(newScaleX);
                        if (data.config.top)
                            obj.y = data.config.top * newScaleX;

                        if (data.config.bottom)
                            obj.y = height - data.config.bottom * newScaleX;
                    }

                    /*   if (width / height < 1.7) {
                           obj.setScale(s - s / 3);
                       }*/
                }
                if (data.config.onRescale)
                    data.config.onRescale();
            }
        )
    }
}