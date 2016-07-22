function Point(x, y, oldX, oldY, ratio, angle, speed, amplitude){
  this.x = x;
  this.y = y;
  this.oldX = oldX;
  this.oldY = oldY;
  this.ratio = ratio;
  this.angle = angle;
  this.speed = speed;
  this.amplitude = amplitude;
}

module.exports = Point;
