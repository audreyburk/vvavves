const Canvas = require('./canvas');
const Wave = require('./wave');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  for(let i = 0; i < 5; i++){
    const wave = new Wave(this.canvas, "rgba(255, 255, 255, .5)");
    this.waves.push(wave);
  }
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.render = function(){
  this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.waves.forEach( wave => wave.render());
}

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
