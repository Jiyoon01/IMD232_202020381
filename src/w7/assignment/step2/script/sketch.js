let balloons = [];
let particles = [];
const numBalloons = 20; // 더 많은 풍선 추가

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numBalloons; i++) {
    balloons.push(new Balloon(random(width), random(height)));
  }
}

function draw() {
  background('#87CEEB'); // 하늘색 배경

  for (let balloon of balloons) {
    balloon.update();
    balloon.display();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let balloon of balloons) {
    let d = dist(mouseX, mouseY, balloon.x, balloon.y);
    if (d < balloon.size / 2) {
      balloon.burst();
    }
  }
}

class Balloon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 100); // 크기 다양하게 설정
    this.color = color(random(255), random(255), random(255));
    this.bursting = false;
    this.lineLength = this.size * 0.75; // 선의 초기 길이 설정
    this.ySpeed = random(1, 3); // 더 빠른 속도로 이동
  }

  update() {
    if (!this.bursting) {
      this.y -= this.ySpeed;
      if (this.y < -this.size) {
        this.y = height + this.size;
      }
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size * 1.5);

    // 풍선의 줄 그리기
    fill(139, 69, 19);
    strokeWeight(2);
    if (!this.bursting) {
      line(
        this.x,
        this.y + this.size * 0.75,
        this.x,
        this.y + this.size * 0.75 + this.lineLength
      );
    }
  }

  burst() {
    this.bursting = true;
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
    this.size = 5;
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = random(2, 5);
    this.xSpeed = random(-3, 3); // 더 빠른 속도로 이동
    this.ySpeed = random(-3, 3); // 더 빠른 속도로 이동
    this.alpha = 255;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      this.alpha
    );
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isFinished() {
    return this.alpha <= 0;
  }
}
