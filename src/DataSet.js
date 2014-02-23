var MarketGraph = window.MG = window.MarketGraph = window.MarketGraph || {};

(function(MG){

  function average (data) {
    var sum = 0;
    data.map(function(d){sum += d;});
    return (sum / data.length);
  }

  function DataSet () {
    this.init.apply(this, arguments);
  }

  DataSet.prototype.init = function (data, opts) {
    opts = opts || {};
    this.data = data;
    this.keyX = opts.x || 'x';
    this.keyY = opts.y || ['y'];
    this.refreshSummary();
  };

  DataSet.prototype.refreshSummary = function (key, span) {
    var xValues = this.getXValues();
    var yValues = this.getYValues();
    this.minX = Math.min.apply(null, xValues);
    this.maxX = Math.max.apply(null, xValues);
    this.minY = Math.min.apply(null, yValues);
    this.maxY = Math.max.apply(null, yValues);
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    //console.log(this.minX, this.rangeX);
    //console.log(this.minY, this.rangeY);
  }

  DataSet.prototype.addMovingAverage = function (key, span) {
    var field = key + '_SMA' + span;
    this.keyY.push(field);

    var sample = [];
    for (var i=0, num=this.data.length; i<num; i++) {
      var dailyVal = this.data[i][key];
      sample.push(dailyVal);
      if (sample.length > span) sample.shift();
      this.data[i][field] = average(sample);
    }

    this.refreshSummary();

    return field;
  };

  DataSet.prototype.getXValues = function () {
    var key = this.keyX;
    return this.data.map(function(d){
      return d[key];
    });
  };

  DataSet.prototype.getYValues = function () {
    var keys = this.keyY;
    var yValues = [];
    this.data.map(function(d){
      keys.map(function(k){
        yValues.push(d[k]);
      });
    });
    return yValues;
  };

  MG.DataSet = DataSet;

})(MarketGraph);
