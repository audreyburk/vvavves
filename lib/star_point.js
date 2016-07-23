const Util = require('./util');
const Point = require('./point');

function StarPoint(ratio){
  const x = Math.random() * window.innerWidth;
  const y = -20;
  const angle = Math.random() * 360;
  const speed = 0.0075 + Math.random()*0.0275;
  const amplitude = (Math.random() * 10 + 5) * ratio;

  Point.call(this, x, y, x, y, ratio, angle, speed, amplitude);
}

Util.inherits(StarPoint, Point);

StarPoint.prototype.move = function () {
  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * this.ratio;
  this.x = this.oldX + Math.sin(this.angle) * this.amplitude * this.ratio;
  this.oldX += .5 * this.ratio;
  this.oldY += 4.5 * this.ratio;
  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
};


module.exports = StarPoint;
