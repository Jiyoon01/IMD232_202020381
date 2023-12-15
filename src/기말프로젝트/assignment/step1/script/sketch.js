let bolts = [];

function setup() {
  createCanvas(800, 600);
  strokeWeight(4); // 선분의 두께를 8로 설정
}

function draw() {
  background(0); // 검은 배경

  for (let i = bolts.length - 1; i >= 0; i--) {
    bolts[i].update();
    bolts[i].show();
    if (bolts[i].isFinished()) {
      bolts.splice(i, 1);
    }
  }
}

function mouseMoved() {
  let bolt = new Bolt(mouseX, mouseY);
  bolts.push(bolt);
}

class Bolt {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = random(60, 90);
    this.angle = random(TWO_PI);
    this.branches = 30; // 번개의 갈래 수를 2로 설정
    this.branchLengthFactor = 0.75; // 갈래의 길이 비율
    this.life = 200; // 번개가 화면에 유지되는 시간 (조절 가능)
  }

  update() {
    this.life--;
  }

  show() {
    stroke(255, 240, 0, this.life);
    for (let i = 0; i < this.branches; i++) {
      let endX = this.x + cos(this.angle) * this.length;
      let endY = this.y + sin(this.angle) * this.length;

      line(this.x, this.y, endX, endY);

      this.x = endX;
      this.y = endY;

      this.angle += random(-PI / 3, PI / 3);
      this.length *= this.branchLengthFactor;
    }
  }

  isFinished() {
    return this.life <= 0;
  }
}
