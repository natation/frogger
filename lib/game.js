(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Game = Frogger.Game = function (images) {
    Game.setImages(images);
    this.frogs = [];
    this.trucks = [];
    this.logs = [];
    this.turtles = [];
    this.lilyPads = [false, false, false, false, false];
  };

  Game.FPS = 32;
  Game.DIM_X = 516;
  Game.DIM_Y = 505;
  Game.FROG_UPPER_Y = 50;
  Game.FROG_DIMS = [40, 40];
  Game.STARTING_POS = [(Game.DIM_X / 2) - (Game.FROG_DIMS[0] / 2),
                        Game.DIM_Y - Game.FROG_DIMS[1]];

  Game.setImages = function (images) {
    Game.BG = [images.bg, 0, 0];
    Game.FROG = images.frog;
  };

  Game.prototype.add = function (object) {
    if (object instanceof Frogger.Frog) {
      this.frogs.push(object);
    } else if (object instanceof Frogger.Truck) {
      this.trucks.push(object);
    } else if (object instanceof Frogger.Log) {
      this.logs.push(object);
    } else if (object instanceof Frogger.turtles) {
      this.turtles.push(object);
    } else {
      throw "not a recognized object";
    }
  };

  Game.prototype.addFrog = function () {
    var frog = new Frogger.Frog({
      img: Game.FROG,
      dims: Game.FROG_DIMS,
      pos: Game.STARTING_POS,
      game: this
    });
    this.add(frog);
    return frog;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.frogs, this.trucks, this.logs, this.turtles);
  };

  Game.prototype.draw = function (ctx) {
    drawBackground.call(this, ctx);
    drawLilyPads.call(this, ctx);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    // this.checkForUpdate();
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.setNewPos = function (newPos, object) {
    if (object instanceof(Frogger.Frog)) {
      var x = newPos[0],
          y = newPos[1],
          width = object.dims[0],
          height = object.dims[1];
      if (x < 0) {
        x = 0;
      } else if (x + width > Game.DIM_X) {
        x = Game.DIM_X - width;
      } else if (y < Game.FROG_UPPER_Y) {
        var lilyPad = this.xMatchingLilyPad(x);
        if (lilyPad === -1 || this.lilyPads[lilyPad]) {
          y = Game.FROG_UPPER_Y + 8;
        } else {
          this.lilyPads[lilyPad] = true;
          x = Game.STARTING_POS[0];
          y = Game.STARTING_POS[1];
        }
      } else if (y > Game.DIM_Y - height) {
        y = Game.DIM_Y - height;
      }
      object.pos = [x, y];
    }
  };

  Game.prototype.xMatchingLilyPad = function (x) {
    if (isBetween(x, 0, 45)) {
      return 0;
    } else if (isBetween(x, 103, 155)) {
      return 1;
    } else if (isBetween(x, 213, 263)) {
      return 2;
    } else if (isBetween(x, 328, 375)) {
      return 3;
    } else if (isBetween(x, 438, 476)) {
      return 4;
    }
    return -1;
  }

  function drawBackground (ctx) {
    ctx.drawImage.apply(ctx, Game.BG);
  }

  function drawLilyPads (ctx) {
    for (var i = 0; i < this.lilyPads.length; i++) {
      if (this.lilyPads[i]) {
        var pos;
        switch (i) {
          case 0:
            pos = [11, 20];
            break;
          case 1:
            pos = [123, 20];
            break;
          case 2:
            pos = [233, 20];
            break;
          case 3:
            pos = [343, 20];
            break;
          case 4:
            pos = [454, 20];
            break;
        }
      ctx.drawImage.apply(ctx, [Game.FROG].concat(pos));
      }
    }
  }

  function isBetween(num, x1, x2) {
    return num >= x1 && num <= x2
  }
})();
