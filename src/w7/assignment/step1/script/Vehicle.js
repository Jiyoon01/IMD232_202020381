class Vehicle {
  // Vehicle 클래스
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    // 처음 생성할때 (x좌표, y좌표, 질량, 반지름, 최대속도, 최대힘, 색)을 넣어 생성
    this.pos = createVector(x, y); // 초기위치 (x, y)로 설정
    this.vel = p5.Vector.random2D(); // 1크기의 랜덤한 방향의 초기속도 설정
    this.acc = createVector(); // 초기 가속도 0으로 설정
    this.mass = mass; // 질량을 입력된 mass값(1)으로 설정
    this.rad = rad; // 반지름을 입력된 rad값(12)으로 설정
    this.speedMx = speedMx; // 최대속도를 입력된 speedMx값(5)으로 설정
    this.forceMx = forceMx; // 최대로 가해지는 힘를 입력된 forceMx값(0.1)으로 설정
    this.neighborhooodRad = 50; // 물체 사이의 영향을 받는 범위의 반지름을 50으로 설정
    this.color = color; // 물체를 칠할 색을 입력된 color값으로 설정
  }

  cohesion(others) {
    // 범위 내에 있는 다른 물체들과 가까워지기
    let cnt = 0; // 영향을 받는 범위 내에 있는 물체의 개수
    const steer = createVector(0, 0); // 영향을 받는 물체의 위치값을 모두 더할 변수
    others.forEach((each) => {
      // 모든 객체에 대하여
      if (each !== this) {
        // 자기 자신과 비교하는 것이 아니라면
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2; // 두 물체 사이의 거리 계산해서
        if (distSq < this.neighborhooodRad ** 2) {
          // 만약 물체가 서로 영향을 받는 범위 내에 있다면
          steer.add(each.pos); // 이 물체의 위치를 더하기
          cnt++; // 범위 내에 있다면 cnt 1증가
        }
      }
    });
    if (cnt > 0) {
      // 만약 범위 내에 다른 물체가 있다면
      steer.div(cnt); // 범위 내의 모든 물체의 위치의 평균값 계산
      steer.sub(this.pos); // 내 무리의 평균 위치에서 내 위치를 뺀다(평균 위치로 향하는 벡터 획득)
      steer.setMag(this.speedMx); // 물체의 속도를 최고속도로 하여
      steer.sub(this.vel); // 구한 벡터값에서 내 속도벡터를 뺸다(평균 위치에 내가 점차 다가가기 위해서)
      steer.limit(this.forceMx); // steer값이 forceMx을 넘는다면 forceMx로 설정
    }
    return steer; // 힘 더해주기
  }

  align(others) {
    // 범위 내에 있는 모든 물체의 군중 활동
    let cnt = 0; // 범위 내의 물체의 개수
    const steer = createVector(0, 0); // 내가 향해야 하는 방향 계산
    others.forEach((each) => {
      // 존재하는 모든 물체에 대하여
      if (each !== this) {
        // 자기 자신이 아니라면
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2; // 두 물체 사이의 거리를 구하고
        if (distSq < this.neighborhooodRad ** 2) {
          // 만약 영향을 받는 범위 내에 있다면
          steer.add(each.vel); // 이 물체의 속도 벡터의 합 더하기
          cnt++; // 범위 내에 있는 물체라면 cnt 1증가
        }
      }
    });
    if (cnt > 0) {
      // 만약 범위 내에 물체가 있다면
      steer.div(cnt); // 범위 내의 물체의 속도벡터의 평균 계산
      steer.setMag(this.speedMx); // 속도는 최고속도 설정
      steer.sub(this.vel); // 범위 내의 물체의 속도벡터에 내 속도벡터를 뺀다(속도벡터에 점차 비슷하게 하기 위해서)
      steer.limit(this.forceMx); // 힘의 최댓값은 forceMx로 지정
    }
    return steer; // 힘 더해주기
  }

  separate(others) {
    // 물체가 부딪히면 튕겨주기
    let cnt = 0; // 부딪힌 물체의 개수
    const steer = createVector(0, 0); // 내가 튕겨져 나가야 하는 방향 계산
    others.forEach((each) => {
      // 모든 물체에 대하여
      if (each !== this) {
        // 자기 자신이 아닌 경우
        const dist = this.pos.dist(each.pos); // 물체 사이의 거리 계산
        if (dist > 0 && this.rad + each.rad > dist) {
          // 두 원의 반지름이 두 원의 중심점 사이의 거리(물체 사이의 거리)보다 큰 경우(두 물체가 부딪힌 경우)
          const distNormal = dist / (this.rad + each.rad); // 물체 사이의 거리를 반지름의 합으로 나누어준다(충분히 작은 값으로 정규화)
          const towardMeVec = p5.Vector.sub(this.pos, each.pos); // 물체가 내 위치로 향하는 벡터 계산
          towardMeVec.setMag(1 / distNormal); // 충분히 작은 값이었던 정규화된 거리를 충분히 큰값으로 만든다
          steer.add(towardMeVec); // 이 물체에 대해 내가 튕겨져가야 하는 방향 더하기
          cnt++; // 부딪혔다면 cnt 1 증가
        }
      }
    });
    if (cnt > 0) {
      // 내가 부딪힌 물체가 있다면
      steer.div(cnt); // 방향의 평균을 내서
      steer.setMag(this.speedMx); // 속도는 최고속도로
      steer.sub(this.vel); // 내 속도를 점차 이 방향으로 향하게 만든다
      steer.limit(this.forceMx); // 힘의 최대치를 forceMx로 한다
    }
    return steer; // 힘 더해주기
  }

  applyForce(force) {
    // 물체에 힘 가하기
    const forceDivedByMass = p5.Vector.div(force, this.mass); // 힘을 질량으로 나누어 가속도 계산
    this.acc.add(forceDivedByMass); // 가속도 합치기
  }

  update() {
    // 물체의 위치, 속도, 가속도 업데이트
    this.vel.add(this.acc); // 속도에 가속도 더하기
    this.vel.limit(this.speedMx); // 속도의 값이 speedMx이 넘는 경우 speedMx로 조정
    this.pos.add(this.vel); // 위치에 속도 더하기
    this.acc.mult(0); // 한번 쓴 가속도는 누적되기에 0으로 초기화
  }

  borderInfinite() {
    // 물체가 경계에 나갔는지 확인
    if (this.pos.x < -infiniteOffset) {
      // 물체가 왼쪽 경계에 도달했다면
      this.pos.x = width + infiniteOffset; // 오른쪽 경계에서 등장
    } else if (this.pos.x > width + infiniteOffset) {
      // 물체가 오른쪽 경계에 도달했다면
      this.pos.x = -infiniteOffset; // 왼쪽 경계에서 등장
    }
    if (this.pos.y < -infiniteOffset) {
      // 물체가 위쪽 경계에 도달했다면
      this.pos.y = height + infiniteOffset; // 아래쪽 경계에서 등장
    } else if (this.pos.y > height + infiniteOffset) {
      // 물체가 아래쪽 경계에 도달했다면
      this.pos.y = -infiniteOffset; // 위쪽 경계에서 등장
    }
  }

  display() {
    // 물체 그리기
    push(); // 새로운 드로잉 설정 시작
    translate(this.pos.x, this.pos.y); // 물체의 위치를 새로운
    rotate(this.vel.heading()); // 현재 물체의 캔버스 차원 회전
    noStroke(); // 물체의 윤곽선 없음
    fill(this.color); // 물체의 색을 color으로 채우기
    beginShape(); // 도형 그리기 시작
    vertex(this.rad, 0); // 현재 위치에서 (rad, 0)까지 선 그리기
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135))); // 현재 위치에서 (rad*cos(-135), rad*sin(-135))까지 선 그리기
    vertex(0, 0); // 현재 위치에서 (0, 0)까지 선 그리기
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135))); // 현재 위치에서 (rad*cos(135), rad*sin(135))까지 선 그리기
    endShape(CLOSE); // 도형 그리기 종료
    pop(); // 이전 드로잉 설정 복원
  }
}
