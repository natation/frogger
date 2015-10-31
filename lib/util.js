(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Util = Frogger.Util = function (options) {};

  Util.inherits = function (child, parent) {
    function Surrogate () {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate ();
    child.prototype.constructor = child;
  };

  Util.setImages = function (images) {
    var Game = Frogger.Game;
    Game.BG = [images.bg, 0, 0];
    Game.FROG = images.frog;
    Game.FROG_UP = {img: images.froggerSprites,
                     sourceOffset: [12, 370],
                     dims: [23, 17],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_DOWN = {img: images.froggerSprites,
                     sourceOffset: [80, 370],
                     dims: [23, 17],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_LEFT = {img: images.froggerSprites,
                     sourceOffset: [80, 335],
                     dims: [17, 23],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_RIGHT = {img: images.froggerSprites,
                     sourceOffset: [12, 335],
                     dims: [17, 23],
                     gameDims: Game.FROG_DIMS};
    Game.TRUCK_LG = {img: images.froggerSprites,
                     sourceOffset: [105, 300],
                     dims: [45, 20],
                     gameDims: [60, 26]};
    Game.TRUCK_YELLOW = {img: images.froggerSprites,
                     sourceOffset: [80, 263],
                     dims: [25, 26]};
    Game.TRUCK_PINK = {img: images.froggerSprites,
                     sourceOffset: [8, 265],
                     dims: [30, 22]};
    Game.TRUCK_WHITE = {img: images.froggerSprites,
                     sourceOffset: [45, 265],
                     dims: [30, 25]};
    Game.TRUCK_BULLDOZER_WHITE = {img: images.froggerSprites,
                     sourceOffset: [10, 300],
                     dims: [25, 21]};
  };
})();
