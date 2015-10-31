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

  Frog.MOVE_AMOUNT_X = 37.5;
  Frog.MOVE_AMOUNT_Y = 37.5;

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

  // Frog.prototype.draw = function (ctx) {
  //   switch (this.facing) {
  //     case "up":
  //     this.img
  //       break;
  //     case "down":
  //       break;
  //     case "left":
  //       break;
  //     case "right":
  //       break;
  //     default:
  //
  //   }
  //   if (game.facing == 'u') {
  //       context.drawImage(sprites, 12, 369, 23, 17, game.posX, game.posY, 23, 17);
  //   }
  //   else if (game.facing == 'd') {
  //       context.drawImage(sprites, 80, 369, 23, 17, game.posX, game.posY, 23, 17);
  //   }
  //   else if (game.facing == 'l') {
  //       context.drawImage(sprites, 80, 335, 19, 23, game.posX, game.posY, 19, 23);
  //   }
  //   else if (game.facing == 'r') {
  //       context.drawImage(sprites, 12, 335, 19, 23, game.posX, game.posY, 19, 23);
  //   ctx.drawImage(this.img, this.offset[0], this.offset[1],
  //                 this.dims[0], this.dims[1], this.pos[0],
  //                 this.pos[1], this.gameDims[0], this.gameDims[1]);
  // };
})();
