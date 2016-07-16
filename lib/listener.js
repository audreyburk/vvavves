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
