class DataPoint {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  drawDataPoint() {
    noStroke();
    circle(this.x, this.y, this.radius);
  }
}
