function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
}

let mic;
let fft;

function setup() {
  createCanvas(800, 400);

  // 마이크 입력 설정
  mic = new p5.AudioIn();
  mic.start();

  // FFT(Fast Fourier Transform) 객체 생성
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  // 주파수 스펙트럼 분석
  let spectrum = fft.analyze();

  noStroke();
  fill(255);

  // 주파수 스펙트럼을 바 형태로 그림
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
