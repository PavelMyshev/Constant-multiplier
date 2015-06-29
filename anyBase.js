function parseI(number,base){
	var result = 0;
	var ppower = 0;
	var position = number.length - 1;

////////////////////////////////////////////
	function getNumb(number,currentPosition){
	var result = '';
	if(number[currentPosition] == '}'){
		currentPosition --;

		while(number[currentPosition] !== '{'){
			result = number[currentPosition] + result;
			currentPosition --;			
		}
		currentPosition --;
	}
	else {
		result = number[currentPosition];
		currentPosition --;
	};

	
	position = currentPosition;
	//console.log("Res: " + result);
	return result;	
	}
///////////////////////////////////////////

	while(position >= 0){
		//console.log("Pos: " + position);
		//console.log("Pow: " + ppower);
		result += getNumb(number,position) * Math.pow(base,ppower);
		//console.log("Res: " + result);
		ppower ++;
	}
	
	return result;
}




function toStr (number, base) {
	var result = '';
	var temp, temp1, residue;
	var wrapper;

	temp = number;

	do{
	temp1 = Math.floor(temp/base);
	residue = temp - temp1 * base;
	temp = temp1;
	wrapper = residue > 9 ? '{' + residue + '}' : residue;
	result = wrapper + result;
	} while (temp != 0)
	return result;
}

var one = '{13}{44}9';
var radix = 50;
var mult = 3;
var two = parseI(one,radix);
var res = two * mult;
console.log(one + ' from base ' + radix + ' to base 10: ' + two);
console.log('result ' + one + ' * ' + mult + ' = ' + res);

var tree = toStr(res,radix);
console.log('result from base 10 to base ' + radix + ' : '+ tree);
