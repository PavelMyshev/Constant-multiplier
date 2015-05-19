var snap = Snap(1200,1200);

var base = 4;
var n = 5;

  
var space = 10;          // расстояние между линиями
var middleSpace = 250;   // место для центральной части умножителя
var xPoint = 100;        // начальная 'x' координата
var yPoint = 100;		 // начальная 'y' координата
var busLength = 1150;    // длина шин (вход, выход и т.д.)
var lineAttr = {stroke: '#686868',strokeWidth: 2};
var rectWidth = 3;
var amendment = rectWidth/2;
var inputLine = [];      // линии входа 
var cLine = [];          // линии С
var hLine = [];          // линии H
var outputLine = [];     // линии выхода
var upperOutLine = [];   // горизонтальные линии, идущие на выход
for (var i = 0; i < n; i++){
       upperOutLine[i] = [];
       for (var j = 0; j < base; j++){
           upperOutLine[i][j] = 0;
   }}
var upperHLine = [];     // горизонтальные линии, идущие на H
for (var i = 0; i < n; i++){
       upperHLine[i] = [];
       for (var j = 0; j < n; j++){
           upperHLine[i][j] = 0;
   }}
var underRectLine = [];  // линия под прямоугольниками, соединяющая C и H входы
var lowerInLine = [];    // горизонтальные линии, идущие на вход
for (var i = 0; i < n; i++){
       lowerInLine[i] = [];
       for (var j = 0; j < base; j++){
           lowerInLine[i][j] = 0;
   }}

var inToOutLine = [];    // вертикальные линии, соединяющие вход и выход
var cToHLine = [];       // вертикальные линии, соединяющие C и H


var logicGate = [];
   for (var i = 0; i < n; i++){
       logicGate[i] = [];
       for (var j = 0; j < base; j++){
           logicGate[i][j] = 0;
   }}

var state = 0;
var DiLine = {
	constructor: function(x1, y1, x2, y2, ln1, ln2, rn1, rn2){
		this.line = snap.paper.line(x1, y1, x2, y2).attr({stroke: '#686868',strokeWidth: 2});
		
		if (arguments.length > 4){
		 this.leftNode = snap.paper.rect(ln1 - amendment, ln2 - amendment, rectWidth, rectWidth);
		 if (arguments.length > 6){
		 	this.rightNode = snap.paper.rect(rn1 - amendment, rn2 - amendment, rectWidth, rectWidth);
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
while(state < n) {
// сделаем двойной пробел между линиями C и верхними горизонтальными линиями
xPoint = parseFloat(cLine[n-1].line.attr("x1")) + space;
yPoint += 2*space;


// верхние горизонтальные линии, идущие на выход
for (var i = 0; i < base; i++){
	upperOutLine[state][i] = Object.create(DiLine).constructor(xPoint, yPoint, outputLine[i].line.attr("x1"), yPoint, outputLine[i].line.attr("x1"), yPoint);
	yPoint += space;
}

yPoint += space;

// верхние горизонтальные линии, идущие на H
for (var i = 0; i < n; i++){
  	upperHLine[state][i] = Object.create(DiLine).constructor(xPoint,yPoint, hLine[i].line.attr("x1"), yPoint, hLine[i].line.attr("x1"), yPoint);
  	yPoint += space;
  }

xPoint += space;
//создаем прямоугольники
 for (var i = 0; i < base; i++){
 	logicGate[state][i] = snap.paper.rect(xPoint, yPoint, 45, 25).attr({fill:"rgb(255,255,255)", stroke: "#000", strokeWidth: 2});
 	var t1 = snap.paper.text(xPoint+3, yPoint+15, '&'+state+','+i);
 	xPoint += 45;
 }

yPoint = parseFloat(logicGate[state][0].attr("y")) + 25 + space;
// нижняя CH линия
underRectLine[state] = Object.create(DiLine).constructor(cLine[n-1-state].line.attr("x1"), yPoint, hLine[n-1-state].line.attr("x1"), yPoint,
													 cLine[n-1-state].line.attr("x1"), yPoint, hLine[n-1-state].line.attr("x1"), yPoint);
yPoint += space;

 // нижние линии, идущие на вход
for (var i = 0; i < base; i++){
	lowerInLine[state][i] = Object.create(DiLine).constructor(inputLine[i].line.attr("x1"), yPoint, hLine[0].line.attr("x1") - space, yPoint,
															  inputLine[i].line.attr("x1"), yPoint);
	yPoint += space;
}

state++;
}