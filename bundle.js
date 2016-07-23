/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", Game.init);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Canvas = __webpack_require__(2);
	const Layer = __webpack_require__(4);
	const Color = __webpack_require__(3);
	
	// global singleton canvas, or too dangerous?
	
	const Listener = __webpack_require__(8);
	
	function Game(){
	  this.canvas = new Canvas;
	  this.layers = [];
	
	  this.tide = 3;
	
	  for(let i = 0; i < 5; i++){
	    const layer = new Layer(i, this.canvas);
	    this.layers.push(layer);
	  }
	}
	
	Game.init = function(){
	  const game = new Game;
	  game.run();
	};
	
	Game.prototype.changeTide = function () {
	  if(this.tide > 4 * Listener.mouseX){
	    this.tide -= 0.1;
	  } else {
	    this.tide += 0.1;
	  }
	};
	
	Game.prototype.render = function(){
	  this.canvas.render();
	  this.layers.forEach( layer => {
	    layer.render(this.tide);
	  });
	};
	
	Game.prototype.run = function(){
	  Color.step();
	  this.changeTide();
	
	  this.render();
	  window.requestAnimationFrame(() => this.run());
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Color = __webpack_require__(3);
	
	function Canvas(){
	  this.self = document.getElementById("canvas")
	
	  this.self.width = window.innerWidth;
	  this.self.height = window.innerHeight;
	
	  this.width = this.self.width;
	  this.height = this.self.height;
	  this.ctx = this.self.getContext("2d");
	
	
	  this.ctx.globalAlpha = 0.7;
	}
	
	Canvas.prototype.render = function () {
	  this.self.style.background = Color.main();
	  this.ctx.clearRect(0, 0, this.width, this.height);
	};
	
	
	module.exports = Canvas;


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	
	Color.prototype.sail = function (dif) {
	  // stands out too much on light bg as is
	  // alter lightness/opacity based on base lightness??
	  // return "white";
	  const hsla = `hsla(${this.h + 135 + dif}, 50%, 80%, 1)`;
	  return hsla;
	};
	
	module.exports = new Color;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Wave = __webpack_require__(5);
	const Ship = __webpack_require__(10);
	const Snow = __webpack_require__(12);
	const Star = __webpack_require__(11);
	
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
	  this.stars = [];
	};
	
	Layer.prototype.render = function (tide) {
	  this.addSnow();
	  this.addStars();
	
	  this.ships.forEach( ship => {
	    ship.move();
	    ship.render();
	  });
	  this.snow.forEach( (flake, i, arr) => {
	    flake.move();
	    if(flake.point.y > window.innerHeight + 20){
	      arr[i] = null;
	    } else {} flake.render();
	  });
	  this.stars.forEach( (star, i, arr) => {
	    star.move();
	    if(star.radius < .05){
	      arr[i] = null;
	    } else {} star.render();
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
	
	Layer.prototype.addStars = function () {
	  if(Math.floor(Math.random() * 1000) < 5){
	    const star = new Star(this.wave, this.canvas.ctx, this.ratio);
	    this.stars.push(star);
	  }
	};
	
	module.exports = Layer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const WavePoint = __webpack_require__(6);
	const Color = __webpack_require__(3);
	
	function Wave(canvas, depth, ratio) {
	  this.canvas = canvas;
	  this.ratio = ratio;
	  this.spacing = 70 * this.ratio;
	  this.points = WavePoint.generatePoints(
	    canvas.width,
	    canvas.height,
	    depth * 50,
	    this.ratio,
	    this.spacing
	  );
	}
	
	Wave.prototype.render = function() {
	  const ctx = this.canvas.ctx;
	  const width = this.canvas.width;
	  const height = this.canvas.height;
	
	  ctx.save();
	
	  ctx.fillStyle = Color.wave();
	  ctx.beginPath();
	  ctx.moveTo(this.points[0].x, this.points[0].y);
	
	  this.points.forEach( (point, i) => {
	    const nextPoint = this.points[i + 1];
	    if (nextPoint) {
	      const ctrlPoint = {
	        x: (point.x + nextPoint.x) / 2,
	        y: (point.y + nextPoint.y) / 2
	      };
	      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
	    }
	  });
	
	  ctx.lineTo(width, height);
	  ctx.lineTo(0, height);
	  ctx.fill();
	
	  ctx.restore();
	};
	
	Wave.prototype.move = function (tide) {
	  this.points.forEach( point => point.move(tide) );
	  this.keepPointsInBounds();
	};
	
	Wave.prototype.keepPointsInBounds = function(){
	  const points = this.points;
	  const spacing = this.spacing;
	
	  if(points[points.length-1].x > this.canvas.width + spacing * 2){
	    const newPoint = new WavePoint(
	      points[0].x - spacing,
	      points[0].x - spacing,
	      points[points.length-1].y,
	      points[points.length-1].oldY,
	      points[0].ratio
	    );
	    points.unshift(newPoint);
	    points.pop();
	
	  } else if(points[0].x < (0 - spacing * 2)){
	    const newPoint = new WavePoint(
	      points[points.length-1].x + spacing,
	      points[points.length-1].x + spacing,
	      points[0].y,
	      points[0].oldY,
	      points[0].ratio
	    );
	    points.push(newPoint);
	    points.shift();
	  }
	};
	
	module.exports = Wave;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(7);
	const Listener = __webpack_require__(8);
	const Point = __webpack_require__(9);
	
	function WavePoint(x, y, oldX, oldY, ratio){
	  const angle = Math.random() * 360;
	  const speed = 0.0075 + Math.random()*0.0275;
	  const amplitude = (Math.random() * 10 + 30) * ratio;
	
	  Point.call(this, x, y, oldX, oldY, ratio, angle, speed, amplitude)
	}
	
	Util.inherits(WavePoint, Point);
	
	WavePoint.generatePoints = function(width, height, y, ratio, spacing){
	  const yCenter = height / 2;
	  const points = [];
	
	  for (let x = -(spacing * 2); x <= width + spacing * 2; x += spacing) {
	    let randomOffset = Math.random() * 60 - 30;
	    let xOffset = (Math.random()*20 - 10);
	    const point = new WavePoint(
	      x + xOffset * ratio,
	      x + xOffset * ratio,
	      yCenter + (y + randomOffset + Math.random() * 20) * ratio,
	      yCenter + (y + randomOffset + Math.random() * 20) * ratio,
	      ratio
	    );
	    points.push(point);
	  }
	  return points;
	};
	
	WavePoint.prototype.move = function (tide) {
	  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * Listener.mouseY * this.ratio * .5 + Math.sin(this.angle) * this.amplitude * .5;
	  this.x += tide * this.ratio;
	  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
	};
	
	
	module.exports = WavePoint;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	  inherits (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	const _viableKeys = [37, 38, 39, 40];
	
	function Listener(){
	  this.keys = {};
	  this.mouseX = 0;
	  this.mouseY = 0;
	
	  document.addEventListener("keydown", e => this._keyDown(e));
	  document.addEventListener("keyup", e => this._keyUp(e));
	  document.addEventListener("mousemove", e => this._mouseMove(e));
	  document.addEventListener("mouseenter", e => this._mouseMove(e));
	}
	
	Listener.prototype._keyDown = function (e) {
	  const code = e.keyCode;
	  if(_viableKeys.includes(code)){
	    e.preventDefault();
	    this.keys[e.keyCode] = true;
	  }
	};
	
	Listener.prototype._keyUp = function (e) {
	  const code = e.keyCode;
	  if(_viableKeys.includes(code)){
	    e.preventDefault();
	    delete this.keys[code];
	  }
	};
	
	Listener.prototype._mouseMove = function (e) {
	  this.mouseX = (e.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2);
	  this.mouseY = (window.innerHeight - e.clientY) / (window.innerHeight);
	};
	
	
	module.exports = new Listener;


/***/ },
/* 9 */
/***/ function(module, exports) {

	function Point(x, y, oldX, oldY, ratio, angle, speed, amplitude){
	  this.x = x;
	  this.y = y;
	  this.oldX = oldX;
	  this.oldY = oldY;
	  this.ratio = ratio;
	  this.angle = angle;
	  this.speed = speed;
	  this.amplitude = amplitude;
	}
	
	module.exports = Point;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const Listener = __webpack_require__(8);
	const Color = __webpack_require__(3);
	
	function Ship(wave, ctx, ratio){
	  this.wave = wave;
	  this.ctx = ctx;
	  this.x = Math.random() * (window.innerWidth - 100) + 50;
	  this.y = 0;
	  this.tilt = 0;
	  this.ratio = ratio;
	  this.colorDifference = (Math.floor(Math.random() * 5) - 2) * 15;
	}
	
	Ship.prototype.render = function(){
	  const ratio = this.ratio;
	  this.ctx.fillStyle = Color.hull();
	
	  this.ctx.save();
	
	  // hull
	  this.ctx.beginPath();
	  const begin = .2 + this.tilt;
	  const end = Math.PI-.2 + this.tilt;
	  this.ctx.arc(this.x, this.y - 20 * ratio, 25 * ratio, begin, end);
	  this.ctx.fill();
	
	  // rotate for mast and sail
	  this.ctx.translate(this.x, this.y);
	  this.ctx.rotate(this.tilt); // rotate
	
	  // mast
	  // this.ctx.moveTo(0, -15);
	  // this.ctx.lineTo(0, -60);
	  // this.ctx.stroke();
	  this.ctx.closePath();
	  this.ctx.beginPath();
	
	  // sail
	  this.ctx.fillStyle = Color.sail(this.colorDifference);
	  this.ctx.moveTo(0, -60 * ratio);
	  this.ctx.lineTo(-30 * ratio - (this.tilt * 60 * ratio), -20 * ratio);
	  this.ctx.lineTo(30 * ratio - (this.tilt * 60 * ratio), -20 * ratio);
	  this.ctx.fill();
	
	  this.ctx.restore();
	};
	
	Ship.prototype.move = function(){
	  // if(Listener.keys[40]) this.x += 2;
	  // if(Listener.keys[38]) this.x -= 2;
	
	  // this.x += Listener.mouseY * 3;
	
	
	
	  if(this.x < this.wave.points[0].x){
	    this.x = window.innerWidth + 50;
	  } else if(this.x > this.wave.points[this.wave.points.length - 1].x){
	    this.x = -50;
	  }
	
	  for(let i = 0; i < this.wave.points.length; i++){
	    const point = this.wave.points[i];
	    if(point.x > this.x){
	      const prevPoint = this.wave.points[i-1];
	
	      const total = Math.abs(point.x - prevPoint.x)
	      const left = Math.abs(this.x - prevPoint.x);
	      const right = Math.abs(this.x - point.x);
	      const leftWeight = right / total; // opposite on purpose
	      const rightWeight = left / total; // closer should mean bigger, not smaller
	
	      this.y = (prevPoint.y * leftWeight + point.y * rightWeight);
	      const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);
	
	      // maybe make use of the tide variable when determining x movement
	      this.x += 6 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
	      this.tilt = (Math.PI / 2) * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
	
	      break
	    }
	  }
	};
	
	module.exports = Ship;
	
	
	
	
	// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	const Color = __webpack_require__(3);
	const StarPoint = __webpack_require__(13);
	
	function Star(wave, ctx, ratio){
	  this.wave = wave;
	  this.ctx = ctx;
	  this.ratio = ratio;
	
	  this.point = new StarPoint(this.ratio);
	
	  this.radius = 10;
	}
	
	Star.prototype.move = function () {
	  // conditionals need to be based on spacing
	  if(this.point.x < this.wave.points[0].x){
	    this.point.x = window.innerWidth + 10;
	  } else if(this.point.x > this.wave.points[this.wave.points.length - 1].x){
	    this.point.x = -10;
	  }
	
	  for(let i = 0; i < this.wave.points.length; i++){
	    const point = this.wave.points[i];
	    if(point.x > this.point.x){
	      const prevPoint = this.wave.points[i-1];
	
	      const total = Math.abs(point.x - prevPoint.x)
	      const left = Math.abs(this.point.x - prevPoint.x);
	      const right = Math.abs(this.point.x - point.x);
	      const leftWeight = right / total; // opposite on purpose
	      const rightWeight = left / total; // closer should mean bigger, not smaller
	
	      const waveY = (prevPoint.y * leftWeight + point.y * rightWeight);
	
	      if(this.point.y < waveY - 2){
	        this.point.move();
	      } else {
	        this.radius -= 0.005;
	        this.point.y = waveY;
	        const heightWidthRatio = (point.y - prevPoint.y) / (point.x - prevPoint.x);
	
	        // maybe make use of the tide variable when determining x movement
	        this.point.x += 1 * this.ratio * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
	      }
	      break
	    }
	  }
	};
	
	
	Star.prototype.render = function () {
	  const ratio = this.ratio;
	  this.ctx.fillStyle = Color.snow();
	
	  this.ctx.save();
	
	  this.ctx.beginPath();
	  const begin = .2 + this.tilt;
	  const end = Math.PI-.2 + this.tilt;
	  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio, 0, Math.PI * 2);
	  this.ctx.fill();
	  this.ctx.closePath();
	
	  this.ctx.restore();
	};
	
	
	module.exports = Star;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	const Color = __webpack_require__(3);
	const SnowPoint = __webpack_require__(13);
	
	function Snow(wave, ctx, ratio){
	  this.wave = wave;
	  this.ctx = ctx;
	  this.ratio = ratio;
	
	  this.point = new SnowPoint(this.ratio);
	
	  this.radius = 4;
	}
	
	Snow.prototype.move = function () {
	  this.point.move();
	};
	
	
	Snow.prototype.render = function () {
	  const ratio = this.ratio;
	  this.ctx.fillStyle = Color.snow();
	
	  this.ctx.save();
	
	  this.ctx.beginPath();
	  const begin = .2 + this.tilt;
	  const end = Math.PI-.2 + this.tilt;
	  this.ctx.arc(this.point.x, this.point.y, this.radius * ratio, 0, Math.PI * 2);
	  this.ctx.fill();
	  this.ctx.closePath();
	
	  this.ctx.restore();
	};
	
	
	module.exports = Snow;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(7);
	const Point = __webpack_require__(9);
	
	function SnowPoint(ratio){
	  const x = Math.random() * window.innerWidth;
	  const y = -20;
	  const angle = Math.random() * 360;
	  const speed = 0.0075 + Math.random()*0.0275;
	  const amplitude = (Math.random() * 10 + 10) * ratio;
	
	  Point.call(this, x, y, x, y, ratio, angle, speed, amplitude)
	}
	
	Util.inherits(SnowPoint, Point);
	
	SnowPoint.prototype.move = function (tide) {
	  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * this.ratio;
	  this.x = this.oldX + Math.sin(this.angle) * this.amplitude * this.ratio;
	  this.oldX += .5 * this.ratio;
	  this.oldY += 1.5 * this.ratio;
	  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
	};
	
	
	module.exports = SnowPoint;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map