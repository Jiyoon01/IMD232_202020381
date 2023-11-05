let traffic; // Traffic 클래스를 담을 변수
let infiniteOffset = 80; // 물체가 캔버스 밖 공간에서의 허용되는 경계의 길이

function setup() {
  // 최초 1회 세팅
  setCanvasContainer('canvas', 3, 2, true); // index.html의 body에 3:2 비율로 캔버스 생성
  colorMode(HSL, 360, 100, 100, 100); // HSL 형식으로 색조:360, 채도:100, 명도:100, 범위:100 설정
  background('white'); // 캔버스 흰색으로 칠하기
  traffic = new Traffic(); // Traffic 객체 생성
  for (let n = 0; n < 10; n++) {
    // n이 0부터 9까지 1씩 증가하면서
    traffic.addVehicle(random(width), random(height)); // 캔버스의 랜덤한 위치에 새로운 Vehicle 생성
  }
}

function draw() {
  // 계속 반복
  background('white'); // 캔버스 흰색으로 칠하기
  traffic.run(); // 각각의 객체마다 위치, 속도, 가속도, 힘 설정
}

function mouseDragged() {
  // 마우스를 드래깅하는 동안
  traffic.addVehicle(mouseX, mouseY); // 새로운 객체 생성
}
