const Wave = require('./wave');
const Ship = require('./ship');
const Snow = require('./snow');

function Layer(depth, canvas){
  this.depth = depth;
  this.ratio = .6 + depth/5;
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

  this.snow = [];
};

Layer.prototype.render = function (tide) {
  this.addSnow();

  this.ships.forEach( ship => {
    ship.move();
    ship.render();
  });
  this.snow.forEach( (flake, i, arr) => {
    flake.move();
    if(flake.radius < 0.015){
      arr[i] = null;
    } else {} flake.render();
  });
  this.snow = this.snow.filter(Boolean);
  this.wave.move(tide);
  this.wave.render();
};

Layer.prototype.addSnow = function () {
  if(Math.floor(Math.random() * 200) < 10){
    const flake = new Snow(this.wave, this.canvas.ctx, this.ratio);
    this.snow.push(flake);
  }
};

module.exports = Layer;
