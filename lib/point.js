const Listener = require('./listener');

function Point(x, y, oldY, angle, speed){
  this.x = x;
  this.y = y;
  this.oldY = oldY;
  this.angle = angle;
  this.speed = speed;
}

Point.generatePoints = function(width, height, offset){
  const yCenter = height / 2;
  const spacing = width / 18;
  const points = [];

  for (let x = 0; x <= width + width / 4; x += spacing) {
    const angle = Math.random() * 360;
    let randomOffset = Math.random() * 60 - 30;
    const point = new Point(
      x + (Math.random()*20 - 10),
      yCenter + offset + randomOffset,
      yCenter + offset + randomOffset + 10 + Math.random() * 20,
      angle,
      0.0175 + Math.random()*0.0175
    );
    points.push(point);
  }
  return points;
};

Point.prototype.move = function (tide) {
  this.y = this.oldY + Math.sin(this.angle) * 35;
  this.x += tide;
  this.angle += this.speed * Listener.mouseY + .5 * this.speed;
};

module.exports = Point;
