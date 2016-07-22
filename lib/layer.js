const Wave = require('./wave');
const Ship = require('./ship');
const Star = require('./star');

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

  this.stars = [];
};

Layer.prototype.render = function (tide) {
  this.addStars();

  this.ships.forEach( ship => {
    ship.move();
    ship.render();
  });
  this.stars.forEach( star => {
    star.move();
    star.render();
  });
  this.wave.render(tide); // globalize game for easy tide reference??
};

Layer.prototype.addStars = function () {
  if(Math.floor(Math.random() * 200) < 10){
    const star = new Star(this.wave, this.canvas.ctx, this.ratio);
    this.stars.push(star);
  }
};

module.exports = Layer;
