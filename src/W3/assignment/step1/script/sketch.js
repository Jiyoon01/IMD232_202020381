let pos; // 현재 위치 벡터
let vel; // 현재 속도 벡터
let acc; // 현재 가속도 벡터

function setup() {
  createCanvas(400, 400);
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = p5.Vector.random2D(); // 초기 가속도를 무작위 방향으로 설정
  acc.mult(0.02); // 가속도 크기를 조절
}

function draw() {
  background(220);

  // 마우스 위치에서 원 그리기
  let target = createVector(mouseX, mouseY);
  stroke(0);
  noFill();
  ellipse(target.x, target.y, 20, 20);

  // 중력 시뮬레이션
  let gravity = createVector(0, 0.2);
  acc.add(gravity);

  // 속도에 가속도 더하기
  vel.add(acc);

  // 위치에 속도 더하기
  pos.add(vel);

  // 화면 경계 조정
  if (pos.x > width) {
    pos.x = 0;
  } else if (pos.x < 0) {
    pos.x = width;
  }

  if (pos.y > height) {
    pos.y = 0;
  } else if (pos.y < 0) {
    pos.y = height;
  }

  // 속도 벡터 시각화
  let velVisualization = p5.Vector.add(pos, p5.Vector.mult(vel, 10));
  line(pos.x, pos.y, velVisualization.x, velVisualization.y);

  // 가속도 벡터 시각화
  let accVisualization = p5.Vector.add(pos, p5.Vector.mult(acc, 100));
  line(pos.x, pos.y, accVisualization.x, accVisualization.y);

  // 현재 위치에 원 그리기
  fill(0);
  ellipse(pos.x, pos.y, 20, 20);
}
