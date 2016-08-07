const Canvas = require('./canvas');
const Layer = require('./layer');
const Color = require('./color');
const Environment = require('./environment');

const Listener = require('./listener');

function Game(){
  this.canvas = new Canvas;
  this.layers = [];
  this.tide = 3;

  this.oldTime = performance.now();

  for(let i = 0; i < 5; i++){
    const layer = new Layer(i, this.canvas);
    this.layers.push(layer);
  }
}

Game.init = function(){
  const game = new Game;
  game.run(performance.now());
};

Game.prototype.render = function(delta){
  this.canvas.render();
  this.layers.forEach( layer => {
    layer.render(delta);
  });
};

Game.prototype.run = function(time){

  const delta = (time - this.oldTime) / 16.6;
  this.oldTime = time;


  Color.step(delta);
  Environment.step(delta);

  this.render(delta);
  window.requestAnimationFrame(time => this.run(time));
};

module.exports = Game;
