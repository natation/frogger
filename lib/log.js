(function() {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Log = Frogger.Log = function (options) {
    Frogger.MovingObject.call(this, options);
  }

  Frogger.Util.inherits(Log, Frogger.MovingObject);
})();
