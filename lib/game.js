const Canvas = require('./canvas');
const Wave = require('./wave');

function Game(){
  this.canvas = new Canvas;
  this.wave = new Wave(this.canvas, "red");
  this.waveB = new Wave(this.canvas, "pink");
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.render = function(){
  this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.wave.render();
  this.waveB.render();
}

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
