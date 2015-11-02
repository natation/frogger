(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }
  var Game = Frogger.Game;

  var Frog = Frogger.Frog = function (options) {
    this.facing = "up";
    this.isJumping = false;
    this.isDead = false;
    this.onMovingObject = false;
    this.deadFrames = Frog.DEAD_FRAMES;
    this.jumpFrames = Frog.JUMP_FRAMES;
    options.vel = 0;
    Frogger.MovingObject.call(this, options);
  };

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.MOVE_AMOUNT = 37.5;
  Frog.JUMP_FRAMES = 5;
  Frog.DEAD_FRAMES = 30;

  Frog.prototype.move = function (direction) {
    var x = 0,
        y = 0;
    if (this.isJumping || this.isDead) {
      return;
    } else if (this.onMovingObject && typeof direction === "undefined") {
      x += this.onMovingObject.vel;
      var newPos = [this.pos[0] + x, this.pos[1]];
      this.game.setNewPos(newPos, this);
    } else {
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
      this.finalPos = this.game.setNewPos(newPos, this);
      if (oldPos[0] !== this.pos[0] || oldPos[1] !== this.pos[1]) {
        Frogger.Util.playSound("hop");
        this.isJumping = true;
        this.onMovingObject = false;
        this.oldPos = oldPos;
        this.pos = newPos;
        this.newPos = newPos;
      }
    }
  };

  Frog.prototype.draw = function (ctx) {
    if (this.isDead) {
      if (this.deadFrames >= 30) {
        Frogger.Util.playSound("dead");
      } else if (this.deadFrames <= 0) {
        return this.reset();
      }
      this.deadFrames -= 1;
      var options = Game.FROG_DEAD;
      ctx.drawImage(options.img, 0, 0,
                    options.dims[0], options.dims[1], this.pos[0],
                    this.pos[1], options.gameDims[0], options.gameDims[1]);
    } else {
      if (this.isJumping) {
        this.handleJump();
      } else {
        switch (this.facing) {
          case "up":
            this.sourceOffset = Game.FROG_UP.sourceOffset;
            this.dims = Game.FROG_UP.dims;
            break;
          case "down":
            this.sourceOffset = Game.FROG_DOWN.sourceOffset;
            this.dims = Game.FROG_DOWN.dims;
            break;
          case "left":
            this.sourceOffset = Game.FROG_LEFT.sourceOffset;
            this.dims = Game.FROG_LEFT.dims;
            break;
          case "right":
            this.sourceOffset = Game.FROG_RIGHT.sourceOffset;
            this.dims = Game.FROG_RIGHT.dims;
            break;
        }
      }
      ctx.drawImage(this.img, this.sourceOffset[0], this.sourceOffset[1],
                    this.dims[0], this.dims[1], this.pos[0],
                    this.pos[1], this.gameDims[0], this.gameDims[1]);
    }
  };

  Frog.prototype.handleJump = function () {
    this.jumpFrames -= 1;
    var diffAbsX = Math.abs(this.newPos[0] - this.oldPos[0]),
        diffAbsY = Math.abs(this.newPos[1] - this.oldPos[1]);
    switch (this.facing) {
      case "up":
        this.sourceOffset = Game.FROG_UP_JUMP.sourceOffset;
        this.dims = Game.FROG_UP_JUMP.dims;
        this.gameDims = Game.FROG_UP_JUMP.gameDims;
        this.pos[1] = this.oldPos[1] - diffAbsY / this.jumpFrames;
        break;
      case "down":
        this.sourceOffset = Game.FROG_DOWN_JUMP.sourceOffset;
        this.dims = Game.FROG_DOWN_JUMP.dims;
        this.gameDims = Game.FROG_DOWN_JUMP.gameDims;
        this.pos[1] = this.oldPos[1] + diffAbsY / this.jumpFrames;
        break;
      case "left":
        this.sourceOffset = Game.FROG_LEFT_JUMP.sourceOffset;
        this.dims = Game.FROG_LEFT_JUMP.dims;
        this.gameDims = Game.FROG_LEFT_JUMP.gameDims;
        this.pos[0] = this.oldPos[0] - diffAbsX / this.jumpFrames;
        break;
      case "right":
        this.sourceOffset = Game.FROG_RIGHT_JUMP.sourceOffset;
        this.dims = Game.FROG_RIGHT_JUMP.dims;
        this.gameDims = Game.FROG_RIGHT_JUMP.gameDims;
        this.pos[0] = this.oldPos[0] + diffAbsX / this.jumpFrames;
        break;
    }
    if (this.jumpFrames <= 0) {
      this.pos = this.finalPos;
      this.isJumping = false;
      this.jumpFrames = Frog.JUMP_FRAMES;
      this.gameDims = Game.FROG_UP.gameDims;
    }
  };

  Frog.prototype.reset = function () {
    this.deadFrames = 30;
    this.isDead = false;
    this.pos = Game.STARTING_POS;
    this.facing = "up";
    Frogger.Util.playSound("init");
  }
})();
