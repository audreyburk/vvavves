const Listener = require('./listener');

function Ship(wave, ctx){
  this.wave = wave;
  this.ctx = ctx;
  this.x = Math.random() * (window.innerWidth - 100) + 50;
  this.y = 0;
  this.tilt = 0;
}

Ship.prototype.render = function(color){
  const hsla = `hsla(${color.h + 120}, ${color.s}%, 0%, ${color.a})`;
  this.ctx.fillStyle = hsla;

  this.ctx.save();

  // hull
  this.ctx.beginPath();
  const begin = .2 + this.tilt;
  const end = Math.PI-.2 + this.tilt;
  this.ctx.arc(this.x, this.y - 20, 25, begin, end);
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
  this.ctx.fillStyle = "white";
  this.ctx.moveTo(0, -60);
  this.ctx.lineTo(-30 - (this.tilt * 60), -20);
  this.ctx.lineTo(30 - (this.tilt * 60), -20);
  this.ctx.fill();

  this.ctx.restore();
};

Ship.prototype.move = function(){
  if(Listener.keys[40]) this.x += 2;
  if(Listener.keys[38]) this.x -= 2;


  // this.x += Listener.mouseY * 3;

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
      this.x += 10 * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
      this.tilt = (Math.PI / 2) * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);

      break
    }
  }
};

module.exports = Ship;




// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0
