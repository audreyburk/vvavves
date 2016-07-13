function Point(x, y, oldY, angle, speed){
  this.x = x;
  this.y = y;
  this.oldY = oldY;
  this.angle = angle;
  this.speed = speed;
}

Point.generatePoints = function(width, height){
  const yCenter = height / 2;
  const spacing = width / 20;
  const points = [];

  for (let x = 0; x <= width + width / 4; x += spacing) {
    const angle = Math.random() * 360;
    let offset = 20 + Math.random() * 40 - 50;
    offset -= x / 20;
    var point = new Point(
      x,
      yCenter + offset + 10 + Math.random() * 20,
      yCenter + offset,
      angle,
      0.025
    );
    points.push(point);
  }
  return points;
};

module.exports = Point;
