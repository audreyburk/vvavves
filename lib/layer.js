const Wave = require('./wave');
const Ship = require('./ship');
const Snow = require('./snow');
const Star = require('./star');
const Rain = require('./rain');
const Environment = require('./environment');

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
  this.rain = [];
  this.stars = [];
};

Layer.prototype.render = function (delta) {
  // if(Environment.night) this.addStars();
  if(Environment.snowAmount > 0) this.addSnow();
  // this.addRain();

  this.ships.forEach( ship => {
    ship.move(delta);
    ship.render();
  });
  this.snow.forEach( (flake, i, arr) => {
    flake.move(delta);
    // if(flake.point.y > window.innerHeight + 20){
    if(flake.radius < .05){
      arr[i] = null;
    } else flake.render();
  });
  this.stars.forEach( (star, i, arr) => {
    star.move();
    if(star.radius < .05){
      arr[i] = null;
    } else star.render();
  });
  this.rain.forEach( (drop, i, arr) => {
    drop.move();
    if(drop.y > window.innerHeight + 20){
      arr[i] = null;
    } else drop.render();
  });


  this.snow = this.snow.filter(Boolean);
  this.rain = this.rain.filter(Boolean);
  this.stars = this.stars.filter(Boolean);
  this.wave.move(delta);
  this.wave.render();
};

Layer.prototype.addSnow = function () {
  if(Math.floor(Math.random() * 500) < Environment.snowAmount){
    const flake = new Snow(this.wave, this.canvas.ctx, this.ratio);
    this.snow.push(flake);
  }
};

Layer.prototype.addRain = function () {
  console.log(this.rain.length);
  if(Math.floor(Math.random() * 10)){
    for(let i = 0; i < 30; i++){
      const drop = new Rain(this.canvas.ctx, this.ratio);
      this.rain.push(drop);
    }
  }
};

Layer.prototype.addStars = function () {
  if(Math.floor(Math.random() * 1000) < 5){
    const star = new Star(this.wave, this.canvas.ctx, this.ratio);
    this.stars.push(star);
  }
};

module.exports = Layer;
