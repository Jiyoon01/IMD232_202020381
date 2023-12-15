function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background(255);
}

// 이 클래스는 각 파티클(물방울)의 속성들을 표현합니다.
class Particle {
  // 파티클의 좌표값, 반경, 속도, 그리고 생명주기 설정
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.radius = random(10, 20);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-2, 2);
    this.life = 255; // 초기 생명주기
  }

  // 파티클 그리기
  drawParticle() {
    noStroke();
    fill(0, 0, 255, this.life);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  // 파티클 이동
  moveParticle() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  // 파티클 생명주기 감소
  decreaseLife() {
    this.life -= 2;
  }

  // 파티클이 소멸되었는지 확인
  isDead() {
    return this.life <= 0;
  }
}

// 복수의 파티클들을 추가하기 위한 배열
let particles = [];

function setup() {
  createCanvas(720, 400);
}

function draw() {
  background(255);

  // 모든 파티클 그리기 및 이동
  for (let i = 0; i < particles.length; i++) {
    particles[i].drawParticle();
    particles[i].moveParticle();
    particles[i].decreaseLife();

    // 파티클이 소멸되었을 경우 배열에서 제거
    if (particles[i].isDead()) {
      particles.splice(i, 1);
      i--;
    }
  }
}

// 마우스를 클릭할 때마다 새로운 파티클(물방울) 생성
function mouseClicked() {
  particles.push(new Particle());
}

// 마우스를 드래그하는 동안 파티클 계속 생성
function mouseDragged() {
  particles.push(new Particle());
}
