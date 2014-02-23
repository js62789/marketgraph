var MarketGraph = window.MG = window.MarketGraph = window.MarketGraph || {};

(function(MG){

  MG.ready = function (fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive') {
          fn();
        }
      });
    }
  };

})(MarketGraph);
