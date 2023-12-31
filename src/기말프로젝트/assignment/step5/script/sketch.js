let bolts = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
}

function draw() {
  background(0);

  // 전기 업데이트 및 그리기
  for (let i = bolts.length - 1; i >= 0; i--) {
    bolts[i].update();
    bolts[i].display();
    if (bolts[i].isFinished()) {
      bolts.splice(i, 1);
    }
  }

  // 입자 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function mouseMoved() {
  let startX = pmouseX;
  let startY = pmouseY;
  let endX = mouseX;
  let endY = mouseY;
  createLightning(startX, startY, endX, endY);
}

function createLightning(startX, startY, endX, endY) {
  let bolt = new LightningBolt(startX, startY, endX, endY);
  bolts.push(bolt);

  // 전기가 번쩍일 때 입자 생성
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(bolt.segments[0].x, bolt.segments[0].y));
  }
}

class LightningBolt {
  constructor(startX, startY, endX, endY) {
    this.segments = [];
    this.segments.push(createVector(startX, startY));
    this.segments.push(createVector(endX, endY));
    this.life = 50; // 전기의 지속 시간
    this.color = color(random(255), random(255), random(255), 150); // 랜덤한 색상
  }

  update() {
    if (this.life > 0) {
      let lastSegment = this.segments[this.segments.length - 1];
      let newX = lerp(lastSegment.x, mouseX, 0.1);
      let newY = lerp(lastSegment.y, mouseY, 0.1);
      this.segments.push(createVector(newX, newY));
      this.life--;
    }
  }

  display() {
    for (let i = 0; i < this.segments.length - 1; i++) {
      let x1 = this.segments[i].x + noise(i) * 5;
      let y1 = this.segments[i].y + noise(i) * 5;
      let x2 = this.segments[i + 1].x + noise(i) * 5;
      let y2 = this.segments[i + 1].y + noise(i) * 5;

      stroke(
        this.color.levels[0],
        this.color.levels[1],
        this.color.levels[2],
        this.color.levels[3]
      );
      line(x1, y1, x2, y2);
    }
  }

  isFinished() {
    return this.life <= 0;
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 5));
    this.acceleration = createVector(0, 0.2);
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    let x2 = this.position.x + noise(this.position.x) * 5;
    let y2 = this.position.y + noise(this.position.y) * 5;

    strokeWeight(1); // 선의 굵기를 1로 설정
    stroke(255, this.lifespan); // 흰색
    line(this.position.x, this.position.y, x2, y2);
  }

  isFinished() {
    return this.lifespan <= 0;
  }
}
