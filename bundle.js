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
	const Color = __webpack_require__(8);
	
	// global singleton canvas, or too dangerous?
	
	const Listener = __webpack_require__(3);
	
	function Game(){
	  this.canvas = new Canvas;
	  this.waves = [];
	  this.ships = [];
	
	  this.tideIn = true;
	  this.tide = 3;
	
	  this.layers = [];
	
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

	const Color = __webpack_require__(8);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Wave = __webpack_require__(5);
	const Ship = __webpack_require__(7);
	
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
	};
	
	Layer.prototype.render = function (tide) {
	  this.ships.forEach( ship => {
	    ship.move();
	    ship.render();
	  });
	  this.wave.render(tide); // TODO: globalize game for easy tide reference??
	};
	
	module.exports = Layer;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(6);
	const Color = __webpack_require__(8);
	
	function Wave(canvas, depth, ratio) {
	  this.canvas = canvas;
	  this.ratio = ratio;
	  this.spacing = 70 * this.ratio;
	  this.points = Point.generatePoints(
	    canvas.width,
	    canvas.height,
	    depth,
	    this.ratio,
	    this.spacing
	  );
	}
	
	Wave.prototype.render = function(tide) {
	  const ctx = this.canvas.ctx;
	  const width = this.canvas.width;
	  const height = this.canvas.height;
	
	  ctx.save();
	  ctx.fillStyle = Color.wave();
	  ctx.beginPath();
	  ctx.moveTo(this.points[0].x, this.points[0].y);
	  this.points.forEach( (point, i) => {
	    point.move(tide);
	    const nextPoint = this.points[i + 1];
	    if (nextPoint) {
	      const ctrlPoint = {
	        x: (point.x + nextPoint.x) / 2,
	        y: (point.y + nextPoint.y) / 2
	      };
	      ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
	    }
	  });
	
	  this.keepPointsInBounds();
	
	  ctx.lineTo(width, height);
	  ctx.lineTo(0, height);
	  ctx.fill();
	
	  ctx.restore();
	};
	
	Wave.prototype.keepPointsInBounds = function(){
	  if(this.points[this.points.length-1].x > this.canvas.width + this.spacing * 2){
	    const newPoint = new Point(
	      this.points[0].x - this.spacing,
	      this.points[this.points.length-1].y,
	      this.points[this.points.length-1].oldY,
	      this.points[0].ratio
	    );
	    this.points.unshift(newPoint);
	    this.points.pop();
	  } else if(this.points[0].x < (0 - this.spacing * 2)){
	    const newPoint = new Point(
	      this.points[this.points.length-1].x + this.spacing,
	      this.points[0].y,
	      this.points[0].oldY,
	      this.points[0].ratio
	    );
	    this.points.push(newPoint);
	    this.points.shift();
	  }
	};
	
	module.exports = Wave;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Listener = __webpack_require__(3);
	
	function Point(x, y, oldY, ratio){
	  this.x = x;
	  this.y = y;
	  this.oldY = oldY;
	  this.ratio = ratio;
	
	  this.angle = Math.random() * 360;
	  this.speed = 0.0075 + Math.random()*0.0275;
	  this.amplitude = Math.random() * 10 + 30;
	}
	
	Point.generatePoints = function(width, height, depth, ratio, spacing){
	  const offset = depth * 50;
	  const yCenter = height / 2;
	  const points = [];
	
	  for (let x = -(spacing * 2); x <= width + spacing * 2; x += spacing) {
	    let randomOffset = Math.random() * 60 - 30;
	    const point = new Point(
	      x + (Math.random()*20 - 10) * ratio,
	      yCenter + offset + randomOffset * ratio,
	      yCenter + offset + randomOffset * ratio + 10 + Math.random() * 20,
	      ratio
	    );
	    points.push(point);
	  }
	  return points;
	};
	
	Point.prototype.move = function (tide) {
	  this.y = this.oldY + Math.sin(this.angle) * this.amplitude * Listener.mouseY * this.ratio * .5 + Math.sin(this.angle) * this.amplitude * .5;
	  this.x += tide * this.ratio;
	  this.angle += 1.5 * this.speed; //* Math.abs(Listener.mouseX) + .5 * this.speed;
	};
	
	module.exports = Point;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Listener = __webpack_require__(3);
	const Color = __webpack_require__(8);
	
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
	
	  if(this.x < this.wave.points[0].x ||
	     this.x > this.wave.points[this.wave.points.length - 1]) return;
	
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
/* 8 */
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
	
	Color.prototype.sail = function (dif) {
	  // stands out too much on light bg as is
	  // alter lightness/opacity based on base lightness??
	  // return "white";
	  const hsla = `hsla(${this.h + 135 + dif}, 50%, 80%, 1)`;
	  return hsla;
	};
	
	module.exports = new Color;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map