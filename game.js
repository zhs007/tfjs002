const BLOCK_WIDTH = 24;

const FLOOR_COLOR = 0xfefefe;

class Scene {
  constructor(game, length, bx, by) {
    this.game = game;
    this.blockLength = length;

    const graph = new PIXI.Graphics();

    graph.beginFill(FLOOR_COLOR);

    for (let i = 0; i < length; ++i) {
      graph.drawRect(
        bx + i * BLOCK_WIDTH,
        by,
        bx + i * BLOCK_WIDTH + BLOCK_WIDTH,
        by + bx + i * BLOCK_WIDTH
      );
    }

    graph.endFill();

    game.app.stage.addChild(graph);
  }
}

class Player {
  constructor(game) {
    this.game = game;
  }
}

class Game {
  constructor(app) {
    this.app = app;

    this.scene = new Scene(this, 100, 0, 300);
  }
}
