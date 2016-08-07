const Listener = require('./listener');

function Environment(){
  this.time = Math.random() * 100;
  this.tide = 0;
  this.night = false;

  this.snowing = false;
  this.snowAmount = 25;
  this.snowCap = 100;
  this.toggleSnow();

  this.updraft = 0;
  this.breeze = 0;
  this.breezeCap = 10;
  this.toggleBreeze();
}

Environment.prototype.step = function (delta) {
  this.stepTime(delta);
  this.stepTide(delta);
  this.stepSnow(delta);
  this.stepWind(delta);
};

Environment.prototype.toggleSnow = function () {
  let timer;
  if(this.snowing){
    this.snowing = false;
    timer = Math.random() * 50000 + 10000;
  } else {
    this.snowing = true;
    this.snowCap = Math.floor(Math.random() * 5) * 50 + 50;
    console.log(`snow cap: ${this.snowCap}`);
    timer = Math.random() * 20000 + 30000;
  }
  setTimeout(() => this.toggleSnow(), timer);
};

Environment.prototype.stepSnow = function () {
  if(this.snowing && this.snowAmount < this.snowCap){
    this.snowAmount += .05;
  } else if(this.snowAmount > 0) {
    this.snowAmount -= .05;
  }
};

Environment.prototype.stepTime = function () {
  this.time += .005;
  if(Math.floor(this.time) === 100) this.time = 0;
  if(Math.floor(this.time) ===  30) this.night = true;
  if(Math.floor(this.time) ===  70) this.night = false;
};

Environment.prototype.toggleBreeze = function () {
  this.breezeCap = Math.random() * 20 - Math.random() * 20;
  console.log(`breeze cap: ${this.breezeCap}`);
  const timer = Math.random() * 10000 + 10000;
  setTimeout(() => this.toggleBreeze(), timer);
};

Environment.prototype.stepWind = function () {
  if(this.breeze > this.breezeCap){
    this.breeze -= 0.01;
  } else {
    this.breeze += 0.01;
  }
};

Environment.prototype.stepTide = function (delta) {
  if(this.tide > 4 * Listener.mouseX){
    this.tide -= 0.1 * delta;
  } else {
    this.tide += 0.1;
  }
};

module.exports = new Environment;
