let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0, 20);

  // 새로운 파티클 생성
  let p = new Particle();
  particles.push(p);

  // 파티클 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.size = random(10, 40);
    this.color = color(random(255), random(255), random(255), random(150, 200));
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.life = 255;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= 1;
  }

  display() {
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.life
    );
    ellipse(this.x, this.y, this.size, this.size);
  }

  isFinished() {
    return this.life <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
