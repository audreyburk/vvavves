function Color(){
    this.lIncreasing = true;

    this.h = Math.random() * 360;
    this.s = 100;
    this.l = 10;
}

Color.prototype.step = function(){
  this.h >= 360 ? this.h = 0 : this.h += .05;

  if(this.lIncreasing){
    if(this.l >= 30){
      this.lIncreasing = false;
      this.l -= .005;
    } else this.l += .005;
  } else {
    if(this.l <= 5){
      this.lIncreasing = true;
      this.l += .005;
    } else this.l -= .005;
  }
};

Color.prototype.main = function () {
  const hsla = `hsla(${this.h}, ${this.s}%, ${this.l}%, 1)`;
  return hsla;
};

Color.prototype.hull = function () {
  const rgba = `rgba(0, 0, 0, 0.9)`;
  return rgba;
};

Color.prototype.wave = function () {
  const rgba = `rgba(255, 255, 255, 0.2)`;
  return rgba;
};

Color.prototype.sail = function () {
  const hsla = `hsla(${this.h + 120}, ${this.s}%, ${this.l}%, .9)`;
  return hsla;
};

module.exports = new Color;
