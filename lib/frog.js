(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Frog = Frogger.Frog = function (options) {
    options.vel = 0;
    Frogger.MovingObject.call(this, options);
  };

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.MOVE_AMOUNT_X = 20;
  Frog.MOVE_AMOUNT_Y = 37;

  Frog.prototype.move = function (direction) {
    var x = 0,
        y = 0;
    switch (direction) {
      case "up":
        y -= Frog.MOVE_AMOUNT_Y;
        break;
      case "down":
        y += Frog.MOVE_AMOUNT_Y;
        break;
      case "left":
        x -= Frog.MOVE_AMOUNT_X;
        break;
      case "right":
        x += Frog.MOVE_AMOUNT_X;
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
})();
