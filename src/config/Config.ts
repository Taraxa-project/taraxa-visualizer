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
        white: '#ffffff',
        blockInactive: '#a8a8a8',
        blockActive: '#0d984d',
        PBFTBlock:'#59b0ff',
    }
    static lines = {
        pivotWidth: 1,
        tipWidth: 1,
        pivotColor: '#464646',
        tipColor: '#a8a8a8'
    }

    static showFinalized = !true;
    static SECTOR_MOVE_SPEED = 0.5;
    static SECTOR_WIDTH = 200;
}