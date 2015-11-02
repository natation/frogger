(function() {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Turtle = Frogger.Turtle = function (options) {
    this.isTransitioningDown = true;
    this.frames = options.frames;
    Frogger.MovingObject.call(this, options);
  }

  Frogger.Util.inherits(Turtle, Frogger.MovingObject);

  Turtle.prototype.draw = function (ctx) {
    var frames = this.frames;
    this.isAboveWater = true;
    if (frames > 120 && frames <= 200) {
      this.sourceOffset = Frogger.Game.TURTLE_UP.sourceOffset;
    } else if (frames > 100 && frames <= 120) {
      this.sourceOffset = Frogger.Game.TURTLE_T1.sourceOffset;
    } else if (frames > 80 && frames <= 100) {
      this.sourceOffset = Frogger.Game.TURTLE_T2.sourceOffset;
    } else if (frames > 60 && frames <= 80) {
      this.sourceOffset = Frogger.Game.TURTLE_T3.sourceOffset;
    } else if (frames > 30 && frames <= 60) {
      this.isAboveWater = false;
      this.sourceOffset = Frogger.Game.TURTLE_T4.sourceOffset;
    } else if (frames <= 30) {
      this.isAboveWater = false;
      this.sourceOffset = Frogger.Game.TURTLE_DOWN.sourceOffset;
    }
    this.isTransitioningDown ? this.frames -= 1 : this.frames += 1;
    if (this.frames <= 0) {
      this.isTransitioningDown = false;
    } else if (this.frames >= 200) {
      this.isTransitioningDown = true;
    }
    if (!this.sourceOffset) debugger
    ctx.drawImage(this.img, this.sourceOffset[0], this.sourceOffset[1],
                  this.dims[0], this.dims[1], this.pos[0],
                  this.pos[1], this.gameDims[0], this.gameDims[1]);
  }
})();
