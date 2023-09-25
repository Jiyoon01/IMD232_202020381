let ball;
let gravity;
let wind;
let att;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  //   ball = new Mover(width / 3, 0, 50);
  //   ball2 = new Mover((2 * width) / 3, 0, 10);
  //   gravity = createVector(0, 0.1);
  //   wind = createVector(-1, -0.01);
  //   att = new Attractor(width / 2, height);
}

function draw() {
  //   let g = p5.Vector.mult(gravity, ball.mass);
  //   ball.applyForce(g);
  //   let g2 = p5.Vector.mult(gravity, ball2.mass);
  //   ball2.applyForce(g2);
  //   if (mouseIsPressed) {
  //     ball.applyForce(wind);
  //     ball2.applyForce(wind);
  //   }
  ball.applyForce(att.Attract(ball));
  ball2.applyForce(att.Attract(ball2));
  ball.applyForce(force1);
  att.Attract(ball);
  att.Attract(ball2);
  ball.update();
  ball2.update();
  //   ball.edgeBounce();
  //   ball2.edgeBounce();
  background('salmon');
  fill('white');
  ball.display();
  ball2.display();
  att.display();
}
