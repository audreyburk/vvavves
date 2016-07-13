const Canvas = require('./canvas');
const Wave = require('./wave');
const Ship = require('./ship');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  this.ships = [];

  for(let i = 0; i < 5; i++){
    const offset = i * 50;
    const wave = new Wave(this.canvas, offset, "rgba(255, 255, 255, .5)");
    this.waves.push(wave);

    const ship = new Ship(this.waves[i], this.canvas.ctx);
    this.ships.push(ship);
  }
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.render = function(){
  const a = 255;
  const b = 100;
  const c = 50;
  const color = `rgba(${a}, ${b}, ${c}, ${1})`;
  this.canvas.self.style.background = color;
  this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.waves.forEach( wave => wave.render());
  this.ships.forEach( ship => {
    ship.move();
  });
}

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
