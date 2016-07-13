function Ship(wave, ctx){
  this.wave = wave;
  this.ctx = ctx;
  this.x = 200;
  this.y = 100;
}

Ship.prototype.render = function(){
  this.ctx.save();
  this.ctx.fillStyle = "black";
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, 25, 0, Math.PI*2);
  this.ctx.fill();
  this.ctx.restore();
};

Ship.prototype.move = function(){
  for(let i = 0; i < this.wave.points.length; i++){
    if(this.wave.points[i].x > this.x){
      // const prevPoint = this.wave.points[i-1];
      // const ctrlPoint = {
      //   x: (point.x + prevPoint.x) / 2,
      //   y: (point.y + prevPoint.y) / 2
      // };


      this.y = this.wave.points[i].y;
      break
    }
  }
  this.render();
};

module.exports = Ship;
