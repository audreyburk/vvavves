const Wave = require('./wave');
const Ship = require('./ship');

function Layer(depth, canvas){
  this.depth = depth;
  this.ratio = 1 + depth/8;
  this.canvas = canvas;

  this.populate();
}

Layer.prototype.populate = function () {
  const wave = new Wave(this.canvas, this.depth, this.ratio);
  this.wave = wave;

  this.ships = [];
  const count = 1
  for(let i = 0; i < count; i++){
    const ship = new Ship(this.wave, this.canvas.ctx, this.ratio);
    this.ships.push(ship);
  }
};

Layer.prototype.render = function (tide) {
  this.ships.forEach( ship => {
    ship.move();
    ship.render();
  });
  this.wave.render(tide); // TODO: globalize game for easy tide reference??
};

module.exports = Layer;
