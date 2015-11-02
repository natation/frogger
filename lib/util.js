(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Util = Frogger.Util = function (options) {};


  Util.inherits = function (child, parent) {
    function Surrogate () {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate ();
    child.prototype.constructor = child;
  };

  Util.setImages = function (images) {
    var Game = Frogger.Game;
    Game.TRUCK_PINK_SPACING = 200;
    Game.TRUCK_WHITE_SPACING = 200;
    Game.TRUCK_LG_SPACING = 200;
    Game.TRUCK_BULLDOZER_WHITE_SPACING = 60;
    Game.TRUCK_YELLOW_SPACING = 150;
    Game.LOG_SM_SPACING = 200;
    Game.LOG_MD_SPACING = 350;
    Game.LOG_LG_SPACING = 500;
    Game.TURTLE_SPACING = 40;

    Game.BG = [images.bg, 0, 0];
    Game.FROG = images.frog;
    Game.FROG_STRETCH = 5;
    Game.FROG_UP = {img: images.froggerSprites,
                     sourceOffset: [12, 370],
                     dims: [23, 17],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_UP_JUMP = {img: images.froggerSprites,
                     sourceOffset: [47, 365],
                     dims: [24, 27],
                     gameDims: [Game.FROG_DIMS[0],
                                Game.FROG_DIMS[1] + Game.FROG_STRETCH]};
    Game.FROG_DOWN = {img: images.froggerSprites,
                     sourceOffset: [80, 370],
                     dims: [23, 17],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_DOWN_JUMP = {img: images.froggerSprites,
                     sourceOffset: [115, 365],
                     dims: [24, 27],
                     gameDims: [Game.FROG_DIMS[0],
                                Game.FROG_DIMS[1] + Game.FROG_STRETCH]};
    Game.FROG_LEFT = {img: images.froggerSprites,
                     sourceOffset: [80, 335],
                     dims: [17, 23],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_LEFT_JUMP = {img: images.froggerSprites,
                     sourceOffset: [113, 338],
                     dims: [27, 23],
                     gameDims: [Game.FROG_DIMS[0] + Game.FROG_STRETCH,
                                Game.FROG_DIMS[1]]};
    Game.FROG_RIGHT = {img: images.froggerSprites,
                     sourceOffset: [12, 335],
                     dims: [17, 23],
                     gameDims: Game.FROG_DIMS};
    Game.FROG_RIGHT_JUMP = {img: images.froggerSprites,
                     sourceOffset: [45, 334],
                     dims: [27, 23],
                     gameDims: [Game.FROG_DIMS[0]  + Game.FROG_STRETCH,
                                Game.FROG_DIMS[1]]};
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
    Game.LOG_SM = {img: images.froggerSprites,
                   sourceOffset: [6, 230],
                   dims: [85, 22]};
    Game.LOG_MD = {img: images.froggerSprites,
                   sourceOffset: [6, 198],
                   dims: [118, 22]};
    Game.LOG_LG = {img: images.froggerSprites,
                   sourceOffset: [6, 165],
                   dims: [180, 22]};
    Game.TURTLE_UP = {img: images.froggerSprites,
                    sourceOffset: [15, 406],
                    dims: [30, 23],
                    frames: 200};
    Game.TURTLE_T1 = {img: images.froggerSprites,
                    sourceOffset: [55, 406],
                    dims: [30, 23],
                    frames: 120};
    Game.TURTLE_T2 = {img: images.froggerSprites,
                    sourceOffset: [93, 406],
                    dims: [30, 23],
                    frames: 100};
    Game.TURTLE_T3 = {img: images.froggerSprites,
                    sourceOffset: [135, 406],
                    dims: [30, 23],
                    frames: 80};
    Game.TURTLE_T4 = {img: images.froggerSprites,
                    sourceOffset: [177, 406],
                    dims: [30, 23],
                    frames: 60};
    Game.TURTLE_DOWN = {img: images.froggerSprites,
                      sourceOffset: [205, 406],
                      dims: [30, 23],
                      frames: 30};
  };

  Util.drawBackground = function (ctx) {
    ctx.drawImage.apply(ctx, Frogger.Game.BG);
  }

  Util.drawLilyPads = function (ctx) {
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
      ctx.drawImage.apply(ctx, [Frogger.Game.FROG].concat(pos));
      }
    }
  }

  Util.xMatchingLilyPad = function (x) {
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

  function isBetween (num, x1, x2) {
    return num >= x1 && num <= x2
  }

  Util.isCollided = function (obj1, obj2) {
    var left1 = {x: obj1.pos[0], y: obj1.pos[1]},
        right1 = {x: obj1.pos[0] + obj1.gameDims[0], y: obj1.pos[1] + obj1.gameDims[1]},
        left2 = {x: obj2.pos[0], y: obj2.pos[1]},
        right2 = {x: obj2.pos[0] + obj2.gameDims[0], y: obj2.pos[1] + obj2.gameDims[1]};
    return !(left1.x > right2.x ||
             left2.x > right1.x ||
             left2.y > right1.y ||
             right2.y < left1.y);
  };

  Util.setupLevel = function (game) {
    var level = game.level;
    var Truck = Frogger.Truck,
        Log = Frogger.Log,
        Turtle = Frogger.Turtle,
        Game = Frogger.Game;
    var row0 = [], row1 = [], row2 = [], row3 = [], row4 = [],
        row5 = [], row6 = [], row7 = [], row8 = [], row9 = [],
        startPos;
    switch (level) {
      case 1:
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        row0.push({className: Truck, options: Game.TRUCK_PINK});
        generateObjects.call(game, row0, Game.TRUCK_PINK_SPACING, Game.ROW_0, -1);
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        row1.push({className: Truck, options: Game.TRUCK_WHITE});
        generateObjects.call(game, row1, Game.TRUCK_WHITE_SPACING, Game.ROW_1, 1);
        row2.push({className: Truck, options: Game.TRUCK_LG});
        row2.push({className: Truck, options: Game.TRUCK_LG});
        generateObjects.call(game, row2, Game.TRUCK_LG_SPACING, Game.ROW_2, -1);
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        row3.push({className: Truck, options: Game.TRUCK_BULLDOZER_WHITE});
        generateObjects.call(game, row3, Game.TRUCK_BULLDOZER_WHITE_SPACING, Game.ROW_3, 1);
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        row4.push({className: Truck, options: Game.TRUCK_YELLOW});
        generateObjects.call(game, row4, Game.TRUCK_YELLOW_SPACING, Game.ROW_4, -1);
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        row5.push({className: Turtle, options: Game.TURTLE_UP});
        startPos = Math.random() * Game.DIM_X;
        generateObjects.call(game, row5, Game.TURTLE_SPACING, Game.ROW_5, 1, startPos);
        row5 = [];
        row5.push({className: Turtle, options: Game.TURTLE_DOWN});
        row5.push({className: Turtle, options: Game.TURTLE_DOWN});
        row5.push({className: Turtle, options: Game.TURTLE_DOWN});
        generateObjects.call(game, row5, Game.TURTLE_SPACING, Game.ROW_5, 1, startPos - 300);
        row6.push({className: Log, options: Game.LOG_MD});
        row6.push({className: Log, options: Game.LOG_MD});
        generateObjects.call(game, row6, Game.LOG_MD_SPACING, Game.ROW_6, -1);
        row7.push({className: Turtle, options: Game.TURTLE_UP});
        row7.push({className: Turtle, options: Game.TURTLE_UP});
        row7.push({className: Turtle, options: Game.TURTLE_UP});
        row7.push({className: Turtle, options: Game.TURTLE_UP});
        row7.push({className: Turtle, options: Game.TURTLE_DOWN});
        row7.push({className: Turtle, options: Game.TURTLE_DOWN});
        row7.push({className: Turtle, options: Game.TURTLE_DOWN});
        row7.push({className: Turtle, options: Game.TURTLE_DOWN});
        generateObjects.call(game, row7, Game.TURTLE_SPACING, Game.ROW_7, 1);
        row8.push({className: Log, options: Game.LOG_LG});
        generateObjects.call(game, row8, Game.LOG_LG_SPACING, Game.ROW_8, -1);
        row9.push({className: Turtle, options: Game.TURTLE_UP});
        row9.push({className: Turtle, options: Game.TURTLE_UP});
        row9.push({className: Turtle, options: Game.TURTLE_UP});
        startPos = Math.random() * Game.DIM_X;
        generateObjects.call(game, row9, Game.TURTLE_SPACING, Game.ROW_9, 1, startPos);
        row9 = [];
        row9.push({className: Turtle, options: Game.TURTLE_T1});
        row9.push({className: Turtle, options: Game.TURTLE_T1});
        row9.push({className: Turtle, options: Game.TURTLE_T1});
        generateObjects.call(game, row9, Game.TURTLE_SPACING, Game.ROW_9, 1, startPos - 300);
        break;
    }
  }

  function generateObjects(objects, spacing, initY, velocity, startPos) {
    var startPos = startPos || Math.random() * Frogger.Game.DIM_X;
    for (var i = 0; i < objects.length; i++) {
      var object = objects[i],
          options = object.options;
      options.pos = velocity < 0 ?
                      [startPos + spacing * i, initY] :
                      [startPos - spacing * i, initY]
      options.vel = velocity;
      options.game = this;
      this.add(new object.className(options));
    }
  }
})();
