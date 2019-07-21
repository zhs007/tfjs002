const BLOCK_WIDTH = 24;

const FLOOR_COLOR = 0xde3249;
const FLOOT_BORDCOLOR = 0x0e0e0e;

const PLAYER_COLOR = 0x00fefe;
const PLAYER_BORDCOLOR = 0x0e0e0e;

class Scene {
  constructor(game, length, bx, by) {
    this.game = game;
    this.blockLength = length;
    this.lstPlayer = [];

    const graph = new PIXI.Graphics();

    for (let i = 0; i < length; ++i) {
      graph.lineStyle(2, FLOOT_BORDCOLOR, 1);
      graph.beginFill(FLOOR_COLOR);
      graph.drawRect(i * BLOCK_WIDTH, -BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
      graph.endFill();
    }

    game.app.stage.addChild(graph);

    this.graph = graph;

    graph.x = bx;
    graph.y = by;

    graph.scale.y = -1;
  }

  addPlayer(lx, ly) {
    const player = new Player(this, lx, ly);

    this.lstPlayer.push(player);
  }
}

class Player {
  constructor(scene, lx, ly) {
    this.scene = scene;

    const graph = new PIXI.Graphics();

    graph.lineStyle(2, PLAYER_BORDCOLOR, 1);
    graph.beginFill(PLAYER_COLOR);
    graph.drawRect(0, 0, BLOCK_WIDTH, BLOCK_WIDTH);
    graph.endFill();

    graph.lineStyle(2, PLAYER_BORDCOLOR, 1);
    graph.beginFill(PLAYER_COLOR);
    graph.drawRect(0, BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
    graph.endFill();

    scene.graph.addChild(graph);

    graph.x = lx * BLOCK_WIDTH;
    graph.y = ly * BLOCK_WIDTH;
  }
}

class Game {
  constructor(app) {
    this.app = app;

    this.scene = new Scene(this, 100, 0, 300);
    this.scene.addPlayer(0, 0);
  }
}
