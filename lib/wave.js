const Point = require('./point');
const Color = require('./color');

function Wave(canvas, depth, ratio) {
  this.canvas = canvas;
  this.ratio = ratio;
  this.spacing = 70 * this.ratio;
  this.points = Point.generatePoints(
    canvas.width,
    canvas.height,
    depth * 50,
    this.ratio,
    this.spacing
  );
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
  const points = this.points;
  const spacing = this.spacing;
  if(points[points.length-1].x > this.canvas.width + spacing * 2){
    const newPoint = new Point(
      points[0].x - spacing,
      points[points.length-1].y,
      points[points.length-1].oldY,
      points[0].ratio
    );
    points.unshift(newPoint);
    points.pop();
  } else if(points[0].x < (0 - spacing * 2)){
    const newPoint = new Point(
      points[points.length-1].x + spacing,
      points[0].y,
      points[0].oldY,
      points[0].ratio
    );
    points.push(newPoint);
    points.shift();
  }
};

module.exports = Wave;
