function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
}

let wave = {
  amplitude: 50,
  frequency: 0.02,
  phase: 0,
  speed: 0.1,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  beginShape();
  for (let x = 0; x < width; x += 10) {
    const y = wave.amplitude * sin(wave.frequency * x + wave.phase);
    vertex(x, y + height / 2);
  }
  endShape();

  wave.phase += wave.speed;
}
