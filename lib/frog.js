(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Frog = Frogger.Frog = function (options) {
    this.facing = "up";
    options.vel = 0;
    Frogger.MovingObject.call(this, options);
  };

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.MOVE_AMOUNT = 37.5;

  Frog.prototype.move = function (direction) {
    if (typeof direction === "undefined") {
      return;
    }
    var x = 0,
        y = 0;
    this.facing = direction;
    switch (direction) {
      case "up":
        y -= Frog.MOVE_AMOUNT;
        break;
      case "down":
        y += Frog.MOVE_AMOUNT;
        break;
      case "left":
        x -= Frog.MOVE_AMOUNT;
        break;
      case "right":
        x += Frog.MOVE_AMOUNT;
        break;
    }
    var oldPos = this.pos,
        newPos = [this.pos[0] + x, this.pos[1] + y];
    this.game.setNewPos(newPos, this);
    if (oldPos[0] !== this.pos[0] || oldPos[1] !== this.pos[1]) {
      var hopSound = document.createElement("audio");
      hopSound.setAttribute("src", "assets/frogger_hop.wav");
      hopSound.play();
    }
  };

  Frog.prototype.draw = function (ctx) {
    switch (this.facing) {
      case "up":
        this.sourceOffset = Frogger.Game.FROG_UP.sourceOffset;
        this.dims = Frogger.Game.FROG_UP.dims;
        break;
      case "down":
        this.sourceOffset = Frogger.Game.FROG_DOWN.sourceOffset;
        this.dims = Frogger.Game.FROG_DOWN.dims;
        break;
      case "left":
        this.sourceOffset = Frogger.Game.FROG_LEFT.sourceOffset;
        this.dims = Frogger.Game.FROG_LEFT.dims;
        break;
      case "right":
        this.sourceOffset = Frogger.Game.FROG_RIGHT.sourceOffset;
        this.dims = Frogger.Game.FROG_RIGHT.dims;
        break;
    }

    ctx.drawImage(this.img, this.sourceOffset[0], this.sourceOffset[1],
                  this.dims[0], this.dims[1], this.pos[0],
                  this.pos[1], this.gameDims[0], this.gameDims[1]);
  };
})();
