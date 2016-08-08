const Listener = require('./listener');

function Environment(){
  this.time = Math.random() * 100;
  this.night = false;

  this.tide = 0;
  this.tideCap = 0;
  this.tideMax = 4;
  this.toggleTide();

  this.snowing = false;
  this.snowAmount = 0;
  this.snowCap = 100;

  this.raining = false;
  this.rainAmount = 0;
  this.rainCap = 100;

  // Math.random() < .5 ? this.toggleRain() : this.toggleSnow();
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
  this.stepRain(delta);
};

Environment.prototype.toggleSnow = function () {
  let timer;
  if(this.snowing){
    this.snowing = false;
    timer = Math.random() * 50000 + 10000;
    if(Math.random() > .8){
      setTimeout(() => this.toggleSnow(), timer);
    } else {
      setTimeout(() => this.toggleRain(), timer);
    }
  } else {
    this.snowing = true;
    this.snowCap = Math.floor(Math.random() * 5) * 50 + 50;
    timer = Math.random() * 20000 + 30000;
    setTimeout(() => this.toggleSnow(), timer);
  }
};

Environment.prototype.toggleRain = function () {
  let timer;
  if(this.raining){
    this.raining = false;
    timer = Math.random() * 50000 + 10000;
    if(Math.random() > .8){
      setTimeout(() => this.toggleRain(), timer);
    } else {
      setTimeout(() => this.toggleSnow(), timer);
    }
  } else {
    this.raining = true;
    this.rainCap = Math.floor(Math.random() * 5) * 50 + 50;
    timer = Math.random() * 20000 + 30000;
    setTimeout(() => this.toggleRain(), timer);
  }
};

Environment.prototype.stepSnow = function () {
  if(this.snowing && this.snowAmount < this.snowCap){
    this.snowAmount += .05;
  } else if(this.snowAmount > 0) {
    this.snowAmount -= .05;
  }
};

Environment.prototype.stepRain = function () {
  if(this.raining && this.rainAmount < this.rainCap){
    this.rainAmount += .05;
  } else if(this.rainAmount > 0) {
    this.rainAmount -= .05;
  }
};

Environment.prototype.stepTime = function () {
  this.time += .005;
  if(Math.floor(this.time) === 100) this.time = 0;
  if(Math.floor(this.time) ===  30) this.night = true;
  if(Math.floor(this.time) ===  70) this.night = false;
};

Environment.prototype.toggleBreeze = function () {
  const dir = Math.random() < .5 ? 1 : -1;
  this.breezeCap = Math.random() * 12 * dir;
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

Environment.prototype.toggleTide = function () {
  const dir = Math.random() < .5 ? 1 : -1;
  const amount = Math.random() * 2;
  this.tideCap += dir * amount;
  if(this.tideCap > this.tideMax) this.tideCap = this.tideMax;
  if(this.tideCap < 0 - this.tideMax) this.tideCap = 0 - this.tideMax;

  const timer = Math.random() * 5000 + 2000;
  setTimeout(() => this.toggleTide(), timer);
};

Environment.prototype.stepTide = function (delta) {
  if(this.tide > this.tideCap){
    this.tide -= 0.01 * delta;
  } else {
    this.tide += 0.01;
  }
};

module.exports = new Environment;
