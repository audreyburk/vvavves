function Point(x, y, oldY, angle, speed){
  this.x = x;
  this.y = y;
  this.oldY = oldY;
  this.angle = angle;
  this.speed = speed;
}

Point.generatePoints = function(width, height){
  const yCenter = height / 2;
  const spacing = width / 18;
  const points = [];

  for (let x = 0; x <= width + width / 4; x += spacing) {
    const angle = Math.random() * 360;
    let offset = Math.random() * 100 - 50;
    const point = new Point(
      x + (Math.random()*20 - 10),
      yCenter + offset + 10 + Math.random() * 20,
      yCenter + offset,
      angle,
      0.025
    );
    points.push(point);
  }
  return points;
};

Point.prototype.move = function () {
  this.y = this.oldY + Math.sin(this.angle) * 35;
  this.x += 1;
  this.angle += this.speed;
};

module.exports = Point;
