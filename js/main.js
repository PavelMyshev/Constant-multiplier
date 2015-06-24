document.getElementById("apply").addEventListener("click", function() {

    var base = document.getElementById("base").value;
    var multiplier = document.getElementById("multiplier").value;
    var theme = document.getElementById("theme");
        theme = theme.options[theme.selectedIndex].value;
    base = +base;
    multiplier = +multiplier;
    
    create(base, multiplier,theme);     
    
    
}); 

function create(_base, multiplier,theme) {

var snap = Snap("svg");

var base = _base;       // система счисления
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
var tableB = [];      
for(var i = 0; i < base; i++){
	tableB[i] = []; 
}

// ини­циа­ли­зи­ро­вать B-таблицу
for(var x = 0; x < base; x++) {
	for(q = 0; q < n; q++) {
		tableB[x][q] = stateTransition(q,x) + '.' + output(q,x);
	}
}
console.table(tableB);

var space = 10;          // расстояние между линиями
var middleSpace;         // место для центральной части умножителя
var xPoint = 100;        // начальная 'x' координата
var yPoint = 100;		     // начальная 'y' координата
var busLength;           // длина шин (вход, выход и т.д.)
var logicGateAttr;
var lineNodeAttr;
var numbAttr;
var VoltNumbAttr;
var lGTAttr;
var rectWidth = 4;
var amendment = rectWidth/2;
var voltageAttr;
var themeName = theme;
var textAttr;
var voltageLGCProcess, voltageLGC;
var logicGateWidth = 55, logicGateHeight = 25;


// после разделителя
function nextOutput(cell) { 

  return cell.substr(cell.indexOf(".") + 1);
}

// перед разделителем
function nextState(cell) { 
  
  return cell.substr(0, cell.indexOf('.')); 
}  

// размеры схемы
function setCircuitSize(base,n){
  middleSpace = base * 60;
  busLength = n * (10 +    2 * space + space * base + space + space * n + space + 25 + 2 * space + space + space * base);
}

function setTheme(name){
  switch(name){
        
     case `neon`:
       lineNodeAttr = {fill:"#000000",stroke: "#7CE0D8"};
       //numbers
       numbAttr =  {fontSize: '12px',fill:"#12575C",stroke: "#12575C"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#02D9DE",stroke: "#02D9DE"};
       //text
       textAttr = {fontFamily: 'DroidMonoRegular', fontSize: '13px',fill:"#7CE0D8",stroke: "#7CE0D8"};
       // text in gate
       lGTAttr = {fill:"#2A2A2A", stroke: "#2A2A2A",strokeWidth: 0};
       //line
       defaultAttr = {fill:"#12575C", stroke: "#12575C", strokeWidth: 2};
       voltageAttr = {fill:"#02D9DE", stroke: "#02D9DE", strokeWidth: 4};
       //gate
       logicGateAttr = {fill:"#9E9FAA", stroke: "#12575C", strokeWidth: 2};
       voltageLGCProcess = {fill:"#95C331"};
       voltageLGC = {fill:"#02D9DE"};
       document.body.style.background = "#111111";
    break;
     case `red`:
       lineNodeAttr = {fill:"#AE4353",stroke: "#FECFD9"};
       //numbers
       numbAttr =  {fontSize: '12px',fill:"#F0E4E7",stroke: "#F0E4E7"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#FFFF00",stroke: "#FFFF00"};
       //text
       textAttr = {fontFamily: 'DroidMonoRegular', fontSize: '13px',fill:"#F0E4E7",stroke: "#F0E4E7"};
       // text in gate
       lGTAttr = {fill:"#2E2E2F", stroke: "#111112",strokeWidth: 0};
       //line
       defaultAttr = {fill:"#FECFD9", stroke: "#FECFD9", strokeWidth: 2};
       voltageAttr = {fill:"#A59EDE", stroke: "#FFFF00", strokeWidth: 4};
       //gate
       logicGateAttr = {fill:"#BDBDBD", stroke: "#6D6D70", strokeWidth: 2};
       voltageLGCProcess = {fill:"#00FF7B"};
       voltageLGC = {fill:"#FFFF00"}; //  A0182C
       document.body.style.background = "#5C151E";
    break;
    case `classic`:
       lineNodeAttr = {fill:"#000000",stroke: "#FFE99B"};
       //numbers
       numbAttr =  {fontSize: '12px',fill:"#FFE99B",stroke: "#FFE99B"};
       VoltNumbAttr =  {fontSize: '12px',fill:"#D02222",stroke: "#D02222"};
       //text
       textAttr = {fontFamily: 'DroidMonoRegular', fontSize: '13px',fill:"#FFE99B",stroke: "#FFE99B"};
       // text in gate
       lGTAttr = {fill:"#080808", stroke: "#080808",strokeWidth: 0};
       //line
       defaultAttr = {fill:"#FFE99B", stroke: "#FFE99B", strokeWidth: 2};
       voltageAttr = {fill:"#D02222", stroke: "#D02222", strokeWidth: 4};
       //gate
       logicGateAttr = {fill:"#BDBDBD", stroke: "#080808", strokeWidth: 2};
       voltageLGCProcess = {fill:"#00FF7B"};
       voltageLGC = {fill:"#D02222"}; 
       document.body.style.background = "#0D4D2B";
    break;
    
  }  
} 

setTheme(themeName);
setCircuitSize(base,n);

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
    }

var upperHLine = [];          // горизонтальные линии, идущие на H
for (var i = 0; i < n; i++){
       upperHLine[i] = [];
    }

var underRectLine = [];       // линия под прямоугольниками, соединяющая C и H входы

var lowerInLine = [];         // горизонтальные линии, идущие на вход
for (var i = 0; i < n; i++){
       lowerInLine[i] = [];
    }

var lowerInToOutLine = [];    // вертикальные линии, соединяющие вход и выход(часть под вентилем)
for (var i = 0; i < n; i++){
       lowerInToOutLine[i] = [];
    }

var upperInToOutLine = [];    // вертикальные линии, соединяющие вход и выход(часть над вентилем)
for (var i = 0; i < n; i++){
       upperInToOutLine[i] = [];
    }   

var lowerCToHLine = [];       // вертикальные линии, соединяющие C и H(часть под вентилем)
for (var i = 0; i < n; i++){
       lowerCToHLine[i] = [];
    }

var upperCToHLine = [];       // вертикальные линии, соединяющие C и H(часть над вентилем)
for (var i = 0; i < n; i++){
       upperCToHLine[i] = [];
    }   


var logicGate = [];     // логические вентили "AND"
   for (var i = 0; i < n; i++){
          logicGate[i] = [];
       }


// линия, вместе с соединительными узлами
var DiLine = {         
	constructor: function(x1, y1, x2, y2, ln1, ln2, rn1, rn2){
		this.line = snap.paper.line(x1, y1, x2, y2).attr(defaultAttr);
		
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
 	logicGate[block][i] = snap.paper.rect(xPoint, yPoint, logicGateWidth, logicGateHeight).attr(logicGateAttr);
 	snap.paper.text(xPoint+3, yPoint+15, '&' + block.toString(base) + ',' + i.toString(base)).attr(lGTAttr);
 	xPoint += logicGateWidth;
 }

yPoint = parseFloat(logicGate[block][0].attr("y")) + logicGateHeight + space;
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
  q = +q;
  x = +x;
  
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

// надписи для шин
function createInscription(){
  // INPUT
  var inputName = "In";
  var InLineMiddle = Math.floor(base / 2);             // индекс средней линии
  var InNameMiddle = Math.floor(inputName.length / 2); // индекс среднего символа в надписи
  var x = inputLine[InLineMiddle].line.attr("x1");
  var y = inputLine[InLineMiddle].line.attr("y1");
  x = +x;
  x -= space/2;
  y = +y;
  y -=19;
  
var startXCord = InNameMiddle * 10;
x -= startXCord;
for (var i = 0; i < inputName.length; i++){
    snap.paper.text(x,y,inputName[i]).attr(textAttr);
    x += 10;
}

// OUTPUT
var outputName = "Out";
var OutLineMiddle = Math.floor(base / 2);               // индекс средней линии
 var OutNameMiddle = Math.floor(outputName.length / 2); // индекс среднего символа в надписи
   x = outputLine[OutLineMiddle].line.attr("x1");
   y = outputLine[OutLineMiddle].line.attr("y1");
  x = +x;
  x -= space/2;
  y = +y;
  y -=19;

   startXCord = OutNameMiddle * 10;
x -= startXCord;
for (var i = 0; i < outputName.length; i++){
    snap.paper.text(x,y,outputName[i]).attr(textAttr);
    x += 10;
}

// control INPUT
var CInName = "Cin";
var cLineMiddle = Math.floor(n / 2);                 // индекс средней линии
 var CInNameMiddle = Math.floor(CInName.length / 2); // индекс среднего символа в надписи
   x = cLine[cLineMiddle].line.attr("x1");
   y = cLine[cLineMiddle].line.attr("y1");
  x = +x;
  x -= space/2;
  y = +y;
  y -=19;

   startXCord = CInNameMiddle * 10;
x -= startXCord;
for (var i = 0; i < CInName.length; i++){
    snap.paper.text(x,y,CInName[i]).attr(textAttr);
    x += 10;
}

// control OUTPUT
var COutName = "Cout";
var hLineMiddle = Math.floor(n / 2);                   // индекс средней линии
 var COutNameMiddle = Math.floor(COutName.length / 2); // индекс среднего символа в надписи
   x = hLine[hLineMiddle].line.attr("x1");
   y = hLine[hLineMiddle].line.attr("y1");
  x = +x;
  x -= space/2;
  y = +y;
  y -=19;

   startXCord = COutNameMiddle * 10;
x -= startXCord;
for (var i = 0; i < COutName.length; i++){
    snap.paper.text(x,y,COutName[i]).attr(textAttr);
    x += 10;
}


}

createInscription();  

var fTime = 500;
var sTime = 1000;
var delay = fTime + sTime * 2;

                    
// функция группирует линии, по которым должен пройти сигнал
function prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG){
console.log("x: " + x);
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

  // После прохождения сигнала через вентиль, сигнал пойдет
  // на линию H и линию Output. На все линии, связанные с данными, 
  // должен пойти сигнал.
  var nextQ = nextState(tableB[x][q]);
  var nextX = nextOutput(tableB[x][q]);
  nextQ = parseInt(nextQ,base);
  nextX = parseInt(nextX,base);
  
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


                      
function takt(q,x){
  
  var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [], _upperOutLineAfterWorkingLG = [],_upperHLineAfterWorkingLG = [],
       _upperCToHLineAfterWorkingLG = [], _upperInToOutLineAfterWorkingLG = [];

  prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG);

                       
                        var tailMinusX = base - 1 - x;
  						          var tailMinusQ = n -1 - q;

                        // питание на линию входа
                        inputLine[tailMinusX].line.animate(voltageAttr, fTime, function(){
                        inputLine[tailMinusX].line.animate(defaultAttr, sTime);
                        });

                        // числа на входе
                        inNumb[x].animate(VoltNumbAttr, fTime, function(){
                        inNumb[x].animate(numbAttr, sTime);
                        });

                        _lowerInLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                        // питание на с
                        cLine[tailMinusQ].line.animate(voltageAttr, fTime, function(){
                        cLine[tailMinusQ].line.animate(defaultAttr, sTime);
                        });
                        // числа на с
                        cNumb[q].animate(VoltNumbAttr, fTime, function(){
                        cNumb[q].animate(numbAttr, sTime);
                        });

                        underRectLine[q].line.animate(voltageAttr, fTime, function(){
                        underRectLine[q].line.animate(defaultAttr,  sTime);
                        });

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                        // питание на h
                        hLine[tailMinusQ].line.animate(voltageAttr, fTime, function(){
                        hLine[tailMinusQ].line.animate(defaultAttr, sTime);
                        });
                        
                        // числа на h
                        hNumb[q].animate(VoltNumbAttr, fTime, function(){
                        hNumb[q].animate(numbAttr, sTime);
                        });

                        _upperHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                        // вентиль пропускает сигнал
                        logicGate[q][x].animate(voltageLGC, fTime, function(){
                        logicGate[q][x].animate(logicGateAttr, sTime);
                        });

                        // CH линия над вентилем
                        // upperCToHLine[q][x].line.animate(voltageAttr, fTime, function(){
                        // upperCToHLine[q][x].line.animate(defaultAttr, sTime);
                        // });

                        // upperInToOutLine[q][x].line.animate(voltageAttr, fTime, function(){
                        // upperInToOutLine[q][x].line.animate(defaultAttr, sTime);
                        // });


                        // Находим номера линий H и Output, которые сработают после прохождения
                        // сигнала через вентиль
                        var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        
                        // upperHLine[q][n-1-nextQ].line.animate(voltageAttr, fTime, function(){
                        // upperHLine[q][n-1-nextQ].line.animate(defaultAttr, sTime);
                        // });

                        // upperOutLine[q][base-1-nextX].line.animate(voltageAttr, fTime, function(){
                        // upperOutLine[q][base-1-nextX].line.animate(defaultAttr, sTime);
                        // });
                       
                        hLine[n-1-nextQ].line.animate(voltageAttr, fTime, function(){
                        hLine[n-1-nextQ].line.animate(defaultAttr, sTime);
                        });

                        // числа на h
                        hNumb[nextQ].animate(VoltNumbAttr, fTime, function(){
                        hNumb[nextQ].animate(numbAttr, sTime);
                        });

                        outputLine[base-1-nextX].line.animate(voltageAttr, fTime, function(){
                        outputLine[base-1-nextX].line.animate(defaultAttr, sTime);
                        });

                        //числа на выходе
                        outNumb[nextX].animate(VoltNumbAttr, fTime, function(){
                        outNumb[nextX].animate(numbAttr, sTime);
                        });

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        });

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime, function(){
                          elem.line.animate(defaultAttr, sTime);
                        });
                        }); 
                         

                        
                        
}


// возможно, лучше альтернативная реализация через 
// setTimeout , т.к. setInterval и setTimeout
// работают по разному.
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
      
      document.getElementById('output').style.backgroundColor = "#FFB802";
      // т.к. в начале на вход подают младшие разряды числа
      var i = number.length - 1; 
      var timerId =  setInterval(function(){

       currentInput = i >= 0 ? number.charAt(i) : '0';
       // перед передачей в другие функции, которые манипулируют линиями
       // необходимо перейти к 10й системе, т.к. массивы основаны на 10-й
       // системе
       currentInput = parseInt(currentInput,base);
       currentState = parseInt(currentState,base); 
        
       takt(currentState,currentInput);
       // && i < 0 иначе может быть середина числа, где идут подряд нули
       if(currentInput == 0 && currentState == 0 && currentOutput == 0 && i < 0){
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

       output.value = currentOutput + result;
       result = currentOutput + result;
       

  },delay);
}



document.getElementById("run").addEventListener("click", function() {

    var number = document.getElementById("input").value;
    var state = document.getElementById("state");
    var q = state.options[state.selectedIndex].value;
      
    runMachine(q, number);   
    
 }); 


function takt51(q,x,taktCount){
  
   var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [], _upperOutLineAfterWorkingLG = [],_upperHLineAfterWorkingLG = [],
       _upperCToHLineAfterWorkingLG = [], _upperInToOutLineAfterWorkingLG = [];

  prepare(q,x,_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,_upperOutLineAfterWorkingLG,
	_upperHLineAfterWorkingLG,_upperCToHLineAfterWorkingLG,_upperInToOutLineAfterWorkingLG);
                        

                        var tailMinusX = base - 1 - x;
  						          var tailMinusQ = n -1 - q;

                        
                        if(taktCount == 1) {
                        return function turnOn(){
                                                  
                        // питание на линию входа
                        inputLine[tailMinusX].line.animate(voltageAttr, fTime);
                        
                        
                        // числа на входе
                        inNumb[x].animate(VoltNumbAttr, fTime);
                        
                        

                        _lowerInLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime);
                          
                        
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime);
                         
                        
                        });

                        // питание на с
                        cLine[tailMinusQ].line.animate(voltageAttr, fTime);
                        
                        
                        // числа на с
                        cNumb[q].animate(VoltNumbAttr, fTime);
                        
                       

                        underRectLine[q].line.animate(voltageAttr,fTime);
                        
                        

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr,fTime);
                          
                        
                        });

                        // питание на h
                        hLine[tailMinusQ].line.animate(voltageAttr,fTime);
                        
                        
                        
                        // числа на h
                        hNumb[q].animate(VoltNumbAttr, fTime);
                        
                        

                        _upperHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr, fTime);
                          
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          elem.line.animate(voltageAttr,fTime);
                          
                       
                        });

                        logicGate[q][x].animate(voltageLGC,fTime);
                        }
                          }
                          if(taktCount == 2) {
                        return function process(){
                          
                          // ОТКЛЮЧАЕМ ВСЕ, ЧТО БЫЛО НА ПЕРВОМ ШАГЕ

                          // питание на линию входа
                        
                        inputLine[tailMinusX].line.animate(defaultAttr, fTime);
                        
                        // числа на входе
                        
                        inNumb[x].animate(numbAttr, fTime);
                        

                        _lowerInLine.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        
                        });

                        // питание на с
                        
                        cLine[tailMinusQ].line.animate(defaultAttr, fTime);
                        
                        // числа на с
                        
                        cNumb[q].animate(numbAttr, fTime);
                       

                        
                        underRectLine[q].line.animate(defaultAttr,  fTime);
                        

                        _lowerCToHLine.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        
                        });

                        // питание на h
                        
                        hLine[tailMinusQ].line.animate(defaultAttr, fTime);
                        
                        
                        
                        // числа на h
                        
                        hNumb[q].animate(numbAttr, fTime);
                        

                        _upperHLine.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                       
                        });

                        // ВКЛЮЧАЕМ ОСТАЛЬНОЕ

                          logicGate[q][x].animate(voltageLGCProcess,sTime);

                          // upperCToHLine[q][x].line.animate(voltageAttr,fTime);
                          // upperInToOutLine[q][x].line.animate(voltageAttr,fTime);

                        // Находим номера линий H и Output, которые сработают после прохождения
                        // сигнала через вентиль
                        var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        

                        // upperHLine[q][n-1-nextQ].line.animate(voltageAttr,fTime);
                        // upperOutLine[q][base-1-nextX].line.animate(voltageAttr,fTime);
                        
                        hLine[n-1-nextQ].line.animate(voltageAttr,sTime);
                        
                        // числа на h
                        hNumb[nextQ].animate(VoltNumbAttr, sTime);
                        
                        outputLine[base-1-nextX].line.animate(voltageAttr,sTime);
                        
                        //числа на выходе
                        outNumb[nextX].animate(VoltNumbAttr,sTime);

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(voltageAttr, sTime);
                        });
                       

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(voltageAttr, sTime);
                        });
                        

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(voltageAttr, sTime);
                        });
                       

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(voltageAttr, sTime);
                        });
                        
                                               
                        }
                        }
                        if(taktCount == 3) {
                        return function turnOff(){
                          
                        var nextQ = nextState(tableB[x][q]);
                        var nextX = nextOutput(tableB[x][q]);
                        nextQ = parseInt(nextQ,base);
                        nextX = parseInt(nextX,base);
                        
                        logicGate[q][x].animate(logicGateAttr, fTime);
                                                
                        hLine[n-1-nextQ].line.animate(defaultAttr,fTime);
                        
                        // числа на h
                        hNumb[nextQ].animate(numbAttr, fTime);
                        
                        outputLine[base-1-nextX].line.animate(defaultAttr,fTime);
                        
                        //числа на выходе
                        outNumb[nextX].animate(numbAttr,fTime);

                        _upperOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        });
                       

                         _upperHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        });
                        

                         _upperCToHLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        });
                       

                         _upperInToOutLineAfterWorkingLG.forEach( function(elem,i) {
                          
                          elem.line.animate(defaultAttr, fTime);
                        });

                        }

                        
                        }
                                                                                                         
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
var taktCurrentOutput;      // очередной разряд результата умножения

var nexState, nextInput;
var taktArray = [];
var taktResult;
var taktOutput;

document.getElementById("takt").addEventListener("click", function() {

    if(!isRun){

     taktResult = '';
     taktOutput = document.getElementById('output');
     
     taktOutput.value = '';  
     taktNumber = document.getElementById("input").value;
     taktState = document.getElementById("state");

     taktQ = taktState.options[taktState.selectedIndex].value;
     taktQ = parseInt(taktQ,base);

     target = taktNumber.length - 1;
     isRun = 1;
    

        
  }
     
    // т.к. первая цифра на выход подается только при втором нажатии кнопки 
    if (taktCount > 0){
      taktOutput.value = taktCurrentOutput + taktResult;
      taktResult = taktCurrentOutput + taktResult;
    }
    

    if(taktCount == 0){

      currentInput = (target) >= 0 ? taktNumber.charAt(target) : '0';
      currentInput = parseInt(currentInput,base);

      taktArray[taktCount] = new Array(3);

      for (var j = 0; j < 3; j++) {
        taktArray[0][j] = takt51(taktQ, currentInput,j+1);
      }
      
      taktArray[0][0]();

      // Подготовим следующий массив для следующего клика
        currentCell = tableB[currentInput][taktQ];
        nexState = nextState(currentCell);
        taktCurrentOutput = nextOutput(currentCell); 

        nextInput = (target-1) >= 0 ? taktNumber.charAt(target-1) : '0';
        
        nextInput = parseInt(nextInput,base);
        nexState = parseInt(nexState,base);
        

        taktArray[taktCount+1] = new Array(3);

       for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt51(nexState, nextInput,j+1);
       }
    }

    if(taktCount == 1){

     taktArray[0][1]();
     taktArray[1][0]();

        

        currentCell = tableB[nextInput][nexState];
        nexState = nextState(currentCell);
        taktCurrentOutput = nextOutput(currentCell); 

       nextInput = (target-2) >= 0 ? taktNumber.charAt(target-2) : '0';
       
       nextInput = parseInt(nextInput,base);
       nexState = parseInt(nexState,base);
        

        taktArray[taktCount+1] = new Array(3);

       for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt51(nexState, nextInput,j+1);
       }

      
    }   


    if(taktCount >= 2){

     taktArray[taktCount-2][2]();
     taktArray[taktCount-1][1]();
     taktArray[taktCount][0]();
     

     currentCell = tableB[nextInput][nexState];
     nexState = nextState(currentCell);
     taktCurrentOutput = nextOutput(currentCell); 

       nextInput = (target-taktCount-1) >= 0 ? taktNumber.charAt(target-taktCount-1) : '0';
       nextInput = parseInt(nextInput,base);
        nexState = parseInt(nexState,base);
     taktArray[taktCount+1] = new Array(3);

      for (var j = 0; j < 3; j++) {
         taktArray[taktCount+1][j] = takt51(nexState, nextInput,j+1);
       }
    }   
    
    
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



  function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
} 

document.getElementById("fscreen").addEventListener("click", function() {

 toggleFullScreen();

});

}   
