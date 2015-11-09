(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var GameView = Frogger.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.frog = this.game.addFrog();
    this.started = false;
    this.starting = false;
    this.timerId = null;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var frog = this.frog,
        gameView = this;
    document.addEventListener("keyup", function (e) {
      var allowedKeys = {
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          0: "spacebar",
          32: "spacebar"
      };
      var direction = allowedKeys[e.keyCode];
      if (typeof direction !== "undefined") {
        e.preventDefault();
        if (direction === "spacebar" && !gameView.started) {
          gameView.started = true;
          gameView.starting = true;
        } else {
          frog.move(direction);
        }
      }
    });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(function () {
      if (!gameView.started) {
        Frogger.Util.drawBackground(gameView.ctx);
        gameView.ctx.font = "40px arial";
        gameView.ctx.fillStyle = "white";
        gameView.ctx.fillText("Press spacebar to start", 20, 200);
      } else {
        gameView.runGame();
      }
      if (gameView.starting) {
        Frogger.Util.playSound("intro");
        gameView.starting = false;
      }
    }, 1000 / Frogger.Game.FPS);

    this.bindKeyHandlers();
  };

GameView.prototype.runGame = function () {
  if (this.game.isWon()) {
    Frogger.Util.drawBackground(this.ctx);
    this.ctx.font = "40px arial";
    this.ctx.fillText("You won!", 20, 200);
    this.stop();
  } else {
    this.game.step();
    this.game.draw(this.ctx);
  }
};

GameView.prototype.stop = function () {
  clearInterval(this.timerId);
};
})();
