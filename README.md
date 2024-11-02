# Taraxa visual

### Description
This project initializes a **Node.js** package for building and testing a web application. It uses **Webpack** for managing debug and production builds.

### Installation
1. Initialize the project:
   ```bash
   npm init
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Build Commands
- **Debug Build**  
  ```bash
  npm run build:debug
  ```
  This command (`"build:debug": "npx webpack --config webpack.config.debug.js"`) generates a debug build with live page updates.

- **Production Build**  
  ```bash
  npm run build:production
  ```
  This command (`"build:production": "npx webpack --config webpack.config.production.js"`) generates a final production build in `dist.production`, with `main.min.js` as the output.

### Project Structure
- **Entry Point**: `App.ts`
  - Initializes main classes:
    ```typescript
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
    ```

- **Main Classes**:
  - `MainView`: Manages visual components
    - `contHighlight`, `contGraphics`, and `contGraphicsFinal`: Graphics containers used to draw lines and connections, cleared each frame.
    - `cont`: Contains `SectorView` instances, each managing animated `BlockView` elements.
  - `MainModel`: Handles data collection and management.
  - `MainController`: Connects `MainView` and `MainModel`.


Create texture for the block in MainView.ts
    ```typescript
        let hx = new Graphics();
        hx.rect(0, 0, 80, 80)
            .fill(Config.colors.blockInactive)
        CustomTextures.textures.hex = app.renderer.generateTexture(hx);
    ```
Use https://pixijs.com/8.x/guides/components/graphics API to create new shape form

To use custom sprite it need to load it first as image

```typescript
await PIXI.Assets.load('sample.png');
let sprite = PIXI.Sprite.from('sample.png');
```

And use in BlockView.ts instead of

```typescript
const obj = new Sprite(CustomTextures.textures.hex);
obj.anchor.set(0.5);
this.addChild(obj)
```

to
```typescript
const obj = PIXI.Sprite.from('sample.png');
obj.anchor.set(0.5);
this.addChild(obj)
```

BlockView has only 1 animation of moving to own positions
```typescript
 this.moveTo = (pos: number) => {
            if (fin != pos) {
                fin = pos;
                gsap.to(this, {
                    y: fin,
                    duration: 0.5, // продолжительность анимации в секундах
                    ease: "sine.out",
                });
            }
        }
```

All animations based on GSAP
- **https://gsap.com/docs/v3/GSAP/gsap.to()**



All sectors with blocks inside are moving in MainView.ts in 'cont' container, so, we move only container with all sectors
```typescript
 let moveSectorsTo = (instant = false) => {
            let val: number;
            let speed = Config.SECTOR_MOVE_SPEED;

            if (active)
                val = Config.DEFAULT_WIDTH / 2 - (this.sectors[selectedSector].x) * zoom;
            else
                val = Config.DEFAULT_WIDTH / 2 - (this.sectors[selectedSector].x + 100) * zoom;

            if (instant)
                speed = 0;

//stop all animations of existing containers 
            gsap.killTweensOf([
                contHighlight,
                contGraphics,
                contGraphicsFinal,
                cont
            ]);
//start again and move to new position 'val' with speed 'speed'
            gsap.to([
                contHighlight,
                contGraphics,
                contGraphicsFinal,
                cont
            ], {
                x: val,
                duration: speed, // продолжительность анимации в секундах
                ease: easeType,
            });
        }
```
