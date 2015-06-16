document.getElementById("save").addEventListener("click", function() {

    var base = document.getElementById("base").value;
    var multiplier = document.getElementById("multiplier").value;
    var theme = document.getElementById("theme");
        theme = theme.options[theme.selectedIndex].value;
    base = +base;
    multiplier = +multiplier;
    
    console.log(base + ' ' + multiplier + ' ' + theme );
    create(base, multiplier,theme);     
    
    
}); 

function create(b, multiplier,theme) {
// var snap = Snap(3000,3000);
var snap = Snap("svg");

var base = b;  // система исчисления
var n = multiplier;     // множитель

// функция переходов
function stateTransition(q,x){
  var result = (q + x * n).toString(base);
  
  return result.length > 1 ? result.slice(0,-1) : '0';
}

//функция выходов
function output(q,x){
  var result = (q + x * n).toString(base);
  
   return result[result.length-1];
}

// таблица переходов/выходных состояний
var tableB = new Array(base);      
for(var i = 0; i < base; i++){
	tableB[i] = new Array(n); 
}

// ини­циа­ли­зи­ро­вать B-таблицу
for(var x = 0; x < base; x++) {
	for(q = 0; q < n; q++) {
		tableB[x][q] = stateTransition(q,x) + '.' + output(q,x);
	}
}
console.log(tableB);

var space = 10;          // расстояние между линиями
var middleSpace;         // место для центральной части умножителя
var xPoint = 100;        // начальная 'x' координата
var yPoint = 100;		 // начальная 'y' координата
var busLength;           // длина шин (вход, выход и т.д.) 1150 
var logicGateAttr;
var lineNodeAttr;
var numbAttr;
var VoltNumbAttr;
var lGTAttr;
var rectWidth = 4;
var amendment = rectWidth/2;
var defaultCL;
var voltageCL;
var themeName = theme;

function nextOutput(num) { // после запятой

  var temp = ( (num - Math.floor(num)).toFixed(1) )[2];
  return 1 * temp;
}

function nextState(num) { // целая часть
  return Math.floor(num);
}  



function setCircuitSize(base,n){
  middleSpace = base * 60;
  busLength = n * (10 +            2 * space + space * base + space + space * n + space + 25 + 2 * space + space + space * base);
}

function setTheme(name){
  switch(name){
    case `default`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#595959", strokeWidth: 2};
       lineNodeAttr = {fill:"#FDF7FE",stroke: "#7AE798"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#7AE798"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#AA55FF';
       voltageCL = '#D02222';
       document.body.style.background = "#16B563";
    break;
    case `classic`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#000000", strokeWidth: 2};
       lineNodeAttr = {fill:"#000000",stroke: "#FFE99B"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#FFE99B"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#FFE99B';
       voltageCL = '#D02222';
       document.body.style.background = "#0D4D2B";
    break;
     case `ocean`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#595959", strokeWidth: 2};
       lineNodeAttr = {fill:"#FBFEFE",stroke: "#B7EEFC"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#C0FCFF"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#75DDF0'; 
       voltageCL = '#D02222';
       document.body.style.background = "#375F6B";
    break;
    case `deep ocean`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#023926", strokeWidth: 2};
       lineNodeAttr = {fill:"#FBFEFE",stroke: "#B7EEFC"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#5C9DF9"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#02BAFB';
       voltageCL = '#D02222';
       document.body.style.background = "#0D1A20";
    break;
    case `red`:
       logicGateAttr = {fill:"#2B3036", stroke: "#595959", strokeWidth: 2};
       lineNodeAttr = {fill:"#FBFEFE",stroke: "#B7EEFC"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#FBD9BB"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#FD5D39';
       voltageCL = '#55FF7F';
       document.body.style.background = "#621211";
    break;
     case `neon`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#000000", strokeWidth: 2};
       lineNodeAttr = {fill:"#111111",stroke: "#00F7FF"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#FBD9BB"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#08CED6';
       voltageCL = '#D02222';
       document.body.style.background = "#111111";
    break;
    case `xam`:
       logicGateAttr = {fill:"#BDBDBD", stroke: "#000000", strokeWidth: 2};
       lineNodeAttr = {fill:"#FFFFFF",stroke: "#00F7FF"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#FBD9BB"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#9DBFDC';
       voltageCL = '#D02222';
       document.body.style.background = "#09131C";
    break;
    default:
    logicGateAttr = {fill:"#BDBDBD", stroke: "#000000", strokeWidth: 2};
       lineNodeAttr = {fill:"#000000",stroke: "#000000"};
       numbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#FBD9BB"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FDF7FE",stroke: "#D02222"};
       lGTAttr = {stroke: "#050C04",strokeWidth: 0};
       defaultCL = '#000000';
       voltageCL = '#D02222';
       document.body.style.background = "#FFFFFF";
    break;
  }  
} 

setTheme(themeName);
setCircuitSize(base,n);
//setCircuitSize(base,n);
// **********************
// *** ОСНОВНЫЕ ЛИНИИ ***
// **********************

var inputLine = [];      // линии входа 
var cLine = [];          // линии С
var hLine = [];          // линии H
var outputLine = [];     // линии выхода

// ************************
// *** ПЕРЕМЕННЫЕ БЛОКА ***
// ************************

var upperOutLine = [];        // горизонтальные линии, идущие на выход
for (var i = 0; i < n; i++){
       upperOutLine[i] = [];
       for (var j = 0; j < base; j++){
           upperOutLine[i][j] = 0;
   }}

var upperHLine = [];          // горизонтальные линии, идущие на H
for (var i = 0; i < n; i++){
       upperHLine[i] = [];
       for (var j = 0; j < n; j++){
           upperHLine[i][j] = 0;
   }}

var underRectLine = [];       // линия под прямоугольниками, соединяющая C и H входы

var lowerInLine = [];         // горизонтальные линии, идущие на вход
for (var i = 0; i < n; i++){
       lowerInLine[i] = [];
       for (var j = 0; j < base; j++){
           lowerInLine[i][j] = 0;
   }}

var lowerInToOutLine = [];    // вертикальные линии, соединяющие вход и выход(часть под вентилем)
for (var i = 0; i < n; i++){
       lowerInToOutLine[i] = [];
       for (var j = 0; j < base; j++){
           lowerInToOutLine[i][j] = 0;
   }}

var upperInToOutLine = [];    // вертикальные линии, соединяющие вход и выход(часть над вентилем)
for (var i = 0; i < n; i++){
       upperInToOutLine[i] = [];
       for (var j = 0; j < base; j++){
           upperInToOutLine[i][j] = 0;
   }}   

var lowerCToHLine = [];       // вертикальные линии, соединяющие C и H(часть под вентилем)
for (var i = 0; i < n; i++){
       lowerCToHLine[i] = [];
       for (var j = 0; j < base; j++){
           lowerCToHLine[i][j] = 0;
   }}

var upperCToHLine = [];       // вертикальные линии, соединяющие C и H(часть над вентилем)
for (var i = 0; i < n; i++){
       upperCToHLine[i] = [];
       for (var j = 0; j < base; j++){
           upperCToHLine[i][j] = 0;
   }}   


var logicGate = [];     // логические вентили "AND"
   for (var i = 0; i < n; i++){
       logicGate[i] = [];
       for (var j = 0; j < base; j++){
           logicGate[i][j] = 0;
   }}


// линия, вместе с соединительными узлами
var DiLine = {         
	constructor: function(x1, y1, x2, y2, ln1, ln2, rn1, rn2){
		this.line = snap.paper.line(x1, y1, x2, y2).attr({stroke: defaultCL,strokeWidth: 2});
		
		if (arguments.length > 4){
		 this.leftNode = snap.paper.rect(ln1 - amendment, ln2 - amendment, rectWidth, rectWidth).attr(lineNodeAttr);
		 if (arguments.length > 6){
		 	this.rightNode = snap.paper.rect(rn1 - amendment, rn2 - amendment, rectWidth, rectWidth).attr(lineNodeAttr);
		 }
	    }
		return this;
			 }
	};
  
			
// рисуем линии входа
for (var i = 0; i < base; i++){
  
    inputLine[i] = Object.create(DiLine).constructor(xPoint,yPoint, xPoint, busLength);
    xPoint += space;
    //g.add(inputLine[i].line);
}

// сделаем двойной пробел между линиями входа и линиями С
xPoint += space;

// рисуем линии C
for (var i = 0; i < n; i++){
    
    cLine[i] = Object.create(DiLine).constructor(xPoint,yPoint, xPoint, busLength);
    xPoint += space;
}


// оставим место для центральной части
xPoint += middleSpace;

// рисуем линии H
for (var i = 0; i < n; i++){
    
    hLine[i] = Object.create(DiLine).constructor(xPoint,yPoint, xPoint, busLength);
    xPoint += space;
}

// сделаем двойной провел между линиями H и линиями выхода
xPoint += space;

// рисуем линии выхода
for (var i = 0; i < base; i++){
    
    outputLine[i] = Object.create(DiLine).constructor(xPoint,yPoint, xPoint, busLength);
    xPoint += space;
}

var block = 0;
while(block < n) {
// сделаем двойной пробел между линиями C и верхними горизонтальными линиями
xPoint = parseFloat(cLine[n-1].line.attr("x1")) + space;
yPoint += 2*space;


// верхние горизонтальные линии, идущие на выход
for (var i = 0; i < base; i++){
	upperOutLine[block][i] = Object.create(DiLine).constructor(xPoint, yPoint, outputLine[i].line.attr("x1"), yPoint, outputLine[i].line.attr("x1"), yPoint);
	yPoint += space;
}

yPoint += space;

// верхние горизонтальные линии, идущие на H
for (var i = 0; i < n; i++){
  	upperHLine[block][i] = Object.create(DiLine).constructor(xPoint,yPoint, hLine[i].line.attr("x1"), yPoint, hLine[i].line.attr("x1"), yPoint);
  	yPoint += space;
  }

xPoint += space;
//создаем прямоугольники
 for (var i = 0; i < base; i++){
 	logicGate[block][i] = snap.paper.rect(xPoint, yPoint, 55, 25).attr(logicGateAttr);
 	var t1 = snap.paper.text(xPoint+3, yPoint+15, '&'+block.toString(base)+','+i.toString(base)).attr(lGTAttr);
 	xPoint += 55;
 }

yPoint = parseFloat(logicGate[block][0].attr("y")) + 25 + space;
// нижняя CH линия
underRectLine[block] = Object.create(DiLine).constructor(cLine[n-1-block].line.attr("x1"), yPoint, hLine[n-1-block].line.attr("x1"), yPoint,
													 cLine[n-1-block].line.attr("x1"), yPoint, hLine[n-1-block].line.attr("x1"), yPoint);
yPoint += space;

 // нижние линии, идущие на вход
for (var i = 0; i < base; i++){
	lowerInLine[block][i] = Object.create(DiLine).constructor(inputLine[base -1 - i].line.attr("x1"), yPoint, hLine[0].line.attr("x1") - space, yPoint,
															  inputLine[base -1 - i].line.attr("x1"), yPoint);
	yPoint += space;
}

//вертикальные линии, соединяющие вход и выход
for (var i = 0; i < base; i++){
  var q = nextState(tableB[i][block]);
  var x = nextOutput(tableB[i][block]);
  q = parseInt(q,base);
  x = parseInt(x,base);
  q = q * 1;
  x = x * 1;
  
  var x1 = parseFloat(logicGate[block][i].attr("x"))+ space;
  var y1 = lowerInLine[block][i].line.attr("y1");
  var x2 = parseFloat(logicGate[block][i].attr("x"))+ space;
  var y2 = parseFloat(logicGate[block][i].attr("y"))+25;
   lowerInToOutLine[block][i] = Object.create(DiLine).constructor(x1,y1,x2,y2,x1,y1);
   y2 = parseFloat(logicGate[block][i].attr("y"));
   y1 = upperOutLine[block][Math.abs(base-1-x)].line.attr("y1");
   
   upperInToOutLine[block][i] = Object.create(DiLine).constructor(x1,y1,x2,y2,x1,y1);

   // вертикальные линии, соединяющие C и H
   x1 = parseFloat(logicGate[block][i].attr("x"))+ 3*space;
   x2 = parseFloat(logicGate[block][i].attr("x"))+ 3*space;
   y1 = underRectLine[block].line.attr("y1");
   y2 = parseFloat(logicGate[block][i].attr("y"))+25;
   lowerCToHLine[block][i] = Object.create(DiLine).constructor(x1,y1,x2,y2,x1,y1);
   y2 = parseFloat(logicGate[block][i].attr("y"));
   y1 = upperHLine[block][Math.abs(n-1-q)].line.attr("y1");
   upperCToHLine[block][i] = Object.create(DiLine).constructor(x1,y1,x2,y2,x1,y1);
}

block++;
}


var inNumb = [];
var outNumb = [];
var cNumb = [];
var hNumb = [];


  for (var i = 0; i < base; i++){
    
   inNumb[i] = snap.paper.text(inputLine[base-1-i].line.attr("x1")-space/2, inputLine[base-1-i].line.attr("y1")-space/4, ''+i).attr(numbAttr);

   outNumb[i] = snap.paper.text(outputLine[base-1-i].line.attr("x1")-space/2, outputLine[base-1-i].line.attr("y1")-space/4, ''+i).attr(numbAttr);

  }  
 
for (var i = 0; i < n; i++){
  cNumb[i] = snap.paper.text(cLine[n-1-i].line.attr("x1")-space/2, cLine[n-1-i].line.attr("y1")-space/4, ''+i).attr(numbAttr);

  hNumb[i] = snap.paper.text(hLine[n-1-i].line.attr("x1")-space/2, hLine[n-1-i].line.attr("y1")-space/4, ''+i).attr(numbAttr);
}

   

var fTime = 500;
var sTime = 1000;
var delay = fTime + sTime * 2;

                    
// функция группирует линии, по которым должен пройти сигнал
function prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG){

  
  var tailMinusX = base - 1 - x;
  var tailMinusQ = n -1 - q;

  for (var i = 0; i < n; i++){
    // x линия для каждого из i блоков, соединенных с x входной линией
    _lowerInLine.push(lowerInLine[i][x]);
    // соединение вход-выход через вентиль
    _lowerInToOutLine.push(lowerInToOutLine[i][x]);
    // горизонтальные линии, идущие на H
    _upperHLine.push(upperHLine[i][tailMinusQ]);
  }

  // нижние линии под вентилем, идущие на H
  for (var i = 0; i < base; i++){
    _lowerCToHLine.push(lowerCToHLine[q][i]);
    
  }
  // верхние линии под вентилем, идущие на H
  // после подачи сигнала на i-ю линию C, активируется i-я линия H
  // нужно найти, какие upperCToHLine затронет i-й сигнал на H
  // для этого смотрим по B-таблице, для каких x и q будет состояние,
  // соответствующее i-му сигналу.
  // Проходим по столбцам. Столбец соответствует блоку вентилей.
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < base; i++){
      var currentQ = nextState(tableB[i][j]);
      // преобразуем к 10й системе, т.к. программа работает в 10й системе
                        currentQ = parseInt(currentQ,base);
                        currentQ = +currentQ;
                        if (currentQ == q){_upperCToHLine.push(upperCToHLine[j][i]); }
    }
  }

  // После прохождения сигнала черезе вентиль, сигнал пойдет
  // на линию H и линию Output. На все линии, связанные с данными, 
  // должен пойти сигнал.
  var nextQ = nextState(tableB[x][q]);
  var nextX = nextOutput(tableB[x][q]);
  nextQ = parseInt(nextQ,base);
  nextX = parseInt(nextX,base);
  nextQ = +nextQ;
  nextX = +nextX;
//console.log(nextX);
//console.log(nextQ);
	for (var i = 0; i < n; i++){
    // x линия для каждого из i блоков, соединенных с x входной линией
    _upperOutLineAfterWorkingLG.push(upperOutLine[i][base-1-nextX]);
    
    // горизонтальные линии, идущие на H
    _upperHLineAfterWorkingLG.push(upperHLine[i][n-1-nextQ]);
  } 

  for (var j = 0; j < n; j++) {
    for (var i = 0; i < base; i++){
      var currentQ = nextState(tableB[i][j]);
      // преобразуем к 10й системе, т.к. программа работает в 10й системе
                        currentQ = parseInt(currentQ,base);
                        currentQ = +currentQ;
                        if (currentQ == nextQ){_upperCToHLineAfterWorkingLG.push(upperCToHLine[j][i]); }
    }
  }

    for (var j = 0; j < n; j++) {
    for (var i = 0; i < base; i++){
      var currentX = nextOutput(tableB[i][j]);
      // преобразуем к 10й системе, т.к. программа работает в 10й системе
                        currentX = parseInt(currentX,base);
                        currentX = +currentX;
                        if (currentX == nextX){_upperInToOutLineAfterWorkingLG.push(upperInToOutLine[j][i]); }
    }
  }



}

// document.getElementById("run").addEventListener("click", function() {

//     var number = document.getElementById("input").value;
//     var state = document.getElementById("state");
//     var q = state.options[state.selectedIndex].value;
//     q = +q;
    
    
//     //takt(q,number);  
//     //console.log("q is : " + q);
//     var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
//       _lowerCToHLine = [], _upperCToHLine = [];

//   prepare(_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,0,q);

   

// function testPrepare(){
//     _lowerInLine.forEach( function(elem,i) {
//                           elem.line.animate({stroke:voltageCL}, fTime);
//                         });
    
//     _lowerInToOutLine.forEach( function(elem,i) {
//                           elem.line.animate({stroke:voltageCL}, fTime);
//                         });
   
//     _upperHLine.forEach( function(elem,i) {
//                           elem.line.animate({stroke:voltageCL}, fTime);
//                         });
  

  
//     _lowerCToHLine.forEach( function(elem,i) {
//                           elem.line.animate({stroke:voltageCL}, fTime);
//                         });
    
  
// _upperCToHLine.forEach( function(elem,i) {
//                           elem.line.animate({stroke:voltageCL}, fTime);
//                         });
// }


// }); 
                      
function takt(q,x){
  
  var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [], _upperOutLineAfterWorkingLG = [],_upperHLineAfterWorkingLG = [],
       _upperCToHLineAfterWorkingLG = [], _upperInToOutLineAfterWorkingLG = [];

  prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG);

                       
                        var tailMinusX = base - 1 - x;
  						var tailMinusQ = n -1 - q;

                        // питание на линию входа
                        inputLine[tailMinusX].line.animate({stroke: voltageCL}, fTime, function(){
                        inputLine[tailMinusX].line.animate({stroke: defaultCL}, sTime);
                        });

                        // числа на входе
                        inNumb[x].animate(VoltNumbAttr, fTime, function(){
                        inNumb[x].animate(numbAttr, sTime);
                        });

                        _lowerInLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                        // питание на с
                        cLine[tailMinusQ].line.animate({stroke:voltageCL}, fTime, function(){
                        cLine[tailMinusQ].line.animate({stroke: defaultCL}, sTime);
                        });
                        // числа на с
                        cNumb[q].animate(VoltNumbAttr, fTime, function(){
                        cNumb[q].animate(numbAttr, sTime);
                        });

                        underRectLine[q].line.animate({stroke:voltageCL}, fTime, function(){
                        underRectLine[q].line.animate({stroke:defaultCL},  sTime);
                        });

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                        // питание на h
                        hLine[tailMinusQ].line.animate({stroke:voltageCL}, fTime, function(){
                        hLine[tailMinusQ].line.animate({stroke:defaultCL}, sTime);
                        });
                        
                        // числа на h
                        hNumb[q].animate(VoltNumbAttr, fTime, function(){
                        hNumb[q].animate(numbAttr, sTime);
                        });

                        _upperHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                        // вентиль пропускает сигнал
                        logicGate[q][x].animate({ fill: voltageCL}, fTime, function(){
                        logicGate[q][x].animate(logicGateAttr, sTime);
                        });

                        // CH линия над вентилем
                        // upperCToHLine[q][x].line.animate({stroke: voltageCL}, fTime, function(){
                        // upperCToHLine[q][x].line.animate({stroke: defaultCL}, sTime);
                        // });

                        // upperInToOutLine[q][x].line.animate({stroke: voltageCL}, fTime, function(){
                        // upperInToOutLine[q][x].line.animate({stroke: defaultCL}, sTime);
                        // });


                        // Находим номера линий H и Output, которые сработают после прохождения
                        // сигнала через вентиль
                        var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        nextQ = +nextQ;
                        nextX = +nextX;
                        

                        // upperHLine[q][n-1-nextQ].line.animate({stroke: voltageCL}, fTime, function(){
                        // upperHLine[q][n-1-nextQ].line.animate({stroke: defaultCL}, sTime);
                        // });

                        // upperOutLine[q][base-1-nextX].line.animate({stroke: voltageCL}, fTime, function(){
                        // upperOutLine[q][base-1-nextX].line.animate({stroke: defaultCL}, sTime);
                        // });
                        
                        hLine[n-1-nextQ].line.animate({stroke: voltageCL}, fTime, function(){
                        hLine[n-1-nextQ].line.animate({stroke: defaultCL}, sTime);
                        });

                        // числа на h
                        hNumb[nextQ].animate(VoltNumbAttr, fTime, function(){
                        hNumb[nextQ].animate(numbAttr, sTime);
                        });

                        outputLine[base-1-nextX].line.animate({stroke: voltageCL}, fTime, function(){
                        outputLine[base-1-nextX].line.animate({stroke: defaultCL}, sTime);
                        });

                        //числа на выходе
                        outNumb[nextX].animate(VoltNumbAttr, fTime, function(){
                        outNumb[nextX].animate(numbAttr, sTime);
                        });

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        }); 
                         

                        
                        
}




  //setInterval(takt, 5000,0,0);
// загораются 2 линии q = 0 , x = 1, n = 4, base = 4
  function runMachine(q, _number){

      var number = _number;
      var currentState = q;
      var currentInput;       // очередной разряд входного числа
      var currentCell;        // ячейка таблицы для выбора q и x
      var currentOutput;      // очередной разряд результата умножения
      var result = '';

      var output = document.getElementById('output');
      // очищаем поле перед новым запуском
      output.value = '';
      // отключаем элементы управления во время работы
      document.getElementById('output').disabled = true;
      document.getElementById('run').disabled = true;
      document.getElementById('takt').disabled = true;
      document.getElementById('state').disabled = true;
      //
       document.getElementById('output').style.backgroundColor = "#FFB802";
      // т.к. в начале на вход подают младшие разряды числа
      var i = number.length - 1; 
      var timerId =  setInterval(function(){

       currentInput = i >= 0 ? number.charAt(i) : '0'; 
       // унарный плюс для преобразования в число
       currentInput = +currentInput;      
       takt(currentState,currentInput);
       // && i < 0 иначе может быть середина числа, где идут подряд нули
       if(currentInput == 0 && currentState == 0 && currentOutput == 0 ){
          clearInterval(timerId);
          //включаем элементы управления после завершения работы
          document.getElementById('output').disabled = false;
          document.getElementById('run').disabled = false;
          document.getElementById('takt').disabled = false;
          document.getElementById('state').disabled = false;
          //
          document.getElementById('output').style.backgroundColor = "#5EBC00";
        }
       
       i--;
       currentCell = tableB[currentInput][currentState];
       currentState = nextState(currentCell);
       currentOutput = nextOutput(currentCell);
       result += currentOutput;
       
       output.value += currentOutput;

       
       
  
  },delay);
}

//   function runMachine(q, _number){

      
   
//       var i = number.length - 1; // т.к. в начале на вход подают младшие разряды числа
//       var timerId =  setInterval(function go(){

//        currentInput = i >= 0 ? number.charAt(i) : '0'; 
//        currentInput = +currentInput;      // унарный плюс для преобразования в число
//        takt(currentState,currentInput);

//        if(есть что выполнять){setTimeout(go, delay);}       
       
  
//   },delay);
// }


   
 //document.getElementById("xxx").addEventListener("click", function() {

        
    
    
//}); 

document.getElementById("run").addEventListener("click", function() {

    var number = document.getElementById("input").value;
    var state = document.getElementById("state");
    var q = state.options[state.selectedIndex].value;
    q = +q;
    
      runMachine(q, number);   
    
 }); 

function prepare1(_lowerInLine1,_lowerInToOutLine1,_lowerCToHLine1,_upperHLine1,_upperCToHLine1,x,q){
  
  
 	var tailMinusX = base - 1 - x;
 	var tailMinusQ = n -1 - q;

  var qqq = nextState(tableB[x][q]);
                        var xxx = nextOutput(tableB[x][q]);
                        qqq = parseInt(qqq,base);
                        xxx = parseInt(xxx,base);
                        qqq = qqq * 1;
                        xxx = xxx * 1;

  for (var i = 0; i < n; i++){
    // x линия для каждого из i блоков, соединенных с x входной линией
    _lowerInLine1.push(lowerInLine[i][x]);
    // соединение вход-выход через вентиль
    _lowerInToOutLine1.push(lowerInToOutLine[i][x]);

   // if(i !== q && q !== (n-1-qqq)){
    _upperHLine1.push(upperHLine[i][q]);
    //}

  }


  for (var i = 0; i < base; i++){
    _lowerCToHLine1.push(lowerCToHLine[n-q-1][i]);
    
  }


  for (var i = 0; i < base; i++) {
    for (var j = 0; j < n; j++){
      var qq = nextState(tableB[i][j]);
                        qq = parseInt(qq,base);
                        qq = qq * 1;

 if (qq == q ){_upperCToHLine1.push(upperCToHLine[j][i]); }
                        // if (qq == q && j !== (n-q-1) && i !== x){_upperCToHLine1.push(upperCToHLine[j][i]); }
    }
  }



}

function takt1(q,x,taktCount){
  
   var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [], _upperOutLineAfterWorkingLG = [],_upperHLineAfterWorkingLG = [],
       _upperCToHLineAfterWorkingLG = [], _upperInToOutLineAfterWorkingLG = [];

  prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG);

//   var _lowerInLine1 = [], _lowerInToOutLine1 = [], _upperHLine1 = [],
//       _lowerCToHLine1 = [], _upperCToHLine1 = [];
// prepare1(_lowerInLine1,_lowerInToOutLine1,_lowerCToHLine1,_upperHLine1,_upperCToHLine1,x,q);



                        

                        var tailMinusX = base - 1 - x;
  						var tailMinusQ = n -1 - q;

                        
                        if(taktCount == 1) {
                        return function turnOn(){
                                                  
                          //console.log("first work");

                        // питание на линию входа
                        inputLine[tailMinusX].line.animate({stroke: voltageCL}, fTime);
                        
                        
                        // числа на входе
                        inNumb[x].animate(VoltNumbAttr, fTime);
                        
                        

                        _lowerInLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                          
                        
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                         
                        
                        });

                        // питание на с
                        cLine[tailMinusQ].line.animate({stroke:voltageCL}, fTime);
                        
                        
                        // числа на с
                        cNumb[q].animate(VoltNumbAttr, fTime);
                        
                       

                        underRectLine[q].line.animate({stroke:voltageCL},fTime);
                        
                        

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL},fTime);
                          
                        
                        });

                        // питание на h
                        hLine[tailMinusQ].line.animate({stroke:voltageCL},fTime);
                        
                        
                        
                        // числа на h
                        hNumb[q].animate(VoltNumbAttr, fTime);
                        
                        

                        _upperHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                          
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL},fTime);
                          
                       
                        });

                        logicGate[q][x].animate({ fill: voltageCL},fTime);
                        }
                          }
                          if(taktCount == 2) {
                        return function process(){
                          
                          console.log("second work");
                          // ОТКЛЮЧАЕМ ВСЕ, ЧТО БЫЛО НА ПЕРВОМ ШАГЕ

                          // питание на линию входа
                        
                        inputLine[tailMinusX].line.animate({stroke: defaultCL}, fTime);
                        
                        // числа на входе
                        
                        inNumb[x].animate(numbAttr, fTime);
                        

                        _lowerInLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        
                        });

                        // питание на с
                        
                        cLine[tailMinusQ].line.animate({stroke: defaultCL}, fTime);
                        
                        // числа на с
                        
                        cNumb[q].animate(numbAttr, fTime);
                       

                        
                        underRectLine[q].line.animate({stroke:defaultCL},  fTime);
                        

                        _lowerCToHLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        
                        });

                        // питание на h
                        
                        hLine[tailMinusQ].line.animate({stroke:defaultCL}, fTime);
                        
                        
                        
                        // числа на h
                        
                        hNumb[q].animate(numbAttr, fTime);
                        

                        _upperHLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                       
                        });

                        // ВКЛЮЧАЕМ ОСТАЛЬНОЕ

                          logicGate[q][x].animate({ fill: "#00AA7F"},sTime);

                          // upperCToHLine[q][x].line.animate({stroke: voltageCL},fTime);
                        
                        

                        // upperInToOutLine[q][x].line.animate({stroke: voltageCL},fTime);



                         // Находим номера линий H и Output, которые сработают после прохождения
                        // сигнала через вентиль
                        var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        nextQ = +nextQ;
                        nextX = +nextX;

                        // upperHLine[q][n-1-nextQ].line.animate({stroke: voltageCL},fTime);
                        
                        

                        //upperOutLine[q][base-1-nextX].line.animate({stroke: voltageCL},fTime);
                        
                        
                        
                        hLine[n-1-nextQ].line.animate({stroke: voltageCL},sTime);
                        
                        

                        // числа на h
                        hNumb[nextQ].animate(VoltNumbAttr, sTime);
                        
                        

                        outputLine[base-1-nextX].line.animate({stroke: voltageCL},sTime);
                        
                        

                        //числа на выходе
                        outNumb[nextX].animate(VoltNumbAttr,sTime);

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: voltageCL}, sTime);
                        });
                       

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: voltageCL}, sTime);
                        });
                        

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: voltageCL}, sTime);
                        });
                       

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: voltageCL}, sTime);
                        });
                        
                        
                       

                        
                        }
                        }
                        if(taktCount == 3) {
                        return function turnOff(){
                          

                           console.log("third work");

                           var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        nextQ = +nextQ;
                        nextX = +nextX;

                        logicGate[q][x].animate(logicGateAttr, fTime);
                        

                        
                       hLine[n-1-nextQ].line.animate({stroke: defaultCL},fTime);
                        
                        

                        // числа на h
                        hNumb[nextQ].animate(numbAttr, fTime);
                        
                        

                        outputLine[base-1-nextX].line.animate({stroke: defaultCL},fTime);
                        
                        

                        //числа на выходе
                        outNumb[nextX].animate(numbAttr,fTime);

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        });
                       

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        });
                        

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        });
                       

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, fTime);
                        });

                        }

                        
                        }

                     


                        // var qqq = nextState(tableB[normX][normQ]);
                        // var xxx = nextOutput(tableB[normX][normQ]);
                        // qqq = parseInt(qqq,base);
                        // xxx = parseInt(xxx,base);
                        // qqq = qqq * 1;
                        // xxx = xxx * 1;
                        

                        // if (taktCount % 3 == 1){
                        //   turnOn();
                        // }

                        // if (taktCount % 3 == 2){
                        //   process();
                        // }

                        // if (taktCount % 3 == 0){
                        //   turnOff();
                        // }
                        
                        
                        
                        
}



var taktCount = 0;
var taktNumber;
var taktState;
var taktQ;
var isRun = 0;
var currentCell;
var currentInput;
var target;
var output;
var currentOutput;      // очередной разряд результата умножения

var currentState;
var softNextTarget, nextCurrentInput,nextCurrentCell;


var nexState, nextInput;
var taktArray = [];

document.getElementById("takt").addEventListener("click", function() {

    if(!isRun){
     output = document.getElementById('output');
     
      output.value = '';  
    taktNumber = document.getElementById("input").value;
    taktState = document.getElementById("state");
    taktQ = taktState.options[taktState.selectedIndex].value;
    taktQ = +taktQ;

    target = taktNumber.length - 1;
    isRun = 1;
    currentState = taktQ;
  }
     
    // currentInput = (target - taktCount) >= 0 ? taktNumber.charAt(target) : '0';
    // currentInput = +currentInput;

   

    
    // currentCell = tableB[currentInput][currentState];
    // currentState = nextState(currentCell); // nextState
    

    
    console.log("takt: " + taktCount);
    console.log("На вход подали: " + nextInput);
    console.log("перехожу в состояние : " + nexState);
    

    if(taktCount == 0){

      currentInput = (target) >= 0 ? taktNumber.charAt(target) : '0';
      currentInput = +currentInput;

      taktArray[taktCount] = new Array(3);

      for (var j = 0; j < 3; j++) {
        taktArray[0][j] = takt1(taktQ, currentInput,j+1);
      }
      // console.log(taktArray);
      taktArray[0][0]();
      // Подготовим следующий массив для следующего клика
       
        currentCell = tableB[currentInput][taktQ];
        nexState = nextState(currentCell); 

        nextInput = (target-1) >= 0 ? taktNumber.charAt(target-1) : '0';
        nextInput = +nextInput;

        

        taktArray[taktCount+1] = new Array(3);

       for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt1(nexState, nextInput,j+1);
       }
    }

    if(taktCount == 1){

     taktArray[0][1]();
     taktArray[1][0]();
     
        currentCell = tableB[nextInput][nexState];
        nexState = nextState(currentCell);

       nextInput = (target-2) >= 0 ? taktNumber.charAt(target-2) : '0';
       nextInput = +nextInput;

        

        taktArray[taktCount+1] = new Array(3);

       for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt1(nexState, nextInput,j+1);
       }

      //  taktArray[taktCount+1] = new Array(3);

      // for (var j = 0; j < 3; j++) {
      //    taktArray[taktCount+1][j] = takt1(currentState, nextInput,j+1);
      //  }
    }   


    if(taktCount >= 2){

    

     taktArray[taktCount-2][2]();
     taktArray[taktCount-1][1]();
     taktArray[taktCount][0]();
     
     currentCell = tableB[nextInput][nexState];
        nexState = nextState(currentCell);

       nextInput = (target-taktCount-1) >= 0 ? taktNumber.charAt(target-taktCount-1) : '0';
       nextInput = +nextInput;

     taktArray[taktCount+1] = new Array(3);

      for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt1(nexState, nextInput,j+1);
       }
    }   
    
     //target--;
     taktCount++;
});     


    snap.zpd();

    // UI improvement needed
    var intervalF;
    var clearIntervalF = function () {
        clearInterval(intervalF);
    };
    document.getElementById('location').onmousedown = function () {
        snap.panTo(300, 0);
    };
    document.getElementById('left').onmousedown = function () {
        snap.panTo('-10');
        intervalF = setInterval(function () {
            snap.panTo('-10');
        }, 100);
    };
    document.getElementById('left').onmouseup = clearIntervalF;
    document.getElementById('left').onmouseleave = clearIntervalF;
    document.getElementById('right').onmousedown = function () {
        snap.panTo('+10');
        intervalF = setInterval(function () {
            snap.panTo('+10');
        }, 100);
    };
    document.getElementById('right').onmouseup = clearIntervalF;
    document.getElementById('right').onmouseleave = clearIntervalF;
    document.getElementById('up').onmousedown = function () {
        snap.panTo('+0', '-10');
        intervalF = setInterval(function () {
            snap.panTo('+0', '-10');
        }, 100);
    };
    document.getElementById('up').onmouseup = clearIntervalF;
    document.getElementById('up').onmouseleave = clearIntervalF;
    document.getElementById('down').onmousedown = function () {
        snap.panTo('+0', '+10');
        intervalF = setInterval(function () {
            snap.panTo('+0', '+10');
        }, 100);
    };
    document.getElementById('down').onmouseup = clearIntervalF;
    document.getElementById('down').onmouseleave = clearIntervalF;
    document.getElementById('rotateL').onmousedown = function () {
        snap.rotate(-90);
        intervalF = setInterval(function () {
            snap.rotate(-90);
        }, 100);
    };
    document.getElementById('rotateL').onmouseup = clearIntervalF;
    document.getElementById('rotateL').onmouseleave = clearIntervalF;
    document.getElementById('rotateR').onmousedown = function () {
        snap.rotate(90);
        intervalF = setInterval(function () {
            snap.rotate(90);
        }, 100);
    };
    document.getElementById('rotateR').onmouseup = clearIntervalF;
    document.getElementById('rotateR').onmouseleave = clearIntervalF;
    
    
    
    
    document.onkeydown = function (e) {
        switch(e.keyCode) {
            case 37: // left
                snap.panTo('-10');
                break;
            case 38: // up
                snap.panTo('+0', '-10');
                break;
            case 39: // right
                snap.panTo('+10');
                break;
            case 40: // down
                snap.panTo('+0', '+10');
                break;
        }
    };

}   













