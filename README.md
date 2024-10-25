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
