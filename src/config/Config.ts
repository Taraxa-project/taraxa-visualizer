export default class Config {

    static DEFAULT_WIDTH = 1920;
    static DEFAULT_HEIGHT = 1080;
    static MAX_SECTORS = 100;

    static animations = {
        ease: 'sine.inOut'
    }
    static SERVER: string = 'wss://ws.mainnet.taraxa.io';

    static colors = {
        green: '#15ab5b',
        darkgreen: '#1d3838',
        darkback: '#000000',
        darkbacklight: '#111814',
        darkblue: '#31364b',
        yellow: '#fdbf08',
        blockcolor: '#15AC5B',
        white: '#ffffff',
        blockInactive: '#232323',
        blockActive: '#15AC5B',
        PBFTBlock: '#A594FC',
    }
    static FONTS = {
        block: 20,
        blockPBFT: 20,
        sectorTimeLineSize: 20,
        sectorTimeLineColor: Config.colors.white,
    }
    static lines = {
        pivotWidth: 2,
        tipWidth: 2,
        pivotColor: '#ffffff',
        tipColor: '#757575',
        arrowOffset: 42,
        arrowHeadLength: 20,
        arrowHeadWidth: 8,
    }

    static showFinalized = false;
    static SECTOR_MOVE_SPEED = 1;
    static SECTOR_WIDTH = 200;
}