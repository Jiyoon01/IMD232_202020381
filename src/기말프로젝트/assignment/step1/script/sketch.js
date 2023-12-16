let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  // 마우스 위치에 따라 다양한 크기의 원 생성
  let circle = new Circle(mouseX, mouseY);
  circles.push(circle);

  // 생성된 모든 원을 업데이트하고 표시
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();
    if (circles[i].isFinished()) {
      circles.splice(i, 1);
    }
  }
}

class Circle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(10, 50);
    this.color = color(random(255), random(255), random(255), 150);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.alpha = 255;
    this.flashDuration = 10; // 번쩍이는 효과의 지속 시간
    this.flashFrame = 0; // 현재 프레임에서의 번쩍이는 효과 지속 시간
  }

  update() {
    if (this.flashFrame > 0) {
      this.flashFrame--;
      this.color = color(255, 255, 255); // 번쩍이는 효과의 색상
    } else {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= 1;
      this.color = color(random(255), random(255), random(255), 150);
    }
  }

  display() {
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

  flash() {
    this.flashFrame = this.flashDuration;
  }
}

function mouseMoved() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].flash();
  }
}
