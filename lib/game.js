const Canvas = require('./canvas');
const Layer = require('./layer');

// global singleton canvas, or too dangerous?

const Listener = require('./listener');

function Game(){
  this.canvas = new Canvas;
  this.waves = [];
  this.ships = [];

  this.tideIn = true;
  this.tide = 3;

  this.lIncreasing = true;

  // add a separate color global class!
  this.color = {
    h: Math.random() * 360,
    s: 100,
    l: 5,
    a: 1
  };

  this.layers = [];

  for(let i = 0; i < 7; i++){
    const layer = new Layer(i, this.canvas);
    this.layers.push(layer);
  }
}

Game.init = function(){
  const game = new Game;
  game.run();
};

Game.prototype.changeTide = function () {
  if(this.tide > 5 * Listener.mouseX){
    this.tide -= 0.1;
  } else {
    this.tide += 0.1;
  }
};

Game.prototype.changeColor = function(){
  this.color.h >= 360 ? this.color.h = 0 : this.color.h += .05;

  if(this.lIncreasing){
    if(this.color.l >= 30){
      this.lIncreasing = false;
      this.color.l -= .005;
    } else this.color.l += .005;
  } else {
    if(this.color.l <= 5){
      this.lIncreasing = true;
      this.color.l += .005;
    } else this.color.l -= .005;
  }
};

Game.prototype.render = function(){
  this.changeColor();
  this.changeTide();

  this.canvas.render(this.color);
  this.layers.forEach( layer => {
    layer.render(this.color, this.tide);
  });
};

Game.prototype.run = function(){
  this.render();
  window.requestAnimationFrame(() => this.run());
};

module.exports = Game;
