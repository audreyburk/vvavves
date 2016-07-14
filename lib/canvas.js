function Canvas(){
  this.self = document.getElementById("canvas")

  this.self.width = window.innerWidth;
  this.self.height = window.innerHeight;

  this.width = this.self.width;
  this.height = this.self.height;
  this.ctx = this.self.getContext("2d");

  this.lIncreasing = true;
  this.h = 220;
  this.s = 100;
  this.l = 5;

  this.ctx.globalAlpha = 0.7;
}

Canvas.prototype.render = function () {
  this.changeColor();
  const color = `hsla(${this.h}, ${this.s}%, ${this.l}%, 1)`;
  console.log(this.l);
  this.self.style.background = color;
  this.ctx.clearRect(0, 0, this.width, this.height);
};

Canvas.prototype.changeColor = function () {
  this.h >= 360 ? this.h = 0 : this.h += .1;

  if(this.lIncreasing){
    if(this.l >= 30){
      this.lIncreasing = false;
      this.l -= .01;
    } else this.l += .01;
  } else {
    if(this.l <= 5){
      this.lIncreasing = true;
      this.l += .01;
    } else this.l -= .01;
  }
};

module.exports = Canvas;
