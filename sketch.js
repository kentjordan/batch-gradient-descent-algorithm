const canvasHeight = 300;
const canvasWidth = 300;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

const dataset = [];

const drawLine = (x1, y1, x2, y2) => {
  stroke(255, 255, 255);
  strokeWeight(3);
  line(x1, y1, x2, y2);
};

const drawDataset = () => {
  for (let i = 0; i < dataset.length; i++) {
    dataset[i].drawDataPoint();
  }
};

const fHat = (w, xi, b) => w * xi + b;

const deriveJ = (w, b) => {
  const m = dataset.length;
  let sum = 0;

  for (let i = 0; i < m; i++) {
    const xi = dataset[i].x;
    const yi = canvasHeight - dataset[i].y;

    sum += (fHat(w, xi, b) - yi) * xi;
  }

  return sum / m;
};

const deriveB = (w, b) => {
  const m = dataset.length;
  let sum = 0;

  for (let i = 0; i < m; i++) {
    const xi = dataset[i].x;
    const yi = canvasHeight - dataset[i].y;

    sum += fHat(w, xi, b) - yi;
  }

  return sum / m;
};

let w = 1;
let b = 0;

const wLr = 0.00001;
const bLr = 0.1;

function draw() {
  background(30);

  if (mouseIsPressed) {
    dataset.push(new DataPoint(mouseX, mouseY, 10));
  }

  drawDataset();

  if (dataset.length >= 10) {
    tmp_w = w - wLr * deriveJ(w, b);
    tmp_b = b - bLr * deriveB(w, b);
    w = tmp_w;
    b = tmp_b;

    const minX = Math.min(...dataset.map((dp) => dp.x));
    const maxX = Math.max(...dataset.map((dp) => dp.x));

    stroke(255);
    line(
      minX,
      canvasHeight - fHat(w, minX, b),
      maxX,
      canvasHeight - fHat(w, maxX, b)
    );
  }

  //   Render live calculation of the model ŷ
  fill(255);
  noStroke();
  textSize(16);
  text(
    `ŷ = ${w.toPrecision(2)}x + ${b.toPrecision(3)}`,
    canvasWidth / 2.85,
    canvasHeight - 20
  );

  fill(255);
  circle(mouseX, mouseY, 10);
}
