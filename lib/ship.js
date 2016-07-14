function Ship(wave, ctx){
  this.wave = wave;
  this.ctx = ctx;
  this.x = Math.random() * 1400 + 100;
  this.y = 0;
}

Ship.prototype.render = function(){
  this.ctx.save();
  this.ctx.fillStyle = "rgba(36, 36, 36, 0.8)";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y - 10, 25, .2, Math.PI-.2);
  this.ctx.fill();
  this.ctx.restore();
};

Ship.prototype.move = function(){
  for(let i = 0; i < this.wave.points.length; i++){
    const point = this.wave.points[i];
    if(point.x > this.x){
      const prevPoint = this.wave.points[i-1];

      // Math looks good here, but maybe need to work with the middle points?
      const total = Math.abs(point.x - prevPoint.x)
      const left = Math.abs(this.x - prevPoint.x);
      const right = Math.abs(this.x - point.x);
      const leftWeight = right / total;
      const rightWeight = left / total;

      this.y = (point.y * rightWeight + prevPoint.y * leftWeight);
      this.x += .5 * (point.y - prevPoint.y) / (point.x - prevPoint.x);

      // this.y = (point.y * .5 + prevPoint.y * .5); // this looks good. Why does multiplying by more accurate numbers mess up?
      break
    }
  }
  this.render();
};

module.exports = Ship;




// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0
