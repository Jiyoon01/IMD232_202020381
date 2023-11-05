let traffic; // Traffic 객체를 저장할 변수
let infiniteOffset = 80; // 물체가 캔버스 바깥 공간에서 허용되는 경계 길이

function setup() {
  // 초기 설정
  setCanvasContainer('canvas', 3, 2, true); // 3:2 비율로 캔버스 생성
  colorMode(HSL, 360, 100, 100, 100); // 색상 모드를 HSL로 설정 (색상: 360, 채도: 130, 명도: 100, 알파: 80)
  background(255); // 캔버스 배경을 흰색으로 설정
  traffic = new Traffic(); // Traffic 객체 생성
  for (let n = 0; n < 10; n++) {
    // 0부터 9까지 반복
    traffic.addVehicle(random(width), random(height)); // 무작위 위치에 새로운 물체 추가
  }
}

function draw() {
  // 계속해서 실행되는 부분
  background(255); // 캔버스를 다시 흰색으로 지우기
  traffic.run(); // 모든 물체들의 움직임과 상호작용 업데이트
}

function mouseDragged() {
  // 마우스를 드래그하는 동안
  traffic.addVehicle(mouseX, mouseY); // 새로운 물체를 마우스 위치에 추가
}
