const Canvas = require('./canvas');
const Wave = require('./wave');
const Ship = require('./ship');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  this.ships = [];

  for(let i = 0; i < 7; i++){
    const offset = i * 50;
    const wave = new Wave(this.canvas, offset, "rgba(255, 255, 255, .3)");
    this.waves.push(wave);

    this.ships.push(new Ship(this.waves[i], this.canvas.ctx));
  }
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.render = function(){
  this.canvas.render();

  // ships stored in each waves
  // each waves renders ships before itself
  for(let i = 0; i < this.ships.length; i++){
    this.ships[i].move();
    if(this.waves[i]) this.waves[i].render();
  }
}

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
