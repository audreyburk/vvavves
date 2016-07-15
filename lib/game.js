const Canvas = require('./canvas');
const Wave = require('./wave');
const Ship = require('./ship');
const Listener = require('./listener');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  this.ships = [];

  this.tideIn = true;
  this.tide = 3;

  this.lIncreasing = true;
  this.color = {
    h: Math.random() * 360,
    s: 100,
    l: 5,
    a: 1
  };

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

Game.prototype.changeTide = function () {
  if(this.tide > 5 * Listener.mousePosition){
    this.tide -= 0.1;
  } else {
    this.tide += 0.1;
  }
};

Game.prototype.changeColor = function(){
  this.color.h >= 360 ? this.color.h = 0 : this.color.h += .1;

  if(this.lIncreasing){
    if(this.color.l >= 30){
      this.lIncreasing = false;
      this.color.l -= .01;
    } else this.color.l += .01;
  } else {
    if(this.color.l <= 5){
      this.lIncreasing = true;
      this.color.l += .01;
    } else this.color.l -= .01;
  }
};

Game.prototype.render = function(){
  this.changeColor();
  this.changeTide();

  this.canvas.render(this.color);

  // ships stored in each waves
  // each waves renders ships before itself
  for(let i = 0; i < this.waves.length; i++){
    if(this.ships[i]){
      this.ships[i].move();
      this.ships[i].render(this.color);
    }
    if(this.waves[i]) this.waves[i].render(this.tide);
  }
};

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
