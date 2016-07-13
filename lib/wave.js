const Point = require('./point');

function Wave(canvas, color) {
  this.canvas = canvas;
  this.points = Point.generatePoints(canvas.width, canvas.height);
  this.color = color;
}

Wave.prototype.render = function() {
  const ctx = this.canvas.ctx;
  const width = this.canvas.width;
  const height = this.canvas.height;

  ctx.save();
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);
  this.points.forEach( (point, i) => {
    point.move();
    const nextPoint = this.points[i + 1];
    if (nextPoint) {
      const ctrlPoint = {
        x: (point.x + nextPoint.x) / 2,
        y: (point.y + nextPoint.y) / 2
      };
      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
    }
  });

  this.keepPointsInBounds();

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  ctx.restore();
};

Wave.prototype.keepPointsInBounds = function(){
  if(this.points[this.points.length-1].x > this.canvas.width + (this.canvas.width / 9)){
    const newPoint = new Point(
      this.points[0].x - (this.canvas.width / 18),
      this.points[this.points.length-1].y,
      this.points[this.points.length-1].oldY,
      Math.random() * 360,
      0.0175 + Math.random()*0.0175
    );
    this.points.unshift(newPoint);
    this.points.pop();
  }
};

module.exports = Wave;
