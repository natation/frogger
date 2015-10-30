(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var MovingObject = Frogger.MovingObject = function (options) {
    this.img = options.img;
    this.dims = options.dims;
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight,
                  this.pos[0], this.pos[1], this.dims[0], this.dims[1]);
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel;


  };
})();
