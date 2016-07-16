const Listener = require('./listener');

function Point(x, y, oldY, ratio){
  this.x = x;
  this.y = y;
  this.oldY = oldY;
  this.ratio = ratio;

  this.angle = Math.random() * 360;
  this.speed = 0.0075 + Math.random()*0.0275;
  this.amplitude = Math.random() * 10 + 30;
}

Point.generatePoints = function(width, height, y, ratio, spacing){
  const yCenter = height / 2;
  const points = [];

  for (let x = -(spacing * 2); x <= width + spacing * 2; x += spacing) {
    let randomOffset = Math.random() * 60 - 30;
    const point = new Point(
      x + (Math.random()*20 - 10) * ratio,
      yCenter + y * ratio + randomOffset * ratio + Math.random() * 20,
      yCenter + y * ratio + randomOffset * ratio + Math.random() * 20,
      ratio
    );
    points.push(point);
  }
  return points;
};

Point.prototype.move = function (tide) {
  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * Listener.mouseY * this.ratio * .5 + Math.sin(this.angle) * this.amplitude * .5;
  this.x += tide * this.ratio;
  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
};

module.exports = Point;
