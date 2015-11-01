(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Game = Frogger.Game = function (images) {
    Frogger.Util.setImages(images);
    this.frogs = [];
    this.trucks = [];
    this.logs = [];
    this.turtles = [];
    this.lilyPads = [false, false, false, false, false];
    this.level = 1;
    this.setupLevel(this.level);
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

  Game.TRUCK_PINK_SPACING = 200;
  Game.TRUCK_WHITE_SPACING = 200;
  Game.TRUCK_LG_SPACING = 200;
  Game.TRUCK_BULLDOZER_WHITE_SPACING = 60;
  Game.TRUCK_YELLOW_SPACING = 150;
  Game.LOG_SM_SPACING = 200;
  Game.LOG_MD_SPACING = 350;
  Game.LOG_LG_SPACING = 500;
  Game.TURTLE_SPACING = 40;

  Game.prototype.add = function (object) {
    if (object instanceof Frogger.Frog) {
      this.frogs.push(object);
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

  Game.prototype.allObjects = function () {
    return [].concat(this.trucks, this.logs, this.turtles, this.frogs);
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
    options.pos = Game.STARTING_POS;
    options.game = this;
    var frog = new Frogger.Frog(options);
    this.add(frog);
    return frog;
  };

  Game.prototype.setupLevel = function (level) {
    var Truck = Frogger.Truck,
        Log = Frogger.Log,
        Turtle = Frogger.Turtle;
    var row0 = [], row1 = [], row2 = [], row3 = [], row4 = [],
        row5 = [], row6 = [], row7 = [], row8 = [], row9 = [];
    switch (level) {
      case 1:
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        generateObjects.call(this, row0, Game.TRUCK_PINK_SPACING, Game.ROW_0, -1);
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        generateObjects.call(this, row1, Game.TRUCK_WHITE_SPACING, Game.ROW_1, 1);
        row2.push({className: Truck, options: Game.TRUCK_LG});
        row2.push({className: Truck, options: Game.TRUCK_LG});
        generateObjects.call(this, row2, Game.TRUCK_LG_SPACING, Game.ROW_2, -1);
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        generateObjects.call(this, row3, Game.TRUCK_BULLDOZER_WHITE_SPACING, Game.ROW_3, 1);
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        generateObjects.call(this, row4, Game.TRUCK_YELLOW_SPACING, Game.ROW_4, -1);
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        // row5.push({className: Turtle, options: Game.TURTLE_UP});
        // row5.push({className: Turtle, options: Game.TURTLE_UP});
        // row5.push({className: Turtle, options: Game.TURTLE_UP});
        generateObjects.call(this, row5, Game.TURTLE_SPACING, Game.ROW_5, 1);
        row6.push({className: Log, options: Game.LOG_MD});
        row6.push({className: Log, options: Game.LOG_MD});
        generateObjects.call(this, row6, Game.LOG_MD_SPACING, Game.ROW_6, -1);
        row7.push({className: Log, options: Game.LOG_SM});
        row7.push({className: Log, options: Game.LOG_SM});
        generateObjects.call(this, row7, Game.LOG_SM_SPACING, Game.ROW_7, 1);
        row8.push({className: Log, options: Game.LOG_LG});
        generateObjects.call(this, row8, Game.LOG_LG_SPACING, Game.ROW_8, -1);
        row9.push({className: Log, options: Game.LOG_SM});
        row9.push({className: Log, options: Game.LOG_SM});
        row9.push({className: Log, options: Game.LOG_SM});
        generateObjects.call(this, row9, Game.LOG_SM_SPACING, Game.ROW_9, 1);
        break;
      default:
    }
  }

  Game.prototype.setNewPos = function (newPos, object) {
    if (object instanceof(Frogger.Frog)) {
      return setFrogPos.call(this, newPos, object);
    } else {
      setObjPos.call(this, newPos, object);
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
    return [x, y];
  }

  function setObjPos(pos, object) {
    var x = pos[0],
        y = pos[1];
    if (x < -object.gameDims[0] && object.vel < 0) {
      x = Game.DIM_X;
    } else if (x > Game.DIM_X && object.vel > 0) {
      x = -(object.gameDims[0]);
    }
    object.pos = [x, y];
  }

  function isBetween(num, x1, x2) {
    return num >= x1 && num <= x2
  }

  function generateObjects(objects, spacing, initY, velocity, startPos) {
    var startPos = startPos || Math.random() * Game.DIM_X;
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i],
          options = object.options;
      options.pos = velocity < 0 ?
                      [startPos + spacing * i, initY] :
                      [startPos - spacing * i, initY]
      options.vel = velocity;
      if (!object.className) debugger;
      options.game = this;
      this.add(new object.className(options));
    }
  }
})();
