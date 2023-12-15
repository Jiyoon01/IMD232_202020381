function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
}

let wave = {
  amplitude: 50,
  frequency: 0.02,
  phase: 0,
  speed: 0.05,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  noFill();
  stroke(0);
  strokeWeight(2);
  beginShape();

  for (let x = 0; x < width; x += 10) {
    const y = wave.amplitude * sin(wave.frequency * x + wave.phase);
    const distortion = map(noise(x * 0.01, frameCount * 0.005), 0, 1, -10, 10);

    // 추가된 부분: 마우스 위치에 따라 파장의 형태가 변화
    const distanceToMouse = dist(
      x + distortion,
      y + height / 2 + distortion,
      mouseX,
      mouseY
    );
    const influence = map(distanceToMouse, 0, width, 100, 0);

    curveVertex(
      x + distortion + mouseX * 0.01 * influence,
      y + height / 2 + distortion + mouseY * 0.01 * influence
    );
  }

  endShape();

  wave.phase += wave.speed;
}
