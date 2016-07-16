const Wave = require('./wave');
const Ship = require('./ship');

function Layer(depth, canvas){
  this.depth = depth;
  this.canvas = canvas;

  this.populate();
}

Layer.prototype.populate = function () {
  const offset = this.depth * 50;
  const wave = new Wave(this.canvas, offset, "rgba(255, 255, 255, .3)");
  this.wave = wave;

  this.ships = [];
  const count = Math.random() * 3;
  for(let i = 0; i < count; i++){
    const ship = new Ship(this.wave, this.canvas.ctx);
    this.ships.push(ship);
  }
};

Layer.prototype.render = function (color, tide) {
  this.ships.forEach( ship => {
    ship.move();
    ship.render(color);
  });
  this.wave.render(tide); // TODO: globalize game for easy tide reference??
};

module.exports = Layer;
