const Canvas = require('./canvas');
const Layer = require('./layer');
const Color = require('./color');

// global singleton canvas, or too dangerous?

const Listener = require('./listener');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  this.ships = [];

  this.tideIn = true;
  this.tide = 3;

  this.layers = [];

  for(let i = 0; i < 5; i++){
    const layer = new Layer(i, this.canvas);
    this.layers.push(layer);
  }
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.changeTide = function () {
  if(this.tide > 4 * Listener.mouseX){
    this.tide -= 0.1;
  } else {
    this.tide += 0.1;
  }
};

Game.prototype.render = function(){
  this.canvas.render();
  this.layers.forEach( layer => {
    layer.render(this.tide);
  });
};

Game.prototype.run = function(){
  Color.step();
  this.changeTide();

  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
