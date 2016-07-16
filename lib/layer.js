const Wave = require('./wave');
const Ship = require('./ship');

function Layer(depth, canvas){
  this.depth = depth;
  this.canvas = canvas;

  this.populate();
}

Layer.prototype.populate = function () {
  const offset = this.depth * 50;
  const wave = new Wave(this.canvas, offset);
  this.wave = wave;

  this.ships = [];
  const count = 1
  for(let i = 0; i < count; i++){
    const ship = new Ship(this.wave, this.canvas.ctx);
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
