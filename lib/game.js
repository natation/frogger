(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Game = Frogger.Game = function (images) {
    this.images = images;
    this.frogs = [];
    this.trucks = [];
    this.logs = [];
    this.turtles = [];
  };

  Game.DIM_X = 516;
  Game.DIM_Y = 505;
  Game.FROG_UPPER_Y = 75;
  Game.FPS = 32;

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
      img: this.images.frog,
      pos: [(Game.DIM_X / 2) - (Frogger.Frog.DIMS[0] / 2),
            Game.DIM_Y - Frogger.Frog.DIMS[1]],
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
      } else if (y < 0) {
        y = 0;
      } else if (x + width > Game.DIM_X) {
        x = Game.DIM_X - width;
      } else if (y < Game.FROG_UPPER_Y) {
        y = Game.FROG_UPPER_Y;
      }
      object.pos = [x, y];
    }
  };

  function drawBackground (ctx) {
    ctx.drawImage.apply(ctx, Game.BG);
  }

})();
