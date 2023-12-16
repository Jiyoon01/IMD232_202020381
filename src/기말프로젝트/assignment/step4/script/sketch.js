let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0, 20);

  // 파티클 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function mouseMoved() {
  // 마우스 움직임에 반응하는 파티클 생성
  let p = new ColorfulMouseTrailParticle(mouseX, mouseY);
  particles.push(p);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 40);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.life = 255;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= 1;
  }

  display() {
    fill(255, this.life);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isFinished() {
    return this.life <= 0;
  }
}

class ColorfulMouseTrailParticle extends Particle {
  constructor(x, y) {
    super(x, y);
    // 랜덤한 색상 설정
    this.color = color(random(255), random(255), random(255), random(150, 200));
  }

  update() {
    // 다양한 움직임 추가
    this.x += sin(frameCount * 0.1) * 2;
    this.y += cos(frameCount * 0.1) * 2;
    // 마우스 움직임에 따라 위치 업데이트
    this.x += (mouseX - this.x) * 0.05;
    this.y += (mouseY - this.y) * 0.05;
    this.life -= 1;
  }

  display() {
    // 다양한 색상 적용
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.life
    );
    ellipse(this.x, this.y, this.size, this.size);
  }
}
