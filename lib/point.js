const Listener = require('./listener');

function Point(x, y, oldY){
  this.x = x;
  this.y = y;
  this.oldY = oldY;

  this.angle = Math.random() * 360;
  this.speed = 0.0075 + Math.random()*0.0275;
  this.amplitude = Math.random() * 10 + 30;
}

Point.generatePoints = function(width, height, offset){
  const yCenter = height / 2;
  const spacing = width / 18;
  const points = [];

  for (let x = 0; x <= width + width / 4; x += spacing) {
    let randomOffset = Math.random() * 60 - 30;
    const point = new Point(
      x + (Math.random()*20 - 10),
      yCenter + offset + randomOffset,
      yCenter + offset + randomOffset + 10 + Math.random() * 20
    );
    points.push(point);
  }
  return points;
};

Point.prototype.move = function (tide) {
  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * Listener.mouseY * .5 + Math.sin(this.angle) * this.amplitude * .5;
  this.x += tide;
  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
};

module.exports = Point;
