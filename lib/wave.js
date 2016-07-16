const Point = require('./point');
const Color = require('./color');

function Wave(canvas, offset) {
  this.canvas = canvas;
  this.points = Point.generatePoints(canvas.width, canvas.height, offset);
}

Wave.prototype.render = function(tide) {
  const ctx = this.canvas.ctx;
  const width = this.canvas.width;
  const height = this.canvas.height;

  ctx.save();
  ctx.fillStyle = Color.wave();
  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);
  this.points.forEach( (point, i) => {
    point.move(tide);
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
      this.points[this.points.length-1].oldY
    );
    this.points.unshift(newPoint);
    this.points.pop();
  } else if(this.points[0].x < (0 - (this.canvas.width / 9))){
    const newPoint = new Point(
      this.points[this.points.length-1].x + (this.canvas.width / 18),
      this.points[0].y,
      this.points[0].oldY
    );
    this.points.push(newPoint);
    this.points.shift();
  }
};

module.exports = Wave;
