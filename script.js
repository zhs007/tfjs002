window.addEventListener("load", function(event) {
  initGame();
});
// document.addEventListener("load", function() {
//   initGame();
// });

function initGame() {
  const app = new PIXI.Application({
    weight: 800,
    height: 600,
    antialias: true,
    transparent: true
  });
  document.body.appendChild(app.view);

  const graphics = new PIXI.Graphics();

  // Rectangle
  graphics.beginFill(0xde3249);
  graphics.drawRect(50, 50, 100, 100);
  graphics.endFill();

  app.stage.addChild(graphics);

  // Listen for animate update
  app.ticker.add(delta => {
    // rotate the container!
    // use delta to create frame-independent transform
    graphics.x += 0.1 * delta;
    // graphics.x += 0.01 * delta;
  });
}
