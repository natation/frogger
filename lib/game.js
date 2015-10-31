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
    this.level = 1;
    this.addTrucks();
  };

  Game.FPS = 32;
  Game.DIM_X = 516;
  Game.DIM_Y = 505;
  Game.FROG_UPPER_Y = 62.5;
  Game.FROG_DIMS = [25, 25];
  Game.STARTING_POS = [(Game.DIM_X / 2) - Game.FROG_DIMS[1] / 2,
                        Game.DIM_Y - Game.FROG_DIMS[1] - 5];

  Game.NUM_TRUCK_TYPES = 5;

  Game.NUM_TRUCK_YELLOW = 3;
  Game.TRUCK_YELLOW_SPACING = 150;
  Game.TRUCK_YELLOW_INIT_Y = 285;

  Game.NUM_TRUCK_BULLDOZER_WHITE = 3;
  Game.TRUCK_BULLDOZER_WHITE_SPACING = 60;
  Game.TRUCK_BULLDOZER_WHITE_INIT_Y = 325;

  Game.NUM_TRUCK_LG = 2;
  Game.TRUCK_LG_SPACING = 200;
  Game.TRUCK_LG_INIT_Y = 358;

  Game.NUM_TRUCK_WHITE = 3;
  Game.TRUCK_WHITE_SPACING = 200;
  Game.TRUCK_WHITE_INIT_Y = 398;

  Game.NUM_TRUCK_PINK = 4;
  Game.TRUCK_PINK_SPACING = 200;
  Game.TRUCK_PINK_INIT_Y = 438;

  Game.setImages = function (images) {
    Game.BG = [images.bg, 0, 0];
    Game.FROG_UP = {img: images.froggerSprites,
                     sourceOffset: [12, 370],
                     dims: [23, 17],
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

  Game.prototype.add = function (object) {
    if (object instanceof Frogger.Frog) {
      this.frogs.push(object);
    } else if (object instanceof Frogger.Truck) {
      this.trucks.push(object);
    } else if (object instanceof Frogger.Log) {
      this.logs.push(object);
    } else if (object instanceof Frogger.Turtles) {
      this.turtles.push(object);
    } else {
      throw "not a recognized object";
    }
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

  Game.prototype.addFrog = function () {
    var options = Game.FROG_UP;
    debugger
    options.pos = Game.STARTING_POS;
    options.game = this;
    var frog = new Frogger.Frog(options);
    this.add(frog);
    return frog;
  };

  Game.prototype.addTrucks = function () {
    for (var i = 0; i < Game.NUM_TRUCK_TYPES ; i++) {
      var truck;
      switch (i) {
        case 0:
          generateObject.call(this, Frogger.Truck, Game.TRUCK_YELLOW,
            Game.NUM_TRUCK_YELLOW, Game.TRUCK_YELLOW_SPACING,
            Game.TRUCK_YELLOW_INIT_Y, -1);
          break;
        case 1:
          generateObject.call(this, Frogger.Truck, Game.TRUCK_BULLDOZER_WHITE,
            Game.NUM_TRUCK_BULLDOZER_WHITE, Game.TRUCK_BULLDOZER_WHITE_SPACING,
            Game.TRUCK_BULLDOZER_WHITE_INIT_Y, 1);
          break;
        case 2:
          generateObject.call(this, Frogger.Truck, Game.TRUCK_LG,
            Game.NUM_TRUCK_LG, Game.TRUCK_LG_SPACING,
            Game.TRUCK_LG_INIT_Y, -1);
          break;
        case 3:
          generateObject.call(this, Frogger.Truck, Game.TRUCK_WHITE,
            Game.NUM_TRUCK_WHITE, Game.TRUCK_WHITE_SPACING,
            Game.TRUCK_WHITE_INIT_Y, 1);
          break;
        case 4:
          generateObject.call(this, Frogger.Truck, Game.TRUCK_PINK,
            Game.NUM_TRUCK_PINK, Game.TRUCK_PINK_SPACING,
            Game.TRUCK_PINK_INIT_Y, -1);
          break;
      }
    }
  }

  Game.prototype.setNewPos = function (newPos, object) {
    if (object instanceof(Frogger.Frog)) {
      setFrogPos.call(this, newPos, object);
    } else if (object instanceof Frogger.Truck) {
      setObjPos.call(this, newPos, object);
    } else if (object instanceof Frogger.Log) {

    } else if (object instanceof Frogger.Turtles) {

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

  function setFrogPos(pos, frog) {
    var x = pos[0],
        y = pos[1],
        width = frog.gameDims[0],
        height = frog.gameDims[1];
    if (x < 0) {
      x = 0;
    } else if (x + width > Game.DIM_X) {
      x = Game.DIM_X - width;
    } else if (y < Game.FROG_UPPER_Y) {
      var lilyPad = this.xMatchingLilyPad(x);
      if (lilyPad === -1 || this.lilyPads[lilyPad]) {
        y = Game.FROG_UPPER_Y;
      } else {
        this.lilyPads[lilyPad] = true;
        x = Game.STARTING_POS[0];
        y = Game.STARTING_POS[1];
      }
    } else if (y > Game.DIM_Y - height) {
      y = Game.STARTING_POS[1];
    }
    frog.pos = [x, y];
  }

  function setObjPos(pos, object) {
    var x = pos[0],
        y = pos[1];
    if (x < 0 && object.vel < 0) {
      x = Game.DIM_X;
    } else if (x > Game.DIM_X && object.vel > 0) {
      x = -(object.gameDims[0]);
    }
    object.pos = [x, y];
  }

  function isBetween(num, x1, x2) {
    return num >= x1 && num <= x2
  }

  function generateObject(className, options, num, spacing, initY, multiplier) {
    var startPos = Math.random() * Game.DIM_X;
    for (var i = 0; i < num; i++) {
      var options = options,
          object;
      options.pos = multiplier < 0 ?
                      [startPos + spacing * i, initY] :
                      [startPos - spacing * i, initY]
      options.vel = multiplier * (this.level);
      options.game = this;
      object = new className(options);
      this.add(object);
    }
  }
})();
