let ball;
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  ball = new Mover(width / 2, 0, 50);
  gravity = createVector(0, 0.1);
  wind = createVector(-1, -0.01);
}

function draw() {
  ball.applyForce(gravity);
  if (mouseIsPressed) {
    ball.applyForce(wind);
  }
  ball.update();
  ball.edgeBounce();
  background('salmon');
  fill('white');
  ball.display();
}
