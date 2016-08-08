const Color = require('./color');
const Environment = require('./environment');

function Rain(ctx, ratio){
  this.ctx = ctx;
  this.ratio = ratio;
  this.x = Math.random() * window.innerWidth;
  this.y = -20;
  this.speed = 15;
}

Rain.prototype.move = function () {
  if(this.x < 0){
    this.x = window.innerWidth;
  } else if(this.x > window.innerWidth){
    this.x = 0;
  }

  this.y += this.speed * this.ratio;
  this.x += .5 * Environment.breeze * this.ratio;
};


Rain.prototype.render = function () {
  const ratio = this.ratio;
  this.ctx.strokeStyle = Color.rain();

  this.ctx.save();

  this.ctx.beginPath();
  this.ctx.moveTo(this.x, this.y);
  this.ctx.lineTo(this.x - Environment.breeze * ratio, this.y - 100 * ratio);
  this.ctx.stroke();
  this.ctx.closePath();

  this.ctx.restore();
};


module.exports = Rain;
