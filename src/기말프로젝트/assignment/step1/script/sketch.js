function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
}

let fire;
let flameSound;

function preload() {
  flameSound = loadSound('flame.mp3'); // 적절한 화염 소리 파일을 사용하세요
}

function setup() {
  createCanvas(800, 500);
  fire = new Fire(width / 2, height - 50);
  frameRate(30);
}

function draw() {
  background(0);

  fire.update();
  fire.display();
}

function mousePressed() {
  if (!flameSound.isPlaying()) {
    flameSound.play();
  }
}

class Fire {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 120;
    this.intensity = 1.5;
  }

  update() {
    this.size = noise(frameCount * 0.02) * 150 + 50;
    this.intensity = noise(frameCount * 0.05) * 3 + 1;
  }

  display() {
    let fireColor = color(255, 150, 0, 200);

    for (let i = 0; i < 20; i++) {
      let offsetX = random(-50, 50);
      let offsetY = random(-50, 50);

      let d = dist(this.x, this.y, mouseX + offsetX, mouseY + offsetY);

      let alpha = map(d, 0, 200, 255, 0);
      alpha = constrain(alpha, 0, 255);

      fill(
        fireColor.levels[0],
        fireColor.levels[1],
        fireColor.levels[2],
        alpha
      );

      let size = this.size + random(-20, 20);

      // 장작을 피웠을 때 타오르는 불의 형태로 변경
      let flameShape = sin((frameCount + i) * 0.1) * 20; // Sin 곡선 모양
      ellipse(this.x + offsetX, this.y + offsetY + flameShape, size, size);
    }
  }
}
