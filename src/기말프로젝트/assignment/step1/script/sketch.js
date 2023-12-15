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
  strokeWeight(2);
  beginShape();

  for (let x = 0; x < width; x += 10) {
    const y = wave.amplitude * sin(wave.frequency * x + wave.phase);
    const distortion = map(noise(x * 0.01, frameCount * 0.005), 0, 1, -10, 10);
    curveVertex(x + distortion, y + height / 2 + distortion);
  }

  endShape();

  wave.phase += wave.speed;
}
