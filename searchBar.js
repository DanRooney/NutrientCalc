//Variable to hold autocomplete options
var keys;

//Load US States as options from CSV - but this can also be created dynamically
d3.csv("firstdraft.csv",function (csv) {
    keys=csv;
    start();
});

var Recommended, Nutrients, Final, Percentages, count;
function initialize() {
    Recommended = [50, 65, 20, 300, 18, 2400, 3500, 400, 1000, 1500, 10, 6, 20, 1.7, 1000, 1.5, 60];
    Nutrients = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Final = new Array(17);
    Percentages = new Array(17);
    count = 1;
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
    document.getElementById("Pr").innerHTML = Percentages[0];
    document.getElementById("TF").innerHTML = Percentages[1];
    document.getElementById("SF").innerHTML = Percentages[2];
    document.getElementById("Ch").innerHTML = Percentages[3];
    document.getElementById("Ir").innerHTML = Percentages[4];
    document.getElementById("So").innerHTML = Percentages[5];
    document.getElementById("Po").innerHTML = Percentages[6];
    document.getElementById("Ma").innerHTML = Percentages[7];
    document.getElementById("Ph").innerHTML = Percentages[8];
    document.getElementById("VA").innerHTML = Percentages[9];
    document.getElementById("VD").innerHTML = Percentages[10];
    document.getElementById("VB").innerHTML = Percentages[11];
    document.getElementById("VE").innerHTML = Percentages[12];
    document.getElementById("Ri").innerHTML = Percentages[13];
    document.getElementById("Ca").innerHTML = Percentages[14];
    document.getElementById("Th").innerHTML = Percentages[15];
    document.getElementById("VC").innerHTML = Percentages[16];
}

function reset() {
    for(i=0; i<count; i++){
        var element = document.getElementById("bp-ac");
        element.parentNode.removeChild(element);
    }
    initialize();
    start();
}