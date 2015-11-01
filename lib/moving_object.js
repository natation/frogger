(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var MovingObject = Frogger.MovingObject = function (options) {
    this.img = options.img;
    this.dims = options.dims;
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.sourceOffset = options.sourceOffset || [0, 0];
    this.gameDims = options.gameDims || this.dims;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.sourceOffset[0], this.sourceOffset[1],
                  this.dims[0], this.dims[1], this.pos[0],
                  this.pos[1], this.gameDims[0], this.gameDims[1]);
  };

  MovingObject.prototype.move = function () {
    var newPos = [this.pos[0] + this.vel, this.pos[1]];
    this.game.setNewPos(newPos, this);
  };
})();
