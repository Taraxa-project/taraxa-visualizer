export default class Config {

    static CENTER_POS = false;
    static DEFAULT_WIDTH = 1920;
    static DEFAULT_HEIGHT = 1080;
    static MAX_SECTORS = 100;
    static animateBlock = false;
    static animateBlockSurface = !false;
    static colors = {
        green: '#15ab5b',
        darkgreen: '#1d3838',
        darkback: '#151824',
        darkbacklight: '#202436',
        darkblue: '#31364b',
        yellow: '#fdbf08',
        blockcolor: '#0d984d',
        white: '#ffffff'
    }
    static lines = {
        pivotWidth: 1,
        tipWidth: 0.6,
        pivotColor:Config.colors.darkblue,
        tipColor:Config.colors.darkbacklight,
    }

    static showFinalized = !true;
    static SECTOR_MOVE_SPEED = 0.5;
    static SECTOR_WIDTH = 200;
}