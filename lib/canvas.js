function Canvas(){
  this.self = document.getElementById("canvas")

  this.self.width = window.innerWidth;
  this.self.height = window.innerHeight;

  this.width = this.self.width;
  this.height = this.self.height;
  this.ctx = this.self.getContext("2d");


  this.ctx.globalAlpha = 0.7;
}

Canvas.prototype.render = function (color) {
  const hsla = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;
  this.self.style.background = hsla;
  this.ctx.clearRect(0, 0, this.width, this.height);
};


module.exports = Canvas;
