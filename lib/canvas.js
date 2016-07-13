function Canvas(){
  const canvas = document.getElementById("canvas")

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext("2d");

  this.ctx.globalAlpha = 0.7;
}

module.exports = Canvas;
