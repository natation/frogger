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
})();
