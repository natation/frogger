(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }
  var Util = Frogger.Util;

  var Game = Frogger.Game = function (images) {
    Util.setImages(images);
    this.frog = {};
    this.trucks = [];
    this.logs = [];
    this.turtles = [];
    this.lilyPads = [false, false, false, false, false];
    this.level = 1;
    Util.setupLevel(this);
  };

  Game.FPS = 32;
  Game.DIM_X = 516;
  Game.DIM_Y = 505;
  Game.FROG_UPPER_Y = 62.5;
  Game.FROG_DIMS = [25, 25];
  Game.STARTING_POS = [(Game.DIM_X / 2) - Game.FROG_DIMS[1] / 2,
                        Game.DIM_Y - Game.FROG_DIMS[1] - 5];

  Game.ROW_0 = 438;
  Game.ROW_1 = 398;
  Game.ROW_2 = 358;
  Game.ROW_3 = 325;
  Game.ROW_4 = 285;
  Game.ROW_5 = 214;
  Game.ROW_6 = 176;
  Game.ROW_7 = 139;
  Game.ROW_8 = 100;
  Game.ROW_9 = 63;

  Game.prototype.allObjects = function () {
    return [].concat(this.trucks, this.logs, this.turtles, [this.frog]);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkForUpdate();
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.checkForUpdate = function () {
    var object;
    if (this.isWon() || this.frog.isJumping || this.frog.isDead) {
      return;
    } else if (object = this.isCollision()) {
      if (!this.isCollisionOk(object)) {
        this.frog.isDead = true;
      }
    } else if (this.frog.pos[1] <= Game.ROW_5) {
      this.frog.isDead = true;
    }
  };

  Game.prototype.draw = function (ctx) {
    Util.drawBackground.call(this, ctx);
    Util.drawLilyPads.call(this, ctx);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isWon = function () {
    var isWon = true;
    this.lilyPads.forEach(function (lilyPad) {
      if (!lilyPad) {
        isWon = false;
      }
    });
    return isWon;
  };

  Game.prototype.isCollision = function () {
    var isCollision = false;
    this.allObjects().forEach(function (object) {
      if (object === this.frog) {
        return;
      } else if (Util.isCollided(this.frog, object)) {
        isCollision = object;
      }
    }, this);
    return isCollision;
  };

  Game.prototype.isCollisionOk = function (object) {
    if (object instanceof Frogger.Log ||
        object instanceof Frogger.Turtle &&
        object.isAboveWater) {
          this.frog.onMovingObject = object;
          return object;
        }
    return false;
  };

  Game.prototype.add = function (object) {
    if (object instanceof Frogger.Frog) {
      this.frog = object;
    } else if (object instanceof Frogger.Truck) {
      this.trucks.push(object);
    } else if (object instanceof Frogger.Log) {
      this.logs.push(object);
    } else if (object instanceof Frogger.Turtle) {
      this.turtles.push(object);
    } else {
      throw "not a recognized object";
    }
  };

  Game.prototype.addFrog = function () {
    var options = Game.FROG_UP;
    options.pos = Game.STARTING_POS;
    options.game = this;
    var frog = new Frogger.Frog(options);
    this.add(frog);
    return frog;
  };

  Game.prototype.setNewPos = function (newPos, object) {
    if (object instanceof(Frogger.Frog)) {
      return setFrogPos.call(this, newPos, object);
    } else {
      setObjPos.call(this, newPos, object);
    }
  };

  function setFrogPos(pos, frog) {
    var x = pos[0],
        y = pos[1],
        width = frog.gameDims[0],
        height = frog.gameDims[1];
    if (x < 0) {
      x = 0;
      frog.isDead = true;
    } else if (x + width > Game.DIM_X) {
      x = Game.DIM_X - width;
      frog.isDead = true;
    } else if (y < Game.FROG_UPPER_Y) {
      var lilyPad = Util.xMatchingLilyPad(x);
      if (lilyPad === -1 || this.lilyPads[lilyPad]) {
        y = Game.FROG_UPPER_Y;
        frog.isDead = true;
      } else {
        this.lilyPads[lilyPad] = true;
        x = Game.STARTING_POS[0];
        y = Game.STARTING_POS[1];
        Util.playSound("success");
      }
    } else if (y > Game.DIM_Y - height) {
      y = Game.STARTING_POS[1];
      frog.isDead = true;
    }
    frog.pos = [x, y];
    return [x, y];
  }

  function setObjPos (pos, object) {
    var Game = Frogger.Game;
    var x = pos[0],
        y = pos[1];
    if (x < -object.gameDims[0] && object.vel < 0) {
      x = Game.DIM_X;
    } else if (x > Game.DIM_X && object.vel > 0) {
      x = -(object.gameDims[0]);
    }
    object.pos = [x, y];
  }
})();
