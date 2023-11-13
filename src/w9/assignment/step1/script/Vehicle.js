class Vehicle {
  // Vehicle 클래스
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    // (x좌표, y좌표, 질량, 반지름, 최대속도, 최대힘, 색)을 넣어 생성
    this.pos = createVector(x, y); // 현재 위치를 (x, y)로 설정
    this.vel = p5.Vector.random2D(); // 초기 속도를 무작위 방향으로 설정
    this.acc = createVector(); // 초기 가속도를 0으로 설정
    this.mass = mass; // 질량을 입력된 값으로 설정
    this.rad = rad; // 반지름을 입력된 값으로 설정
    this.speedMx = speedMx; // 최대 속도를 입력된 값으로 설정
    this.forceMx = forceMx; // 최대 힘을 입력된 값으로 설정
    this.neighborhooodRad = 50; // 다른 물체와의 상호작용 범위의 반지름을 50으로 설정
    this.color = color; // 물체를 그릴 때 사용할 색상을 입력된 값으로 설정
  }

  cohesion(others) {
    // 주변 물체와 가까워지기
    let cnt = 0; // 영향을 받는 주변 물체의 개수
    const steer = createVector(0, 0); // 영향을 받는 물체의 위치를 더한 벡터
    others.forEach((each) => {
      // 모든 객체에 대해
      if (each !== this) {
        // 자기 자신이 아닌 경우
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2; // 두 물체 사이의 거리 계산해서
        if (distSq < this.neighborhooodRad ** 2) {
          // 물체가 상호작용 범위 내에 있는 경우
          steer.add(each.pos); // 다른 물체의 위치를 더함
          cnt++; // 범위 내에 있는 물체 개수 증가
        }
      }
    });
    if (cnt > 0) {
      // 범위 내에 다른 물체가 있다면
      steer.div(cnt); // 범위 내의 모든 물체의 위치의 평균값 계산
      steer.sub(this.pos); // 평균 위치에서 현재 위치를 빼서 (평균 위치로 향하는 벡터 획득)
      steer.setMag(this.speedMx); // 물체의 속도를 최대 속도로 설정
      steer.sub(this.vel); // 계산된 벡터에서 현재 속도 벡터를 뺌 (평균 위치로 가기 위해)
      steer.limit(this.forceMx); // steer 벡터의 힘을 최대 힘으로 제한
    }
    return steer; // 힘을 반환
  }

  align(others) {
    // 주변 물체와의 군집 활동
    let cnt = 0; // 범위 내의 물체 개수
    const steer = createVector(0, 0); // 나아갈 방향을 계산하는 벡터
    others.forEach((each) => {
      // 모든 물체에 대해
      if (each !== this) {
        // 자신이 아닌 경우
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2; // 두 물체 사이의 거리 제곱 계산
        if (distSq < this.neighborhooodRad ** 2) {
          // 물체가 상호작용 범위 내에 있는 경우
          steer.add(each.vel); // 다른 물체의 속도 벡터를 더함
          cnt++; // 범위 내의 물체 개수 증가
        }
      }
    });
    if (cnt > 0) {
      // 범위 내에 물체가 있다면
      steer.div(cnt); // 범위 내의 물체의 속도 벡터의 평균을 계산
      steer.setMag(this.speedMx); // 속도를 최대 속도로 설정
      steer.sub(this.vel); // 범위 내의 물체 속도 벡터에서 현재 벡터속도를 뺌 (비슷한 방향으로 가기 위해)
      steer.limit(this.forceMx); // 힘을 최대 힘으로 제한
    }
    return steer; // 힘을 반환
  }

  separate(others) {
    // 다른 물체와 충돌 시 튕겨내기
    let cnt = 0; // 충돌한 물체 개수
    const steer = createVector(0, 0); // 나가야 할 방향을 계산하는 벡터
    others.forEach((each) => {
      // 모든 물체에 대해
      if (each !== this) {
        // 자신이 아닌 경우
        const dist = this.pos.dist(each.pos); // 두 물체 사이의 거리 계산
        if (dist > 0 && this.rad + each.rad > dist) {
          // 두 물체가 충돌한 경우 (두 물체의 반지름 합보다 거리가 짧은 경우)
          const distNormal = dist / (this.rad + each.rad); // 거리를 정규화
          const towardMeVec = p5.Vector.sub(this.pos, each.pos); // 다른 물체가 현재 위치로 향하는 벡터 계산
          towardMeVec.setMag(1 / distNormal); // 정규화된 거리를 크게 만듦
          steer.add(towardMeVec); // 다른 물체가 튕겨나가야 하는 방향을 더함
          cnt++; // 충돌한 경우 개수 증가
        }
      }
    });
    if (cnt > 0) {
      // 충돌한 물체가 있다면
      steer.div(cnt); // 방향의 평균을 계산하여
      steer.setMag(this.speedMx); // 속도를 최대 속도로 설정
      steer.sub(this.vel); // 현재 속도를 해당 방향으로 향하게 만듦
      steer.limit(this.forceMx); // 힘을 최대 힘으로 제한
    }
    return steer; // 힘을 반환
  }

  applyForce(force) {
    // 물체에 힘을 적용
    const forceDivedByMass = p5.Vector.div(force, this.mass); // 힘을 질량으로 나누어 가속도 계산
    this.acc.add(forceDivedByMass); // 가속도 더하기
  }

  update() {
    // 물체의 위치, 속도, 가속도 업데이트
    this.vel.add(this.acc); // 가속도에 가속도를 더함
    this.vel.limit(this.speedMx); // 속도가 최대 속도를 넘는 경우 최대 속도로 제한
    this.pos.add(this.vel); // 위치에 속도를 더함
    this.acc.mult(0); // 사용된 가속도 초기화
  }

  borderInfinite() {
    // 물체가 경계를 넘었는지 확인
    if (this.pos.x < -infiniteOffset) {
      // 왼쪽 경계를 넘은 경우
      this.pos.x = width + infiniteOffset; // 오른쪽 경계에서 다시 나타남
    } else if (this.pos.x > width + infiniteOffset) {
      // 오른쪽 경계를 넘은 경우
      this.pos.x = -infiniteOffset; // 왼쪽 경계에서 다시 나타남
    }
    if (this.pos.y < -infiniteOffset) {
      // 위쪽 경계를 넘은 경우
      this.pos.y = height + infiniteOffset; // 아래쪽 경계에서 다시 나타남
    } else if (this.pos.y > height + infiniteOffset) {
      // 아래쪽 경계를 넘은 경우
      this.pos.y = -infiniteOffset; // 위쪽 경계에서 다시 나타남
    }
  }

  display() {
    // 물체 그리기
    push(); // 새로운 그리기 설정 시작
    translate(this.pos.x, this.pos.y); // 현재 위치로 이동
    rotate(this.vel.heading()); // 현재 물체의 방향으로 회전
    noStroke(); // 윤곽선 없음
    fill(this.color); // 물체를 색칠
    beginShape(); // 도형 그리기 시작

    // 베젤 곡선을 사용하여 하트 모양 정의
    let x = 0;
    let y = 0;
    let h = this.rad;
    beginShape();
    vertex(x, y);
    bezierVertex(x - h / 2, y - h / 2, x - h, y + h / 3, x, y + h);
    bezierVertex(x + h, y + h / 3, x + h / 2, y - h / 2, x, y);
    endShape(CLOSE);

    endShape(CLOSE); // 도형 그리기 종료
    pop(); // 이전 드로잉 설정 복원
  }
}
