//based on Mike Bostock's d3 Scatterplot Example
//https://bl.ocks.org/mbostock/3887118
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    scatterWidth = 800 - margin.left - margin.right,
    scatterHeight = 150 - margin.top - margin.bottom;


//Sets scales
var x1 = d3.scale.linear()
    .range([0, scatterWidth]);

var x2 = d3.scale.linear()
    .range([0, scatterWidth]);

var color = d3.scale.category10();

//Creates x axis based on scale
var x1Axis = d3.svg.axis()
    .scale(x1)
    .orient("bottom");

var x2Axis = d3.svg.axis()
    .scale(x2)
    .orient("top");

var scatterplotSVG = d3.select("#scatterplot").append("svg")
    .attr("width", scatterWidth + margin.left + margin.right)
    .attr("height", scatterHeight + margin.top + margin.bottom)
    .attr("style", "outline: solid black;")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Change "scatterplot.xml" to the XML file you want to parse
d3.xml("sample data/scatterplot.xml", function(error, data) {
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

    //Set domains
    x1.domain([0, 100]).nice();
    x2.domain([100, 0]).nice();

    //add x axis
    scatterplotSVG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + scatterHeight + ")")
        .call(x1Axis)
        //x axis label
        .append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", -6)
        .style("text-anchor", "start")
        .text("Male Probability (%)");

    scatterplotSVG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 10 + ")")
        .call(x2Axis)
        //x axis label
        .append("text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("y", 12)
        .style("text-anchor", "start")
        .text("Female Probability (%)");


    //Scatterplot dots
    scatterplotSVG.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        //Type of dot
        .attr("class", "dot")
        //Size of dot
        .attr("r", 3.5)
        //Parses x value from the data
        .attr("cx", function(d) {
            return x1(d.suspectMaleProbability);
        })
        .attr("cy", 50)
        //Chooses color based on data category
        .style("fill", function(d) {
            return color(d.suspect);
        })
        .each(function() {
            var sel = d3.select(this);
            var state = false;
            sel.on('click', function() {
                state = !state;
                if (state) {
                    sel.style('fill', 'white');
                } else {
                    sel.style('fill', function(d) {
                        return color(d.suspect);
                    });
                }
            });
        });
});
