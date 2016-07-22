const Listener = require('./listener');
const Color = require('./color');

function Ship(wave, ctx, ratio){
  this.wave = wave;
  this.ctx = ctx;
  this.x = Math.random() * (window.innerWidth - 100) + 50;
  this.y = 0;
  this.tilt = 0;
  this.ratio = ratio;
  this.colorDifference = (Math.floor(Math.random() * 5) - 2) * 15;
}

Ship.prototype.render = function(){
  const ratio = this.ratio;
  this.ctx.fillStyle = Color.hull();

  this.ctx.save();

  // hull
  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.x, this.y - 20 * ratio, 25 * ratio, begin, end);
  this.ctx.fill();

  // rotate for mast and sail
  this.ctx.translate(this.x, this.y);
  this.ctx.rotate(this.tilt); // rotate

  // mast
  // this.ctx.moveTo(0, -15);
  // this.ctx.lineTo(0, -60);
  // this.ctx.stroke();
  this.ctx.closePath();
  this.ctx.beginPath();

  // sail
  this.ctx.fillStyle = Color.sail(this.colorDifference);
  this.ctx.moveTo(0, -60 * ratio);
  this.ctx.lineTo(-30 * ratio - (this.tilt * 60 * ratio), -20 * ratio);
  this.ctx.lineTo(30 * ratio - (this.tilt * 60 * ratio), -20 * ratio);
  this.ctx.fill();

  this.ctx.restore();
};

Ship.prototype.move = function(){
  // if(Listener.keys[40]) this.x += 2;
  // if(Listener.keys[38]) this.x -= 2;

  // this.x += Listener.mouseY * 3;



  if(this.x < this.wave.points[0].x){
    this.x = window.innerWidth + 50;
  } else if(this.x > this.wave.points[this.wave.points.length - 1].x){
    this.x = -50;
  }

  for(let i = 0; i < this.wave.points.length; i++){
    const point = this.wave.points[i];
    if(point.x > this.x){
      const prevPoint = this.wave.points[i-1];

      const total = Math.abs(point.x - prevPoint.x)
      const left = Math.abs(this.x - prevPoint.x);
      const right = Math.abs(this.x - point.x);
      const leftWeight = right / total; // opposite on purpose
      const rightWeight = left / total; // closer should mean bigger, not smaller

      this.y = (prevPoint.y * leftWeight + point.y * rightWeight);
      const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);

      // maybe make use of the tide variable when determining x movement
      this.x += 6 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
      this.tilt = (Math.PI / 2) * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);

      break
    }
  }
};

module.exports = Ship;




// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0
