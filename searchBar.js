//Variable to hold autocomplete options
var keys;

//Load US States as options from CSV - but this can also be created dynamically
d3.csv("firstdraft.csv",function (csv) {
    keys=csv;
    start();
});

var Recommended, Nutrients, Final, Percentages, count, calculated;
function initialize() {
    Recommended = [50, 65, 20, 300, 18, 2400, 3500, 400, 1000, 1500, 10, 6, 20, 1.7, 1000, 1.5, 60];
    Nutrients = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Final = new Array(17);
    Percentages = new Array(17);
    count = 1;
    calculated = false;
}
initialize();
    
//Call back for when user selects an option
function onSelect(d) {
    Nutrients[0] += +d.Protein;
    Nutrients[1] += +d.TotalFat;
    Nutrients[2] += +d.SaturatedFat;
    Nutrients[3] += +d.Cholesterol;
    Nutrients[4] += +d.Iron;
    Nutrients[5] += +d.Sodium;
    Nutrients[6] += +d.Potassium;
    Nutrients[7] += +d.Magnesium;
    Nutrients[8] += +d.Phosphorus;
    Nutrients[9] += +d.VitaminA;
    Nutrients[10] += +d.VitaminD;
    Nutrients[11] += +d.VitaminB12;
    Nutrients[12] += +d.VitaminE;
    Nutrients[13] += +d.Riboflavin;
    Nutrients[14] += +d.Calcium;
    Nutrients[15] += +d.Thiamin;
    Nutrients[16] += +d.VitaminC;
    console.log(Nutrients);
    start();
    count++;
}

//Setup and render the autocomplete
function start() {
    var mc = autocomplete(document.getElementById('test'))
        .keys(keys)
        .dataField("Food")
        .placeHolder("Search Foods - Start typing here")
        .width(960)
        .height(500)
        .onSelected(onSelect)
        .render();
}

  
//Calculate user's nutrient profile
function calc() {
    for(var i=0; i<17; i++){
        Percentages[i] = Math.round((Nutrients[i] / Recommended[i]) * 100); //Percentage of recommended nutrients in user
        Final[i] = Recommended[i] - Nutrients[i]; //Every positive value indicates a deficiency
    }
var data = [
    ["Vitamin A", Percentages[9]],
    ["Vitamin B12", Percentages[11]],
    ["Vitamin C", Percentages[16]],
    ["Vitamin D", Percentages[10]],
    ["Vitamin E", Percentages[12]],
    ["Protein", Percentages[0]],
    ["Total Fat", Percentages[1]],
    ["Saturated Fat", Percentages[2]],
    ["Cholesterol", Percentages[3]],
    ["Iron", Percentages[4]],
    ["Sodium", Percentages[5]],
    ["Potassium", Percentages[6]],
    ["Magnesium", Percentages[7]],
    ["Phosphorus", Percentages[8]],
    ["Riboflavin", Percentages[13]],
    ["Calcium", Percentages[14]],
    ["Thiamin", Percentages[15]]
];

console.log(data);

var chart = document.getElementById("chart"),
    axisMargin = 20,
    margin = 20,
    valueMargin = 4,
    width = 50,
    height = 50,
    barHeight = 20,
    barPadding = 5;
    var data, bar, svg, scale, xAxis, labelWidth = 0;

max = d3.max(data.map(function(i){ 
  return i[1];
}));

svg = d3.select(chart)
  .append("svg")
  .attr("width", 500)
  .attr("height", 750);


bar = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g");

bar.attr("class", "bar")
  .attr("cx",0)
  .attr("transform", function(d, i) { 
     return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
  });

bar.append("text")
  .attr("class", "label")
  .attr("y", barHeight / 2)
  .attr("dy", ".35em") //vertical align middle
  .attr("dx", 30) //margin right
  .text(function(d){
    return d[0];
  }).each(function() {
    labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
  });

scale = d3.scale.linear()
  .domain([0, max])
  .range([0, width - margin*2 - labelWidth]);

xAxis = d3.svg.axis()
  .scale(scale)
  .tickSize(-height + 2*margin + axisMargin)
  .orient("bottom");

bar.append("rect")
  .attr("transform", "translate(145, 0)")
  .attr("height", barHeight)
  .attr("width", function(d){
    return (d[1])*3;
  });

bar.append("text")
  .attr("class", "value")
  .attr("y", barHeight / 2)
  .attr("dx", 20) //margin right
  .attr("dy", ".35em") //vertical align middle
  .attr("text-anchor", "end")
  .text(function(d){
    return d[1] + "%";
  })
 .attr("x", function(d){
    var width = this.getBBox().width;
    return Math.max(width + valueMargin, scale(d[1]));
  });

calculated = true;
}

function reveal(span) {
    var className = span.getAttribute("class");
    if(className=="hidden") {
      span.className = "unhidden";
    }
    else {
      span.className = "hidden";
    }
}

function reset() {
    if (calculated==false){
        removeBars();
    }
    if (calculated==true){
        reveal(result);
        var bars = document.getElementById("chart");
        bars.parentNode.removeChild(bars);
        //TODO:RECREATE CHART DIV
    }
    initialize();
    start();
}

function removeBars() {
    for(i=0; i<count; i++){
        document.getElementById("bp-ac").remove();
    }
}

/*
RECOMMENDED DAILY VALUES
http://www.fda.gov/Food/GuidanceRegulation/GuidanceDocumentsRegulatoryInformation/LabelingNutrition/ucm064928.htm
*/
