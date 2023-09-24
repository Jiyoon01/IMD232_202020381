// 이 코드는 벡터를 배우는 시점에는 이해하려 하지마세요

const sliderMap = new Map();

const bezierEasingGraphSize = 400;
let bottomLeftX;
let bottomLeftY;
let cpAX;
let cpAY;
let cpBX;
let cpBY;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  bottomLeftX = width / 2 - bezierEasingGraphSize / 2;
  bottomLeftY = height / 2 + bezierEasingGraphSize / 2;
  initGraph();

  background(240);
}

function draw() {
  background(240);
  renderCubicBezierEasingGraph(
    bottomLeftX,
    bottomLeftY,
    bezierEasingGraphSize,
    cpAX,
    cpAY,
    cpBX,
    cpBY,
    convertMouseXToT()
  );
}

const updateCp = (elem) => {
  const cpVal = Number(elem.value);
  sliderMap.get(elem).innerHTML = cpVal.toFixed(6);
  switch (elem.id) {
    case 'sliderCpAX':
      cpAX = cpVal;
      break;
    case 'sliderCpAY':
      cpAY = cpVal;
      break;
    case 'sliderCpBX':
      cpBX = cpVal;
      break;
    case 'sliderCpBY':
      cpBY = cpVal;
      break;
  }
};

const sliderCb = (evt) => {
  updateCp(evt.target);
};

const initGraph = () => {
  document.querySelectorAll('.cpSlider').forEach((eachCpSlider) => {
    sliderMap.set(
      eachCpSlider,
      document.querySelector(`#${eachCpSlider.id.replace('slider', 'val')}`)
    );
    eachCpSlider.addEventListener('input', sliderCb);
    updateCp(eachCpSlider);
  });
};

const convertMouseXToT = () => {
  const constrainedX = constrain(
    mouseX,
    bottomLeftX,
    bottomLeftX + bezierEasingGraphSize
  );
  return map(
    constrainedX,
    bottomLeftX,
    bottomLeftX + bezierEasingGraphSize,
    0,
    1
  );
};

const getCubicBezierEasing = (cpAX, cpAY, cpBX, cpBY, t) => {
  const bX = bezierPoint(0, cpAX, cpBX, 1, t);
  const bY = bezierPoint(0, cpAY, cpBY, 1, t);
  return [bX, bY];
};

const getScaledNormal = (input, zero, mult) => {
  return zero + input * mult;
};

const renderCubicBezierEasingGraph = (
  bottomLeftX,
  bottomLeftY,
  size,
  cpAX,
  cpAY,
  cpBX,
  cpBY,
  t
) => {
  const endX = getScaledNormal(1, bottomLeftX, size);
  const endY = getScaledNormal(1, bottomLeftY, -size);
  const [bX, bY] = getCubicBezierEasing(cpAX, cpAY, cpBX, cpBY, t);
  const scaledCpAX = getScaledNormal(cpAX, bottomLeftX, size);
  const scaledCpAY = getScaledNormal(cpAY, bottomLeftY, -size);
  const scaledCpBX = getScaledNormal(cpBX, bottomLeftX, size);
  const scaledCpBY = getScaledNormal(cpBY, bottomLeftY, -size);
  const scaledBX = getScaledNormal(bX, bottomLeftX, size);
  const scaledBY = getScaledNormal(bY, bottomLeftY, -size);

  rectMode(CENTER);
  textSize(18);

  // 베지어 곡선
  noFill();
  stroke(0, 127, 0);
  strokeWeight(2);
  bezier(
    bottomLeftX,
    bottomLeftY,
    scaledCpAX,
    scaledCpAY,
    scaledCpBX,
    scaledCpBY,
    endX,
    endY
  );

  // 베지어 곡선의 조작선
  stroke(0, 127, 0);
  strokeWeight(1);
  line(bottomLeftX, bottomLeftY, scaledCpAX, scaledCpAY);
  line(scaledCpBX, scaledCpBY, endX, endY);

  // 기준선
  noFill();
  stroke(0);
  line(bottomLeftX, bottomLeftY, endX, bottomLeftY);
  line(bottomLeftX, bottomLeftY, bottomLeftX, endY);

  // 베지어 곡선의 조작점
  fill(255);
  rect(scaledCpAX, scaledCpAY, 6, 6);
  rect(scaledCpBX, scaledCpBY, 6, 6);

  // 곡선 위 값에 대한 x 보조선
  noFill();
  stroke(255, 0, 0);
  line(scaledBX, bottomLeftY, scaledBX, scaledBY);

  // 곡선 위 값에 대한 y 보조선
  stroke(0, 0, 255);
  line(bottomLeftX, scaledBY, scaledBX, scaledBY);

  // 곡선 위 값
  fill(255);
  stroke(0);
  circle(scaledBX, scaledBY, 10);

  // 곡선 위 값의 x값
  noStroke();
  fill(255, 0, 0);
  textAlign(LEFT);
  text(bX.toFixed(6), scaledBX, bottomLeftY + textAscent());

  // 곡선 위 값의 y값
  fill(0, 0, 255);
  textAlign(RIGHT);
  text(bY.toFixed(6), bottomLeftX - 8, scaledBY);
};
