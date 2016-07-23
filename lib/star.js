const Color = require('./color');
const StarPoint = require('./star_point');

function Star(wave, ctx, ratio){
  this.wave = wave;
  this.ctx = ctx;
  this.ratio = ratio;

  this.point = new StarPoint(this.ratio);
  this.falling = true;
  this.radius = 10;

  this.glowSize = 1;
  this.angle = Math.random() * 360;
  this.speed = 0.0075 + Math.random()*0.0275;
}

Star.prototype.move = function () {
  this.glowSize = 1 + Math.sin(this.angle);
  this.angle += this.speed;

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
        this.point.move();
      } else {
        this.falling = false;
        this.radius -= 0.005;
        this.point.y = waveY;
        const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);

        // maybe make use of the tide variable when determining x movement
        this.point.x += 1 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
      }
      break
    }
  }
};


Star.prototype.render = function () {
  const ratio = this.ratio;

  this.ctx.save();
  this.ctx.fillStyle = Color.star();

  this.ctx.beginPath();
  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio * .7, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.beginPath();
  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.beginPath();
  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio * 1.3, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.fillStyle = Color.starGlow();

  this.ctx.beginPath();
  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio * this.glowSize + 30 * ratio, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.restore();
};


module.exports = Star;
