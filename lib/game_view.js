(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var GameView = Frogger.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.frog = this.game.addFrog();
    this.timerId = null;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var frog = this.frog;
    document.addEventListener("keyup", function (e) {
      var allowedKeys = {
          37: "left",
          38: "up",
          39: "right",
          40: "down"
      };
      var direction = allowedKeys[e.keyCode];
      if (typeof direction !== "undefined") {
        e.preventDefault();
        frog.move(direction);
      }
    });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    var bgAudio = document.createElement("audio");
    bgAudio.setAttribute("src", "assets/frogger_intro.mp3");
    bgAudio.play();
    this.timerId = setInterval(function () {
      gameView.game.step();
      gameView.game.draw(gameView.ctx);
    }, 1000 / Frogger.Game.FPS);

    this.bindKeyHandlers();
  };

GameView.prototype.stop = function () {
  clearInterval(this.timerId);
};
})();
