let ball;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  ball = new Mover(width / 2, 0, 50);
}

function draw() {
  ball.update();
  ball.edgeBounce();
  background('salmon');
  fill('white');
  ball.display();
}
