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
