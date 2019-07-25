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
    this.bx = bx;
    this.by = by;
    this.lx = 0;
    this.ly = 0;

    const graph = new PIXI.Graphics();

    for (let i = 0; i < length; ++i) {
      graph.lineStyle(2, FLOOT_BORDCOLOR, 1);
      graph.beginFill(FLOOR_COLOR);
      graph.drawRect(i * BLOCK_WIDTH, -BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
      graph.endFill();

      const ct = new PIXI.Text(i);
      ct.x = i * BLOCK_WIDTH + BLOCK_WIDTH / 2;
      ct.y = -BLOCK_WIDTH + BLOCK_WIDTH / 2;
      ct.scale.y = -1;
      ct.anchor.set(0.5);

      if (i >= 10) {
        ct.style.fontSize = ct.style.fontSize - 2;
      }

      graph.addChild(ct);

      console.log(i + ' : ' + JSON.stringify(ct.getBounds()));
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

    return player;
  }

  move(lx, ly) {
    this.lx = lx;
    this.ly = ly;

    this.graph.x = this.bx + lx * BLOCK_WIDTH;
    this.graph.y = this.by + ly * BLOCK_WIDTH;
  }
}

class Player {
  constructor(scene, lx, ly) {
    this.scene = scene;

    // this.lx = lx;
    // this.ly = ly;

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

    // graph.x = lx * BLOCK_WIDTH;
    // graph.y = ly * BLOCK_WIDTH;

    this.graph = graph;

    this.move(lx, ly);
  }

  move(lx, ly) {
    this.lx = lx;
    this.ly = ly;

    this.graph.x = lx * BLOCK_WIDTH;
    this.graph.y = ly * BLOCK_WIDTH;
  }
}

class Game {
  constructor(app) {
    this.app = app;

    this.scene = new Scene(this, 100, 0, 300);
    this.player = this.scene.addPlayer(0, 0);

    this.curtick = 0;

    app.ticker.add(delta => {
      this.curtick++;

      if (this.curtick % 100 != 0) {
        return;
      }

      this.scene.move(this.scene.lx - 1, this.scene.ly);

      this.player.move(this.player.lx + 1, Math.floor(Math.random() * 2));
    });

    window.addEventListener('keydown', e => {
      console.log('keydown ' + e.code);
    });
  }

  onIdle() {}
}
