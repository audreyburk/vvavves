const Color = require('./color');

function Star(wave, ctx, ratio){
  this.wave = wave;
  this.ctx = ctx;
  this.ratio = ratio;

  this.x = Math.random() * window.innerWidth;
  this.y = Math.random() * 20 + 20;
}

Star.prototype.move = function () {
  this.x += Math.random();
  this.y += Math.random() * 2;
  // for(let i = 0; i < this.wave.points.length; i++){
  //   const point = this.wave.points[i];
  //   if(point.x > this.x){
  //     const prevPoint = this.wave.points[i-1];
  //
  //     if(){
  //
  //     } else {
  //
  //       const total = Math.abs(point.x - prevPoint.x)
  //       const left = Math.abs(this.x - prevPoint.x);
  //       const right = Math.abs(this.x - point.x);
  //       const leftWeight = right / total; // opposite on purpose
  //       const rightWeight = left / total; // closer should mean bigger, not smaller
  //
  //       this.y = (prevPoint.y * leftWeight + point.y * rightWeight);
  //       const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);
  //
  //       // maybe make use of the tide variable when determining x movement
  //       this.x += 6 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
  //       this.tilt = (Math.PI / 2) * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
  //     }
  //     break
  //   }
};


Star.prototype.render = function () {
  const ratio = this.ratio;
  this.ctx.fillStyle = Color.star();

  this.ctx.save();

  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.x, this.y, 10 * ratio, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.closePath();

  this.ctx.restore();
};


module.exports = Star;
