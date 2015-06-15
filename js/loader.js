var $a = $("#a");
var $y = $("#y");
var $r = $("#r");
var none = "15";
var full = "90";
var mid = "50";
var animationDuration = 750;
var pauseDuration = animationDuration + 500;
var aPts = [{
    top: mid,
    left: none
}, {
    top: full,
    left: none
}, {
    top: full,
    left: mid
}, {
    top: full,
    left: full
}, {
    top: mid,
    left: mid
}, {
    top: mid,
    left: mid
}, {
    top: none,
    left: mid
}, {
    top: none,
    left: none
}, {
    top: mid,
    left: none
}, {
    top: none,
    left: none
}, {
    top: none,
    left: full
}, {
    top: full,
    left: full
}, {
    top: full,
    left: mid
}, {
    top: none,
    left: mid
}, {
    top: none,
    left: none
}];

var yPts = [{
    top: mid,
    left: mid
}, {
    top: none,
    left: mid
}, {
    top: mid,
    left: mid
}, {
    top: mid,
    left: full
}, {
    top: none,
    left: full
}, {
    top: none,
    left: none
}, {
    top: full,
    left: none
}, {
    top: mid,
    left: mid
}, {
    top: mid,
    left: mid
}, {
    top: full,
    left: mid
}, {
    top: full,
    left: mid
}, {
    top: none,
    left: mid
}, {
    top: none,
    left: none
}, {
    top: full,
    left: none 
}, {
    top: full,
    left: mid
}];

var rPts = [{
    top: mid,
    left: full
}, {
    top: full,
    left: full
}, {
    top: full,
    left: full
}, {
    top: full,
    left: mid
}, {
    top: full,
    left: none
}, {
    top: full,
    left: full
}, {
    top: full,
    left: full
}, {
    top: full,
    left: full
}, {
    top: mid,
    left: full
}, {
    top: mid,
    left: full
}, {
    top: mid,
    left: none
}, {
    top: mid,
    left: none
}, {
    top: mid,
    left: full
}, {
    top: mid,
    left: full
}, {
    top: mid,
    left: full
}];

$("#loader-logo").animate({opacity : 1.0}, 1000, function(){
	var x = 0;
	var interval = setInterval(function(){
	    $a.animate(aPts[x], animationDuration);
	    $y.animate(yPts[x], animationDuration);
	    $r.animate(rPts[x], animationDuration);
	    x++;
	    if(x == aPts.length){
	        x = 0;
	    }
	}, pauseDuration);
});
        
 
