const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  document.getElementById("canvas").addEventListener("click", Game.init);
});
