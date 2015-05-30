var base = 4;  // система исчисления
var n = 5;     // множитель

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


function getDecimal(num) { // после запятой

  var temp = ( (num - Math.floor(num)).toFixed(1) )[2];
  return 1 * temp;
}

function getFloor(num) { // целая часть
  return Math.floor(num);
}  
var block = 0;
while(block < n) {
for (var i = 0; i < base; i++){
  var q = getFloor(tableB[i][block]);
  var x = getDecimal(tableB[i][block]);
  q = parseInt(q,base);
  x = parseInt(x,base);
  q = q * 1;
  x = x * 1;
  console.log(q);
   console.log(x);
}
block++;
}