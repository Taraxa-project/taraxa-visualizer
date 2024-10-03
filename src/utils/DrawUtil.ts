import {Graphics, Point} from "pixi.js";
import Config from "../config/Config";

export default class DrawUtil {

    static drawArrow = (graphics: Graphics, from: Point, to: Point, color: any) => {
        const offset = Config.lines.arrowOffset;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const headLength = Config.lines.arrowHeadLength; // Например, 15 вместо 25
        const headWidth = Config.lines.arrowHeadWidth;
        const endX = to.x - offset * Math.cos(angle);
        const endY = to.y - offset * Math.sin(angle);
        graphics.moveTo(endX, endY);
        graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));
        graphics.lineTo(endX - headLength * Math.cos(angle + Math.PI / headWidth), endY - headLength * Math.sin(angle + Math.PI / headWidth));
        graphics.lineTo(endX, endY);
        graphics.lineTo(endX - headLength * Math.cos(angle - Math.PI / headWidth), endY - headLength * Math.sin(angle - Math.PI / headWidth));
        graphics.fill({color: color, alpha: 1});
        graphics.stroke({color: color, width: 1}); // Толщина линии уменьшена до 1
    };

    static drawLine = (graphics: Graphics, p1: Point, p2: Point, final: boolean, pivot: boolean = false) => {
        let color = final && Config.showFinalized ? Config.colors.white : Config.lines.tipColor;
        if (pivot) {
            color = final && Config.showFinalized ? Config.colors.white : Config.lines.pivotColor;
        }
        graphics.moveTo(p1.x, p1.y);
        graphics.lineTo(p2.x, p2.y);
        graphics.stroke({
            width: pivot ? Config.lines.pivotWidth : Config.lines.tipWidth,
            color: color
        });
        DrawUtil.drawArrow(graphics, p1, p2, color);
    }
}