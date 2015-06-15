// var snap = Snap(3000,3000);
var snap = Snap("svg");

function getDecimal(num) { // после запятой

  var temp = ( (num - Math.floor(num)).toFixed(1) )[2];
  return 1 * temp;
}

function getFloor(num) { // целая часть
  return Math.floor(num);
}  



var base = 4;  // система исчисления
var n = 4;     // множитель

function stateTransition(q,x){
  var result = (q + x * n).toString(base);
  
  return result.length > 1 ? result.slice(0,-1) : '0';
}

function output(q,x){
  var result = (q + x * n).toString(base);
  
   return result[result.length-1];
}
// Соз­дать мно­го­мер­ный мас­сив
var tableB = new Array(base);      
for(var i = 0; i < base; i++)
tableB[i] = new Array(n); 

// Ини­циа­ли­зи­ро­вать B-таблицы
for(var x = 0; x < base; x++) {
for(q = 0; q < n; q++) {
tableB[x][q] = stateTransition(q,x) + '.' + output(q,x);
}
}


var space = 10;                // расстояние между линиями
var middleSpace;         // место для центральной части умножителя
var xPoint = 100;              // начальная 'x' координата
var yPoint = 100;		           // начальная 'y' координата
var busLength;          // длина шин (вход, выход и т.д.) 1150 
var logicGateAttr;
var lineNodeAttr;
var numbAttr;
var VoltNumbAttr;
var lGTAttr;
var rectWidth = 4;
var amendment = rectWidth/2;
var defaultCL;
var voltageCL;

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
       defaultCL = '#7AE798';
       voltageCL = '#D02222';
       document.body.style.background = "#0C4E20";
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

setTheme('classic');
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
  
			
//var g = snap.group();
 // var r = snap.paper.line(10, 10, 100, 100).attr({stroke: defaultCL,strokeWidth: 2});
 // var c = snap.paper.line(15, 10, 150, 150).attr({stroke: defaultCL,strokeWidth: 2});

// g.add(r);
// g.add(c);
//var g = snap.group(r,c);

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
  var q = getFloor(tableB[i][block]);
  var x = getDecimal(tableB[i][block]);
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
var sTime = 3000;
var delay = fTime + sTime * 2;

                    

function prepare(_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,x,q){
  //console.table(tableB);
  var normX = x;
  var normQ = q;
  x = base - 1 - x;
  q = n -1 - q;
  for (var i = 0; i < n; i++){
    // x линия для каждого из i блоков, соединенных с x входной линией
    _lowerInLine.push(lowerInLine[i][normX]);
    // соединение вход-выход через вентиль
    _lowerInToOutLine.push(lowerInToOutLine[i][normX]);

    _upperHLine.push(upperHLine[i][q]);
  }


  for (var i = 0; i < base; i++){
    _lowerCToHLine.push(lowerCToHLine[n-q-1][i]);
    
  }

  for (var i = 0; i < base; i++) {
    for (var j = 0; j < n; j++){
      var qq = getFloor(tableB[i][j]);
                        qq = parseInt(qq,base);
                        qq = qq * 1;
                        if (qq == normQ){_upperCToHLine.push(upperCToHLine[j][i]); }
    }
  }



}

                       
function takt(q,x){
  
  var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [];
  prepare(_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,x,q);

                        var normX = x;
                        var normQ = q;

                        x = base - 1 - x;
                        q = n -1 - q;
                        // питание на линию входа
                        inputLine[x].line.animate({stroke: voltageCL}, fTime, function(){
                        inputLine[x].line.animate({stroke: defaultCL}, sTime);
                        });
                        // числа на входе
                        inNumb[base-1-x].animate(VoltNumbAttr, fTime, function(){
                        inNumb[base-1-x].animate(numbAttr, sTime);
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
                        cLine[q].line.animate({stroke:voltageCL}, fTime, function(){
                        cLine[q].line.animate({stroke: defaultCL}, sTime);
                        });
                        // числа на с
                        cNumb[n-1-q].animate(VoltNumbAttr, fTime, function(){
                        cNumb[n-1-q].animate(numbAttr, sTime);
                        });

                        underRectLine[n-q-1].line.animate({stroke:voltageCL}, fTime, function(){
                        underRectLine[n-q-1].line.animate({stroke:defaultCL},  sTime);
                        });

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime, function(){
                          elem.line.animate({stroke: defaultCL}, sTime);
                        });
                        });

                        // питание на h
                        hLine[q].line.animate({stroke:voltageCL}, fTime, function(){
                        hLine[q].line.animate({stroke:defaultCL}, sTime);
                        });
                        
                        // числа на h
                        hNumb[n-1-q].animate(VoltNumbAttr, fTime, function(){
                        hNumb[n-1-q].animate(numbAttr, sTime);
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

                        logicGate[normQ][normX].animate({ fill: voltageCL}, fTime, function(){
                        logicGate[normQ][normX].animate(logicGateAttr, sTime);
                        });

                        upperCToHLine[n-q-1][normX].line.animate({stroke: voltageCL}, fTime, function(){
                        upperCToHLine[n-q-1][normX].line.animate({stroke: defaultCL}, sTime);
                        });

                        upperInToOutLine[n-q-1][normX].line.animate({stroke: voltageCL}, fTime, function(){
                        upperInToOutLine[n-q-1][normX].line.animate({stroke: defaultCL}, sTime);
                        });


                        var qqq = getFloor(tableB[normX][normQ]);
                        var xxx = getDecimal(tableB[normX][normQ]);
                        qqq = parseInt(qqq,base);
                        xxx = parseInt(xxx,base);
                        qqq = qqq * 1;
                        xxx = xxx * 1;
                        

                        upperHLine[normQ][n-1-qqq].line.animate({stroke: voltageCL}, fTime, function(){
                        upperHLine[normQ][n-1-qqq].line.animate({stroke: defaultCL}, sTime);
                        });

                        upperOutLine[normQ][base - 1 - xxx].line.animate({stroke: voltageCL}, fTime, function(){
                        upperOutLine[normQ][base - 1 - xxx].line.animate({stroke: defaultCL}, sTime);
                        });
                        
                        hLine[n-1-qqq].line.animate({stroke: voltageCL}, fTime, function(){
                        hLine[n-1-qqq].line.animate({stroke: defaultCL}, sTime);
                        });

                        // числа на h
                        hNumb[qqq].animate(VoltNumbAttr, fTime, function(){
                        hNumb[qqq].animate(numbAttr, sTime);
                        });

                        outputLine[base - 1 - xxx].line.animate({stroke: voltageCL}, fTime, function(){
                        outputLine[base - 1 - xxx].line.animate({stroke: defaultCL}, sTime);
                        });

                        //числа на выходе
                        outNumb[xxx].animate(VoltNumbAttr, fTime, function(){
                        outNumb[xxx].animate(numbAttr, sTime);
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
       currentState = getFloor(currentCell);
       currentOutput = getDecimal(currentCell);
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

function takt1(q,x,taktCount){
  
  var _lowerInLine = [], _lowerInToOutLine = [], _upperHLine = [],
      _lowerCToHLine = [], _upperCToHLine = [];
  prepare(_lowerInLine,_lowerInToOutLine,_lowerCToHLine,_upperHLine,_upperCToHLine,x,q);

  var _lowerInLine1 = [], _lowerInToOutLine1 = [], _upperHLine1 = [],
      _lowerCToHLine1 = [], _upperCToHLine1 = [];
prepare1(_lowerInLine1,_lowerInToOutLine1,_lowerCToHLine1,_upperHLine1,_upperCToHLine1,x,q);

  function prepare1(_lowerInLine1,_lowerInToOutLine1,_lowerCToHLine1,_upperHLine1,_upperCToHLine1,x,q){
  //console.table(tableB);
  var normX = x;
  var normQ = q;
  x = base - 1 - x;
  q = n -1 - q;

  var qqq = getFloor(tableB[normX][normQ]);
                        var xxx = getDecimal(tableB[normX][normQ]);
                        qqq = parseInt(qqq,base);
                        xxx = parseInt(xxx,base);
                        qqq = qqq * 1;
                        xxx = xxx * 1;

  for (var i = 0; i < n; i++){
    // x линия для каждого из i блоков, соединенных с x входной линией
    _lowerInLine1.push(lowerInLine[i][normX]);
    // соединение вход-выход через вентиль
    _lowerInToOutLine1.push(lowerInToOutLine[i][normX]);

   // if(i !== normQ && q !== (n-1-qqq)){
    _upperHLine1.push(upperHLine[i][q]);
    //}

  }


  for (var i = 0; i < base; i++){
    _lowerCToHLine1.push(lowerCToHLine[n-q-1][i]);
    
  }


  for (var i = 0; i < base; i++) {
    for (var j = 0; j < n; j++){
      var qq = getFloor(tableB[i][j]);
                        qq = parseInt(qq,base);
                        qq = qq * 1;

 if (qq == normQ ){_upperCToHLine1.push(upperCToHLine[j][i]); }
                        // if (qq == normQ && j !== (n-q-1) && i !== normX){_upperCToHLine1.push(upperCToHLine[j][i]); }
    }
  }



}

                        var normX = x;
                        var normQ = q;

                        x = base - 1 - x;
                        q = n -1 - q;

                        function firstStep(){
                                                  
                          console.log("first work");
                          // питание на линию входа
                        inputLine[x].line.animate({stroke: voltageCL}, fTime);
                        
                        
                        // числа на входе
                        inNumb[base-1-x].animate(VoltNumbAttr, fTime);
                        
                        

                        _lowerInLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                          
                        
                        });

                        _lowerInToOutLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                         
                        
                        });

                        // питание на с
                        cLine[q].line.animate({stroke:voltageCL}, fTime);
                        
                        
                        // числа на с
                        cNumb[n-1-q].animate(VoltNumbAttr, fTime);
                        
                       

                        underRectLine[n-q-1].line.animate({stroke:voltageCL},fTime);
                        
                        

                        _lowerCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL},fTime);
                          
                        
                        });

                        // питание на h
                        hLine[q].line.animate({stroke:voltageCL},fTime);
                        
                        
                        
                        // числа на h
                        hNumb[n-1-q].animate(VoltNumbAttr, fTime);
                        
                        

                        _upperHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL}, fTime);
                          
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          elem.line.animate({stroke:voltageCL},fTime);
                          
                       
                        });

                        logicGate[normQ][normX].animate({ fill: voltageCL},fTime);
                        }
                          
                        function secondStep(){
                          // prepare1(_lowerInLine1,_lowerInToOutLine1,_lowerCToHLine1,_upperHLine1,_upperCToHLine1,x,q);
                          console.log("second work");
                          logicGate[normQ][normX].animate({ fill: "#00AA7F"},fTime);

                          upperCToHLine[n-q-1][normX].line.animate({stroke: voltageCL},fTime);
                        
                        

                        upperInToOutLine[n-q-1][normX].line.animate({stroke: voltageCL},fTime);



                        var qqq = getFloor(tableB[normX][normQ]);
                        var xxx = getDecimal(tableB[normX][normQ]);
                        qqq = parseInt(qqq,base);
                        xxx = parseInt(xxx,base);
                        qqq = qqq * 1;
                        xxx = xxx * 1;

                         upperHLine[normQ][n-1-qqq].line.animate({stroke: voltageCL},fTime);
                        
                        

                        upperOutLine[normQ][base - 1 - xxx].line.animate({stroke: voltageCL},fTime);
                        
                        
                        
                        hLine[n-1-qqq].line.animate({stroke: voltageCL},fTime);
                        
                        

                        // числа на h
                        hNumb[qqq].animate(VoltNumbAttr, fTime);
                        
                        

                        outputLine[base - 1 - xxx].line.animate({stroke: voltageCL},fTime);
                        
                        

                        //числа на выходе
                        outNumb[xxx].animate(VoltNumbAttr,fTime);
                        
                       

                          // питание на линию входа
                        
                        inputLine[x].line.animate({stroke: defaultCL}, sTime);
                        
                        // числа на входе
                        
                        inNumb[base-1-x].animate(numbAttr, sTime);
                        

                        _lowerInLine1.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                        
                        });

                        _lowerInToOutLine1.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                        
                        });

                        // питание на с
                        
                        cLine[q].line.animate({stroke: defaultCL}, sTime);
                        
                        // числа на с
                        
                        cNumb[n-1-q].animate(numbAttr, sTime);
                       

                        
                        underRectLine[n-q-1].line.animate({stroke:defaultCL},  sTime);
                        

                        _lowerCToHLine1.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                        
                        });

                        // питание на h
                        
                        hLine[q].line.animate({stroke:defaultCL}, sTime);
                        //hLine[qqq].line.animate({stroke:voltageCL}, sTime);
                        
                        
                        // числа на h
                        
                        hNumb[n-1-q].animate(numbAttr, sTime);
                        

                        _upperHLine1.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                        
                        });
                        
                        _upperCToHLine1.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                       
                        });

                        // ТЕСТ
                        //upperCToHLine[normQ][normX].line.animate({stroke: voltageCL},fTime);
                        //  upperInToOutLine[normQ][normX].line.animate({stroke: voltageCL},fTime);
                        }
                        
                        function thirdStep(){
                          var qqq = getFloor(tableB[normX][normQ]);
                        var xxx = getDecimal(tableB[normX][normQ]);
                        qqq = parseInt(qqq,base);
                        xxx = parseInt(xxx,base);
                        qqq = qqq * 1;
                        xxx = xxx * 1;

                           console.log("third work");
                        logicGate[normQ][normX].animate(logicGateAttr, sTime);
                        

                        
                        upperCToHLine[n-q-1][normX].line.animate({stroke: defaultCL}, sTime);
                        

                        
                        upperInToOutLine[n-q-1][normX].line.animate({stroke: defaultCL}, sTime);

                       
                        upperHLine[normQ][n-1-qqq].line.animate({stroke: defaultCL}, sTime);
                        

                        
                        upperOutLine[normQ][base - 1 - xxx].line.animate({stroke: defaultCL}, sTime);
                        
                        
                        
                        hLine[n-1-qqq].line.animate({stroke: defaultCL}, sTime);
                        

                        // числа на h
                        
                        hNumb[qqq].animate(numbAttr, sTime);
                        

                        
                        outputLine[base - 1 - xxx].line.animate({stroke: defaultCL}, sTime);
                        

                        //числа на выходе
                        
                        outNumb[xxx].animate(numbAttr, sTime);

                       
                       _upperHLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                        
                        });
                        
                        _upperCToHLine.forEach( function(elem,i) {
                          
                          elem.line.animate({stroke: defaultCL}, sTime);
                       
                        });

                        }

                        
                        

                     


                        // var qqq = getFloor(tableB[normX][normQ]);
                        // var xxx = getDecimal(tableB[normX][normQ]);
                        // qqq = parseInt(qqq,base);
                        // xxx = parseInt(xxx,base);
                        // qqq = qqq * 1;
                        // xxx = xxx * 1;
                        

                        if (taktCount % 3 == 1){
                          firstStep();
                        }

                        if (taktCount % 3 == 2){
                          secondStep();
                        }

                        if (taktCount % 3 == 0){
                          thirdStep();
                        }
                        
                        
                        
                        
}



var taktCount = 1;
var taktNumber;
var taktState;
var taktQ;
var isRun = 0;
var currentCell;
var currentInput;
var target;
var output;
var currentOutput;      // очередной разряд результата умножения

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
  }
     
    currentInput = target >= 0 ? taktNumber.charAt(target) : '0';
    currentInput = +currentInput;   
    
    takt1(taktQ, currentInput,taktCount);     
    

    if (taktCount % 3 == 0){
      target--;
       currentCell = tableB[currentInput][taktQ];
       taktQ = getFloor(currentCell);
       currentOutput = getDecimal(currentCell);
       output.value += currentOutput;
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

   













