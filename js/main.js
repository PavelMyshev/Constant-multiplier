var snap = Snap(3000,3000);

var naiveReverse = function(string) {
    return string.split('').reverse().join('');
    }

function getDecimal(num) { // после запятой

  var temp = ( (num - Math.floor(num)).toFixed(1) )[2];
  return 1 * temp;
}

function getFloor(num) { // целая часть
  return Math.floor(num);
}  

var base = 4;  // система исчисления
var n = 5;     // множитель

var tableB = [
             
             
             [     0.0, 0.1, 0.2, 0.3, 1.0],
             [     1.1, 1.2, 1.3, 2.0, 2.1],
             [     2.2, 2.3, 3.0, 3.1, 3.2],
             [     3.3, 4.0, 4.1, 4.2, 4.3],

                            ];

  
var space = 10;                // расстояние между линиями
var middleSpace = 250;         // место для центральной части умножителя
var xPoint = 100;              // начальная 'x' координата
var yPoint = 100;		           // начальная 'y' координата
var busLength = 1150;          // длина шин (вход, выход и т.д.)
var logicGateAttr = {fill:"rgb(255,255,255)", stroke: "black", strokeWidth: 2};
var rectWidth = 4;
var amendment = rectWidth/2;

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
		this.line = snap.paper.line(x1, y1, x2, y2).attr({stroke: 'gray',strokeWidth: 2});
		
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
 	logicGate[block][i] = snap.paper.rect(xPoint, yPoint, 45, 25).attr(logicGateAttr);
 	var t1 = snap.paper.text(xPoint+3, yPoint+15, '&'+block+','+i);
 	xPoint += 45;
 }

yPoint = parseFloat(logicGate[block][0].attr("y")) + 25 + space;
// нижняя CH линия
underRectLine[block] = Object.create(DiLine).constructor(cLine[n-1-block].line.attr("x1"), yPoint, hLine[n-1-block].line.attr("x1"), yPoint,
													 cLine[n-1-block].line.attr("x1"), yPoint, hLine[n-1-block].line.attr("x1"), yPoint);
yPoint += space;

 // нижние линии, идущие на вход
for (var i = 0; i < base; i++){
	lowerInLine[block][i] = Object.create(DiLine).constructor(inputLine[i].line.attr("x1"), yPoint, hLine[0].line.attr("x1") - space, yPoint,
															  inputLine[i].line.attr("x1"), yPoint);
	yPoint += space;
}

//вертикальные линии, соединяющие вход и выход
for (var i = 0; i < base; i++){
  var q = getFloor(tableB[i][block]);
  var x = getDecimal(tableB[i][block]);
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
    
   inNumb[i] = snap.paper.text(inputLine[base-1-i].line.attr("x1")-space/2, inputLine[base-1-i].line.attr("y1")-space/4, ''+i).attr(
            {fontSize: '12px'});

   outNumb[i] = snap.paper.text(outputLine[base-1-i].line.attr("x1")-space/2, outputLine[base-1-i].line.attr("y1")-space/4, ''+i).attr(
            {fontSize: '12px'});

  }  
 
for (var i = 0; i < n; i++){
  cNumb[i] = snap.paper.text(cLine[n-1-i].line.attr("x1")-space/2, cLine[n-1-i].line.attr("y1")-space/4, ''+i).attr(
            {fontSize: '12px'});

  hNumb[i] = snap.paper.text(hLine[n-1-i].line.attr("x1")-space/2, hLine[n-1-i].line.attr("y1")-space/4, ''+i).attr(
            {fontSize: '12px'});
}

function sleep(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 


       
   

// document.getElementById("myBtn").addEventListener("click", function() {
//   var convertX = "0123";
//   var qState = 0;
//   var result = "";
//     ReverseX = naiveReverse(convertX);
    
//     var i = 0;
//     var timerId =  setInterval(function(){
//       var currentInput = ReverseX.charAt(i);

//       inNumb[currentInput].attr({fill:'#D00000'});
//       inputLine[Math.abs(currentInput-(base-1))].line.attr({stroke: '#D00000'});
      
//       var tar = tableB[currentInput][qState];
//       qState = getFloor(tar);
//       result+=getDecimal(tar);
//       i++;
//       if(i>ReverseX.length){clearInterval(timerId);}
      
    
// },2000);
  

//   }); 


document.getElementById("myBtn").addEventListener("click", function() {
//   var convertX = "0123";
//   var qState = 0;
//   var result = "";
//     ReverseX = naiveReverse(convertX);
    
//     var i = 0;
//     var timerId =  setInterval(function(){
//       var currentInput = ReverseX.charAt(i);

//       inNumb[currentInput].attr({fill:'#D00000'});
//       inputLine[Math.abs(currentInput-(base-1))].line.attr({stroke: '#D00000'});
      
//       var tar = tableB[currentInput][qState];
//       qState = getFloor(tar);
//       result+=getDecimal(tar);
//       i++;
//       if(i>ReverseX.length){clearInterval(timerId);}
      
    
// },2000);
var i = 0;



     





var funcs = [];
var fTime = 2000;;
var sTime = 4000;
function sendInputSignal(j,i) {
    return function() { inputLine[i].line.animate({stroke:'#D00000'}, fTime, function(){
                        inputLine[i].line.animate({stroke:'gray'}, sTime);
                        });
                        lowerInLine[j][i].line.animate({stroke:'#D00000'}, fTime, function(){
                        lowerInLine[j][i].line.animate({stroke:'gray'},  sTime);
                        });
                        lowerInToOutLine[j][i].line.animate({stroke:'#D00000'}, fTime, function(){
                        lowerInToOutLine[j][i].line.animate({stroke:'gray'},  sTime);
                        });
                        // питание на с
                        cLine[i].line.animate({stroke:'#D00000'}, fTime, function(){
                        cLine[i].line.animate({stroke:'gray'}, sTime);
                        });
                        underRectLine[n-i-1].line.animate({stroke:'#D00000'}, fTime, function(){
                        underRectLine[n-i-1].line.animate({stroke:'gray'},  sTime);
                        });

                        lowerCToHLine[n-i-1][j].line.animate({stroke:'#D00000'}, fTime, function(){
                        lowerCToHLine[n-i-1][j].line.animate({stroke:'gray'},  sTime);
                        });

                        // upperInToOutLine[j][i].line.animate({stroke:'#D00000'}, fTime, function(){
                        // upperInToOutLine[j][i].line.animate({stroke:'gray'},  sTime);
                        // });
          };
}

for (var j = 0; j < n; j++) {
    funcs[j] = sendInputSignal(j,0);
}
for (var j = 0; j < n; j++) {
    funcs[j]();                        
}


});




















        snap.zpd();
   

  

    

       



    // UI improvement needed
    var intervalF;
    var clearIntervalF = function () {
        clearInterval(intervalF);
    };
    document.getElementById('location').onmousedown = function () {
        snap.panTo(0, 0);
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
    document.getElementById('zoom2x').onmousedown = function () {
        snap.zoomTo(2, 400);
    };
    document.getElementById('zoom1x').onmousedown = function () {
        snap.zoomTo(1, 400);
    };
    document.getElementById('save').onmousedown = function () {
        snap.zpd('save', function (err, data) {
            var output = JSON.stringify(data);
            alert('Save Data:' + output);
        });
    };
    document.getElementById('threshold').onmousedown = function () {
        snap.zoomTo(1, 400);
        snap.zpd({ drag: true, zoomThreshold: [0.5, 3] });
    };
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

   













