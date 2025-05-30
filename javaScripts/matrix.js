

//matrix für 2024
const matrix = [
    ["E15Ü°1", 6122.63436],
    ["E15Ü°2", 6795.9024 ],
    ["E15Ü°3", 7434.87636],
    ["E15Ü°4", 7853.95084],
    ["E15Ü°5", 7957.03868],
    ["E15Ü6", 0.00 ],

    ["E15°1", 5017.3082 ],
    ["E15°2", 5394.34776],
    ["E15°3", 5593.59472],
    ["E15°4", 6301.26992],
    ["E15°5", 6837.14576],
    ["E15°6", 7042.2626 ],

    ["E14°1", 4542.63948],
    ["E14°2", 4885.9298 ],
    ["E14°3", 5167.63264],
    ["E14°4", 5593.59472],
    ["E14°5", 6246.27192],
    ["E14°6", 6433.66604],

    ["E13Ü°1", 0.00],
    ["E13Ü°2", 4508.06784],
    ["E13Ü°3", 4748.5376 ],
    ["E13Ü°4", 5593.59472],
    ["E13Ü°5", 6246.27192],
    ["E13Ü°6", 6433.66604],

    ["E13°1", 4188.3804],
    ["E13°2", 4508.06784],
    ["E13°3", 4748.5376],
    ["E13°4", 5215.72248],
    ["E13°5", 5861.53264],
    ["E13°6", 6037.38232],

    ["E12°1", 3774.85712],
    ["E12°2", 4040.88296],
    ["E12°3", 4604.2578],
    ["E12°4", 5098.9314],
    ["E12°5", 5737.87452],
    ["E12°6", 5910.00284],

    ["E11°1", 3652.6382],
    ["E11°2", 3898.3816],
    ["E11°3", 4178.28544],
    ["E11°4", 4604.2578],
    ["E11°5", 5222.5998],
    ["E11°6", 5379.27728],

    ["E10°1", 3523.6242],
    ["E10°2", 3764.77244],
    ["E10°3", 4040.88296],
    ["E10°4", 4322.55496],
    ["E10°5", 4858.4822],
    ["E10°6", 5004.24232],

    ["E9b°1", 3136.59248],
    ["E9b°2", 3369.08496],
    ["E9b°3", 3520.5402],
    ["E9b°4", 3939.06984],
    ["E9b°5", 4295.0868],
    ["E9b°6", 4423.95688],

    ["E9a°1", 3136.59248],
    ["E9a°2", 3369.08496],
    ["E9a°3", 3419.58032],
    ["E9a°4", 3520.5402],
    ["E9a°5", 3939.06984],
    ["E9a°6", 4055.96372],

    ["E8°1", 2946.46388],
    ["E8°2", 3173.47712],
    ["E8°3", 3299.66412],
    ["E8°4", 3419.58032],
    ["E8°5", 3552.0998],
    ["E8°6", 3634.1342],

    ["E7°1", 2769.92544],
    ["E7°2", 2994.05],
    ["E7°3", 3160.843],
    ["E7°4", 3287.05056],
    ["E7°5", 3388.031],
    ["E7°6", 3476.35676],

    ["E6°1", 2722.401],
    ["E6°2", 2945.09664],
    ["E6°3", 3067.49032],
    ["E6°4", 3192.41288],
    ["E6°5", 3274.42672],
    ["E6°6", 3362.77304],

    ["E5°1", 2613.75168],
    ["E5°2", 2834.94644],
    ["E5°3", 2957.34012],
    ["E5°4", 3073.60692],
    ["E5°5", 3167.15492],
    ["E5°6", 3230.26384],

    ["E4°1", 2491.52248],
    ["E4°2", 2718.68992],
    ["E4°3", 2871.6666],
    ["E4°4", 2957.34012],
    ["E4°5", 3043.02392],
    ["E4°6", 3098.0836],

    ["E3°1", 2457.5882],
    ["E3°2", 2681.95948],
    ["E3°3", 2743.15632],
    ["E3°4", 2841.06304],
    ["E3°5", 2920.61996],
    ["E3°6", 2987.9334],

    ["E2Ü°1", 2369.85868],
    ["E2Ü°2", 2577.92588],
    ["E2Ü°3", 2657.4828],
    ["E2Ü°4", 2755.41008],
    ["E2Ü°5", 2822.72352],
    ["E2Ü°6", 2877.77292],

    ["E2°1", 2281.03948],
    ["E2°2", 2504.48556],
    ["E2°3", 2565.69268],
    ["E2°4", 2626.87924],
    ["E2°5", 2767.62272],
    ["E2°6", 2914.51364],

    ["E1°1", 0],
    ["E1°2", 2094.48832],
    ["E1°3", 2125.06104],
    ["E1°4", 2161.7812],
    ["E1°5", 2198.51164],
    ["E1°6", 2290.30176],
    
];




function getEntgeldtyp() {
    const entgeldtyp = document.getElementById('options').value;    
}


//Beispielwerte
var entgeltyp = "E15Ü°1";
// --> muss noch ersetzt werden mit der Funktion "getEntgeldtyp()"

function searchEntgeld(entgeldtyp){
    for (searchcount = 0; searchcount < matrix.length; searchcount++){

        if (matrix[searchcount][0] === entgeldtyp){

            let matrixwert = matrix[searchcount][1];
            console.log(matrixwert);
            
            return matrixwert;

        }
    }

}
searchEntgeld("E1°6");

function OutputBrutto(){
    document.getElementById("brutto_bis_10_2024").value = OutputBrutto2024_bis_10_2024();
    document.getElementById("brutto_ab_11_2024").value = OutputBrutto2024_ab_11_2024();
    document.getElementById("brutto_2025").value = OutputBrutto2025();
    document.getElementById("brutto_2026").value = OutputBrutto2026();
    document.getElementById("brutto_2027").value = OutputBrutto2027();
}

function OutputSonderzahlung(){
    document.getElementById("jsz_2024_bis_10_2024").value = OutputBrutto2024_bis_10_2024() * 0.3253;
    document.getElementById("jsz_2024_ab_11_2024").value = OutputBrutto2024_ab_11_2024() * 0.3253;
    document.getElementById("jsz_2025").value = OutputBrutto2025() * 0.3253;
    document.getElementById("jsz_2026").value = OutputBrutto2026() * 0.3253;
    document.getElementById("jsz_2027").value = OutputBrutto2027() * 0.3253;
}



function afterMainPageLoad() {
    OutputBrutto()
    document.getElementById("jsz_2024_bis_10_2024").value = Jahressonderzahlungen10_2024();
}

//Brutto-Berechnungen für 2024 bis 2027
function OutputBrutto2024_bis_10_2024(){
    let value = searchEntgeld(entgeltyp);
    if (value !== 0){
        value = (value * 1.24 ) + 120;
    }
    return value;
}    
function OutputBrutto2024_ab_11_2024(){
    let value = searchEntgeld(entgeltyp);
    if (value !== 0){
        value = (value + 200) * 1.24;
    }
    return value;
}
function OutputBrutto2025(){
    let value = searchEntgeld(entgeltyp);
    if (value !== 0){
        value = ((value + 200) * 1.055) * 1.24;
    }
    return value;
}
function OutputBrutto2026(){
    let value = searchEntgeld(entgeltyp);
    if (value !== 0){
        value = (((value + 200) * 1.055) * 1.24) * 1.03;
    }
    return value;
}
function OutputBrutto2027(){
    let value = searchEntgeld(entgeltyp);
    if (value !== 0){
        value = ((((value + 200) * 1.055) * 1.24) * 1.03) * 1.03;
    }
    return value;
}
function getMatrixValue(key, colIndex = 6) {
    // colIndex = 6, weil Spalte 7 in Excel, aber 0-basiert in JS
    const row = matrix.find(r => r[0] === key);
    return row ? row[colIndex] : 0;
}

// Beispielwerte:
const N12 = "anteilig"; // "nein", "vollständig" oder "anteilig"
const H13 = 30; // Wochenstunden
const C13 = 8;  // anteilige Monate

function Jahressonderzahlungen10_2024() {
    let result = 0;
    let value = (searchEntgeld(entgeltyp) * 1.24) * 0.3253;
    if (N12 === "nein") {
        result = 0;
    } 
    else if (N12 === "vollständig") {
        result = value * (H13 / 40);
    } 
    else if (N12 === "anteilig") {
        result = (value / 12) * C13 * (H13 / 40);
    }

    return result;  
}


// Beispiel











//Referenzierung
console.log(matrix[0]); // ["E15Ü°1", 6122.63436]
console.log(matrix[0][0]); // "E15Ü°1"
console.log(matrix[0][1]); // 6122.63436

//Referenzobject
//var Spalte = "JSZ2027";

//S
if(Spalte == "11/2024"){
    matrix.forEach(([name, value]) => {
    if (value !== 0){
        value = value + 200;
    }
    console.log(`${name}: ${value}`);
});
}

//T
if(Spalte == "2025"){
    matrix.forEach(([name, value]) => {
    if (value !== 0){
        value = (value + 200) * 1.055;
    }
    console.log(`${name}: ${value}`);
});
}
//B
if(Spalte == "2024AGA"){
    matrix.forEach(([name, value]) => {
    value = (value * 1.24 ) + 120;
   
    console.log(`${name}: ${value}`);
});
}
//C
if(Spalte == "11/2024AGA"){
    matrix.forEach(([name, value]) => {
    value = (value + 200) * 1.24;
   
    console.log(`${name}: ${value}`);
});
}
//D
if(Spalte == "2025AGA"){
    matrix.forEach(([name, value]) => {
    value = ((value + 200) * 1.055) * 1.24;
   
    console.log(`${name}: ${value}`);
});
}
//E
if(Spalte == "2026AGA"){
    matrix.forEach(([name, value]) => {
    value = (((value + 200) * 1.055) * 1.24) * 1.03;
   
    console.log(`${name}: ${value}`);
});
}
//F
if(Spalte == "2027AGA"){
    matrix.forEach(([name, value]) => {
    value = ((((value + 200) * 1.055) * 1.24) * 1.03) * 1.03;
   
    console.log(`${name}: ${value}`);
});
}
//G
if(Spalte == "JSZ2024"){
    matrix.forEach(([name, value]) => {
    value = (value * 1.24) * 0.3253;
   
    console.log(`${name}: ${value}`);
});
}
//H
if(Spalte == "JSZ11/2024"){
    matrix.forEach(([name, value]) => {
    value = ((value + 200) * 1.24) * 0.3253;
   
    console.log(`${name}: ${value}`);
});
}
//I
if(Spalte == "JSZ2025"){
    matrix.forEach(([name, value]) => {
    value = (((value + 200) * 1.055) * 1.24) * 0.3253;
   
    console.log(`${name}: ${value}`);
});
}
//J
if(Spalte == "JSZ2026"){
    matrix.forEach(([name, value]) => {
    value = ((((value + 200) * 1.055) * 1.24) * 1.03) * 0.3253;
   
    console.log(`${name}: ${value}`);
});
}

//K
if(Spalte == "JSZ2027"){
    matrix.forEach(([name, value]) => {
    value = (((((value + 200) * 1.055) * 1.24) * 1.03) * 1.03) * 0.3253;
   
    console.log(`${name}: ${value}`);
});
}





