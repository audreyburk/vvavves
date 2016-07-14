function Listener(){
  this._keys = {};

  document.addEventListener("keydown", e => this._keyDown(e));
  document.addEventListener("keyup", e => this._keyUp(e));
}

Listener.prototype._keyDown = function (e) {
  const code = e.keyCode;
  if(code === 37 || code === 39){
    e.preventDefault();
    this._keys[e.keyCode] = true;
  }
};

Listener.prototype._keyUp = function (e) {
  const code = e.keyCode;
  if(code === 37 || code === 39){
    e.preventDefault();
    delete this._keys[code];
  }
};

Listener.prototype.keys = function(){
  return Object.assign({}, this._keys);
};

module.exports = new Listener;
