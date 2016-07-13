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

  var self = this;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  this.points.forEach(function(point, i) {
    ctx.beginPath();
    ctx.font = '14px Arial';
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  });
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);
  this.points.forEach(function(point, i) {
    point.y = point.oldY + Math.sin(point.angle) * 35;
    point.x += 1;
    point.angle += point.speed;
    var nextPoint = self.points[i + 1];
    if (nextPoint) {
      var ctrlPoint = {
        x: (point.x + nextPoint.x) / 2,
        y: (point.y + nextPoint.y) / 2
      };
      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
    }
  });
  if(this.points[this.points.length-3].x > window.innerWidth){
    var newPoint = {
      x: this.points[0].x - (Math.random() * 100 + 50),
      y: this.points[this.points.length-1].y,
      oldY: this.points[this.points.length-1].oldY,
      angle: Math.random() * 360,
      speed: 0.0175 + Math.random()*0.0175
    };
    this.points.unshift(newPoint);
    this.points.pop();
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  ctx.restore();
};

module.exports = Wave;
