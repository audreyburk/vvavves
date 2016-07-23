const Color = require('./color');
const SnowPoint = require('./snow_point');
const Environment = require('./environment');

function Snow(wave, ctx, ratio){
  this.wave = wave;
  this.ctx = ctx;
  this.ratio = ratio;
  this.displacement = Math.random() * 25 * ratio;

  this.point = new SnowPoint(this.ratio);
  this.falling = true;

  this.radius = 3 + Math.random() * 2;
}

Snow.prototype.move = function () {
  // hmm, have a global weather class?
  // conditionals need to be based on spacing
  if(this.point.x < this.wave.points[0].x){
    this.point.x = window.innerWidth + 10;
  } else if(this.point.x > this.wave.points[this.wave.points.length - 1].x){
    this.point.x = -10;
  }

  for(let i = 0; i < this.wave.points.length; i++){
    const point = this.wave.points[i];
    if(point.x > this.point.x){
      const prevPoint = this.wave.points[i-1];

      const total = Math.abs(point.x - prevPoint.x)
      const left = Math.abs(this.point.x - prevPoint.x);
      const right = Math.abs(this.point.x - point.x);
      const leftWeight = right / total; // opposite on purpose
      const rightWeight = left / total; // closer should mean bigger, not smaller

      const waveY = (prevPoint.y * leftWeight + point.y * rightWeight);

      if(this.falling && this.point.y < waveY - 2){
        this.point.move(.5, 0);
      } else {
        this.falling = false;
        this.radius -= Environment.snowing ? 0.002 : 0.005;
        this.point.y = waveY;
        const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);

        // maybe make use of the tide variable when determining x movement
        this.point.x += 1 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
      }
      break
    }
  }
};


Snow.prototype.render = function () {
  const ratio = this.ratio;
  this.ctx.fillStyle = Color.snow();

  this.ctx.save();

  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.point.x, this.point.y + this.displacement, this.radius * ratio, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.restore();
};


module.exports = Snow;
