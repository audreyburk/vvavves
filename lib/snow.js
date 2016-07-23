const Color = require('./color');
const SnowPoint = require('./snow_point');

function Snow(wave, ctx, ratio){
  this.wave = wave;
  this.ctx = ctx;
  this.ratio = ratio;

  this.point = new SnowPoint(this.ratio);

  this.radius = 4;
}

Snow.prototype.move = function () {
  // hmm, have a global weather class?
  this.point.move(.5, 0);
};


Snow.prototype.render = function () {
  const ratio = this.ratio;
  this.ctx.fillStyle = Color.snow();

  this.ctx.save();

  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.restore();
};


module.exports = Snow;
