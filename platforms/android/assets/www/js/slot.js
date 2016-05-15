
var IMAGE_HEIGHT = 140;
var IMAGE_TOP_MARGIN = 0;
var IMAGE_BOTTOM_MARGIN = 0;
var SLOT_SEPARATOR_HEIGHT = 0;
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 1100; // how long all slots spin before starting countdown
var SPINTIME = 900; // how long each slot spins at minimum
var ITEM_COUNT = 10; // item count in slots
var SLOT_SPEED = 100; // how many pixels per second slots roll
var DRAW_OFFSET = 150 // how much draw offset in slot display from top
var INIT_GAME = 0;
var ec = 0;

//Define winners id
/*var 1Q = 1;
var A = 1;
var BOOK = 1;
var ESC = 1;
var FAR = 1;
var INDI = 1;
var J = 1;
var K = 1;
var Q = 1;
var RAA = 1;*/

var  matrix = [[1,1,1,1,1,1,1,1,1,1],//1Q
			   [1,1,1,1,1,1,1,1,1,1],//A
			   [1,1,1,1,1,1,1,1,1,1],//BOOK
			   [1,1,1,1,1,1,1,1,1,1],//ESC
			   [1,1,1,1,1,1,1,1,1,1],//FAR
			   [1,1,1,1,1,1,1,1,1,1],//INDI
			   [1,1,1,1,1,1,1,1,1,1],//J
			   [1,1,1,1,1,1,1,1,1,1],//K
			   [1,1,1,1,1,1,1,1,1,1],//Q
			   [1,1,1,1,1,1,1,1,1,1]//RAA
			  ];

var BET_LINES = 1;

var BLURB_TBL = [
    'No gano!',
    'Casi',
    'Casi Casi',
    'Bueno!',
    'Excelente!',
    'JACKPOT!'
];

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
	var j = parseInt(Math.random() * i)
	var tmp = array[i];
	array[i] = array[j]
	array[j] = tmp;
    }
}

// Images must be preloaded before they are used to draw into canvas
function preloadImages( images, callback ) {

    function _preload( asset ) {
	asset.img = new Image();
	asset.img.src = 'img/' + asset.id+'.png';

	asset.img.addEventListener("load", function() {
	    _check();
	}, false);

	asset.img.addEventListener("error", function(err) {
	    _check(err, asset.id);
	}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
	if ( err ) {
	    alert('Error al cargar ' + id );
	}
	loadc++;
	if ( images.length == loadc ) 
	    return callback()
    }

    images.forEach(function(asset) {
	_preload( asset );
    });
}

function copyArray( array ) {
    var copy = [];
    for( var i = 0 ; i < array.length; i++) {
	copy.push( array[i] );
    }
    return copy;
}

function SlotGame() {

	//console.log("AQUI");

	if (INIT_GAME==0) {
		/*document.getElementById("uno").style.visibility = "visible";
	    document.getElementById("dos").style.visibility = "visible";
	    document.getElementById("tres").style.visibility = "visible";
	    document.getElementById("cuatro").style.visibility = "visible";
	    document.getElementById("cinco").style.visibility = "visible";
	    document.getElementById("seis").style.visibility = "visible";
	    document.getElementById("siete").style.visibility = "visible";
	    document.getElementById("ocho").style.visibility = "visible";
	    document.getElementById("nueve").style.visibility = "visible";
	    document.getElementById("diez").style.visibility = "visible";*/
	    INIT_GAME = 1;
	};

    var game = new Game();

    var items = [ 
		{id: '1q'},
		{id: 'book'},
		{id: 'esc'},
		{id: 'far'},
		{id: 'indi'},
		{id: 'j'},
		{id: 'k'},
		{id: 'q'},
		{id: 'raa'},
		{id: 'a'}
    ];

    /*var items = [ 
		{id: 'gift'},
		{id: 'home'},
		{id: 'jingle'},
		{id: 'rein'},
		{id: 'santa'},
		{id: 'sled'},
		{id: 'snowman'},
		{id: 'star'},
		{id: 'tree'},
		{id: 'candy'}
    ];*/


    $('canvas').attr('height', IMAGE_HEIGHT * ITEM_COUNT * 2);
    $('canvas').css('height', IMAGE_HEIGHT * ITEM_COUNT * 2);

    game.items = items;

    // load assets and predraw the reel canvases
    preloadImages( items, function() {

		// images are preloaded

		// draws canvas strip
		function _fill_canvas( canvas, items ) {
			//console.log(canvas);
		    ctx = canvas.getContext('2d');
		    ctx.fillStyle = '#ddd';

		    for (var i = 0 ; i < ITEM_COUNT ; i++) {
				var asset = items[i];
				ctx.save();
				ctx.shadowColor = "rgba(0,0,0,0.5)";
				ctx.shadowOffsetX = 0;
				ctx.shadowOffsetY = 0;
				ctx.shadowBlur = 0;
				ctx.drawImage(asset.img, 5, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN+5, 130, 130);
				ctx.drawImage(asset.img, 5, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN+5, 130, 130);
				ctx.restore();
				//ctx.fillRect(0, i * SLOT_HEIGHT, 105, SLOT_SEPARATOR_HEIGHT);
				//ctx.fillRect(0, (i + ITEM_COUNT) * 52, 105, SLOT_SEPARATOR_HEIGHT);
				//ctx.fillRect(0, (i + ITEM_COUNT)  * SLOT_HEIGHT, 105, SLOT_SEPARATOR_HEIGHT);
		    }
		}

		/*function _make_line(canvas){
			console.log(canvas);
			ctx = canvas.getContext('2d');
			ctx.beginPath();
			ctx.moveTo(33, 310);
	        //ctx.fillRect(100, 100, 100, 100);
	        ctx.lineTo(146, 310);
	        ctx.stroke();
		}*/

		// Draw the canvases with shuffled arrays
		game.items1 = copyArray(items);
		shuffleArray(game.items1);
		_fill_canvas( game.c1[0], game.items1 );
		game.items2 = copyArray(items);
		shuffleArray(game.items2);
		_fill_canvas( game.c2[0], game.items2 );
		game.items3 = copyArray(items);
		shuffleArray(game.items3);
		_fill_canvas( game.c3[0], game.items3 );
		game.items4 = copyArray(items);
		shuffleArray(game.items4);
		_fill_canvas( game.c4[0], game.items4 );
		game.items5 = copyArray(items);
		shuffleArray(game.items5);
		_fill_canvas( game.c5[0], game.items5 );
		game.resetOffset =  (ITEM_COUNT + 5) * SLOT_HEIGHT;

		game.loop();

    });

	

    $('#play').click(function(e) {
    	var creditos = parseInt($('#credits').text());
    	var apuesta = parseInt($('#totalBet').text());
    	if (creditos < apuesta) {
    		$('#messages').text('Necesita tener más creditos para apostar');
    	}else {
    		ec = 0;
    		$('div.button[role="menu"]').prop('disabled', true);
	    	$('div.button[role="menu"]').removeClass("button-default");
	    	$('div.button[role="menu"]').addClass("button-disable");
			document.getElementById("uno").style.visibility = "hidden";
		    document.getElementById("dos").style.visibility = "hidden";
		    document.getElementById("tres").style.visibility = "hidden";
		    document.getElementById("cuatro").style.visibility = "hidden";
		    document.getElementById("cinco").style.visibility = "hidden";
		    document.getElementById("seis").style.visibility = "hidden";
		    document.getElementById("siete").style.visibility = "hidden";
		    document.getElementById("ocho").style.visibility = "hidden";
		    document.getElementById("nueve").style.visibility = "hidden";
			document.getElementById("diez").style.visibility = "hidden";
			$('#messages').text('Jugando, Buena Suerte!');
			var creditos = $('#credits').text() - $('#totalBet').text();
			$('#credits').text(creditos);
			game.restart();
    	};
    	
    });

    $('#lineMore').click(function(e){
    	BET_LINES = $('#lineas').text();
    	if (BET_LINES == 1) {
    		document.getElementById("uno").style.visibility = "visible";
    		document.getElementById("dos").style.visibility = "visible";
    		$('#lineas').text("2");
	    	BET_LINES = 2;
	    	$("#lineMinus").prop('disabled',false);
	    	$("#lineMinus").toggleClass("button-disable button-default");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 2) {
    		$('#lineas').text("3");
    		document.getElementById("tres").style.visibility = "visible";
    		BET_LINES = 3;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 3) {
    		$('#lineas').text("4");
    		document.getElementById("cuatro").style.visibility = "visible";
    		BET_LINES = 4;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 4) {
    		$('#lineas').text("5");
    		document.getElementById("cinco").style.visibility = "visible";
    		BET_LINES = 5;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 5) {
    		$('#lineas').text("6");
    		document.getElementById("seis").style.visibility = "visible";
    		BET_LINES = 6;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 6) {
    		$('#lineas').text("7");
    		document.getElementById("siete").style.visibility = "visible";
    		BET_LINES = 7;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 7) {
    		$('#lineas').text("8");
    		document.getElementById("ocho").style.visibility = "visible";
    		BET_LINES = 8;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 8) {
    		$('#lineas').text("9");
    		document.getElementById("nueve").style.visibility = "visible";
    		BET_LINES = 9;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_LINES == 9) {
    		$('#lineas').text("10");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		document.getElementById("diez").style.visibility = "visible";
    		$("#lineMore").prop('disabled',true);
    		$("#lineMore").toggleClass("button-disable button-default");
    		/*BET_LINES = 11;
    	}else if (BET_LINES == 11) {
    		document.getElementById("uno").style.visibility = "hidden";
		    document.getElementById("dos").style.visibility = "hidden";
		    document.getElementById("tres").style.visibility = "hidden";
		    document.getElementById("cuatro").style.visibility = "hidden";
		    document.getElementById("cinco").style.visibility = "hidden";
		    document.getElementById("seis").style.visibility = "hidden";
		    document.getElementById("siete").style.visibility = "hidden";
		    document.getElementById("ocho").style.visibility = "hidden";
		    document.getElementById("nueve").style.visibility = "hidden";
		    document.getElementById("diez").style.visibility = "hidden";
    		BET_LINES = 1;*/
    	};
    	
	    /*document.getElementById("tres").style.visibility = "visible";
	    document.getElementById("cuatro").style.visibility = "visible";
	    document.getElementById("cinco").style.visibility = "visible";
	    document.getElementById("seis").style.visibility = "visible";
	    document.getElementById("siete").style.visibility = "visible";
	    document.getElementById("ocho").style.visibility = "visible";
	    document.getElementById("nueve").style.visibility = "visible";
	    document.getElementById("diez").style.visibility = "visible";*/
    });

    $('#lineMinus').click(function(e){
    	BET_LINES = $('#lineas').text();
	    if (BET_LINES == 10) {
	    	$("#lineMore").prop('disabled',false);
	    	$("#lineMore").toggleClass("button-disable button-default");
	    	$('#lineas').text("9");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
		    document.getElementById("cinco").style.visibility = "visible";
		    document.getElementById("seis").style.visibility = "visible";
		    document.getElementById("siete").style.visibility = "visible";
		    document.getElementById("ocho").style.visibility = "visible";
		    document.getElementById("nueve").style.visibility = "visible";
    		document.getElementById("diez").style.visibility = "hidden";
    		BET_LINES = 9;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 9) {
	    	$('#lineas').text("8");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
		    document.getElementById("cinco").style.visibility = "visible";
		    document.getElementById("seis").style.visibility = "visible";
		    document.getElementById("siete").style.visibility = "visible";
		    document.getElementById("ocho").style.visibility = "visible";
    		document.getElementById("nueve").style.visibility = "hidden";
    		BET_LINES = 8;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 8) {
	    	$('#lineas').text("7");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
		    document.getElementById("cinco").style.visibility = "visible";
		    document.getElementById("seis").style.visibility = "visible";
		    document.getElementById("siete").style.visibility = "visible";
    		document.getElementById("ocho").style.visibility = "hidden";
    		BET_LINES = 7;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 7) {
	    	$('#lineas').text("6");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
		    document.getElementById("cinco").style.visibility = "visible";
		    document.getElementById("seis").style.visibility = "visible";
    		document.getElementById("siete").style.visibility = "hidden";
    		BET_LINES = 6;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 6) {
	    	$('#lineas').text("5");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
		    document.getElementById("cinco").style.visibility = "visible";
    		document.getElementById("seis").style.visibility = "hidden";
    		BET_LINES = 5;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 5) {
	    	$('#lineas').text("4");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
		    document.getElementById("cuatro").style.visibility = "visible";
    		document.getElementById("cinco").style.visibility = "hidden";
    		BET_LINES = 4;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 4) {
	    	$('#lineas').text("3");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
	    	document.getElementById("tres").style.visibility = "visible";
    		document.getElementById("cuatro").style.visibility = "hidden";
    		BET_LINES = 3;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 3) {
	    	$('#lineas').text("2");
	    	document.getElementById("uno").style.visibility = "visible";
		    document.getElementById("dos").style.visibility = "visible";
    		document.getElementById("tres").style.visibility = "hidden";
    		BET_LINES = 2;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    }else if (BET_LINES == 2) {
	    	$('#lineas').text("1");
	    	document.getElementById("uno").style.visibility = "visible";
    		document.getElementById("dos").style.visibility = "hidden";
    		BET_LINES = 1;
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		$("#lineMinus").prop('disabled',true);
    		$("#lineMinus").toggleClass("button-disable button-default");
	    };
	});

	$('#betMore').click(function(e){
    	BET_BY_LINES = $('#bet').text();
    	if (BET_BY_LINES == 1) {
    		//document.getElementById("dos").style.visibility = "visible";
    		$('#bet').text("2");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
	    	BET_BY_LINES = 2;
	    	$("#betMinus").prop('disabled',false);
	    	$("#betMinus").toggleClass("button-disable button-default");
	    	//$("#betMinus").removeClass("button-disable");
	    	//$("#betMinus").addClass("button-default");
    	}else if (BET_BY_LINES == 2) {
    		$('#bet').text("3");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 3) {
    		$('#bet').text("4");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 4) {
    		$('#bet').text("5");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 5) {
    		$('#bet').text("10");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 10) {
    		$('#bet').text("15");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 15) {
    		$('#bet').text("20");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 20) {
    		$('#bet').text("30");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 30) {
    		$('#bet').text("40");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 40) {
    		$('#bet').text("50");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 50) {
    		$('#bet').text("100");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    	}else if (BET_BY_LINES == 100) {
    		$('#bet').text("200");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		$("#betMore").prop('disabled',true);
    		$("#betMore").toggleClass("button-disable button-default");
    	};
    	
	    /*document.getElementById("tres").style.visibility = "visible";
	    document.getElementById("cuatro").style.visibility = "visible";
	    document.getElementById("cinco").style.visibility = "visible";
	    document.getElementById("seis").style.visibility = "visible";
	    document.getElementById("siete").style.visibility = "visible";
	    document.getElementById("ocho").style.visibility = "visible";
	    document.getElementById("nueve").style.visibility = "visible";
	    document.getElementById("diez").style.visibility = "visible";*/
    });

    $('#betMinus').click(function(e){
    	BET_BY_LINES = $('#bet').text();
	    if (BET_BY_LINES == 200) {
	    	$("#betMore").prop('disabled',false);
	    	$("#betMore").toggleClass("button-disable button-default");
	    	$('#bet').text("100");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("diez").style.visibility = "hidden";
    		//BET_BY_LINES = 100;
	    }else if (BET_BY_LINES == 100) {
	    	$('#bet').text("50");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("nueve").style.visibility = "hidden";
    		//BET_LINES = 8;
	    }else if (BET_BY_LINES == 50) {
	    	$('#bet').text("40");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("ocho").style.visibility = "hidden";
    		//BET_LINES = 7;
	    }else if (BET_BY_LINES == 40) {
	    	$('#bet').text("30");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("siete").style.visibility = "hidden";
    		//BET_LINES = 6;
	    }else if (BET_BY_LINES == 30) {
	    	$('#bet').text("20");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("seis").style.visibility = "hidden";
    		//BET_LINES = 5;
	    }else if (BET_BY_LINES == 20) {
	    	$('#bet').text("15");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("cinco").style.visibility = "hidden";
    		//BET_LINES = 4;
	    }else if (BET_BY_LINES == 15) {
	    	$('#bet').text("10");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("cuatro").style.visibility = "hidden";
    		//BET_LINES = 3;
	    }else if (BET_BY_LINES == 10) {
	    	$('#bet').text("5");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("tres").style.visibility = "hidden";
    		//BET_LINES = 2;
	    }else if (BET_BY_LINES == 5) {
	    	$('#bet').text("4");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("tres").style.visibility = "hidden";
    		//BET_LINES = 2;
	    }else if (BET_BY_LINES == 4) {
	    	$('#bet').text("3");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("tres").style.visibility = "hidden";
    		//BET_LINES = 2;
	    }else if (BET_BY_LINES == 3) {
	    	$('#bet').text("2");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("tres").style.visibility = "hidden";
    		//BET_LINES = 2;
	    }else if (BET_BY_LINES == 2) {
	    	$('#bet').text("1");
	    	$("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
    		//document.getElementById("dos").style.visibility = "hidden";
    		//BET_LINES = 1;
    		$("#betMinus").prop('disabled',true);
    		$("#betMinus").toggleClass("button-disable button-default");
	    };
	});

    // Show reels for debugging
    var toggleReels = 1;
    $('#debug').click(function() {
	toggleReels = 1 - toggleReels;
	if ( toggleReels ) {
	    $('#reels').css('overflow', 'hidden' );
	} else {
	    $('#reels').css('overflow', 'visible' );
	}
    });
}

function Game() {

    // reel canvases
    this.c1 = $('#canvas1');
    this.c2 = $('#canvas2');
    this.c3 = $('#canvas3');
    this.c4 = $('#canvas4');
    this.c5 = $('#canvas5');

    /*this.line1 = $('#line1');
    console.log($('#line1'));*/

    // set random canvas offsets
    this.offset1 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset4 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset5 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.speed1 = this.speed2 = this.speed3 = this.speed4 = this.speed5 = 0;
    this.lastUpdate = new Date();

    // Needed for CSS translates
    this.vendor = 
	(/webkit/i).test(navigator.appVersion) ? '-webkit' :
    	(/firefox/i).test(navigator.userAgent) ? '-moz' :
	(/msie/i).test(navigator.userAgent) ? 'ms' :
    	'opera' in window ? '-o' : '';
    
    this.cssTransform = this.vendor + '-transform';
    this.has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())  
    this.trnOpen       = 'translate' + (this.has3d ? '3d(' : '(');
    this.trnClose      = this.has3d ? ',0)' : ')';
    this.scaleOpen     = 'scale' + (this.has3d ? '3d(' : '(');
    this.scaleClose    = this.has3d ? ',0)' : ')';

    // draw the slots to initial locations
    this.draw( true );
}

// Restar the game and determine the stopping locations for reels
Game.prototype.restart = function() {
    this.lastUpdate = new Date();
    this.speed1 = this.speed2 = this.speed3 = this.speed4 = this.speed5 = SLOT_SPEED

    // function locates id from items
    function _find( items, id ) {
	for ( var i=0; i < items.length; i++ ) {
	    if ( items[i].id == id ) return i;
	}
    }

    // uncomment to get always jackpot
    //this.result1 = _find( this.items1, 'iron' );
    //this.result2 = _find( this.items2, 'gold-64' );
    //this.result3 = _find( this.items3, 'gold-64' );

    /*this.result1 = _find( this.items1, 'iron' );
    this.result2 = _find( this.items2, 'spi' );
    this.result3 = _find( this.items3, 'thor' );
    this.result4 = _find( this.items4, 'was' );
    this.result5 = _find( this.items5, 'bat' );*/

    // get random results
    this.result1 = parseInt(Math.random() * this.items1.length);
    this.result2 = parseInt(Math.random() * this.items2.length);
    this.result3 = parseInt(Math.random() * this.items3.length);
    this.result4 = parseInt(Math.random() * this.items4.length);
    this.result5 = parseInt(Math.random() * this.items5.length);
    /*console.log(this.items2);
    console.log("2   "+this.result2+ "   "+this.items2[this.result2].id);
    console.log(this.items3);
    console.log("3   "+this.result3+ "   "+this.items3[this.result3].id);
    console.log(this.items4);
    console.log("4   "+this.result4+ "   "+this.items4[this.result4].id);
    console.log(this.items5);
    console.log("5   "+this.result5+ "   "+this.items5[this.result5].id);*/

    this.result1 = _find(this.items1, 'indi');
    this.result2 = _find(this.items2, 'a');
    this.result3 = _find(this.items3, 'indi');
    this.result4 = _find(this.items4, '1q');
    this.result5 = _find(this.items5, 'indi');

    this.result10 = 0;
    this.result13 = 0;
    this.result20 = 0;
    this.result23 = 0;
    this.result30 = 0;
    this.result33 = 0;
    this.result40 = 0;
    this.result43 = 0;
    this.result50 = 0;
    this.result53 = 0;

    //this.result1 = _find(this.items1, this.items1[this.result1].id);
    //this.result2 = _find(this.items2, this.items2[this.result2].id);
    //this.result3 = _find(this.items3, this.items3[this.result3].id);
    //this.result4 = _find(this.items4, this.items4[this.result4].id);
    //this.result5 = _find(this.items5, this.items5[this.result5].id);

    if (this.result1 != 0 && this.result1 != 9) {
    	this.result10 = this.result1-1;
    	this.result13 = this.result1+1;
    }else if (this.result1 == 0 && this.result1 !=9) {
    	this.result10 = 9;
    	this.result13 = this.result1+1;
    }else if (this.result1 == 9 && this.result1 != 0) {
    	this.result13 = 0;
    	this.result10 = this.result1-1;
    }
    if (this.result2 != 0 && this.result2 != 9) {
    	this.result20 = this.result2-1;
    	this.result23 = this.result2+1;
    }else if (this.result2 == 0 && this.result2 !=9) {
    	this.result20 = 9;
    	this.result23 = this.result2+1;
    }else if (this.result2 == 9 && this.result2 != 0) {
    	this.result23 = 0;
    	this.result20 = this.result2-1;
    }
    if (this.result3 != 0 && this.result3 != 9) {
    	this.result30 = this.result3-1;
    	this.result33 = this.result3+1;
    }else if (this.result3 == 0 && this.result3 !=9) {
    	this.result30 = 9;
    	this.result33 = this.result3+1;
    }else if (this.result3 == 9 && this.result3 != 0) {
    	this.result33 = 0;
    	this.result30 = this.result3-1;
    }
    if (this.result4 != 0 && this.result4 != 9) {
    	this.result40 = this.result4-1;
    	this.result43 = this.result4+1;
    }else if (this.result4 == 0 && this.result4 !=9) {
    	this.result40 = 9;
    	this.result43 = this.result4+1;
    }else if (this.result4 == 9 && this.result4 != 0) {
    	this.result43 = 0;
    	this.result40 = this.result4-1;
    }
    if (this.result5 != 0 && this.result5 != 9) {
    	this.result50 = this.result5-1;
    	this.result53 = this.result5+1;
    }else if (this.result5 == 0 && this.result5 !=9) {
    	this.result50 = 9;
    	this.result53 = this.result5+1;
    }else if (this.result5 == 9 && this.result5 != 0) {
    	this.result53 = 0;
    	this.result50 = this.result5-1;
    }


    // Clear stop locations
    this.stopped1 = false;
    this.stopped2 = false;
    this.stopped3 = false;
    this.stopped4 = false;
    this.stopped5 = false;

    // randomize reel locations
    this.offset1 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset4 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset5 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;

    $('#results').hide();

    this.state = 1;
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 70);
        };
})();

Game.prototype.loop = function() {
    var that = this;
    that.running = true;
    (function gameLoop() {
	that.update();
	that.draw();
	if (that.running) {
	    requestAnimFrame( gameLoop );
	}
    })();
}

Game.prototype.update = function() {

    var now = new Date();
    var that = this;

    // Check slot status and if spun long enough stop it on result
    function _check_slot( offset, result ) {
    	console.log("RSLTD: "+result);
		if ( now - that.lastUpdate > SPINTIME ) {
		    var c = parseInt(Math.abs( offset / SLOT_HEIGHT)) % ITEM_COUNT;
		    if ( c == result ) {
				if ( result == 0 ) {
				    if ( Math.abs(offset + (ITEM_COUNT * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
					return true; // done
				    }
				} else if ( Math.abs(offset + (result * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
				    return true; // done
				}
		    }
		}
		return false;
    }



    switch (this.state) {
    case 1: // all slots spinning
	if (now - this.lastUpdate > RUNTIME) {
	    this.state = 2;
	    this.lastUpdate = now;
	}
	break;
    case 2: // slot 1
	this.stopped1 = _check_slot( this.offset1, this.result1 );
	if ( this.stopped1 ) {
	    this.speed1 = 0;
	    this.state++;
	    this.lastUpdate = now;
	}
	break;
    case 3: // slot 1 stopped, slot 2
	this.stopped2 = _check_slot( this.offset2, this.result2 );
	if ( this.stopped2 ) {
	    this.speed2 = 0;
	    this.state++;
	    this.lastUpdate = now;
	}
	break;
    case 4: // slot 2 stopped, slot 3
	this.stopped3 = _check_slot( this.offset3, this.result3 );
	if ( this.stopped3 ) {
	    this.speed3 = 0;
	    this.state++;
	    this.lastUpdate = now;
	}
	break;
	case 5: // slot 2 stopped, slot 3
	this.stopped4 = _check_slot( this.offset4, this.result4 );
	if ( this.stopped4 ) {
	    this.speed4 = 0;
	    this.state++;
	    this.lastupdate = now;
	}
	break;
	case 6: // slot 2 stopped, slot 3
	this.stopped5 = _check_slot( this.offset5, this.result5 );
	if ( this.stopped5 ) {
	    this.speed5 = 0;
	    this.state++;
	    console.log(that.items1[that.result1].id, that.items2[that.result2].id, that.items3[that.result3].id, that.items4[that.result4].id, that.items5[that.result5].id);
	}
	break;
    case 7: // slots stopped 
	if ( now - this.lastUpdate > 1000 ) {
		$('div.button[role="menu"]').prop('disabled', false);
    	$('div.button[role="menu"]').addClass("button-default");
    	$('div.button[role="menu"]').removeClass("button-disable");
    	if ($('#lineas').text() == 1) {
    		$('#lineMinus').addClass("button-disable");
    		$('#lineMinus').removeClass("button-default");
    	}else if ($('#lineas').text() == 10) {
    		$('#lineMore').addClass("button-disable");
    		$('#lineMore').removeClass("button-default");
    	};

    	if ($('#bet').text() == 1) {
    		$('#betMinus').addClass("button-disable");
    		$('#betMinus').removeClass("button-default");
    	}else if ($('#bet').text() == 200) {
    		$('#betMore').addClass("button-disable");
    		$('#betMore').removeClass("button-default");
    	};

	    this.state = 8;
	}
	break;
    case 8: // check results
	
    for (var i = 1; i<= $('#lineas').text(); i++){
    	console.log(that.result1);
    	if (i==1) {
    		console.log(that.items2[that.result1].id);
    		/*if ((that.items1[that.result1].id == '1q') || (that.items2[that.result2].id == '1q') || (that.items3[that.result3].id == '1q') || 
    			(that.items1[that.result1].id == 'q') || (that.items2[that.result2].id == 'q') || (that.items3[that.result3].id == 'q') ||
    			(that.items1[that.result1].id == 'j') || (that.items2[that.result2].id == 'j') || (that.items3[that.result3].id == 'j')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'a') || (that.items2[that.result2].id == 'a') || (that.items3[that.result3].id == 'a') || 
    			(that.items1[that.result1].id == 'k') || (that.items2[that.result2].id == 'k') || (that.items3[that.result3].id == 'k')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'raa') || (that.items2[that.result2].id == 'raa') || (that.items3[that.result3].id == 'raa') || 
    			(that.items1[that.result1].id == 'esc') || (that.items2[that.result2].id == 'esc') || (that.items3[that.result3].id == 'esc')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else */if ((that.items1[that.result1].id == 'indi') || (that.items2[that.result2].id == 'indi') || (that.items3[that.result3].id == 'indi')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				console.log("AQUI");
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}/*else if ((that.items1[that.result1].id == 'far') || (that.items2[that.result2].id == 'far') || (that.items3[that.result3].id == 'far')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result2].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("uno").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}*/
    	}/*else if (i==2) {
    		if ((that.items1[that.result10].id == '1q') || (that.items2[that.result20].id == '1q') || (that.items3[that.result30].id == '1q') || 
    			(that.items1[that.result10].id == 'q') || (that.items2[that.result20].id == 'q') || (that.items3[that.result30].id == 'q') ||
    			(that.items1[that.result10].id == 'j') || (that.items2[that.result20].id == 'j') || (that.items3[that.result30].id == 'j')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result10].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'a') || (that.items2[that.result20].id == 'a') || (that.items3[that.result30].id == 'a') || 
    			(that.items1[that.result10].id == 'k') || (that.items2[that.result20].id == 'k') || (that.items3[that.result30].id == 'k')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'raa') || (that.items2[that.result20].id == 'raa') || (that.items3[that.result30].id == 'raa') || 
    			(that.items1[that.result10].id == 'esc') || (that.items2[that.result20].id == 'esc') || (that.items3[that.result30].id == 'esc')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id-1) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'indi') || (that.items2[that.result20].id == 'indi') || (that.items3[that.result30].id == 'indi')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'far') || (that.items2[that.result20].id == 'far') || (that.items3[that.result30].id == 'far')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("dos").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==3){
    		if ((that.items1[that.result13].id == '1q') || (that.items2[that.result23].id == '1q') || (that.items3[that.result33].id == '1q') || 
    			(that.items1[that.result13].id == 'q') || (that.items2[that.result23].id == 'q') || (that.items3[that.result33].id == 'q') ||
    			(that.items1[that.result13].id == 'j') || (that.items2[that.result23].id == 'j') || (that.items3[that.result33].id == 'j')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}

	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'a') || (that.items2[that.result23].id == 'a') || (that.items3[that.result33].id == 'a') || 
    			(that.items1[that.result13].id == 'k') || (that.items2[that.result23].id == 'k') || (that.items3[that.result33].id == 'k')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'raa') || (that.items2[that.result23].id == 'raa') || (that.items3[that.result33].id == 'raa') || 
    			(that.items1[that.result13].id == 'esc') || (that.items2[that.result23].id == 'esc') || (that.items3[that.result33].id == 'esc')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'indi') || (that.items2[that.result23].id == 'indi') || (that.items3[that.result33].id == 'indi')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'far') || (that.items2[that.result23].id == 'far') || (that.items3[that.result33].id == 'far')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("tres").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==4){
    		if ((that.items1[that.result10].id == '1q') || (that.items2[that.result2].id == '1q') || (that.items3[that.result33].id == '1q') || 
    			(that.items1[that.result10].id == 'q') || (that.items2[that.result2].id == 'q') || (that.items3[that.result33].id == 'q') ||
    			(that.items1[that.result10].id == 'j') || (that.items2[that.result2].id == 'j') || (that.items3[that.result33].id == 'j')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result2].id))) {
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'a') || (that.items2[that.result2].id == 'a') || (that.items3[that.result33].id == 'a') || 
    			(that.items1[that.result10].id == 'k') || (that.items2[that.result2].id == 'k') || (that.items3[that.result33].id == 'k')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result2].id))) {
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'raa') || (that.items2[that.result2].id == 'raa') || (that.items3[that.result33].id == 'raa') || 
    			(that.items1[that.result10].id == 'esc') || (that.items2[that.result2].id == 'esc') || (that.items3[that.result33].id == 'esc')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result2].id))) {
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'indi') || (that.items2[that.result2].id == 'indi') || (that.items3[that.result33].id == 'indi')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result2].id))) {
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'far') || (that.items2[that.result2].id == 'far') || (that.items3[that.result33].id == 'far')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result2].id))) {
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result10].id != that.items2[that.result2].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result4].id) && (that.items1[that.result10].id == that.items5[that.result50].id))){
	    			document.getElementById("cuatro").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==5){
    		if ((that.items1[that.result13].id == '1q') || (that.items2[that.result2].id == '1q') || (that.items3[that.result30].id == '1q') || 
    			(that.items1[that.result13].id == 'q') || (that.items2[that.result2].id == 'q') || (that.items3[that.result30].id == 'q') ||
    			(that.items1[that.result13].id == 'j') || (that.items2[that.result2].id == 'j') || (that.items3[that.result30].id == 'j')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result2].id))) {
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'a') || (that.items2[that.result2].id == 'a') || (that.items3[that.result30].id == 'a') || 
    			(that.items1[that.result13].id == 'k') || (that.items2[that.result2].id == 'k') || (that.items3[that.result30].id == 'k')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result2].id))) {
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'raa') || (that.items2[that.result2].id == 'raa') || (that.items3[that.result30].id == 'raa') || 
    			(that.items1[that.result13].id == 'esc') || (that.items2[that.result2].id == 'esc') || (that.items3[that.result30].id == 'esc')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result2].id))) {
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'indi') || (that.items2[that.result2].id == 'indi') || (that.items3[that.result30].id == 'indi')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result2].id))) {
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'far') || (that.items2[that.result2].id == 'far') || (that.items3[that.result30].id == 'far')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result2].id))) {
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result53].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result53].id))){
	    			document.getElementById("cinco").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==6){
    		if ((that.items1[that.result1].id == '1q') || (that.items2[that.result23].id == '1q') || (that.items3[that.result33].id == '1q') || 
    			(that.items1[that.result1].id == 'q') || (that.items2[that.result23].id == 'q') || (that.items3[that.result33].id == 'q') ||
    			(that.items1[that.result1].id == 'j') || (that.items2[that.result23].id == 'j') || (that.items3[that.result33].id == 'j')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'a') || (that.items2[that.result23].id == 'a') || (that.items3[that.result33].id == 'a') || 
    			(that.items1[that.result1].id == 'k') || (that.items2[that.result23].id == 'k') || (that.items3[that.result33].id == 'k')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'raa') || (that.items2[that.result23].id == 'raa') || (that.items3[that.result33].id == 'raa') || 
    			(that.items1[that.result1].id == 'esc') || (that.items2[that.result23].id == 'esc') || (that.items3[that.result33].id == 'esc')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'indi') || (that.items2[that.result23].id == 'indi') || (that.items3[that.result33].id == 'indi')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'far') || (that.items2[that.result23].id == 'far') || (that.items3[that.result33].id == 'far')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result33].id)) ||
	    			((that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id) && (that.items3[that.result33].id != that.items2[that.result23].id))) {
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result33].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result23].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result33].id) && (that.items3[that.result33].id == that.items4[that.result43].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("seis").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==7){
    		if ((that.items1[that.result1].id == '1q') || (that.items2[that.result20].id == '1q') || (that.items3[that.result30].id == '1q') || 
    			(that.items1[that.result1].id == 'q') || (that.items2[that.result20].id == 'q') || (that.items3[that.result30].id == 'q') ||
    			(that.items1[that.result1].id == 'j') || (that.items2[that.result20].id == 'j') || (that.items3[that.result30].id == 'j')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'a') || (that.items2[that.result20].id == 'a') || (that.items3[that.result30].id == 'a') || 
    			(that.items1[that.result1].id == 'k') || (that.items2[that.result20].id == 'k') || (that.items3[that.result30].id == 'k')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'raa') || (that.items2[that.result20].id == 'raa') || (that.items3[that.result30].id == 'raa') || 
    			(that.items1[that.result1].id == 'esc') || (that.items2[that.result20].id == 'esc') || (that.items3[that.result30].id == 'esc')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'indi') || (that.items2[that.result20].id == 'indi') || (that.items3[that.result30].id == 'indi')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result1].id == 'far') || (that.items2[that.result20].id == 'far') || (that.items3[that.result30].id == 'far')) {
	    		if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) || 
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    			((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result1].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result5].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result30].id)) ||
	    			((that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id) && (that.items3[that.result30].id != that.items2[that.result20].id))) {
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id != that.items5[that.result5].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items3[that.result30].id)) ||
	    				  ((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result1].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result5].id) && (that.items1[that.result1].id != that.items2[that.result20].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result1].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result30].id) && (that.items3[that.result30].id == that.items4[that.result40].id) && (that.items1[that.result1].id == that.items5[that.result5].id))){
	    			document.getElementById("siete").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==8){
    		if ((that.items1[that.result13].id == '1q') || (that.items2[that.result23].id == '1q') || (that.items3[that.result3].id == '1q') || 
    			(that.items1[that.result13].id == 'q') || (that.items2[that.result23].id == 'q') || (that.items3[that.result3].id == 'q') ||
    			(that.items1[that.result13].id == 'j') || (that.items2[that.result23].id == 'j') || (that.items3[that.result3].id == 'j')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result23].id))) {
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'a') || (that.items2[that.result23].id == 'a') || (that.items3[that.result3].id == 'a') || 
    			(that.items1[that.result13].id == 'k') || (that.items2[that.result23].id == 'k') || (that.items3[that.result3].id == 'k')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result23].id))) {
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'raa') || (that.items2[that.result23].id == 'raa') || (that.items3[that.result3].id == 'raa') || 
    			(that.items1[that.result13].id == 'esc') || (that.items2[that.result23].id == 'esc') || (that.items3[that.result3].id == 'esc')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result23].id))) {
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'indi') || (that.items2[that.result23].id == 'indi') || (that.items3[that.result3].id == 'indi')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result23].id))) {
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'far') || (that.items2[that.result23].id == 'far') || (that.items3[that.result3].id == 'far')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items4[that.result40].id)) ||
	    			((that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id) && (that.items2[that.result23].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result23].id))) {
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result40].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items4[that.result40].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result23].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result23].id) && (that.items2[that.result23].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result40].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==9){
    		if ((that.items1[that.result10].id == '1q') || (that.items2[that.result20].id == '1q') || (that.items3[that.result3].id == '1q') || 
    			(that.items1[that.result10].id == 'q') || (that.items2[that.result20].id == 'q') || (that.items3[that.result3].id == 'q') ||
    			(that.items1[that.result10].id == 'j') || (that.items2[that.result20].id == 'j') || (that.items3[that.result3].id == 'j')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result20].id))) {
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id == that.items5[that.result53].id))){
	    			document.getElementById("ocho").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'a') || (that.items2[that.result20].id == 'a') || (that.items3[that.result3].id == 'a') || 
    			(that.items1[that.result10].id == 'k') || (that.items2[that.result20].id == 'k') || (that.items3[that.result3].id == 'k')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result20].id))) {
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id == that.items5[that.result53].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'raa') || (that.items2[that.result20].id == 'raa') || (that.items3[that.result3].id == 'raa') || 
    			(that.items1[that.result10].id == 'esc') || (that.items2[that.result20].id == 'esc') || (that.items3[that.result3].id == 'esc')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result20].id))) {
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id == that.items5[that.result53].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'indi') || (that.items2[that.result20].id == 'indi') || (that.items3[that.result3].id == 'indi')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result20].id))) {
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id == that.items5[that.result53].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result10].id == 'far') || (that.items2[that.result20].id == 'far') || (that.items3[that.result3].id == 'far')) {
	    		if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) || 
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) || 
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    			((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    			((that.items1[that.result10].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items5[that.result53].id)) ||
	    			((that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items4[that.result43].id)) ||
	    			((that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id) && (that.items2[that.result20].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result20].id))) {
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id != that.items5[that.result53].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items4[that.result43].id)) ||
	    				  ((that.items1[that.result10].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items4[that.result43].id == that.items5[that.result53].id) && (that.items1[that.result10].id != that.items2[that.result20].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result10].id == that.items2[that.result20].id) && (that.items2[that.result20].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result43].id) && (that.items1[that.result10].id == that.items5[that.result53].id))){
	    			document.getElementById("nueve").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}else if (i==10) {
    		if ((that.items1[that.result13].id == '1q') || (that.items2[that.result2].id == '1q') || (that.items3[that.result3].id == '1q') || 
    			(that.items1[that.result13].id == 'q') || (that.items2[that.result2].id == 'q') || (that.items3[that.result3].id == 'q') ||
    			(that.items1[that.result13].id == 'j') || (that.items2[that.result2].id == 'j') || (that.items3[that.result3].id == 'j')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+125;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+375;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+2500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+5000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'a') || (that.items2[that.result2].id == 'a') || (that.items3[that.result3].id == 'a') || 
    			(that.items1[that.result13].id == 'k') || (that.items2[that.result2].id == 'k') || (that.items3[that.result3].id == 'k')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000;
	    			}
	    			
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    			var credits = (parseInt($('#credits').text()) + ec);
	    			$('#credits').text(credits);
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+4500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+30000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'raa') || (that.items2[that.result2].id == 'raa') || (that.items3[that.result3].id == 'raa') || 
    			(that.items1[that.result13].id == 'esc') || (that.items2[that.result2].id == 'esc') || (that.items3[that.result3].id == 'esc')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+30;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+60;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+90;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+150;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+450;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+900;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+6000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+750;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+1250;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+2250;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+3750;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+7500;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+11250;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+22500;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+37500;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+150000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'indi') || (that.items2[that.result2].id == 'indi') || (that.items3[that.result3].id == 'indi')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+100;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+300;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+500;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+1500;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+20000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+1000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+3000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+200000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+5000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+15000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+25000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+50000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+75000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+150000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+250000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+500000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+1000000;
	    			}
	    		}
	    	}else if ((that.items1[that.result13].id == 'far') || (that.items2[that.result2].id == 'far') || (that.items3[that.result3].id == 'far')) {
	    		if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) || 
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items5[that.result5].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) || 
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    			((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    			((that.items1[that.result13].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items5[that.result50].id)) ||
	    			((that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items4[that.result4].id)) ||
	    			((that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id) && (that.items2[that.result2].id != that.items3[that.result3].id)) ||
	    			((that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id) && (that.items3[that.result3].id != that.items2[that.result2].id))) {
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+40;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+80;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+120;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+160;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+200;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+600;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+8000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id != that.items5[that.result50].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items3[that.result3].id)) ||
	    				  ((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items4[that.result4].id)) ||
	    				  ((that.items1[that.result13].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items4[that.result4].id == that.items5[that.result50].id) && (that.items1[that.result13].id != that.items2[that.result2].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+400;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+800;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+1200;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+1600;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+12000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+16000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+80000;
	    			}
	    		}else if (((that.items1[that.result13].id == that.items2[that.result2].id) && (that.items2[that.result2].id == that.items3[that.result3].id) && (that.items3[that.result3].id == that.items4[that.result4].id) && (that.items1[that.result13].id == that.items5[that.result50].id))){
	    			document.getElementById("diez").style.visibility = "visible";
	    			if ($('#bet').text() == 1) {
	    				ec = ec+2000;
	    			}else if ($('#bet').text() == 2) {
	    				ec = ec+4000;
	    			}else if ($('#bet').text() == 3) {
	    				ec = ec+6000;
	    			}else if ($('#bet').text() == 4) {
	    				ec = ec+8000;
	    			}else if ($('#bet').text() == 5) {
	    				ec = ec+10000;
	    			}else if ($('#bet').text() == 10) {
	    				ec = ec+20000;
	    			}else if ($('#bet').text() == 15) {
	    				ec = ec+30000;
	    			}else if ($('#bet').text() == 20) {
	    				ec = ec+40000;
	    			}else if ($('#bet').text() == 30) {
	    				ec = ec+60000;
	    			}else if ($('#bet').text() == 40) {
	    				ec = ec+80000;
	    			}else if ($('#bet').text() == 50) {
	    				ec = ec+100000;
	    			}else if ($('#bet').text() == 100) {
	    				ec = ec+200000;
	    			}else if ($('#bet').text() == 200) {
	    				ec = ec+400000;
	    			}
	    		}
	    	}
    	}*/
    }

	//$('#results').show();
	
	/*for (var i = 1; i <= $('#lineas').text(); i++) {
		if (i==1) {
			console.log("Comprbando linea: "+i);
			for (var j = 1; j <= 5; j++) {
				if (j=1) {
					if (that.items1[that.result1].id == that.items2[that.result2].id) {
						if (that.items1[that.result1].id == '1q') {
							matrix[0][0]+=1;
						}else if (that.items1[that.result1].id == 'a') {
							matrix[0][1]+=1;
						}else if (that.items1[that.result1].id == 'book') {
							matrix[0][2]+=1;
						}else if (that.items1[that.result1].id == 'esc') {
							matrix[0][3]+=1;
						}else if (that.items1[that.result1].id == 'far') {
							matrix[0][4]+=1;
						}else if (that.items1[that.result1].id == 'indi') {
							matrix[0][5]+=1;
						}else if (that.items1[that.result1].id == 'j') {
							matrix[0][6]+=1;
						}else if (that.items1[that.result1].id == 'k') {
							matrix[0][7]+=1;
						}else if (that.items1[that.result1].id == 'q') {
							matrix[0][8]+=1;
						}else if (that.items1[that.result1].id == 'raa') {
							matrix[0][9]+=1;
						};
					}else if (that.items1[that.result1].id == that.items3[that.result3].id) {
						if (that.items1[that.result1].id == '1q') {
							matrix[0][0]+=1;
						}else if (that.items1[that.result1].id == 'a') {
							matrix[0][1]+=1;
						}else if (that.items1[that.result1].id == 'book') {
							matrix[0][2]+=1;
						}else if (that.items1[that.result1].id == 'esc') {
							matrix[0][3]+=1;
						}else if (that.items1[that.result1].id == 'far') {
							matrix[0][4]+=1;
						}else if (that.items1[that.result1].id == 'indi') {
							matrix[0][5]+=1;
						}else if (that.items1[that.result1].id == 'j') {
							matrix[0][6]+=1;
						}else if (that.items1[that.result1].id == 'k') {
							matrix[0][7]+=1;
						}else if (that.items1[that.result1].id == 'q') {
							matrix[0][8]+=1;
						}else if (that.items1[that.result1].id == 'raa') {
							matrix[0][9]+=1;
						};
					}else if (that.items1[that.result1].id == that.items4[that.result4].id) {
						if (that.items1[that.result1].id == '1q') {
							matrix[0][0]+=1;
						}else if (that.items1[that.result1].id == 'a') {
							matrix[0][1]+=1;
						}else if (that.items1[that.result1].id == 'book') {
							matrix[0][2]+=1;
						}else if (that.items1[that.result1].id == 'esc') {
							matrix[0][3]+=1;
						}else if (that.items1[that.result1].id == 'far') {
							matrix[0][4]+=1;
						}else if (that.items1[that.result1].id == 'indi') {
							matrix[0][5]+=1;
						}else if (that.items1[that.result1].id == 'j') {
							matrix[0][6]+=1;
						}else if (that.items1[that.result1].id == 'k') {
							matrix[0][7]+=1;
						}else if (that.items1[that.result1].id == 'q') {
							matrix[0][8]+=1;
						}else if (that.items1[that.result1].id == 'raa') {
							matrix[0][9]+=1;
						};
					}else if (that.items1[that.result1].id == that.items5[that.result5].id) {
						if (that.items1[that.result1].id == '1q') {
							matrix[0][0]+=1;
						}else if (that.items1[that.result1].id == 'a') {
							matrix[0][1]+=1;
						}else if (that.items1[that.result1].id == 'book') {
							matrix[0][2]+=1;
						}else if (that.items1[that.result1].id == 'esc') {
							matrix[0][3]+=1;
						}else if (that.items1[that.result1].id == 'far') {
							matrix[0][4]+=1;
						}else if (that.items1[that.result1].id == 'indi') {
							matrix[0][5]+=1;
						}else if (that.items1[that.result1].id == 'j') {
							matrix[0][6]+=1;
						}else if (that.items1[that.result1].id == 'k') {
							matrix[0][7]+=1;
						}else if (that.items1[that.result1].id == 'q') {
							matrix[0][8]+=1;
						}else if (that.items1[that.result1].id == 'raa') {
							matrix[0][9]+=1;
						};
					};
				};
			};
			

			/*if (that.items2[that.result2].id == that.items5[that.result5].id) {
				if (that.items1[that.result1].id == '1q') {
					matrix[0][0]+=1;
				}else if (that.items1[that.result1].id == 'a') {
					matrix[0][1]+=1;
				}else if (that.items1[that.result1].id == 'book') {
					matrix[0][2]+=1;
				}else if (that.items1[that.result1].id == 'esc') {
					matrix[0][3]+=1;
				}else if (that.items1[that.result1].id == 'far') {
					matrix[0][4]+=1;
				}else if (that.items1[that.result1].id == 'indi') {
					matrix[0][5]+=1;
				}else if (that.items1[that.result1].id == 'j') {
					matrix[0][6]+=1;
				}else if (that.items1[that.result1].id == 'k') {
					matrix[0][7]+=1;
				}else if (that.items1[that.result1].id == 'q') {
					matrix[0][8]+=1;
				}else if (that.items1[that.result1].id == 'raa') {
					matrix[0][9]+=1;
				};
			};		
			for (var x = 0; x<=0; x++){
				for (var y = 0; y<=9; y++){
					console.log("x: "+x+"y: "+y+"\nresult: "+matrix[x][y]);
				}
			}
		}else if (i==2) {
			console.log("Comprbando linea: "+i);
		}else if (i==3) {
			console.log("Comprbando linea: "+i);
		}else if (i==4) {
			console.log("Comprbando linea: "+i);
		}else if (i==5) {
			console.log("Comprbando linea: "+i);
		}else if (i==6) {
			console.log("Comprbando linea: "+i);
		}else if (i==7) {
			console.log("Comprbando linea: "+i);
		}else if (i==8) {
			console.log("Comprbando linea: "+i);
		}else if (i==9) {
			console.log("Comprbando linea: "+i);
		}else if (i==10) {
			console.log("Comprbando linea: "+i);
		};
	};

	/*if (that.items1[that.result1].id == 'iron') {
		id = that.items1[that.result1].id;
		console.log(id);
	    ec++;
	}
	if (that.items2[that.result2].id == 'iron') {
	    ec++;
	}
	if (that.items3[that.result3].id == 'iron') {
	    ec++;
	}
	if (that.items4[that.result4].id == 'iron') {
	    ec++;
	}
	if (that.items5[that.result5].id == 'iron') {
	    ec++;
	}*/
	console.log("Credits:    "+ec);
	$('#messages').text("Usted gano: "+ec+" creditos");
	$('#multiplier').text(ec);




	$('#status').text(BLURB_TBL[ec]);

	this.state = 9;
	break;
    case 9: // game ends
	break;
    default:
    }
    this.lastupdate = now;
}



Game.prototype.draw = function( force ) {

    if (this.state >= 8 ) return;

    // draw the spinning slots based on current state
    for (var i=1; i <= 5; i++ ) {
	var resultp = 'result'+i;
	var stopped = 'stopped'+i;
	var speedp = 'speed'+i;
	var offsetp = 'offset'+i;
	var cp = 'c'+i;
	if (this[stopped] || this[speedp] || force) {
	    if (this[stopped]) {
		this[speedp] = 0;
		var c = this[resultp]; // get stop location
		this[offsetp] = -(c * SLOT_HEIGHT);

		if (this[offsetp] + DRAW_OFFSET > 0) {
		    // reset back to beginning
		    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 5;
		}

	    } else {
		this[offsetp] += this[speedp];
		if (this[offsetp] + DRAW_OFFSET > 0) {
		    // reset back to beginning
		    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 5 - DRAW_OFFSET;
		}
	    }
	    // translate canvas location
	    this[cp].css(this.cssTransform, this.trnOpen + '0px, '+(this[offsetp] + DRAW_OFFSET-10)+'px' + this.trnClose);
	}
    }
}
