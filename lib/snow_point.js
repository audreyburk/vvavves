const Util = require('./util');
const Point = require('./point');
const Environment = require('./environment');

function SnowPoint(ratio){
  const x = Math.random() * window.innerWidth;
  const y = -20;
  const angle = Math.random() * 360;
  const speed = 0.0075 + Math.random()*0.0275;
  const amplitude = (Math.random() * 10 + 10) * ratio;

  Point.call(this, x, y, x, y, ratio, angle, speed, amplitude)
}

Util.inherits(SnowPoint, Point);

SnowPoint.prototype.move = function (delta) {
  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * this.ratio;
  this.x = this.oldX + Math.sin(this.angle) * this.amplitude * this.ratio;
  this.oldX += Environment.breeze * this.ratio * delta;
  this.oldY += 1.5 * this.ratio - Environment.updraft * delta;
  this.angle += 1.5 * this.speed * delta; //* Math.abs(Listener.mouseX) + .5 * this.speed;
};


module.exports = SnowPoint;
