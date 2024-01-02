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
    const yi = dataset[i].y;

    sum += (fHat(w, xi, b) - yi) * xi;
  }

  return sum / m;
};

const deriveB = (w, b) => {
  const m = dataset.length;
  let sum = 0;

  for (let i = 0; i < m; i++) {
    const xi = dataset[i].x;
    const yi = dataset[i].y;

    sum += fHat(w, xi, b) - yi;
  }

  return sum / m;
};

function setup() {
  createCanvas(700, windowHeight / 2);
  if (windowWidth <= 700) {
    resizeCanvas(windowWidth, windowHeight / 2);
  }
}

let w = 3;
let b = 3;

function draw() {
  background(50);

  if (mouseIsPressed) {
    dataset.push(new DataPoint(mouseX, mouseY, 10));
  }

  drawDataset();

  if (dataset.length >= 10) {
    tmp_w = w - 0.000001 * deriveJ(w, b);
    tmp_b = b - 0.05 * deriveB(w, b);
    w = tmp_w;
    b = tmp_b;

    const minX = Math.min(...dataset.map((dp) => dp.x));
    const maxX = Math.max(...dataset.map((dp) => dp.x));

    stroke(255);
    line(minX, fHat(w, minX, b), maxX, fHat(w, maxX, b));
  }

  // Render Coodinate's numbers
  for (let i = 1; i <= 16; i++) {
    fill(255);
    noStroke();
    textSize(12);
    // x
    text(i * 50, i * 50, 12);
    // y
    text(i * 50, 2, i * 50);
  }

  //   Render x and y label

  fill(255);
  noStroke();
  textSize(24);
  textSize(BOLD);
  text("x", width / 2, 40);
  text("y", 40, height / 2);

  //   Render live calculation of the model ŷ
  fill(255);
  noStroke();
  textSize(16);
  text(
    `ŷ = ${w.toPrecision(4)}x + ${b.toPrecision(4)}`,
    width / 2 - width / 12,
    height - 8
  );

  fill(255);
  circle(mouseX, mouseY, 10);
}
