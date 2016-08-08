const Util = require('./util');
const Listener = require('./listener');
const Point = require('./point');
const Environment = require('./environment');

function WavePoint(x, y, oldX, oldY, ratio){
  const angle = Math.random() * 360;
  const speed = 0.0075 + Math.random()*0.0275;
  const amplitude = (Math.random() * 10 + 30) * ratio;

  Point.call(this, x, y, oldX, oldY, ratio, angle, speed, amplitude)
}

Util.inherits(WavePoint, Point);

WavePoint.generatePoints = function(width, y, ratio, spacing){
  const points = [];

  for (let x = -(spacing * 2); x <= width + spacing * 2; x += spacing) {
    let randomOffset = Math.random() * 60 - 30;
    let xOffset = (Math.random()*20 - 10);
    const point = new WavePoint(
      x + xOffset * ratio,
      x + xOffset * ratio,
      y + (randomOffset + Math.random() * 20) * ratio,
      y + (randomOffset + Math.random() * 20) * ratio,
      ratio
    );
    points.push(point);
  }
  return points;
};

WavePoint.prototype.move = function (delta) {
  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * this.ratio * .3 + Math.sin(this.angle) * this.amplitude * .5;
  this.x += Environment.tide * this.ratio * delta;
  this.angle += 1.5 * this.speed * delta; //* Math.abs(Listener.mouseX) + .5 * this.speed;
};


module.exports = WavePoint;
