const Environment = require('./environment');

function Color(){
    this.lIncreasing = true;

    this.h = Math.random() * 360;
    this.s = 100;
    this.l = 10;
}

Color.prototype.step = function(){
  this.h >= 360 ? this.h = 0 : this.h += .05;
  this.l = Math.abs(Environment.time - 50) * .5 + 5;
};

Color.prototype.main = function () {
  const hsla = `hsla(${this.h}, ${this.s}%, ${this.l}%, 1)`;
  return hsla;
};

Color.prototype.wave = function () {
  const rgba = `rgba(255, 255, 255, 0.3)`;
  return rgba;
};

Color.prototype.hull = function () {
  const hsla = `hsla(${this.h}, 15%, 2%, 1)`;
  return hsla;
};

Color.prototype.snow = function () {
  const hsla = `hsla(${this.h}, 50%, 85%, .9)`;
  return hsla;
};

Color.prototype.star = function () {
  const h = this.h + Math.floor(Math.random() * 3) * 30;
  const hsla = `hsla(${h + 180}, 75%, 85%, .5)`;
  return hsla;
};

Color.prototype.starGlow = function () {
  const hsla = `hsla(${this.h}, 0%, 100%, .05)`;
  return hsla;
};

Color.prototype.sail = function (dif) {
  // stands out too much on light bg as is
  // alter lightness/opacity based on base lightness??
  // return "white";
  const hsla = `hsla(${this.h + 135 + dif}, 50%, 80%, 1)`;
  return hsla;
};

module.exports = new Color;
