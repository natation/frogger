(function() {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Turtle = Frogger.Turtle = function (options) {
    this.
    Frogger.MovingObject.call(this, options);
  }

  Turtle.TRANSITION_FRAMES = 25;
  
  Frogger.Util.inherits(Turtle, Frogger.MovingObject);
})();
