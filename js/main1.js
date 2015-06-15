var carousel, $slideList, nextPage;

var pathMap = {
	'the-wild-washes' : 2,
	'wonderland' : 6,
	'nice-bum-101' : 11,
	'home-try-on' : 14,
	'the-outerwear' : 15,
	'the-essentials' : 21
};

$(document).ready(function(){
	console.log("Document ready");

	$slideList = $( ".rcWrapper > ul li" );


	preloadAssets(function(){
		initCarousel();
 	}, false); 
	
	var routes = {
		'/:r' : navigateToPath
	};
		
	var router = Router(routes);
    router.init();
	
    registerClickHandlers();
});

function preloadAssets(completion, verbose){
	if(typeof verbose === 'undefined'){
		verbose = false;
	}

	/* Preload all images */
	var loader = new PxLoader(),
		baseBGUrl = '/img/Slide',
		bgCount = 32;
		baseOutfitUrl = '/img/Outift_',
		outfitCount = 0,
		outfitSlides = [],
		baseGridUrl = '/img/Outfit_Grid_',
		gridCount = 0,
		gridSlides = [];
		baseVideoUrl = '/video/Slide-'
		videoSlides = [20,5];
	
	/* BG images */
	var excludeIndexes = [];
	for(var i=0; i<bgCount; i++){
		if (outfitSlides.indexOf(i) > -1 || gridSlides.indexOf(i) > -1 || excludeIndexes.indexOf(i) > -1){
			continue;
		}
		var pxImage = new PxLoaderImage(baseBGUrl + (i + 1) + ".jpg", "image");
	    pxImage.imageNumber = i;
	    loader.add(pxImage); 
	}
	
	/* Outfits */
	for(var i=0; i<outfitCount; i++){
		var pxImage = new PxLoaderImage(baseOutfitUrl + (i + 1) + ".jpg", "outfit");
	    pxImage.imageNumber = i;
	    loader.add(pxImage); 
	}
	
	/* Grid */
	var gridPage = [];
	for(var j=0; j < gridPage.length; j++){
		var suffix = gridPage[j];
		for(var i=0; i<gridCount; i++){
			var pxImage = new PxLoaderImage(baseGridUrl + (i + 1) + suffix, "grid");
		    pxImage.imageNumber = i;
		    pxImage.gridNumber = j;
		    loader.add(pxImage); 
		}
	}
	
	/* Video Support */
	if (Modernizr.video) {
		if(verbose){
			console.log("H264 Support: " + Modernizr.video.h264);
			console.log("WebM Support: " + Modernizr.video.webm);
		}
		
		for(var k=0; k<videoSlides.length; k++){
			var suffix = videoSlides[k];
			var videoSrc = Modernizr.video.webm ? (baseVideoUrl + suffix + ".webm") :
						Modernizr.video.h264 ? (baseVideoUrl + suffix + ".mp4") : "";
			var pxVid = new PxLoaderVideo(videoSrc, "video");
			pxVid.videoNumber = suffix;
			loader.add(pxVid);
		}
		
	}
	
    /* Progress Callbacks */
    loader.addProgressListener(function(e) {
	    $slideList.eq(e.resource.imageNumber + 1).css('background-image', "url(" + e.resource.img.src + ")");
	    if(verbose){
			console.log("Loaded Image: " + (e.resource.imageNumber + 1));
		}
	}, "image");
	
	loader.addProgressListener(function(e) {
		var video = e.resource.vid;
		video.autoplay = "autoplay";
		video.loop = "loop";
		video.play();
	    $slideList.eq(e.resource.videoNumber).find("video").replaceWith(video);
   		video.removeAttribute("controls");
   		if(verbose){
			console.log("Loaded Video " + (e.resource.videoNumber));
		}
	}, "video");
	
	loader.addProgressListener(function(e) {
		var slide;
		if(e.resource.imageNumber <4){
			slide = outfitSlides[0];
		} else if(e.resource.imageNumber <8){
			slide = outfitSlides[1];
		} else if(e.resource.imageNumber <12){
			slide = outfitSlides[2];
		} else {
			slide = outfitSlides[3];
		}
		
	    $slideList.eq(slide + 1).find("a").eq(e.resource.imageNumber % 4).append(e.resource.img);
	    if(verbose){
			console.log("Loaded Outfit: " + (e.resource.imageNumber + 1));
		}
	}, "outfit");
	
	loader.addProgressListener(function(e) {
		var slide = gridSlides[e.resource.gridNumber] + 1;
	    $slideList.eq(slide).find("a").eq(e.resource.imageNumber).append(e.resource.img);
	    if(verbose){
			console.log("Loaded Grid Outfit: " + (e.resource.imageNumber + 1) + " for grid " + (e.resource.gridNumber + 1));
		}
	}, "grid");
	
	loader.addCompletionListener(function(e){
		completion();
	});
    	
    loader.start();
}

function initCarousel(){
		    
    // fade out loader tag into landing page
    $('#loading').fadeOut(1500);
    $('.rcWrapper').fadeTo(1500, 1);

    /* Initialize Carousel */
	carousel = $('#wrapper').responsiveCarousel({
		direction: 'horizontal',
		transitionSpeed: 500,
		keyControl: true,
		arrows: true,
		pagination: true,
		paginationEl: 'paginationList',
		tapToReturn: true,
		callback: carouselStateChanged
	});
	
	if(nextPage){
		navigateToPage(nextPage);
		nextPage = null;
	}
}

function registerClickHandlers() {
	$('#menu').click(openMenu);
    
    $('#close').click(closeMenu);
    
    $('#toc > ul li').click(function(elt){
	    closeMenu();
    });
    $('.info').on('click', function(evt){
    	var $dynamic = $('#dynamic');
    	var $img = $dynamic.find("img");
    	var $header = $dynamic.find("h4");
    	var $copy = $dynamic.find("p");
    	var newImage = $(this).attr('data-image');
    	var newHeader = $(this).attr('data-header');
    	var newCopy = $(this).attr('data-copy');
    	
    	var $that = $(this);
    	$that.addClass("active");
    	setTimeout(function(){
	    	$that.removeClass("active");
    	}, 250);

    	$img.fadeOut(300, function(){
	    	$img.attr("src", newImage);
	    	$img.fadeIn(300);
    	});
    	
    	$header.fadeOut(300, function(){
	    	$header.text(newHeader);
	    	$header.fadeIn(300);
    	});
    	
    	$copy.fadeOut(300, function(){
	    	$copy.text(newCopy);
	    	$copy.fadeIn(300);
    	});
    });
    
    setInterval(function(){
	    $(".info").each(function(i){
		    var $that = $(this);
		    setTimeout(function(){
			    $that.addClass("active");
				setTimeout(function(){
	    			$that.removeClass("active");
				}, 300);
		    }, 150 * i);
			
	    });
    }, 5000)
}

function openMenu() {
	$('#contents').css('display', 'block').animate({
	   	opacity : 1
	 	}, 300);
}

function closeMenu() {
	$('#contents').animate({
	   	opacity : 0
	   	}, 300, function(){
	    	$( this ).css('display', 'none')
	   	});
}

function carouselStateChanged(){
	var animationDuration = 500;
	var $hotSlide = $slideList.eq(this.state.curPage - 1);
	var $hotCopy = $hotSlide.find(".copy");
	$hotCopy.children().each(function( index ){
		var $child = $( this );
		setTimeout(function(){
			$child.animate({opacity : 1}, animationDuration);
		}, animationDuration * (index + 1));
	});
	if($hotSlide.hasClass("light")){
		// use white nav elements
		$(".icon-prev_arrow").css("color", "#fff");
		$(".icon-hamburger").css("color", "#fff");
		$(".icon-SS14_Logo").css("color", "#fff");

	} else{
		// use dark nav elements
		$(".icon-prev_arrow").css("color", "#000");
		$(".icon-hamburger").css("color", "#000");
		$(".icon-SS14_Logo").css("color", "#000");
	}
}

function navigateToPage(page){
	if(carousel){
		console.log("Loading page " + page);
		carousel.showPage(parseInt(page));
	} else {
		nextPage = page;
	}
}

function navigateToPath(route){
	console.log("navigating to " + route);
	var page = pathMap[route];
	navigateToPage(page);
}
 
