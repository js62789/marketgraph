var MarketGraph = window.MG = window.MarketGraph = window.MarketGraph || {};

(function(MG){

  var generateColor = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  };

  function LineGraph () {
    this.init.apply(this, arguments);
  };

  LineGraph.prototype.init = function (id) {
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.margin = {top: 10, right: 10, bottom: 10, left: 10};
    this.chartHeight = this.canvas.height - this.margin.top - this.margin.bottom;
    this.chartWidth = this.canvas.width - this.margin.left - this.margin.right;
  };

  LineGraph.prototype.drawHorizontalGridlines = function (dataset) {
    var context = this.context;
    var numLines = 7;
    var segHeight = this.chartHeight/(numLines-1);
    for (var i=0; i<numLines; i++) {
      var y = segHeight * i;
      var yVal = ((((numLines - 1) - i) / (numLines - 1)) * dataset.rangeY) + dataset.minY;
      this.drawHorizontalGridline(y);
      context.textAlign = "left";
      context.font = "10px Helvetica";
      context.fillText(yVal.toFixed(2), this.margin.left, this.margin.top + y);
    }
  };

  LineGraph.prototype.drawHorizontalGridline = function (y) {
    var canvas = this.canvas;
    var context = this.context;
    context.beginPath();
    context.moveTo(this.margin.left, this.margin.top + y);
    context.lineTo(this.margin.left + this.chartWidth, this.margin.top + y);
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;
    context.stroke();
  };

  LineGraph.prototype.drawVerticalGridlines = function (dataset) {
    var numData = dataset.data.length;
    var segWidth = this.chartWidth/(numData-1);

    for (var i=0; i<numData; i++) {
      this.drawVerticalGridline(segWidth*i);
    }
  };

  LineGraph.prototype.drawVerticalGridline = function (x) {
    var canvas = this.canvas;
    var context = this.context;
    context.beginPath();
    context.moveTo(this.margin.left + x, this.margin.top);
    context.lineTo(this.margin.left + x, this.margin.top + this.chartHeight);
    context.strokeStyle = '#ddd';
    context.lineWidth = 1;
    context.stroke();
  };

  LineGraph.prototype.drawLine = function (dataset, xAxis, yAxis) {
    this.drawVerticalGridlines(dataset);
    this.drawHorizontalGridlines(dataset);

    var canvas = this.canvas;
    var context = this.context;
    var chartHeight = this.chartHeight;
    var chartWidth = this.chartWidth;
    context.beginPath();
    for (var i=0, numData=dataset.data.length; i<numData; i++) {
      var point = dataset.data[i];
      var x = ((point[xAxis] - dataset.minX) / dataset.rangeX) * chartWidth + this.margin.left;
      var y = ((point[yAxis] - dataset.minY) / dataset.rangeY) * chartHeight + this.margin.bottom;
      //console.log(x, y);
      context.lineTo(x, canvas.height - y);
    }
    context.strokeStyle = generateColor();
    context.lineWidth = 1;
    context.stroke();
  };

  LineGraph.prototype.labelY = function (name) {
    var context = this.context;
    context.font = "14pt Helvetica";
    context.save();
    context.translate(this.margin.left / 2 + 7, this.canvas.height / 2);
    context.textAlign = "center";
    context.rotate(-Math.PI/2);
    context.fillText(name, 0, 0);
    context.restore();
    return this;
  };

  LineGraph.prototype.labelX = function (name) {
    var context = this.context;
    context.font = "14pt Helvetica";
    context.textAlign = "center";
    context.fillText(name, this.canvas.width / 2, this.canvas.height + 7 - this.margin.bottom / 2);
    return this;
  };

  LineGraph.prototype.erase = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  MG.LineGraph = LineGraph;

})(MarketGraph);
