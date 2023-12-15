var ps;
var time,
  ptime = 0;
var offset;
var origin;
var bg = 0;

// yellow, pink, blue, green
var colors = ['#FFE300', '#FF7494', '#00E6FF', '#89FF47'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ps = new ParticleSystem();
  background(87, 6, 140);
  offset = createVector(random(1000), random(1000));
  origin = createVector(width / 2, height / 2);
}

function draw() {
  if (bg % 2 == 0) background(87, 6, 140, 20);
  else background(0, 0, 0, 20);

  if (millis() - ptime > 800) {
    var step = createVector(noise(offset.x) - 0.5, noise(offset.y) - 0.5);
    step.mult(10);
    var pos = p5.Vector.add(origin, step);
    if (pos.x > width) pos.x -= width;
    if (pos.x < 0) pos.x += width;
    if (pos.y > height) pos.y -= height;
    if (pos.y < 0) pos.y += height;
    ps.addParticle(pos, origin);
    origin = pos;
    offset.x += 0.01;
    offset.y += 0.01;
    ptime = millis();
  }

  ps.follow(mouseX, mouseY);
  ps.run();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
  bg++;
}

var Particle = function (pos, ppos) {
  this.pos = pos.copy();
  this.col = random(colors);
  this.size = random(5, 30);
  this.fill = random([0, 1]);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.offset = createVector(random(0, 1000), random(0, 1000));

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.pos.add(
      createVector(
        10 * (noise(this.offset.x) - 0.5),
        10 * (noise(this.offset.y) - 0.5)
      )
    );
    this.offset.x = this.offset.x + 0.01;
    this.offset.y = this.offset.y + 0.01;
    this.size = this.size * 0.95;
    this.acceleration.mult(0);
    if (this.velocity.mag() > 1) this.velocity.mult(0.95);
  };

  this.isDead = function () {
    return this.size < 1;
  };

  this.render = function () {
    if (this.fill == 1) {
      noStroke();
      fill(this.col);
    } else {
      noFill();
      stroke(this.col);
    }
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  };

  this.follow = function (targetX, targetY) {
    var force = createVector(targetX, targetY);
    force.sub(this.pos);
    force.setMag(0.2);
    this.applyForce(force);
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };
};

var ParticleSystem = function () {
  this.particles = [];

  this.addParticle = function (pos, ppos) {
    this.particles.push(new Particle(pos, ppos));
  };

  this.run = function () {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.update();
      p.render();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  };

  this.follow = function (targetX, targetY) {
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].follow(targetX, targetY);
    }
  };
};
