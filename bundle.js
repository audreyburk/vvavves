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
	const Wave = __webpack_require__(3);
	const Ship = __webpack_require__(5);
	const Listener = __webpack_require__(6);
	
	function Game(){
	  this.canvas = new Canvas;
	  this.waves = [];
	  this.ships = [];
	
	  this.tideIn = true;
	  this.tide = 3;
	
	  this.lIncreasing = true;
	  this.color = {
	    h: Math.random() * 360,
	    s: 100,
	    l: 5,
	    a: 1
	  };
	
	  for(let i = 0; i < 7; i++){
	    const offset = i * 50;
	    const wave = new Wave(this.canvas, offset, "rgba(255, 255, 255, .3)");
	    this.waves.push(wave);
	
	    this.ships.push(new Ship(this.waves[i], this.canvas.ctx));
	  }
	}
	
	Game.init = function(){
	  const game = new Game;
	  game.run();
	};
	
	Game.prototype.changeTide = function () {
	  console.log(Listener.mousePosition);
	  // make this smooth by checking if we're higher/lower than hat number, then incrementing by .05 or whatev
	  if(this.tide > 5 * Listener.mousePosition){
	    this.tide -= 0.1;
	  } else {
	    this.tide += 0.1;
	  }
	
	  // if(this.tideIn){
	  //   if(this.tide >= 3.5){
	  //     this.tideIn = false;
	  //     this.tide -= .001;
	  //   } else this.tide += .001;
	  // } else {
	  //   if(this.tide <= 2){
	  //     this.tideIn = true;
	  //     this.tide += .001;
	  //   } else this.tide -= .001;
	  // }
	};
	
	Game.prototype.changeColor = function(){
	  this.color.h >= 360 ? this.color.h = 0 : this.color.h += .1;
	
	  if(this.lIncreasing){
	    if(this.color.l >= 30){
	      this.lIncreasing = false;
	      this.color.l -= .01;
	    } else this.color.l += .01;
	  } else {
	    if(this.color.l <= 5){
	      this.lIncreasing = true;
	      this.color.l += .01;
	    } else this.color.l -= .01;
	  }
	};
	
	Game.prototype.render = function(){
	  this.changeColor();
	  this.changeTide();
	
	  this.canvas.render(this.color);
	
	  // ships stored in each waves
	  // each waves renders ships before itself
	  for(let i = 0; i < this.ships.length; i++){
	    this.ships[i].move();
	    this.ships[i].render(this.color);
	    if(this.waves[i]) this.waves[i].render(this.tide);
	  }
	};
	
	Game.prototype.run = function(){
	  this.render();
	  window.requestAnimationFrame(() => this.run());
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Canvas(){
	  this.self = document.getElementById("canvas")
	
	  this.self.width = window.innerWidth;
	  this.self.height = window.innerHeight;
	
	  this.width = this.self.width;
	  this.height = this.self.height;
	  this.ctx = this.self.getContext("2d");
	
	
	  this.ctx.globalAlpha = 0.7;
	}
	
	Canvas.prototype.render = function (color) {
	  const hsla = `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`;
	  this.self.style.background = hsla;
	  this.ctx.clearRect(0, 0, this.width, this.height);
	};
	
	
	module.exports = Canvas;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(4);
	
	function Wave(canvas, offset, color) {
	  this.canvas = canvas;
	  this.points = Point.generatePoints(canvas.width, canvas.height, offset);
	  this.color = color;
	}
	
	Wave.prototype.render = function(tide) {
	  const ctx = this.canvas.ctx;
	  const width = this.canvas.width;
	  const height = this.canvas.height;
	
	  ctx.save();
	  ctx.fillStyle = this.color;
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
	  if(this.points[this.points.length-1].x > this.canvas.width + (this.canvas.width / 9)){
	    const newPoint = new Point(
	      this.points[0].x - (this.canvas.width / 18),
	      this.points[this.points.length-1].y,
	      this.points[this.points.length-1].oldY,
	      Math.random() * 360,
	      0.0175 + Math.random()*0.0175
	    );
	    this.points.unshift(newPoint);
	    this.points.pop();
	  } else if(this.points[0].x < (0 - (this.canvas.width / 9))){
	    const newPoint = new Point(
	      this.points[this.points.length-1].x + (this.canvas.width / 18),
	      this.points[0].y,
	      this.points[0].oldY,
	      Math.random() * 360,
	      0.0175 + Math.random()*0.0175
	    );
	    this.points.push(newPoint);
	    this.points.shift();
	  }
	};
	
	module.exports = Wave;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Point(x, y, oldY, angle, speed){
	  this.x = x;
	  this.y = y;
	  this.oldY = oldY;
	  this.angle = angle;
	  this.speed = speed;
	}
	
	Point.generatePoints = function(width, height, offset){
	  const yCenter = height / 2;
	  const spacing = width / 18;
	  const points = [];
	
	  for (let x = 0; x <= width + width / 4; x += spacing) {
	    const angle = Math.random() * 360;
	    let randomOffset = Math.random() * 60 - 30;
	    const point = new Point(
	      x + (Math.random()*20 - 10),
	      yCenter + offset + randomOffset,
	      yCenter + offset + randomOffset + 10 + Math.random() * 20,
	      angle,
	      0.0175 + Math.random()*0.0175
	    );
	    points.push(point);
	  }
	  return points;
	};
	
	Point.prototype.move = function (tide) {
	  this.y = this.oldY + Math.sin(this.angle) * 35;
	  this.x += tide;
	  this.angle += this.speed;
	};
	
	module.exports = Point;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Listener = __webpack_require__(6);
	
	function Ship(wave, ctx){
	  this.wave = wave;
	  this.ctx = ctx;
	  this.x = Math.random() * (window.innerWidth - 100) + 50;
	  this.y = 0;
	  this.tilt = 0;
	}
	
	Ship.prototype.render = function(color){
	  const hsla = `hsla(${color.h + 120}, ${color.s}%, 0%, ${color.a})`;
	
	  this.ctx.save();
	  this.ctx.fillStyle = hsla;
	  this.ctx.beginPath();
	  const begin = .2 + this.tilt;
	  const end = Math.PI-.2 + this.tilt;
	  this.ctx.arc(this.x, this.y - 15, 25, begin, end);
	  this.ctx.fill();
	  this.ctx.restore();
	};
	
	Ship.prototype.move = function(){
	  if(Listener.keys[40]) this.x += 1;
	  if(Listener.keys[38]) this.x -= 1;
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
	      this.x += 2 * heightWidthRatio;
	      this.tilt = (Math.PI / 2) * heightWidthRatio * (leftWeight < rightWeight ? leftWeight : rightWeight);
	
	      break
	    }
	  }
	};
	
	module.exports = Ship;
	
	
	
	
	// y(t) = (y0−2y1+y2)t^2 + (2y1−2y0)t + y0


/***/ },
/* 6 */
/***/ function(module, exports) {

	const _viableKeys = [37, 38, 39, 40];
	
	function Listener(){
	  this.keys = {};
	  this.mousePosition = 0;
	
	  document.addEventListener("keydown", e => this._keyDown(e));
	  document.addEventListener("keyup", e => this._keyUp(e));
	  document.addEventListener("mousemove", e => this._mouseMove(e));
	}
	
	Listener.prototype._keyDown = function (e) {
	  console.log(e.keyCode);
	  const code = e.keyCode;
	  if(_viableKeys.includes(code)){
	    e.preventDefault();
	    this._keys[e.keyCode] = true;
	  }
	};
	
	Listener.prototype._keyUp = function (e) {
	  const code = e.keyCode;
	  if(_viableKeys.includes(code)){
	    e.preventDefault();
	    delete this._keys[code];
	  }
	};
	
	Listener.prototype._mouseMove = function (e) {
	  this.mousePosition = (e.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2);
	};
	
	
	module.exports = new Listener;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map