(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Truck = Frogger.Truck = function (options) {
    Frogger.MovingObject.call(this, options);
  };

  Frogger.Util.inherits(Truck, Frogger.MovingObject);
})();
