(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Game = Frogger.Game = function () {
    $(document).keydown(function (e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
      }
      
    });
  };
})();
