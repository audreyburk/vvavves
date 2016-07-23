function Environment(){
  this.time = Math.random() * 100;
  this.breeze = 0;
  this.updraft = 0;
  this.tide = 0;
  this.night = false;

  this.snowing = false;
  this.snowAmount = 25;
  this.snowCap = 100;
  this.toggleSnow();
}

Environment.prototype.step = function () {
  console.log(this.snowing);
  this.stepTime();
  this.stepSnow();
};

Environment.prototype.toggleSnow = function () {
  let timer;
  if(this.snowing){
    this.snowing = false;
    timer = Math.random() * 50000 + 10000;
  } else {
    this.snowing = true;
    this.snowCap = Math.floor(Math.random() * 5) * 20 + 50;
    timer = Math.random() * 20000 + 30000;
  }

  setTimeout(() => this.toggleSnow(), timer)
};

Environment.prototype.stepTime = function () {
  this.time += .05;
  if(Math.floor(this.time) === 100) this.time = 0;
  if(Math.floor(this.time) ===  30) this.night = true;
  if(Math.floor(this.time) ===  70) this.night = false;
};

Environment.prototype.stepSnow = function () {
  if(this.snowing && this.snowAmount < this.snowCap){
    this.snowAmount += .05;
  } else if(this.snowAmount > 0) {
    this.snowAmount -= .05;
  }

};

module.exports = new Environment;
