//Based on Spline Graph Example http://jsfiddle.net/mmansion/jm5uZ/

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

//Sets scales
var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var color = d3.scale.category10();

//Creates x axis based on scale
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

//Creates svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "outline: solid black;")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.xml("data2.xml", function(error, data) {
      if (error) throw error;
      data = [].map.call(data.querySelectorAll("suspect"), function(suspect) {
        return {
          suspect: suspect.getAttribute("id"),
          suspectMaleProbability: +suspect.querySelector("suspectMaleProbability").textContent
        }
      });
      //loop running through each data value
        data.forEach(function(d) {
          d.suspectMaleProbability = +d.suspectMaleProbability;
        });

  //Age from 0 - 100 years
  x.domain([0,100]).nice();
  //Probability from 0 - 100 percent
  y.domain([100,0]).nice();

//Add axes to svg
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    //x axis label
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Age (years)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Probability (%)");


var path = svg.append('path')
    .data(data)
    .attr('d', d3.svg.line().interpolate('cardinal'))
    .attr('stroke-weight', '5px')
    .attr('fill', 'none')
    .attr('class', 'poly');



});
