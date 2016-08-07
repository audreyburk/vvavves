const WavePoint = require('./wave_point');
const Color = require('./color');
const Environment = require('./environment');

function Wave(canvas, depth, ratio) {
  this.canvas = canvas;
  this.ratio = ratio;
  this.spacing = 70 * this.ratio;
  this.y = canvas.height / 2 + depth * 50 * ratio;

  this.points = WavePoint.generatePoints(
    canvas.width,
    this.y,
    this.ratio,
    this.spacing
  );
}

Wave.prototype.render = function() {
  const ctx = this.canvas.ctx;
  const width = this.canvas.width;
  const height = this.canvas.height;

  ctx.save();

  ctx.fillStyle = Color.wave();

  ctx.beginPath();
  ctx.moveTo(this.points[0].x, this.points[0].y);

  this.points.forEach( (point, i) => {
    const nextPoint = this.points[i + 1];
    if (nextPoint) {
      const ctrlPoint = {
        x: (point.x + nextPoint.x) / 2,
        y: (point.y + nextPoint.y) / 2
      };
      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
    }
  });

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.fill();

  ctx.restore();
};

Wave.prototype.move = function (delta) {
  this.points.forEach( point => point.move(delta) );
  this.keepPointsInBounds();
};

Wave.prototype.keepPointsInBounds = function(){
  const points = this.points;
  const spacing = this.spacing;

  if(points[points.length-1].x > this.canvas.width + spacing * 2){
    const newPoint = new WavePoint(
      points[0].x - spacing,
      points[0].x - spacing,
      points[points.length-1].y,
      points[points.length-1].oldY,
      points[0].ratio
    );
    points.unshift(newPoint);
    points.pop();

  } else if(points[0].x < (0 - spacing * 2)){
    const newPoint = new WavePoint(
      points[points.length-1].x + spacing,
      points[points.length-1].x + spacing,
      points[0].y,
      points[0].oldY,
      points[0].ratio
    );
    points.push(newPoint);
    points.shift();
  }
};

Wave.prototype.getInfo = function(x){
  for(let i = 0; i < this.points.length; i++){
    if(x > this.points[i].x){
      return this.chunks[i].getInfo(x);
    }
  }
};

module.exports = Wave;
