
var IMAGE_HEIGHT = 140;
var IMAGE_TOP_MARGIN = 0;
var IMAGE_BOTTOM_MARGIN = 0;
var SLOT_SEPARATOR_HEIGHT = 0;
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 300; // how long all slots spin before starting countdown
var SPINTIME = 100; // how long each slot spins at minimum
var ITEM_COUNT = 10; // item count in slots
var SLOT_SPEED = 100; // how many pixels per second slots roll
var DRAW_OFFSET = 150 // how much draw offset in slot display from top
var INIT_GAME = 0;
var ec = 0;
var userID = "";
var risk = 0, gamble = 2, table = 0;
var interval;

var winnerInterval = 0;
var linesToWin = 0;

var newCredits=0, oldCredits=0;

var automatico = 0;
var playing = false;

var reelImage1 = ["img/Alcatraz/book.png","img/Alcatraz/1q.png","img/Alcatraz/a.png"];
var reelImage2 = ["img/Alcatraz/esc.png","img/Alcatraz/q.png","img/Alcatraz/raa.png"];
var reelImage3 = ["img/Alcatraz/indi.png","img/Alcatraz/far.png","img/Alcatraz/1q.png"];
var reelImage4 = ["img/Alcatraz/a.png","img/Alcatraz/book.png","img/Alcatraz/k.png"];
var reelImage5 = ["img/Alcatraz/far.png","img/Alcatraz/1q.png","img/Alcatraz/j.png"];

var ak3x = parseInt($('#ak3x').text());
var ak4x = parseInt($('#ak4x').text());
var ak5x = parseInt($('#ak5x').text());

var lqqj3x = parseInt($('#1qqj3x').text());
var lqqj4x = parseInt($('#1qqj4x').text());
var lqqj5x = parseInt($('#1qqj5x').text());

var book3x = parseInt($('#book3x').text());
var book4x = parseInt($('#book4x').text());
var book5x = parseInt($('#book5x').text());

var raa2x = parseInt($('#raa2x').text());
var raa3x = parseInt($('#raa3x').text());
var raa4x = parseInt($('#raa4x').text());
var raa5x = parseInt($('#raa5x').text());

var indi2x = parseInt($('#indi2x').text());
var indi3x = parseInt($('#indi3x').text());
var indi4x = parseInt($('#indi4x').text());
var indi5x = parseInt($('#indi5x').text());

var esc2x = parseInt($('#esc2x').text());
var esc3x = parseInt($('#esc3x').text());
var esc4x = parseInt($('#esc4x').text());
var esc5x = parseInt($('#esc5x').text());

var far2x = parseInt($('#far2x').text());
var far3x = parseInt($('#far3x').text());
var far4x = parseInt($('#far4x').text());
var far5x = parseInt($('#far5x').text());

var percent = false;

var free=false;
var freeGames = -1;
var imageRand = "";
var itemRand=0;
var controlImg = 0;

var device = "";
var myPercent = "";

var valMatrix = [[0,0,0,0,0,0,0,0,0,0],//1Q
               [0,0,0,0,0,0,0,0,0,0],//A
           [0,0,0,0,0,0,0,0,0,0],//BOOK
           [0,0,0,0,0,0,0,0,0,0],//ESC
           [0,0,0,0,0,0,0,0,0,0],//FAR
           [0,0,0,0,0,0,0,0,0,0],//INDI
           [0,0,0,0,0,0,0,0,0,0],//J
           [0,0,0,0,0,0,0,0,0,0],//K
           [0,0,0,0,0,0,0,0,0,0],//Q
           [0,0,0,0,0,0,0,0,0,0]//RAA
          ];

var posMatrix = [[0,0,0,0,0]];

var BET_LINES = 1;

var BLURB_TBL = [
    'No gano!',
    'Casi',
    'Casi Casi',
    'Bueno!',
    'Excelente!',
    'JACKPOT!'
];

function noWinImages(){

  var myRand = Math.floor(Math.random() * 5) + 1;

  switch (myRand){
    case 1:
      $('#noWin11').attr("src",reelImage1[1]);
      $('#noWin21').attr("src",reelImage1[0]);
      $('#noWin31').attr("src",reelImage1[2]);
      $('#noWin12').attr("src",reelImage2[1]);
      $('#noWin22').attr("src",reelImage2[0]);
      $('#noWin32').attr("src",reelImage2[2]);
      $('#noWin13').attr("src",reelImage3[1]);
      $('#noWin23').attr("src",reelImage3[0]);
      $('#noWin33').attr("src",reelImage3[2]);
      $('#noWin14').attr("src",reelImage4[1]);
      $('#noWin24').attr("src",reelImage4[0]);
      $('#noWin34').attr("src",reelImage4[2]);
      $('#noWin15').attr("src",reelImage5[1]);
      $('#noWin25').attr("src",reelImage5[0]);
      $('#noWin35').attr("src",reelImage5[2]);
    break;
    case 2:
      $('#noWin11').attr("src",reelImage2[1]);
      $('#noWin21').attr("src",reelImage2[0]);
      $('#noWin31').attr("src",reelImage2[2]);
      $('#noWin12').attr("src",reelImage1[1]);
      $('#noWin22').attr("src",reelImage1[0]);
      $('#noWin32').attr("src",reelImage1[2]);
      $('#noWin13').attr("src",reelImage5[1]);
      $('#noWin23').attr("src",reelImage5[0]);
      $('#noWin33').attr("src",reelImage5[2]);
      $('#noWin14').attr("src",reelImage3[1]);
      $('#noWin24').attr("src",reelImage3[0]);
      $('#noWin34').attr("src",reelImage3[2]);
      $('#noWin15').attr("src",reelImage4[1]);
      $('#noWin25').attr("src",reelImage4[0]);
      $('#noWin35').attr("src",reelImage4[2]);
    break;
    case 3:
      $('#noWin11').attr("src",reelImage3[1]);
      $('#noWin21').attr("src",reelImage3[0]);
      $('#noWin31').attr("src",reelImage3[2]);
      $('#noWin12').attr("src",reelImage4[1]);
      $('#noWin22').attr("src",reelImage4[0]);
      $('#noWin32').attr("src",reelImage4[2]);
      $('#noWin13').attr("src",reelImage1[1]);
      $('#noWin23').attr("src",reelImage1[0]);
      $('#noWin33').attr("src",reelImage1[2]);
      $('#noWin14').attr("src",reelImage5[1]);
      $('#noWin24').attr("src",reelImage5[0]);
      $('#noWin34').attr("src",reelImage5[2]);
      $('#noWin15').attr("src",reelImage2[1]);
      $('#noWin25').attr("src",reelImage2[0]);
      $('#noWin35').attr("src",reelImage2[2]);
    break;
    case 4:
      $('#noWin11').attr("src",reelImage2[1]);
      $('#noWin21').attr("src",reelImage2[0]);
      $('#noWin31').attr("src",reelImage2[2]);
      $('#noWin12').attr("src",reelImage1[1]);
      $('#noWin22').attr("src",reelImage1[0]);
      $('#noWin32').attr("src",reelImage1[2]);
      $('#noWin13').attr("src",reelImage3[1]);
      $('#noWin23').attr("src",reelImage3[0]);
      $('#noWin33').attr("src",reelImage3[2]);
      $('#noWin14').attr("src",reelImage5[1]);
      $('#noWin24').attr("src",reelImage5[0]);
      $('#noWin34').attr("src",reelImage5[2]);
      $('#noWin15').attr("src",reelImage4[1]);
      $('#noWin25').attr("src",reelImage4[0]);
      $('#noWin35').attr("src",reelImage4[2]);
    break;
    case 5:
      $('#noWin11').attr("src",reelImage5[1]);
      $('#noWin21').attr("src",reelImage5[0]);
      $('#noWin31').attr("src",reelImage5[2]);
      $('#noWin12').attr("src",reelImage4[1]);
      $('#noWin22').attr("src",reelImage4[0]);
      $('#noWin32').attr("src",reelImage4[2]);
      $('#noWin13').attr("src",reelImage3[1]);
      $('#noWin23').attr("src",reelImage3[0]);
      $('#noWin33').attr("src",reelImage3[2]);
      $('#noWin14').attr("src",reelImage2[1]);
      $('#noWin24').attr("src",reelImage2[0]);
      $('#noWin34').attr("src",reelImage2[2]);
      $('#noWin15').attr("src",reelImage1[1]);
      $('#noWin25').attr("src",reelImage1[0]);
      $('#noWin35').attr("src",reelImage1[2]);
    break;
  }
  
  

  //$('div.noWin').children().css("visibility","visible");
  //$('div.reels').children().css("visibility","hidden");

}


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
  asset.img.src = 'img/Alcatraz/' + asset.id+'.png';

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

function SlotGame(idUser) {

  userID = idUser;
  noWinImages();
  //console.log("AQUI");

  if (INIT_GAME==0) {
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

  $('#gambleBtn').click(function(e) {
    document.getElementById("jackpot").style.visibility = "hidden";
      if (gamble == 0) {
        document.getElementById("gamble").style.visibility = "visible";
        $('div.win').children().css("visibility","hidden");
        $('#gambleAmount').text(ec);
        $('#gWinAmount').text(ec*2);
        interval = setInterval(function () {
          $('#filter').toggleClass("supRed supBlack");
        }, 100);
        gamble=1;
      }else if (gamble == 1){
        clearInterval(interval);
        document.getElementById("gamble").style.visibility = "hidden";
        gamble=0;
      } 
    });

  $('#black').click(function(){
    document.getElementById("jackpot").style.visibility = "hidden";
    clearInterval(interval);
    $('#filter').removeClass("supBlack");
    $('#filter').removeClass("supRed");
    var myRand = Math.floor(Math.random() * 4) + 1; 
    switch (myRand){
      case 1:
        $('#bigCard').attr("src","img/Alcatraz/card_hearth.png");
        setTimeout(function(){
          $('#card1').attr("src","img/Alcatraz/card_hearth.png");
          $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
          var cardValue = $('#card1').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card2').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card2').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card2').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card2').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          var aux = cardValue;
          $('#card1').attr("value", "hearth");
          cardValue = $('#card2').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card3').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card3').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card3').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card3').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card2').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card3').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card4').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card4').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card4').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card4').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card3').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card4').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card5').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card5').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card5').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card5').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card4').attr("value", aux);
          aux = cardValue;
          $('#card5').attr("value", aux);
      }, 1000);
      break;
      case 2:
        $('#bigCard').attr("src","img/Alcatraz/card_pica.png");
        setTimeout(function(){
          $('#card1').attr("src","img/Alcatraz/card_pica.png");
          $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
          var cardValue = $('#card1').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card2').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card2').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card2').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card2').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          var aux = cardValue;
          $('#card1').attr("value", "pica");
          cardValue = $('#card2').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card3').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card3').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card3').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card3').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card2').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card3').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card4').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card4').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card4').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card4').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card3').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card4').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card5').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card5').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card5').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card5').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card4').attr("value", aux);
          aux = cardValue;
          $('#card5').attr("value", aux);
      }, 1000);
      break;
      case 3:
        $('#bigCard').attr("src","img/Alcatraz/card_dia.png");
        setTimeout(function(){
          $('#card1').attr("src","img/Alcatraz/card_dia.png");
          $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
          var cardValue = $('#card1').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card2').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card2').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card2').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card2').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          var aux = cardValue;
          $('#card1').attr("value", "dia");
          cardValue = $('#card2').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card3').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card3').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card3').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card3').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card2').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card3').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card4').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card4').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card4').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card4').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card3').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card4').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card5').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card5').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card5').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card5').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card4').attr("value", aux);
          aux = cardValue;
          $('#card5').attr("value", aux);
      }, 1000);
      break;
      case 4:
        $('#bigCard').attr("src","img/Alcatraz/card_trebol.png");
        setTimeout(function(){
          $('#card1').attr("src","img/Alcatraz/card_trebol.png");
          $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
          var cardValue = $('#card1').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card2').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card2').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card2').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card2').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          var aux = cardValue;
          $('#card1').attr("value", "trebol");
          cardValue = $('#card2').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card3').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card3').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card3').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card3').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card2').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card3').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card4').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card4').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card4').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card4').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card3').attr("value", aux);
          aux = cardValue;
          cardValue = $('#card4').attr("value");
          switch (cardValue){
            case "hearth":
              $('#card5').attr("src","img/Alcatraz/card_hearth.png");
            break;
            case "pica":
              $('#card5').attr("src","img/Alcatraz/card_pica.png");
            break;
            case "dia":
              $('#card5').attr("src","img/Alcatraz/card_dia.png");
            break;
            case "trebol":
              $('#card5').attr("src","img/Alcatraz/card_trebol.png");
            break;
          }
          $('#card4').attr("value", aux);
          aux = cardValue;
          $('#card5').attr("value", aux);
      }, 1000);
      break;
    } 

    if (myRand==2 || myRand==4) {
      ec = ec*2;
      $('#messages').text("Usted gano: "+ec+" creditos");
      $('#gambleAmount').text(ec);
        $('#gWinAmount').text(ec*2);
        setTimeout(function(){
          interval = setInterval(function () {
            $('#filter').toggleClass("supRed supBlack");
          }, 100);
        },1000);
    }else{
      setTimeout(function(){
        ec=0;
        ec += parseInt($('#credits').text());
      $('#credits').text(ec);
      var monto_max=0;
      datos = {
          user :userID,
          val  :ec
      };
      $.get("http://casino.local/save_credits/"+datos.user+"/"+datos.val, function (data){
            //alert("Guardado exitoso");
            monto_max = data.monto_max;
            if (datos.val > monto_max) {
              alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar");
              $.get("http://casino.local/close_sesion/" + device +"/", function () {
                  window.history.back();
              }).fail(function () {
              });
            };
            
        }).fail(function() {
            //alert("Error al guardar");
        });

        playing=false;

        $('div.button').addClass("button-default");
        $('div.button').removeClass("button-disable");  
        ec=0;
        $('#play').text("Jugar");
        $('#messages').text('Por favor realice su apuesta');
        document.getElementById("gamble").style.visibility = "hidden";
        $('#gambleBtn').toggleClass("button-default button-disable");
        BET_BY_LINES = $('#bet').text();
        if (BET_BY_LINES == 200) {
          $("#betMore").removeClass("button-default");
          $("#betMore").addClass("button-disable");
        }else if (BET_BY_LINES == 10) {
          $("#betMinus").removeClass("button-default");
          $("#betMinus").addClass("button-disable");
        }
        BET_LINES = $('#lineas').text();
        if (BET_LINES == 1) {
          $("#lineMinus").addClass("button-disable");
          $("#lineMinus").removeClass("button-default");
        }else if (BET_LINES == 10) {
          $("#lineMore").addClass("button-disable");
          $("#lineMore").removeClass("button-default");
        }
      },1000);
    }
  });

  $('#red').click(function(){
    document.getElementById("jackpot").style.visibility = "hidden";
      clearInterval(interval);
      $('#filter').removeClass("supBlack");
      $('#filter').removeClass("supRed");
      var myRand = Math.floor(Math.random() * 4) + 1; 
      switch (myRand){
        case 1:
          $('#bigCard').attr("src","img/Alcatraz/card_hearth.png");
          setTimeout(function(){
            $('#card1').attr("src","img/Alcatraz/card_hearth.png");
            $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
            var cardValue = $('#card1').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card2').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card2').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card2').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card2').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            var aux = cardValue;
            $('#card1').attr("value", "hearth");
            cardValue = $('#card2').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card3').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card3').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card3').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card3').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card2').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card3').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card4').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card4').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card4').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card4').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card3').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card4').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card5').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card5').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card5').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card5').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card4').attr("value", aux);
            aux = cardValue;
            $('#card5').attr("value", aux);
        }, 1000);
        break;
        case 2:
          $('#bigCard').attr("src","img/Alcatraz/card_pica.png");
          setTimeout(function(){
            $('#card1').attr("src","img/Alcatraz/card_pica.png");
            $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
            var cardValue = $('#card1').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card2').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card2').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card2').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card2').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            var aux = cardValue;
            $('#card1').attr("value", "pica");
            cardValue = $('#card2').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card3').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card3').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card3').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card3').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card2').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card3').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card4').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card4').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card4').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card4').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card3').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card4').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card5').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card5').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card5').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card5').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card4').attr("value", aux);
            aux = cardValue;
            $('#card5').attr("value", aux);
        }, 1000);
        break;
        case 3:
          $('#bigCard').attr("src","img/Alcatraz/card_dia.png");
          setTimeout(function(){
            $('#card1').attr("src","img/Alcatraz/card_dia.png");
            $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
            var cardValue = $('#card1').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card2').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card2').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card2').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card2').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            var aux = cardValue;
            $('#card1').attr("value", "dia");
            cardValue = $('#card2').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card3').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card3').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card3').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card3').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card2').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card3').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card4').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card4').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card4').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card4').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card3').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card4').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card5').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card5').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card5').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card5').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card4').attr("value", aux);
            aux = cardValue;
            $('#card5').attr("value", aux);
        }, 1000);
        break;
        case 4:
          $('#bigCard').attr("src","img/Alcatraz/card_trebol.png");
          setTimeout(function(){
            $('#card1').attr("src","img/Alcatraz/card_trebol.png");
            $('#bigCard').attr("src","img/Alcatraz/card_cent.png");
            var cardValue = $('#card1').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card2').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card2').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card2').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card2').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            var aux = cardValue;
            $('#card1').attr("value", "trebol");
            cardValue = $('#card2').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card3').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card3').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card3').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card3').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card2').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card3').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card4').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card4').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card4').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card4').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card3').attr("value", aux);
            aux = cardValue;
            cardValue = $('#card4').attr("value");
            switch (cardValue){
              case "hearth":
                $('#card5').attr("src","img/Alcatraz/card_hearth.png");
              break;
              case "pica":
                $('#card5').attr("src","img/Alcatraz/card_pica.png");
              break;
              case "dia":
                $('#card5').attr("src","img/Alcatraz/card_dia.png");
              break;
              case "trebol":
                $('#card5').attr("src","img/Alcatraz/card_trebol.png");
              break;
            }
            $('#card4').attr("value", aux);
            aux = cardValue;
            $('#card5').attr("value", aux);
        }, 1000);
        break;
      } 

      if (myRand==1 || myRand==3) {
        ec = ec*2;
        $('#messages').text("Usted gano: "+ec+" creditos");
        $('#gambleAmount').text(ec);
          $('#gWinAmount').text(ec*2);
          setTimeout(function(){
            interval = setInterval(function () {
            $('#filter').toggleClass("supRed supBlack");
          }, 100);
          },1000);
      }else{
        setTimeout(function(){
          ec=0;
          ec += parseInt($('#credits').text());
        $('#credits').text(ec);
        var monto_max=0;
        datos = {
            user :userID,
            val  :ec
        };
        $.get("http://casino.local/save_credits/"+datos.user+"/"+datos.val, function (data){
              //alert("Guardado exitoso");
              monto_max = data.monto_max;
              

              if (datos.val > monto_max) {
                alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar");
                $.get("http://casino.local/close_sesion/" + device +"/", function () {
                    window.history.back();
                }).fail(function () {
                });
              };
              
          }).fail(function() {
              //alert("Error al guardar");
          });

          playing=false;

          $('div.button').addClass("button-default");
          $('div.button').removeClass("button-disable");  
          ec=0;
          $('#play').text("Jugar");
          $('#messages').text('Por favor realice su apuesta');
          document.getElementById("gamble").style.visibility = "hidden";
          $('#gambleBtn').toggleClass("button-default button-disable");
          BET_BY_LINES = $('#bet').text();
          if (BET_BY_LINES == 200) {
            $("#betMore").removeClass("button-default");
            $("#betMore").addClass("button-disable");
          }else if (BET_BY_LINES == 10) {
            $("#betMinus").removeClass("button-default");
            $("#betMinus").addClass("button-disable");
          }
          BET_LINES = $('#lineas').text();
          if (BET_LINES == 1) {
            $("#lineMinus").addClass("button-disable");
            $("#lineMinus").removeClass("button-default");
          }else if (BET_LINES == 10) {
            $("#lineMore").addClass("button-disable");
            $("#lineMore").removeClass("button-default");
          }
        },1000);
      }
    });

    $('#table').click(function(e) {
      document.getElementById("jackpot").style.visibility = "hidden";
      if (table == 0) {
        document.getElementById("payTable").style.visibility = "visible";
        $('div.win').children().css("visibility","hidden");
        $('div#lines').children().css("visibility","hidden");
        table=1;
      }else{
        document.getElementById("payTable").style.visibility = "hidden";
        table=0;
      }
    });

    $('#auto').click(function(e){
      document.getElementById("jackpot").style.visibility = "hidden";
      if (automatico==0) {
        var creditos = parseInt($('#credits').text());
        var apuesta = parseInt($('#totalBet').text());
        if (creditos < apuesta) {
          $('#messages').text('Necesita tener más creditos para apostar');
        }else {
          $('.noWinImg1').css("visibility","hidden");
          $('#canvas1').css("visibility","visible");
          $('.noWinImg2').css("visibility","hidden");
          $('#canvas2').css("visibility","visible");
          $('.noWinImg3').css("visibility","hidden");
          $('#canvas3').css("visibility","visible");
          $('.noWinImg4').css("visibility","hidden");
          $('#canvas4').css("visibility","visible");
          $('.noWinImg5').css("visibility","hidden");
          $('#canvas5').css("visibility","visible");
          $('#auto').text("Detener");
          automatico = 1;
          correrJuego();
        } 
      }else{
        $('#auto').text("Automatico");
        $('#play').text("Jugar")
        automatico = 0;
        playing=true;
      }
    });

    function correrJuego(){
      playAudio("/android_asset/www/sounds/reel.mp3");
      //audio.play();
      winnerInterval = Math.floor(Math.random() * 4) + 1;
      if (winnerInterval==4) {
        linesToWin=0;
      }else{
        winnerInterval=4;
      }
      $('div.win').children().css("visibility","hidden");
      ec = 0;
      $('div.button').prop('disabled', true);
      $('div.button').removeClass("button-default");
      $('div.button').addClass("button-disable");
      $('div#lines').children().css("visibility", "hidden");
      $('#messages').text('Jugando, Buena Suerte!');
      var creditos = $('#credits').text() - $('#totalBet').text();
      $('#credits').text(creditos);
      game.restart();     
    }

    $('#play').click(function(e) {

      //(0.15 >= Math.random()) ? true: false

      //noWinImages();
      document.getElementById("jackpot").style.visibility = "hidden";
      gamble=2;
      winnerInterval = Math.floor(Math.random() * 4) + 1;
      if (ec==0 && playing==false) {
        var creditos = parseInt($('#credits').text());
        var apuesta = parseInt($('#totalBet').text());

        if (creditos < apuesta) {
          $('#messages').text('Necesita tener más creditos para apostar');
        }else {
          percent = (myPercent >= Math.random()) ? true: false;
          noWinImages();
          $('.noWinImg1').css("visibility","hidden");
          $('#canvas1').css("visibility","visible");
          $('.noWinImg2').css("visibility","hidden");
          $('#canvas2').css("visibility","visible");
          $('.noWinImg3').css("visibility","hidden");
          $('#canvas3').css("visibility","visible");
          $('.noWinImg4').css("visibility","hidden");
          $('#canvas4').css("visibility","visible");
          $('.noWinImg5').css("visibility","hidden");
          $('#canvas5').css("visibility","visible");
          if (winnerInterval==4) {
            linesToWin=0;
          }else{
            winnerInterval=4;
          }
          document.getElementById("payTable").style.visibility = "hidden";
          playAudio("/android_asset/www/sounds/reel.mp3");
          //var audio = new Media('/android_asset/www/sounds/reel.mp3', onSuccess, onError);
          //audio.play();
          for(i in valMatrix){
              for(j in valMatrix[i]){
                  //console.log("1.- MATRIX VALUE IN "+i+" "+j+": "+valMatrix[i][j]);
                  valMatrix[i][j] = 0;
                  //console.log("2.- MATRIX VALUE IN "+i+" "+j+": "+valMatrix[i][j]);
              }
          }
          $('div.bonus').children().css("visibility","hidden");
          $('div.win').children().css("visibility","hidden");
          ec = 0;
          $('div.button').prop('disabled', true);
          $('div.button').removeClass("button-default");
          $('div.button').addClass("button-disable");
          $('div#lines').children().css("visibility", "hidden");
          $('#messages').text('Jugando, Buena Suerte!');
          var creditos = 0;
          if (!free) {
            creditos = $('#credits').text() - $('#totalBet').text();
          }else{
            creditos = $('#credits').text();
          }
          $('#credits').text(creditos);
          game.restart();

          newCredits=creditos
          $.ajax({
            url: 'http://casino.local/setGame/'+oldCredits+'/'+newCredits+'/',
            dataType:'JSON',
            type: 'GET',
            header: {"Access-Control-Allow-Origin": "*"},
            contentType: 'application/json',
            success:    function(data) {
              //alert(data.user);
            }, error: function(jqXHR){
              console.log(jqXHR);
              alert("Error conectando con el servidor!"+jqXHR.status);
            }
          });
          oldCredits=creditos

        }
        playing = true;
      }else if (playing==true && ec!=0) {
        clearInterval(interval);
        $('#filter').removeClass("supBlack");
        $('#filter').removeClass("supRed");
        document.getElementById("gamble").style.visibility = "hidden";
        document.getElementById("payTable").style.visibility = "hidden";
        ec += parseInt($('#credits').text());
        console.log("ASI "+ec);
        $('#credits').text(ec);
        var monto_max=0;
        datos = {
            user :userID,
            val  :ec
        };
        $.get("http://casino.local/save_credits/"+datos.user+"/"+datos.val, function (data){
              //alert("Guardado exitoso");
              monto_max = data.monto_max;
              

              if (datos.val > monto_max) {
                alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar");
                $.get("http://casino.local/close_sesion/" + device +"/", function () {
                    window.history.back();
                }).fail(function () {
                });
              };
              
          }).fail(function() {
              //alert("Error al guardar");
          });

        $('div.button').addClass("button-default");
        $('div.button').removeClass("button-disable");
        $('#gambleBtn').toggleClass("button-default button-disable");
        BET_BY_LINES = $('#bet').text();
        if (BET_BY_LINES == 200) {
          $("#betMore").removeClass("button-default");
          $("#betMore").addClass("button-disable");
        }else if (BET_BY_LINES == 10) {
          $("#betMinus").removeClass("button-default");
          $("#betMinus").addClass("button-disable");
        }
        BET_LINES = $('#lineas').text();
        if (BET_LINES == 1) {
          $("#lineMinus").addClass("button-disable");
          $("#lineMinus").removeClass("button-default");
        }else if (BET_LINES == 10) {
          $("#lineMore").addClass("button-disable");
          $("#lineMore").removeClass("button-default");
        } 
        ec=0;
        $('#play').text("Jugar");
        $('#messages').text('Por favor realice su apuesta');
        playing = false;
       
      }
    });

    function playAudio(src) {
      my_media = new Media(src, onSuccess, onError);

      // Play audio
      my_media.play();
    }

    function onSuccess() {
      //console.log("playAudio():Audio Success");
    }

    // onError Callback
    //
    function onError(error) {
      alert(window.location.pathname);
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }

    function getDevice(){
      var miid = window.localStorage.getItem("idDevice");
      
      setInterval(function(){
        $.ajax({
          url: 'http://casino.local/getDevice',
          dataType:'JSON',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({"device":miid}),
          success:    function(data) {
            device = data.device;
            myPercent = data.percent;
          }, error: function(jqXHR){
            alert("El dispositivo ya no se encuentra disponible para jugar!");
            window.history.back();
          }
        });
      }, 2000);
    }

    getDevice();

    $('#lineMore').click(function(e){
      document.getElementById("jackpot").style.visibility = "hidden";
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
      };
    });

    $('#lineMinus').click(function(e){
      document.getElementById("jackpot").style.visibility = "hidden";
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
    document.getElementById("jackpot").style.visibility = "hidden";
      BET_BY_LINES = $('#bet').text();
      if (BET_BY_LINES == 10) {
        //document.getElementById("dos").style.visibility = "visible";
        $('#bet').text("50");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        BET_BY_LINES = 50;
        $("#betMinus").prop('disabled',false);
        $("#betMinus").toggleClass("button-disable button-default");
        //$("#betMinus").removeClass("button-disable");
        //$("#betMinus").addClass("button-default");
      }else if (BET_BY_LINES == 50) {
        $('#bet').text("100");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
      }else if (BET_BY_LINES == 100) {
        $('#bet').text("120");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
      }else if (BET_BY_LINES == 120) {
        $('#bet').text("140");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
      }else if (BET_BY_LINES == 140) {
        $('#bet').text("160");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
      }else if (BET_BY_LINES == 160) {
        $('#bet').text("180");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
      }else if (BET_BY_LINES == 180) {
        $('#bet').text("200");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        $("#betMore").prop('disabled',true);
        $("#betMore").toggleClass("button-disable button-default");
      }
    });

    $('#betMinus').click(function(e){
      BET_BY_LINES = $('#bet').text();
      if (BET_BY_LINES == 200) {
        $("#betMore").prop('disabled',false);
        $("#betMore").toggleClass("button-disable button-default");
        $('#bet').text("180");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("diez").style.visibility = "hidden";
        //BET_BY_LINES = 100;
      }else if (BET_BY_LINES == 180) {
        $('#bet').text("160");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("nueve").style.visibility = "hidden";
        //BET_LINES = 8;
      }else if (BET_BY_LINES == 160) {
        $('#bet').text("140");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("ocho").style.visibility = "hidden";
        //BET_LINES = 7;
      }else if (BET_BY_LINES == 140) {
        $('#bet').text("120");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("siete").style.visibility = "hidden";
        //BET_LINES = 6;
      }else if (BET_BY_LINES == 120) {
        $('#bet').text("100");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("seis").style.visibility = "hidden";
        //BET_LINES = 5;
      }else if (BET_BY_LINES == 100) {
        $('#bet').text("50");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));
        //document.getElementById("cinco").style.visibility = "hidden";
        //BET_LINES = 4;
      }else if (BET_BY_LINES == 50) {
        $('#bet').text("10");
        $("#totalBet").text(parseInt(($('#lineas').text()))*(parseInt($('#bet').text())));

        $("#betMinus").prop('disabled',true);
        $("#betMinus").toggleClass("button-disable button-default");
        //document.getElementById("cuatro").style.visibility = "hidden";
        //BET_LINES = 3;
      }
  });

    // Show reels for debugging
    var toggleReels = 1;
    /*$('#debug').click(function() {
  toggleReels = 1 - toggleReels;
  if ( toggleReels ) {
      $('#reels').css('overflow', 'hidden' );
  } else {
      $('#reels').css('overflow', 'visible' );
  }
    });*/
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

    //this.result4 = _find(this.items4, 'book');
    //this.result1 = _find(this.items1, 'book');
    //this.result2 = _find(this.items2, 'book');
    //this.result3 = _find(this.items3, 'book');
    //this.result5 = _find(this.items5, 'j');

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


    for (var i in posMatrix) {
      for (var j in posMatrix[i]) {
        //console.log(j);
        switch (j){
          case "0":
            posMatrix[i][j] = _find(this.items1, '1q');
            break;
          case "1":
            posMatrix[i][j] = _find(this.items2, '1q');
            break;
          case "2":
            posMatrix[i][j] = _find(this.items3, '1q');
            break;
          case "3":
            posMatrix[i][j] = _find(this.items4, '1q');
            break;
          case "4":
            posMatrix[i][j] = _find(this.items5, '1q');
            break;
        };
      };
    };

    


//    posMatrix[0][0] = _find(this.items1, '1q');

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

  //ec = 0;
    var now = new Date();
    var that = this;

    // Check slot status and if spun long enough stop it on result
    function _check_slot( offset, result ) {
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
        this.stopped1 = _check_slot(this.offset1, this.result1);
        if (this.stopped1) {
          this.speed1 = 0;
          this.state++;
          this.lastUpdate = now;
          if (!percent) {
            $('img.noWinImg1').css("visibility", "visible");
            $('#canvas1').css("visibility", "hidden");
          }


        }
        break;
      case 3: // slot 1 stopped, slot 2
        this.stopped2 = _check_slot(this.offset2, this.result2);
        if (this.stopped2) {
          this.speed2 = 0;
          this.state++;
          this.lastUpdate = now;
          if (!percent) {
            $('img.noWinImg2').css("visibility", "visible");
            $('#canvas2').css("visibility", "hidden");
          }
        }
        break;
      case 4: // slot 2 stopped, slot 3
        this.stopped3 = _check_slot(this.offset3, this.result3);
        if (this.stopped3) {
          this.speed3 = 0;
          this.state++;
          this.lastUpdate = now;
          if (!percent) {
            $('img.noWinImg3').css("visibility", "visible");
            $('#canvas3').css("visibility", "hidden");
          }
        }
        break;
      case 5: // slot 2 stopped, slot 3
        this.stopped4 = _check_slot(this.offset4, this.result4);
        if (this.stopped4) {
          this.speed4 = 0;
          this.state++;
          this.lastupdate = now;
          if (!percent) {
            $('img.noWinImg4').css("visibility", "visible");
            $('#canvas4').css("visibility", "hidden");
          }
        }
        break;
      case 6: // slot 2 stopped, slot 3
        this.stopped5 = _check_slot(this.offset5, this.result5);
        if (this.stopped5) {
          this.speed5 = 0;
          this.state++;
          if (!percent) {
            $('img.noWinImg5').css("visibility", "visible");
            $('#canvas5').css("visibility", "hidden");
          }
          console.log(that.items1[that.result1].id, that.items2[that.result2].id, that.items3[that.result3].id, that.items4[that.result4].id, that.items5[that.result5].id);
        }
        break;
      case 7: // slots stopped 
        if (now - this.lastUpdate > 1000) {
          $('div.button').prop('disabled', false);
          $('div.button.others').addClass("button-default");
          $('div.button.others').removeClass("button-disable");
          if ($('#lineas').text() == 1) {
            $('#lineMinus').addClass("button-disable");
            $('#lineMinus').removeClass("button-default");
          } else if ($('#lineas').text() == 10) {
            $('#lineMore').addClass("button-disable");
            $('#lineMore').removeClass("button-default");
          }
          ;

          if ($('#bet').text() == 1) {
            $('#betMinus').addClass("button-disable");
            $('#betMinus').removeClass("button-default");
          } else if ($('#bet').text() == 200) {
            $('#betMore').addClass("button-disable");
            $('#betMore').removeClass("button-default");
          }
          ;

          this.state = 8;
        }
        break;
      case 8: // check results


        if (percent) {

          for (var i = 1; i <= $('#lineas').text(); i++) {
            if (i == 1/* && linesToWin <= 3*/) {
              if (that.items1[that.result1].id == '1q')
                valMatrix[0][0] += 1;
              if (that.items2[that.result2].id == '1q')
                valMatrix[0][0] += 1;
              if (that.items3[that.result3].id == '1q')
                valMatrix[0][0] += 1;
              if (that.items4[that.result4].id == '1q')
                valMatrix[0][0] += 1;
              if (that.items5[that.result5].id == '1q')
                valMatrix[0][0] += 1;

              if (valMatrix[0][0] == 3) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][0] == 4) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'a')
                valMatrix[1][0] += 1;
              if (that.items2[that.result2].id == 'a')
                valMatrix[1][0] += 1;
              if (that.items3[that.result3].id == 'a')
                valMatrix[1][0] += 1;
              if (that.items4[that.result4].id == 'a')
                valMatrix[1][0] += 1;
              if (that.items5[that.result5].id == 'a')
                valMatrix[1][0] += 1;


              if (valMatrix[1][0] == 3) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][0] == 4) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'k')
                valMatrix[2][0] += 1;
              if (that.items2[that.result2].id == 'k')
                valMatrix[2][0] += 1;
              if (that.items3[that.result3].id == 'k')
                valMatrix[2][0] += 1;
              if (that.items4[that.result4].id == 'k')
                valMatrix[2][0] += 1;
              if (that.items5[that.result5].id == 'k')
                valMatrix[2][0] += 1;


              if (valMatrix[2][0] == 3) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][0] == 4) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'q')
                valMatrix[3][0] += 1;
              if (that.items2[that.result2].id == 'q')
                valMatrix[3][0] += 1;
              if (that.items3[that.result3].id == 'q')
                valMatrix[3][0] += 1;
              if (that.items4[that.result4].id == 'q')
                valMatrix[3][0] += 1;
              if (that.items5[that.result5].id == 'q')
                valMatrix[3][0] += 1;

              if (valMatrix[3][0] == 3) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][0] == 4) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'j')
                valMatrix[4][0] += 1;
              if (that.items2[that.result2].id == 'j')
                valMatrix[4][0] += 1;
              if (that.items3[that.result3].id == 'j')
                valMatrix[4][0] += 1;
              if (that.items4[that.result4].id == 'j')
                valMatrix[4][0] += 1;
              if (that.items5[that.result5].id == 'j')
                valMatrix[4][0] += 1;

              if (valMatrix[4][0] == 3) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][0] == 4) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'book')
                valMatrix[5][0] += 1;
              if (that.items2[that.result2].id == 'book')
                valMatrix[5][0] += 1;
              if (that.items3[that.result3].id == 'book')
                valMatrix[5][0] += 1;
              if (that.items4[that.result4].id == 'book')
                valMatrix[5][0] += 1;
              if (that.items5[that.result5].id == 'book')
                valMatrix[5][0] += 1;

              if (valMatrix[5][0] == 3) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][0] == 4) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result1].id == 'raa')
                valMatrix[6][0] += 1;
              if (that.items2[that.result2].id == 'raa')
                valMatrix[6][0] += 1;
              if (that.items3[that.result3].id == 'raa')
                valMatrix[6][0] += 1;
              if (that.items4[that.result4].id == 'raa')
                valMatrix[6][0] += 1;
              if (that.items5[that.result5].id == 'raa')
                valMatrix[6][0] += 1;

              if (valMatrix[6][0] == 2) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result2].id == 'raa') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][0] == 3) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][0] == 4) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'esc')
                valMatrix[7][0] += 1;
              if (that.items2[that.result2].id == 'esc')
                valMatrix[7][0] += 1;
              if (that.items3[that.result3].id == 'esc')
                valMatrix[7][0] += 1;
              if (that.items4[that.result4].id == 'esc')
                valMatrix[7][0] += 1;
              if (that.items5[that.result5].id == 'esc')
                valMatrix[7][0] += 1;

              if (valMatrix[7][0] == 2) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result2].id == 'esc') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][0] == 3) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][0] == 4) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'far')
                valMatrix[8][0] += 1;
              if (that.items2[that.result2].id == 'far')
                valMatrix[8][0] += 1;
              if (that.items3[that.result3].id == 'far')
                valMatrix[8][0] += 1;
              if (that.items4[that.result4].id == 'far')
                valMatrix[8][0] += 1;
              if (that.items5[that.result5].id == 'far')
                valMatrix[8][0] += 1;

              if (valMatrix[8][0] == 2) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result2].id == 'far') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][0] == 3) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][0] == 4) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'indi')
                valMatrix[9][0] += 1;
              if (that.items2[that.result2].id == 'indi')
                valMatrix[9][0] += 1;
              if (that.items3[that.result3].id == 'indi')
                valMatrix[9][0] += 1;
              if (that.items4[that.result4].id == 'indi')
                valMatrix[9][0] += 1;
              if (that.items5[that.result5].id == 'indi')
                valMatrix[9][0] += 1;

              if (valMatrix[9][0] == 2) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result2].id == 'indi') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][0] == 3) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][0] == 4) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi') {
                  document.getElementById("win11").style.visibility = "visible";
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win12").style.visibility = "visible";
                  document.getElementById("win13").style.visibility = "visible";
                  document.getElementById("win14").style.visibility = "visible";
                  document.getElementById("win15").style.visibility = "visible";
                  document.getElementById("uno").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][0] == 5) {
                document.getElementById("uno").style.visibility = "visible";
                document.getElementById("win11").style.visibility = "visible";
                document.getElementById("win12").style.visibility = "visible";
                document.getElementById("win13").style.visibility = "visible";
                document.getElementById("win14").style.visibility = "visible";
                document.getElementById("win15").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 2/* && linesToWin <= 3*/) {
              if (that.items1[that.result10].id == '1q')
                valMatrix[0][1] += 1;
              if (that.items2[that.result20].id == '1q')
                valMatrix[0][1] += 1;
              if (that.items3[that.result30].id == '1q')
                valMatrix[0][1] += 1;
              if (that.items4[that.result40].id == '1q')
                valMatrix[0][1] += 1;
              if (that.items5[that.result50].id == '1q')
                valMatrix[0][1] += 1;

              if (valMatrix[0][1] == 3) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][1] == 4) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'a')
                valMatrix[1][1] += 1;
              if (that.items2[that.result20].id == 'a')
                valMatrix[1][1] += 1;
              if (that.items3[that.result30].id == 'a')
                valMatrix[1][1] += 1;
              if (that.items4[that.result40].id == 'a')
                valMatrix[1][1] += 1;
              if (that.items5[that.result50].id == 'a')
                valMatrix[1][1] += 1;


              if (valMatrix[1][1] == 3) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][1] == 4) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'k')
                valMatrix[2][1] += 1;
              if (that.items2[that.result20].id == 'k')
                valMatrix[2][1] += 1;
              if (that.items3[that.result30].id == 'k')
                valMatrix[2][1] += 1;
              if (that.items4[that.result40].id == 'k')
                valMatrix[2][1] += 1;
              if (that.items5[that.result50].id == 'k')
                valMatrix[2][1] += 1;


              if (valMatrix[2][1] == 3) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][1] == 4) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'q')
                valMatrix[3][1] += 1;
              if (that.items2[that.result20].id == 'q')
                valMatrix[3][1] += 1;
              if (that.items3[that.result30].id == 'q')
                valMatrix[3][1] += 1;
              if (that.items4[that.result40].id == 'q')
                valMatrix[3][1] += 1;
              if (that.items5[that.result50].id == 'q')
                valMatrix[3][1] += 1;

              if (valMatrix[3][1] == 3) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][1] == 4) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'j')
                valMatrix[4][1] += 1;
              if (that.items2[that.result20].id == 'j')
                valMatrix[4][1] += 1;
              if (that.items3[that.result30].id == 'j')
                valMatrix[4][1] += 1;
              if (that.items4[that.result40].id == 'j')
                valMatrix[4][1] += 1;
              if (that.items5[that.result50].id == 'j')
                valMatrix[4][1] += 1;

              if (valMatrix[4][1] == 3) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][1] == 4) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'book')
                valMatrix[5][1] += 1;
              if (that.items2[that.result20].id == 'book')
                valMatrix[5][1] += 1;
              if (that.items3[that.result30].id == 'book')
                valMatrix[5][1] += 1;
              if (that.items4[that.result40].id == 'book')
                valMatrix[5][1] += 1;
              if (that.items5[that.result50].id == 'book')
                valMatrix[5][1] += 1;

              if (valMatrix[5][1] == 3) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][1] == 4) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result10].id == 'raa')
                valMatrix[6][1] += 1;
              if (that.items2[that.result20].id == 'raa')
                valMatrix[6][1] += 1;
              if (that.items3[that.result30].id == 'raa')
                valMatrix[6][1] += 1;
              if (that.items4[that.result40].id == 'raa')
                valMatrix[6][1] += 1;
              if (that.items5[that.result50].id == 'raa')
                valMatrix[6][1] += 1;

              if (valMatrix[6][1] == 2) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][1] == 3) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][1] == 4) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'esc')
                valMatrix[7][1] += 1;
              if (that.items2[that.result20].id == 'esc')
                valMatrix[7][1] += 1;
              if (that.items3[that.result30].id == 'esc')
                valMatrix[7][1] += 1;
              if (that.items4[that.result40].id == 'esc')
                valMatrix[7][1] += 1;
              if (that.items5[that.result50].id == 'esc')
                valMatrix[7][1] += 1;

              if (valMatrix[7][1] == 2) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][1] == 3) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][1] == 4) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'far')
                valMatrix[8][1] += 1;
              if (that.items2[that.result20].id == 'far')
                valMatrix[8][1] += 1;
              if (that.items3[that.result30].id == 'far')
                valMatrix[8][1] += 1;
              if (that.items4[that.result40].id == 'far')
                valMatrix[8][1] += 1;
              if (that.items5[that.result50].id == 'far')
                valMatrix[8][1] += 1;

              if (valMatrix[8][1] == 2) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][1] == 3) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][1] == 4) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'indi')
                valMatrix[9][1] += 1;
              if (that.items2[that.result20].id == 'indi')
                valMatrix[9][1] += 1;
              if (that.items3[that.result30].id == 'indi')
                valMatrix[9][1] += 1;
              if (that.items4[that.result40].id == 'indi')
                valMatrix[9][1] += 1;
              if (that.items5[that.result50].id == 'indi')
                valMatrix[9][1] += 1;

              if (valMatrix[9][1] == 2) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][1] == 3) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][1] == 4) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi') {
                  document.getElementById("win21").style.visibility = "visible";
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win22").style.visibility = "visible";
                  document.getElementById("win23").style.visibility = "visible";
                  document.getElementById("win24").style.visibility = "visible";
                  document.getElementById("win25").style.visibility = "visible";
                  document.getElementById("dos").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][1] == 5) {
                document.getElementById("dos").style.visibility = "visible";
                document.getElementById("win21").style.visibility = "visible";
                document.getElementById("win22").style.visibility = "visible";
                document.getElementById("win23").style.visibility = "visible";
                document.getElementById("win24").style.visibility = "visible";
                document.getElementById("win25").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 3/* && linesToWin <= 3*/) {
              if (that.items1[that.result13].id == '1q')
                valMatrix[0][2] += 1;
              if (that.items2[that.result23].id == '1q')
                valMatrix[0][2] += 1;
              if (that.items3[that.result33].id == '1q')
                valMatrix[0][2] += 1;
              if (that.items4[that.result43].id == '1q')
                valMatrix[0][2] += 1;
              if (that.items5[that.result53].id == '1q')
                valMatrix[0][2] += 1;

              if (valMatrix[0][2] == 3) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][2] == 4) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'a')
                valMatrix[1][2] += 1;
              if (that.items2[that.result23].id == 'a')
                valMatrix[1][2] += 1;
              if (that.items3[that.result33].id == 'a')
                valMatrix[1][2] += 1;
              if (that.items4[that.result43].id == 'a')
                valMatrix[1][2] += 1;
              if (that.items5[that.result53].id == 'a')
                valMatrix[1][2] += 1;


              if (valMatrix[1][2] == 3) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][2] == 4) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'k')
                valMatrix[2][2] += 1;
              if (that.items2[that.result23].id == 'k')
                valMatrix[2][2] += 1;
              if (that.items3[that.result33].id == 'k')
                valMatrix[2][2] += 1;
              if (that.items4[that.result43].id == 'k')
                valMatrix[2][2] += 1;
              if (that.items5[that.result53].id == 'k')
                valMatrix[2][2] += 1;


              if (valMatrix[2][2] == 3) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][2] == 4) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'q')
                valMatrix[3][2] += 1;
              if (that.items2[that.result23].id == 'q')
                valMatrix[3][2] += 1;
              if (that.items3[that.result33].id == 'q')
                valMatrix[3][2] += 1;
              if (that.items4[that.result43].id == 'q')
                valMatrix[3][2] += 1;
              if (that.items5[that.result53].id == 'q')
                valMatrix[3][2] += 1;

              if (valMatrix[3][2] == 3) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][2] == 4) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'j')
                valMatrix[4][2] += 1;
              if (that.items2[that.result23].id == 'j')
                valMatrix[4][2] += 1;
              if (that.items3[that.result33].id == 'j')
                valMatrix[4][2] += 1;
              if (that.items4[that.result43].id == 'j')
                valMatrix[4][2] += 1;
              if (that.items5[that.result53].id == 'j')
                valMatrix[4][2] += 1;

              if (valMatrix[4][2] == 3) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][2] == 4) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'book')
                valMatrix[5][2] += 1;
              if (that.items2[that.result23].id == 'book')
                valMatrix[5][2] += 1;
              if (that.items3[that.result33].id == 'book')
                valMatrix[5][2] += 1;
              if (that.items4[that.result43].id == 'book')
                valMatrix[5][2] += 1;
              if (that.items5[that.result53].id == 'book')
                valMatrix[5][2] += 1;

              if (valMatrix[5][2] == 3) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][2] == 4) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result13].id == 'raa')
                valMatrix[6][2] += 1;
              if (that.items2[that.result23].id == 'raa')
                valMatrix[6][2] += 1;
              if (that.items3[that.result33].id == 'raa')
                valMatrix[6][2] += 1;
              if (that.items4[that.result43].id == 'raa')
                valMatrix[6][2] += 1;
              if (that.items5[that.result53].id == 'raa')
                valMatrix[6][2] += 1;

              if (valMatrix[6][2] == 2) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][2] == 3) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][2] == 4) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'esc')
                valMatrix[7][2] += 1;
              if (that.items2[that.result23].id == 'esc')
                valMatrix[7][2] += 1;
              if (that.items3[that.result33].id == 'esc')
                valMatrix[7][2] += 1;
              if (that.items4[that.result43].id == 'esc')
                valMatrix[7][2] += 1;
              if (that.items5[that.result53].id == 'esc')
                valMatrix[7][2] += 1;

              if (valMatrix[7][2] == 2) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][2] == 3) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][2] == 4) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'far')
                valMatrix[8][2] += 1;
              if (that.items2[that.result23].id == 'far')
                valMatrix[8][2] += 1;
              if (that.items3[that.result33].id == 'far')
                valMatrix[8][2] += 1;
              if (that.items4[that.result43].id == 'far')
                valMatrix[8][2] += 1;
              if (that.items5[that.result53].id == 'far')
                valMatrix[8][2] += 1;

              if (valMatrix[8][2] == 2) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][2] == 3) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][2] == 4) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'indi')
                valMatrix[9][2] += 1;
              if (that.items2[that.result23].id == 'indi')
                valMatrix[9][2] += 1;
              if (that.items3[that.result33].id == 'indi')
                valMatrix[9][2] += 1;
              if (that.items4[that.result43].id == 'indi')
                valMatrix[9][2] += 1;
              if (that.items5[that.result53].id == 'indi')
                valMatrix[9][2] += 1;

              if (valMatrix[9][2] == 2) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][2] == 3) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][2] == 4) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi') {
                  document.getElementById("win31").style.visibility = "visible";
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win32").style.visibility = "visible";
                  document.getElementById("win33").style.visibility = "visible";
                  document.getElementById("win34").style.visibility = "visible";
                  document.getElementById("win35").style.visibility = "visible";
                  document.getElementById("tres").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][2] == 5) {
                document.getElementById("tres").style.visibility = "visible";
                document.getElementById("win31").style.visibility = "visible";
                document.getElementById("win32").style.visibility = "visible";
                document.getElementById("win33").style.visibility = "visible";
                document.getElementById("win34").style.visibility = "visible";
                document.getElementById("win35").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 4/* && linesToWin <= 3*/) {
              if (that.items1[that.result10].id == '1q')
                valMatrix[0][3] += 1;
              if (that.items2[that.result2].id == '1q')
                valMatrix[0][3] += 1;
              if (that.items3[that.result33].id == '1q')
                valMatrix[0][3] += 1;
              if (that.items4[that.result4].id == '1q')
                valMatrix[0][3] += 1;
              if (that.items5[that.result50].id == '1q')
                valMatrix[0][3] += 1;

              if (valMatrix[0][3] == 3) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result33].id == '1q') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][3] == 4) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result4].id == '1q') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'a')
                valMatrix[1][3] += 1;
              if (that.items2[that.result2].id == 'a')
                valMatrix[1][3] += 1;
              if (that.items3[that.result33].id == 'a')
                valMatrix[1][3] += 1;
              if (that.items4[that.result4].id == 'a')
                valMatrix[1][3] += 1;
              if (that.items5[that.result50].id == 'a')
                valMatrix[1][3] += 1;


              if (valMatrix[1][3] == 3) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result33].id == 'a') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][3] == 4) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result4].id == 'a') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'k')
                valMatrix[2][3] += 1;
              if (that.items2[that.result2].id == 'k')
                valMatrix[2][3] += 1;
              if (that.items3[that.result33].id == 'k')
                valMatrix[2][3] += 1;
              if (that.items4[that.result4].id == 'k')
                valMatrix[2][3] += 1;
              if (that.items5[that.result50].id == 'k')
                valMatrix[2][3] += 1;


              if (valMatrix[2][3] == 3) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result33].id == 'k') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][3] == 4) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result4].id == 'k') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'q')
                valMatrix[3][3] += 1;
              if (that.items2[that.result2].id == 'q')
                valMatrix[3][3] += 1;
              if (that.items3[that.result33].id == 'q')
                valMatrix[3][3] += 1;
              if (that.items4[that.result4].id == 'q')
                valMatrix[3][3] += 1;
              if (that.items5[that.result50].id == 'q')
                valMatrix[3][3] += 1;

              if (valMatrix[3][3] == 3) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result33].id == 'q') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][3] == 4) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result4].id == 'q') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'j')
                valMatrix[4][3] += 1;
              if (that.items2[that.result2].id == 'j')
                valMatrix[4][3] += 1;
              if (that.items3[that.result33].id == 'j')
                valMatrix[4][3] += 1;
              if (that.items4[that.result4].id == 'j')
                valMatrix[4][3] += 1;
              if (that.items5[that.result50].id == 'j')
                valMatrix[4][3] += 1;

              if (valMatrix[4][3] == 3) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result33].id == 'j') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][3] == 4) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result4].id == 'j') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'book')
                valMatrix[5][3] += 1;
              if (that.items2[that.result2].id == 'book')
                valMatrix[5][3] += 1;
              if (that.items3[that.result33].id == 'book')
                valMatrix[5][3] += 1;
              if (that.items4[that.result4].id == 'book')
                valMatrix[5][3] += 1;
              if (that.items5[that.result50].id == 'book')
                valMatrix[5][3] += 1;

              if (valMatrix[5][3] == 3) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result33].id == 'book') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][3] == 4) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result4].id == 'book') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result10].id == 'raa')
                valMatrix[6][3] += 1;
              if (that.items2[that.result2].id == 'raa')
                valMatrix[6][3] += 1;
              if (that.items3[that.result33].id == 'raa')
                valMatrix[6][3] += 1;
              if (that.items4[that.result4].id == 'raa')
                valMatrix[6][3] += 1;
              if (that.items5[that.result50].id == 'raa')
                valMatrix[6][3] += 1;

              if (valMatrix[6][3] == 2) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result2].id == 'raa') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][3] == 3) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result33].id == 'raa') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][3] == 4) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result4].id == 'raa') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'esc')
                valMatrix[7][3] += 1;
              if (that.items2[that.result2].id == 'esc')
                valMatrix[7][3] += 1;
              if (that.items3[that.result33].id == 'esc')
                valMatrix[7][3] += 1;
              if (that.items4[that.result4].id == 'esc')
                valMatrix[7][3] += 1;
              if (that.items5[that.result50].id == 'esc')
                valMatrix[7][3] += 1;

              if (valMatrix[7][3] == 2) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result2].id == 'esc') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][3] == 3) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result33].id == 'esc') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][3] == 4) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result4].id == 'esc') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'far')
                valMatrix[8][3] += 1;
              if (that.items2[that.result2].id == 'far')
                valMatrix[8][3] += 1;
              if (that.items3[that.result33].id == 'far')
                valMatrix[8][3] += 1;
              if (that.items4[that.result4].id == 'far')
                valMatrix[8][3] += 1;
              if (that.items5[that.result50].id == 'far')
                valMatrix[8][3] += 1;

              if (valMatrix[8][3] == 2) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result2].id == 'far') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][3] == 3) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result33].id == 'far') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][3] == 4) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result4].id == 'far') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'indi')
                valMatrix[9][3] += 1;
              if (that.items2[that.result2].id == 'indi')
                valMatrix[9][3] += 1;
              if (that.items3[that.result33].id == 'indi')
                valMatrix[9][3] += 1;
              if (that.items4[that.result4].id == 'indi')
                valMatrix[9][3] += 1;
              if (that.items5[that.result50].id == 'indi')
                valMatrix[9][3] += 1;

              if (valMatrix[9][3] == 2) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result2].id == 'indi') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][3] == 3) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result33].id == 'indi') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][3] == 4) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result4].id == 'indi') {
                  document.getElementById("win41").style.visibility = "visible";
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win42").style.visibility = "visible";
                  document.getElementById("win43").style.visibility = "visible";
                  document.getElementById("win44").style.visibility = "visible";
                  document.getElementById("win45").style.visibility = "visible";
                  document.getElementById("cuatro").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][3] == 5) {
                document.getElementById("cuatro").style.visibility = "visible";
                document.getElementById("win41").style.visibility = "visible";
                document.getElementById("win42").style.visibility = "visible";
                document.getElementById("win43").style.visibility = "visible";
                document.getElementById("win44").style.visibility = "visible";
                document.getElementById("win45").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 5/* && linesToWin <= 3*/) {
              if (that.items1[that.result13].id == '1q')
                valMatrix[0][4] += 1;
              if (that.items2[that.result2].id == '1q')
                valMatrix[0][4] += 1;
              if (that.items3[that.result30].id == '1q')
                valMatrix[0][4] += 1;
              if (that.items4[that.result4].id == '1q')
                valMatrix[0][4] += 1;
              if (that.items5[that.result53].id == '1q')
                valMatrix[0][4] += 1;

              if (valMatrix[0][4] == 3) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result30].id == '1q') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][4] == 4) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result4].id == '1q') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'a')
                valMatrix[1][4] += 1;
              if (that.items2[that.result2].id == 'a')
                valMatrix[1][4] += 1;
              if (that.items3[that.result30].id == 'a')
                valMatrix[1][4] += 1;
              if (that.items4[that.result4].id == 'a')
                valMatrix[1][4] += 1;
              if (that.items5[that.result53].id == 'a')
                valMatrix[1][4] += 1;


              if (valMatrix[1][4] == 3) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result30].id == 'a') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][4] == 4) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result4].id == 'a') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'k')
                valMatrix[2][4] += 1;
              if (that.items2[that.result2].id == 'k')
                valMatrix[2][4] += 1;
              if (that.items3[that.result30].id == 'k')
                valMatrix[2][4] += 1;
              if (that.items4[that.result4].id == 'k')
                valMatrix[2][4] += 1;
              if (that.items5[that.result53].id == 'k')
                valMatrix[2][4] += 1;


              if (valMatrix[2][4] == 3) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result30].id == 'k') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][4] == 4) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result4].id == 'k') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'q')
                valMatrix[3][4] += 1;
              if (that.items2[that.result2].id == 'q')
                valMatrix[3][4] += 1;
              if (that.items3[that.result30].id == 'q')
                valMatrix[3][4] += 1;
              if (that.items4[that.result4].id == 'q')
                valMatrix[3][4] += 1;
              if (that.items5[that.result53].id == 'q')
                valMatrix[3][4] += 1;

              if (valMatrix[3][4] == 3) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result30].id == 'q') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][4] == 4) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result4].id == 'q') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'j')
                valMatrix[4][4] += 1;
              if (that.items2[that.result2].id == 'j')
                valMatrix[4][4] += 1;
              if (that.items3[that.result30].id == 'j')
                valMatrix[4][4] += 1;
              if (that.items4[that.result4].id == 'j')
                valMatrix[4][4] += 1;
              if (that.items5[that.result53].id == 'j')
                valMatrix[4][4] += 1;

              if (valMatrix[4][4] == 3) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result30].id == 'j') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][4] == 4) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result4].id == 'j') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'book')
                valMatrix[5][4] += 1;
              if (that.items2[that.result2].id == 'book')
                valMatrix[5][4] += 1;
              if (that.items3[that.result30].id == 'book')
                valMatrix[5][4] += 1;
              if (that.items4[that.result4].id == 'book')
                valMatrix[5][4] += 1;
              if (that.items5[that.result53].id == 'book')
                valMatrix[5][4] += 1;

              if (valMatrix[5][4] == 3) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result30].id == 'book') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][4] == 4) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result4].id == 'book') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result13].id == 'raa')
                valMatrix[6][4] += 1;
              if (that.items2[that.result2].id == 'raa')
                valMatrix[6][4] += 1;
              if (that.items3[that.result30].id == 'raa')
                valMatrix[6][4] += 1;
              if (that.items4[that.result4].id == 'raa')
                valMatrix[6][4] += 1;
              if (that.items5[that.result53].id == 'raa')
                valMatrix[6][4] += 1;

              if (valMatrix[6][4] == 2) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][4] == 3) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result30].id == 'raa') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][4] == 4) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result4].id == 'raa') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'esc')
                valMatrix[7][4] += 1;
              if (that.items2[that.result2].id == 'esc')
                valMatrix[7][4] += 1;
              if (that.items3[that.result30].id == 'esc')
                valMatrix[7][4] += 1;
              if (that.items4[that.result4].id == 'esc')
                valMatrix[7][4] += 1;
              if (that.items5[that.result53].id == 'esc')
                valMatrix[7][4] += 1;

              if (valMatrix[7][4] == 2) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][4] == 3) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result30].id == 'esc') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][4] == 4) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result4].id == 'esc') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'far')
                valMatrix[8][4] += 1;
              if (that.items2[that.result2].id == 'far')
                valMatrix[8][4] += 1;
              if (that.items3[that.result30].id == 'far')
                valMatrix[8][4] += 1;
              if (that.items4[that.result4].id == 'far')
                valMatrix[8][4] += 1;
              if (that.items5[that.result53].id == 'far')
                valMatrix[8][4] += 1;

              if (valMatrix[8][4] == 2) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][4] == 3) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result30].id == 'far') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][4] == 4) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result4].id == 'far') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'indi')
                valMatrix[9][4] += 1;
              if (that.items2[that.result2].id == 'indi')
                valMatrix[9][4] += 1;
              if (that.items3[that.result30].id == 'indi')
                valMatrix[9][4] += 1;
              if (that.items4[that.result4].id == 'indi')
                valMatrix[9][4] += 1;
              if (that.items5[that.result53].id == 'indi')
                valMatrix[9][4] += 1;

              if (valMatrix[9][4] == 2) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][4] == 3) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result30].id == 'indi') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][4] == 4) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result4].id == 'indi') {
                  document.getElementById("win51").style.visibility = "visible";
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win52").style.visibility = "visible";
                  document.getElementById("win53").style.visibility = "visible";
                  document.getElementById("win54").style.visibility = "visible";
                  document.getElementById("win55").style.visibility = "visible";
                  document.getElementById("cinco").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][4] == 5) {
                document.getElementById("cinco").style.visibility = "visible";
                document.getElementById("win51").style.visibility = "visible";
                document.getElementById("win52").style.visibility = "visible";
                document.getElementById("win53").style.visibility = "visible";
                document.getElementById("win54").style.visibility = "visible";
                document.getElementById("win55").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 6/* && linesToWin <= 3*/) {
              if (that.items1[that.result1].id == '1q')
                valMatrix[0][5] += 1;
              if (that.items2[that.result23].id == '1q')
                valMatrix[0][5] += 1;
              if (that.items3[that.result33].id == '1q')
                valMatrix[0][5] += 1;
              if (that.items4[that.result43].id == '1q')
                valMatrix[0][5] += 1;
              if (that.items5[that.result5].id == '1q')
                valMatrix[0][5] += 1;

              if (valMatrix[0][5] == 3) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][5] == 4) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == '1q' && that.items3[that.result33].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'a')
                valMatrix[1][5] += 1;
              if (that.items2[that.result23].id == 'a')
                valMatrix[1][5] += 1;
              if (that.items3[that.result33].id == 'a')
                valMatrix[1][5] += 1;
              if (that.items4[that.result43].id == 'a')
                valMatrix[1][5] += 1;
              if (that.items5[that.result5].id == 'a')
                valMatrix[1][5] += 1;


              if (valMatrix[1][5] == 3) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][5] == 4) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'a' && that.items3[that.result33].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'k')
                valMatrix[2][5] += 1;
              if (that.items2[that.result23].id == 'k')
                valMatrix[2][5] += 1;
              if (that.items3[that.result33].id == 'k')
                valMatrix[2][5] += 1;
              if (that.items4[that.result43].id == 'k')
                valMatrix[2][5] += 1;
              if (that.items5[that.result5].id == 'k')
                valMatrix[2][5] += 1;


              if (valMatrix[2][5] == 3) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][5] == 4) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'k' && that.items3[that.result33].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'q')
                valMatrix[3][5] += 1;
              if (that.items2[that.result23].id == 'q')
                valMatrix[3][5] += 1;
              if (that.items3[that.result33].id == 'q')
                valMatrix[3][5] += 1;
              if (that.items4[that.result43].id == 'q')
                valMatrix[3][5] += 1;
              if (that.items5[that.result5].id == 'q')
                valMatrix[3][5] += 1;

              if (valMatrix[3][5] == 3) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][5] == 4) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'q' && that.items3[that.result33].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'j')
                valMatrix[4][5] += 1;
              if (that.items2[that.result23].id == 'j')
                valMatrix[4][5] += 1;
              if (that.items3[that.result33].id == 'j')
                valMatrix[4][5] += 1;
              if (that.items4[that.result43].id == 'j')
                valMatrix[4][5] += 1;
              if (that.items5[that.result5].id == 'j')
                valMatrix[4][5] += 1;

              if (valMatrix[4][5] == 3) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][5] == 4) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'j' && that.items3[that.result33].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'book')
                valMatrix[5][5] += 1;
              if (that.items2[that.result23].id == 'book')
                valMatrix[5][5] += 1;
              if (that.items3[that.result33].id == 'book')
                valMatrix[5][5] += 1;
              if (that.items4[that.result43].id == 'book')
                valMatrix[5][5] += 1;
              if (that.items5[that.result5].id == 'book')
                valMatrix[5][5] += 1;

              if (valMatrix[5][5] == 3) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][5] == 4) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'book' && that.items3[that.result33].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result1].id == 'raa')
                valMatrix[6][5] += 1;
              if (that.items2[that.result23].id == 'raa')
                valMatrix[6][5] += 1;
              if (that.items3[that.result33].id == 'raa')
                valMatrix[6][5] += 1;
              if (that.items4[that.result43].id == 'raa')
                valMatrix[6][5] += 1;
              if (that.items5[that.result5].id == 'raa')
                valMatrix[6][5] += 1;

              if (valMatrix[6][5] == 2) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result23].id == 'raa') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][5] == 3) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][5] == 4) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'raa' && that.items3[that.result33].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'esc')
                valMatrix[7][5] += 1;
              if (that.items2[that.result23].id == 'esc')
                valMatrix[7][5] += 1;
              if (that.items3[that.result33].id == 'esc')
                valMatrix[7][5] += 1;
              if (that.items4[that.result43].id == 'esc')
                valMatrix[7][5] += 1;
              if (that.items5[that.result5].id == 'esc')
                valMatrix[7][5] += 1;

              if (valMatrix[7][5] == 2) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result23].id == 'esc') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][5] == 3) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][5] == 4) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'esc' && that.items3[that.result33].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'far')
                valMatrix[8][5] += 1;
              if (that.items2[that.result23].id == 'far')
                valMatrix[8][5] += 1;
              if (that.items3[that.result33].id == 'far')
                valMatrix[8][5] += 1;
              if (that.items4[that.result43].id == 'far')
                valMatrix[8][5] += 1;
              if (that.items5[that.result5].id == 'far')
                valMatrix[8][5] += 1;

              if (valMatrix[8][5] == 2) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result23].id == 'far') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][5] == 3) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][5] == 4) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'far' && that.items3[that.result33].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'indi')
                valMatrix[9][5] += 1;
              if (that.items2[that.result23].id == 'indi')
                valMatrix[9][5] += 1;
              if (that.items3[that.result33].id == 'indi')
                valMatrix[9][5] += 1;
              if (that.items4[that.result43].id == 'indi')
                valMatrix[9][5] += 1;
              if (that.items5[that.result5].id == 'indi')
                valMatrix[9][5] += 1;

              if (valMatrix[9][5] == 2) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result23].id == 'indi') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][5] == 3) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][5] == 4) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi') {
                  document.getElementById("win61").style.visibility = "visible";
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'indi' && that.items3[that.result33].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win62").style.visibility = "visible";
                  document.getElementById("win63").style.visibility = "visible";
                  document.getElementById("win64").style.visibility = "visible";
                  document.getElementById("win65").style.visibility = "visible";
                  document.getElementById("seis").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][5] == 5) {
                document.getElementById("seis").style.visibility = "visible";
                document.getElementById("win61").style.visibility = "visible";
                document.getElementById("win62").style.visibility = "visible";
                document.getElementById("win63").style.visibility = "visible";
                document.getElementById("win64").style.visibility = "visible";
                document.getElementById("win65").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 7/* && linesToWin <= 3*/) {
              if (that.items1[that.result1].id == '1q')
                valMatrix[0][6] += 1;
              if (that.items2[that.result20].id == '1q')
                valMatrix[0][6] += 1;
              if (that.items3[that.result30].id == '1q')
                valMatrix[0][6] += 1;
              if (that.items4[that.result40].id == '1q')
                valMatrix[0][6] += 1;
              if (that.items5[that.result5].id == '1q')
                valMatrix[0][6] += 1;

              if (valMatrix[0][6] == 3) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][6] == 4) {
                if (that.items1[that.result1].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == '1q' && that.items3[that.result30].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result5].id == '1q') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'a')
                valMatrix[1][6] += 1;
              if (that.items2[that.result20].id == 'a')
                valMatrix[1][6] += 1;
              if (that.items3[that.result30].id == 'a')
                valMatrix[1][6] += 1;
              if (that.items4[that.result40].id == 'a')
                valMatrix[1][6] += 1;
              if (that.items5[that.result5].id == 'a')
                valMatrix[1][6] += 1;


              if (valMatrix[1][6] == 3) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][6] == 4) {
                if (that.items1[that.result1].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'a' && that.items3[that.result30].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result5].id == 'a') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'k')
                valMatrix[2][6] += 1;
              if (that.items2[that.result20].id == 'k')
                valMatrix[2][6] += 1;
              if (that.items3[that.result30].id == 'k')
                valMatrix[2][6] += 1;
              if (that.items4[that.result40].id == 'k')
                valMatrix[2][6] += 1;
              if (that.items5[that.result5].id == 'k')
                valMatrix[2][6] += 1;


              if (valMatrix[2][6] == 3) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][6] == 4) {
                if (that.items1[that.result1].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'k' && that.items3[that.result30].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result5].id == 'k') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'q')
                valMatrix[3][6] += 1;
              if (that.items2[that.result20].id == 'q')
                valMatrix[3][6] += 1;
              if (that.items3[that.result30].id == 'q')
                valMatrix[3][6] += 1;
              if (that.items4[that.result40].id == 'q')
                valMatrix[3][6] += 1;
              if (that.items5[that.result5].id == 'q')
                valMatrix[3][6] += 1;

              if (valMatrix[3][6] == 3) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][6] == 4) {
                if (that.items1[that.result1].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'q' && that.items3[that.result30].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result5].id == 'q') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'j')
                valMatrix[4][6] += 1;
              if (that.items2[that.result20].id == 'j')
                valMatrix[4][6] += 1;
              if (that.items3[that.result30].id == 'j')
                valMatrix[4][6] += 1;
              if (that.items4[that.result40].id == 'j')
                valMatrix[4][6] += 1;
              if (that.items5[that.result5].id == 'j')
                valMatrix[4][6] += 1;

              if (valMatrix[4][6] == 3) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][6] == 4) {
                if (that.items1[that.result1].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'j' && that.items3[that.result30].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result5].id == 'j') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'book')
                valMatrix[5][6] += 1;
              if (that.items2[that.result20].id == 'book')
                valMatrix[5][6] += 1;
              if (that.items3[that.result30].id == 'book')
                valMatrix[5][6] += 1;
              if (that.items4[that.result40].id == 'book')
                valMatrix[5][6] += 1;
              if (that.items5[that.result5].id == 'book')
                valMatrix[5][6] += 1;

              if (valMatrix[5][6] == 3) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][6] == 4) {
                if (that.items1[that.result1].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'book' && that.items3[that.result30].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result5].id == 'book') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result1].id == 'raa')
                valMatrix[6][6] += 1;
              if (that.items2[that.result20].id == 'raa')
                valMatrix[6][6] += 1;
              if (that.items3[that.result30].id == 'raa')
                valMatrix[6][6] += 1;
              if (that.items4[that.result40].id == 'raa')
                valMatrix[6][6] += 1;
              if (that.items5[that.result5].id == 'raa')
                valMatrix[6][6] += 1;

              if (valMatrix[6][6] == 2) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result20].id == 'raa') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][6] == 3) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][6] == 4) {
                if (that.items1[that.result1].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'raa' && that.items3[that.result30].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result5].id == 'raa') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'esc')
                valMatrix[7][6] += 1;
              if (that.items2[that.result20].id == 'esc')
                valMatrix[7][6] += 1;
              if (that.items3[that.result30].id == 'esc')
                valMatrix[7][6] += 1;
              if (that.items4[that.result40].id == 'esc')
                valMatrix[7][6] += 1;
              if (that.items5[that.result5].id == 'esc')
                valMatrix[7][6] += 1;

              if (valMatrix[7][6] == 2) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result20].id == 'esc') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][6] == 3) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][6] == 4) {
                if (that.items1[that.result1].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'esc' && that.items3[that.result30].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result5].id == 'esc') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'far')
                valMatrix[8][6] += 1;
              if (that.items2[that.result20].id == 'far')
                valMatrix[8][6] += 1;
              if (that.items3[that.result30].id == 'far')
                valMatrix[8][6] += 1;
              if (that.items4[that.result40].id == 'far')
                valMatrix[8][6] += 1;
              if (that.items5[that.result5].id == 'far')
                valMatrix[8][6] += 1;

              if (valMatrix[8][6] == 2) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result20].id == 'far') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][6] == 3) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][6] == 4) {
                if (that.items1[that.result1].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'far' && that.items3[that.result30].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result5].id == 'far') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result1].id == 'indi')
                valMatrix[9][6] += 1;
              if (that.items2[that.result20].id == 'indi')
                valMatrix[9][6] += 1;
              if (that.items3[that.result30].id == 'indi')
                valMatrix[9][6] += 1;
              if (that.items4[that.result40].id == 'indi')
                valMatrix[9][6] += 1;
              if (that.items5[that.result5].id == 'indi')
                valMatrix[9][6] += 1;

              if (valMatrix[9][6] == 2) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result20].id == 'indi') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][6] == 3) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][6] == 4) {
                if (that.items1[that.result1].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi') {
                  document.getElementById("win71").style.visibility = "visible";
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'indi' && that.items3[that.result30].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result5].id == 'indi') {
                  document.getElementById("win72").style.visibility = "visible";
                  document.getElementById("win73").style.visibility = "visible";
                  document.getElementById("win74").style.visibility = "visible";
                  document.getElementById("win75").style.visibility = "visible";
                  document.getElementById("siete").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][6] == 5) {
                document.getElementById("siete").style.visibility = "visible";
                document.getElementById("win71").style.visibility = "visible";
                document.getElementById("win72").style.visibility = "visible";
                document.getElementById("win73").style.visibility = "visible";
                document.getElementById("win74").style.visibility = "visible";
                document.getElementById("win75").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 8/* && linesToWin <= 3*/) {
              if (that.items1[that.result13].id == '1q')
                valMatrix[0][7] += 1;
              if (that.items2[that.result23].id == '1q')
                valMatrix[0][7] += 1;
              if (that.items3[that.result3].id == '1q')
                valMatrix[0][7] += 1;
              if (that.items4[that.result40].id == '1q')
                valMatrix[0][7] += 1;
              if (that.items5[that.result50].id == '1q')
                valMatrix[0][7] += 1;

              if (valMatrix[0][7] == 3) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result3].id == '1q') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][7] == 4) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result23].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result40].id == '1q') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result40].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'a')
                valMatrix[1][7] += 1;
              if (that.items2[that.result23].id == 'a')
                valMatrix[1][7] += 1;
              if (that.items3[that.result3].id == 'a')
                valMatrix[1][7] += 1;
              if (that.items4[that.result40].id == 'a')
                valMatrix[1][7] += 1;
              if (that.items5[that.result50].id == 'a')
                valMatrix[1][7] += 1;


              if (valMatrix[1][7] == 3) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result3].id == 'a') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][7] == 4) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result23].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result40].id == 'a') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result40].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'k')
                valMatrix[2][7] += 1;
              if (that.items2[that.result23].id == 'k')
                valMatrix[2][7] += 1;
              if (that.items3[that.result3].id == 'k')
                valMatrix[2][7] += 1;
              if (that.items4[that.result40].id == 'k')
                valMatrix[2][7] += 1;
              if (that.items5[that.result50].id == 'k')
                valMatrix[2][7] += 1;


              if (valMatrix[2][7] == 3) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result3].id == 'k') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][7] == 4) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result23].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result40].id == 'k') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result40].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'q')
                valMatrix[3][7] += 1;
              if (that.items2[that.result23].id == 'q')
                valMatrix[3][7] += 1;
              if (that.items3[that.result3].id == 'q')
                valMatrix[3][7] += 1;
              if (that.items4[that.result40].id == 'q')
                valMatrix[3][7] += 1;
              if (that.items5[that.result50].id == 'q')
                valMatrix[3][7] += 1;

              if (valMatrix[3][7] == 3) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result3].id == 'q') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][7] == 4) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result23].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result40].id == 'q') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result40].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'j')
                valMatrix[4][7] += 1;
              if (that.items2[that.result23].id == 'j')
                valMatrix[4][7] += 1;
              if (that.items3[that.result3].id == 'j')
                valMatrix[4][7] += 1;
              if (that.items4[that.result40].id == 'j')
                valMatrix[4][7] += 1;
              if (that.items5[that.result50].id == 'j')
                valMatrix[4][7] += 1;

              if (valMatrix[4][7] == 3) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result3].id == 'j') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][7] == 4) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result23].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result40].id == 'j') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result40].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'book')
                valMatrix[5][7] += 1;
              if (that.items2[that.result23].id == 'book')
                valMatrix[5][7] += 1;
              if (that.items3[that.result3].id == 'book')
                valMatrix[5][7] += 1;
              if (that.items4[that.result40].id == 'book')
                valMatrix[5][7] += 1;
              if (that.items5[that.result50].id == 'book')
                valMatrix[5][7] += 1;

              if (valMatrix[5][7] == 3) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result3].id == 'book') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][7] == 4) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result23].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result40].id == 'book') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result40].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result13].id == 'raa')
                valMatrix[6][7] += 1;
              if (that.items2[that.result23].id == 'raa')
                valMatrix[6][7] += 1;
              if (that.items3[that.result3].id == 'raa')
                valMatrix[6][7] += 1;
              if (that.items4[that.result40].id == 'raa')
                valMatrix[6][7] += 1;
              if (that.items5[that.result50].id == 'raa')
                valMatrix[6][7] += 1;

              if (valMatrix[6][7] == 2) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][7] == 3) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result3].id == 'raa') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][7] == 4) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result23].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result40].id == 'raa') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result40].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'esc')
                valMatrix[7][7] += 1;
              if (that.items2[that.result23].id == 'esc')
                valMatrix[7][7] += 1;
              if (that.items3[that.result3].id == 'esc')
                valMatrix[7][7] += 1;
              if (that.items4[that.result40].id == 'esc')
                valMatrix[7][7] += 1;
              if (that.items5[that.result50].id == 'esc')
                valMatrix[7][7] += 1;

              if (valMatrix[7][7] == 2) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][7] == 3) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result3].id == 'esc') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][7] == 4) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result23].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result40].id == 'esc') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result40].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'far')
                valMatrix[8][7] += 1;
              if (that.items2[that.result23].id == 'far')
                valMatrix[8][7] += 1;
              if (that.items3[that.result3].id == 'far')
                valMatrix[8][7] += 1;
              if (that.items4[that.result40].id == 'far')
                valMatrix[8][7] += 1;
              if (that.items5[that.result50].id == 'far')
                valMatrix[8][7] += 1;

              if (valMatrix[8][7] == 2) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][7] == 3) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result3].id == 'far') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][7] == 4) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result23].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result40].id == 'far') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result40].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'indi')
                valMatrix[9][7] += 1;
              if (that.items2[that.result23].id == 'indi')
                valMatrix[9][7] += 1;
              if (that.items3[that.result3].id == 'indi')
                valMatrix[9][7] += 1;
              if (that.items4[that.result40].id == 'indi')
                valMatrix[9][7] += 1;
              if (that.items5[that.result50].id == 'indi')
                valMatrix[9][7] += 1;

              if (valMatrix[9][7] == 2) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][7] == 3) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result3].id == 'indi') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][7] == 4) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result23].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result40].id == 'indi') {
                  document.getElementById("win81").style.visibility = "visible";
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result23].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result40].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win82").style.visibility = "visible";
                  document.getElementById("win83").style.visibility = "visible";
                  document.getElementById("win84").style.visibility = "visible";
                  document.getElementById("win85").style.visibility = "visible";
                  document.getElementById("ocho").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][7] == 5) {
                document.getElementById("ocho").style.visibility = "visible";
                document.getElementById("win81").style.visibility = "visible";
                document.getElementById("win82").style.visibility = "visible";
                document.getElementById("win83").style.visibility = "visible";
                document.getElementById("win84").style.visibility = "visible";
                document.getElementById("win85").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 9/* && linesToWin <= 3*/) {
              if (that.items1[that.result10].id == '1q')
                valMatrix[0][8] += 1;
              if (that.items2[that.result20].id == '1q')
                valMatrix[0][8] += 1;
              if (that.items3[that.result3].id == '1q')
                valMatrix[0][8] += 1;
              if (that.items4[that.result43].id == '1q')
                valMatrix[0][8] += 1;
              if (that.items5[that.result53].id == '1q')
                valMatrix[0][8] += 1;

              if (valMatrix[0][8] == 3) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result3].id == '1q') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][8] == 4) {
                if (that.items1[that.result10].id == '1q' && that.items2[that.result20].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result43].id == '1q') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result43].id == '1q' && that.items5[that.result53].id == '1q') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'a')
                valMatrix[1][8] += 1;
              if (that.items2[that.result20].id == 'a')
                valMatrix[1][8] += 1;
              if (that.items3[that.result3].id == 'a')
                valMatrix[1][8] += 1;
              if (that.items4[that.result43].id == 'a')
                valMatrix[1][8] += 1;
              if (that.items5[that.result53].id == 'a')
                valMatrix[1][8] += 1;


              if (valMatrix[1][8] == 3) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result3].id == 'a') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][8] == 4) {
                if (that.items1[that.result10].id == 'a' && that.items2[that.result20].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result43].id == 'a') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result43].id == 'a' && that.items5[that.result53].id == 'a') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'k')
                valMatrix[2][8] += 1;
              if (that.items2[that.result20].id == 'k')
                valMatrix[2][8] += 1;
              if (that.items3[that.result3].id == 'k')
                valMatrix[2][8] += 1;
              if (that.items4[that.result43].id == 'k')
                valMatrix[2][8] += 1;
              if (that.items5[that.result53].id == 'k')
                valMatrix[2][8] += 1;


              if (valMatrix[2][8] == 3) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result3].id == 'k') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][8] == 4) {
                if (that.items1[that.result10].id == 'k' && that.items2[that.result20].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result43].id == 'k') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result43].id == 'k' && that.items5[that.result53].id == 'k') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'q')
                valMatrix[3][8] += 1;
              if (that.items2[that.result20].id == 'q')
                valMatrix[3][8] += 1;
              if (that.items3[that.result3].id == 'q')
                valMatrix[3][8] += 1;
              if (that.items4[that.result43].id == 'q')
                valMatrix[3][8] += 1;
              if (that.items5[that.result53].id == 'q')
                valMatrix[3][8] += 1;

              if (valMatrix[3][8] == 3) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result3].id == 'q') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][8] == 4) {
                if (that.items1[that.result10].id == 'q' && that.items2[that.result20].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result43].id == 'q') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result43].id == 'q' && that.items5[that.result53].id == 'q') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'j')
                valMatrix[4][8] += 1;
              if (that.items2[that.result20].id == 'j')
                valMatrix[4][8] += 1;
              if (that.items3[that.result3].id == 'j')
                valMatrix[4][8] += 1;
              if (that.items4[that.result43].id == 'j')
                valMatrix[4][8] += 1;
              if (that.items5[that.result53].id == 'j')
                valMatrix[4][8] += 1;

              if (valMatrix[4][8] == 3) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result3].id == 'j') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][8] == 4) {
                if (that.items1[that.result10].id == 'j' && that.items2[that.result20].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result43].id == 'j') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result43].id == 'j' && that.items5[that.result53].id == 'j') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'book')
                valMatrix[5][8] += 1;
              if (that.items2[that.result20].id == 'book')
                valMatrix[5][8] += 1;
              if (that.items3[that.result3].id == 'book')
                valMatrix[5][8] += 1;
              if (that.items4[that.result43].id == 'book')
                valMatrix[5][8] += 1;
              if (that.items5[that.result53].id == 'book')
                valMatrix[5][8] += 1;

              if (valMatrix[5][8] == 3) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result3].id == 'book') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][8] == 4) {
                if (that.items1[that.result10].id == 'book' && that.items2[that.result20].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result43].id == 'book') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result43].id == 'book' && that.items5[that.result53].id == 'book') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result10].id == 'raa')
                valMatrix[6][8] += 1;
              if (that.items2[that.result20].id == 'raa')
                valMatrix[6][8] += 1;
              if (that.items3[that.result3].id == 'raa')
                valMatrix[6][8] += 1;
              if (that.items4[that.result43].id == 'raa')
                valMatrix[6][8] += 1;
              if (that.items5[that.result53].id == 'raa')
                valMatrix[6][8] += 1;

              if (valMatrix[6][8] == 2) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][8] == 3) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result3].id == 'raa') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][8] == 4) {
                if (that.items1[that.result10].id == 'raa' && that.items2[that.result20].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result43].id == 'raa') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result43].id == 'raa' && that.items5[that.result53].id == 'raa') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'esc')
                valMatrix[7][8] += 1;
              if (that.items2[that.result20].id == 'esc')
                valMatrix[7][8] += 1;
              if (that.items3[that.result3].id == 'esc')
                valMatrix[7][8] += 1;
              if (that.items4[that.result43].id == 'esc')
                valMatrix[7][8] += 1;
              if (that.items5[that.result53].id == 'esc')
                valMatrix[7][8] += 1;

              if (valMatrix[7][8] == 2) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][8] == 3) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result3].id == 'esc') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][8] == 4) {
                if (that.items1[that.result10].id == 'esc' && that.items2[that.result20].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result43].id == 'esc') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result43].id == 'esc' && that.items5[that.result53].id == 'esc') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'far')
                valMatrix[8][8] += 1;
              if (that.items2[that.result20].id == 'far')
                valMatrix[8][8] += 1;
              if (that.items3[that.result3].id == 'far')
                valMatrix[8][8] += 1;
              if (that.items4[that.result43].id == 'far')
                valMatrix[8][8] += 1;
              if (that.items5[that.result53].id == 'far')
                valMatrix[8][8] += 1;

              if (valMatrix[8][8] == 2) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][8] == 3) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result3].id == 'far') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][8] == 4) {
                if (that.items1[that.result10].id == 'far' && that.items2[that.result20].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result43].id == 'far') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result43].id == 'far' && that.items5[that.result53].id == 'far') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result10].id == 'indi')
                valMatrix[9][8] += 1;
              if (that.items2[that.result20].id == 'indi')
                valMatrix[9][8] += 1;
              if (that.items3[that.result3].id == 'indi')
                valMatrix[9][8] += 1;
              if (that.items4[that.result43].id == 'indi')
                valMatrix[9][8] += 1;
              if (that.items5[that.result53].id == 'indi')
                valMatrix[9][8] += 1;

              if (valMatrix[9][8] == 2) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][8] == 3) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result3].id == 'indi') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][8] == 4) {
                if (that.items1[that.result10].id == 'indi' && that.items2[that.result20].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result43].id == 'indi') {
                  document.getElementById("win91").style.visibility = "visible";
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result20].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result43].id == 'indi' && that.items5[that.result53].id == 'indi') {
                  document.getElementById("win92").style.visibility = "visible";
                  document.getElementById("win93").style.visibility = "visible";
                  document.getElementById("win94").style.visibility = "visible";
                  document.getElementById("win95").style.visibility = "visible";
                  document.getElementById("nueve").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][8] == 5) {
                document.getElementById("nueve").style.visibility = "visible";
                document.getElementById("win91").style.visibility = "visible";
                document.getElementById("win92").style.visibility = "visible";
                document.getElementById("win93").style.visibility = "visible";
                document.getElementById("win94").style.visibility = "visible";
                document.getElementById("win95").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            } else if (i == 10/* && linesToWin <= 3*/) {
              if (that.items1[that.result13].id == '1q')
                valMatrix[0][9] += 1;
              if (that.items2[that.result2].id == '1q')
                valMatrix[0][9] += 1;
              if (that.items3[that.result3].id == '1q')
                valMatrix[0][9] += 1;
              if (that.items4[that.result4].id == '1q')
                valMatrix[0][9] += 1;
              if (that.items5[that.result50].id == '1q')
                valMatrix[0][9] += 1;

              if (valMatrix[0][9] == 3) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][9] == 4) {
                if (that.items1[that.result13].id == '1q' && that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == '1q' && that.items3[that.result3].id == '1q' && that.items4[that.result4].id == '1q' && that.items5[that.result50].id == '1q') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[0][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'a')
                valMatrix[1][9] += 1;
              if (that.items2[that.result2].id == 'a')
                valMatrix[1][9] += 1;
              if (that.items3[that.result3].id == 'a')
                valMatrix[1][9] += 1;
              if (that.items4[that.result4].id == 'a')
                valMatrix[1][9] += 1;
              if (that.items5[that.result50].id == 'a')
                valMatrix[1][9] += 1;


              if (valMatrix[1][9] == 3) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][9] == 4) {
                if (that.items1[that.result13].id == 'a' && that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'a' && that.items3[that.result3].id == 'a' && that.items4[that.result4].id == 'a' && that.items5[that.result50].id == 'a') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[1][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'k')
                valMatrix[2][9] += 1;
              if (that.items2[that.result2].id == 'k')
                valMatrix[2][9] += 1;
              if (that.items3[that.result3].id == 'k')
                valMatrix[2][9] += 1;
              if (that.items4[that.result4].id == 'k')
                valMatrix[2][9] += 1;
              if (that.items5[that.result50].id == 'k')
                valMatrix[2][9] += 1;


              if (valMatrix[2][9] == 3) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][9] == 4) {
                if (that.items1[that.result13].id == 'k' && that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'k' && that.items3[that.result3].id == 'k' && that.items4[that.result4].id == 'k' && that.items5[that.result50].id == 'k') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#ak4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[2][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#ak5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'q')
                valMatrix[3][9] += 1;
              if (that.items2[that.result2].id == 'q')
                valMatrix[3][9] += 1;
              if (that.items3[that.result3].id == 'q')
                valMatrix[3][9] += 1;
              if (that.items4[that.result4].id == 'q')
                valMatrix[3][9] += 1;
              if (that.items5[that.result50].id == 'q')
                valMatrix[3][9] += 1;

              if (valMatrix[3][9] == 3) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][9] == 4) {
                if (that.items1[that.result13].id == 'q' && that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'q' && that.items3[that.result3].id == 'q' && that.items4[that.result4].id == 'q' && that.items5[that.result50].id == 'q') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[3][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'j')
                valMatrix[4][9] += 1;
              if (that.items2[that.result2].id == 'j')
                valMatrix[4][9] += 1;
              if (that.items3[that.result3].id == 'j')
                valMatrix[4][9] += 1;
              if (that.items4[that.result4].id == 'j')
                valMatrix[4][9] += 1;
              if (that.items5[that.result50].id == 'j')
                valMatrix[4][9] += 1;

              if (valMatrix[4][9] == 3) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][9] == 4) {
                if (that.items1[that.result13].id == 'j' && that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'j' && that.items3[that.result3].id == 'j' && that.items4[that.result4].id == 'j' && that.items5[that.result50].id == 'j') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#1qqj4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[4][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#1qqj5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'book')
                valMatrix[5][9] += 1;
              if (that.items2[that.result2].id == 'book')
                valMatrix[5][9] += 1;
              if (that.items3[that.result3].id == 'book')
                valMatrix[5][9] += 1;
              if (that.items4[that.result4].id == 'book')
                valMatrix[5][9] += 1;
              if (that.items5[that.result50].id == 'book')
                valMatrix[5][9] += 1;

              if (valMatrix[5][9] == 3) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#book3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][9] == 4) {
                if (that.items1[that.result13].id == 'book' && that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'book' && that.items3[that.result3].id == 'book' && that.items4[that.result4].id == 'book' && that.items5[that.result50].id == 'book') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#book4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[5][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#book5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
                document.getElementById("jackpot").style.visibility = "visible";
                $.get("http://casino.local/winJackpot", function (data) {
                  //alert("Guardado exitoso");              
                }).fail(function () {
                  //alert("Error al guardar");
                });
              }

              if (that.items1[that.result13].id == 'raa')
                valMatrix[6][9] += 1;
              if (that.items2[that.result2].id == 'raa')
                valMatrix[6][9] += 1;
              if (that.items3[that.result3].id == 'raa')
                valMatrix[6][9] += 1;
              if (that.items4[that.result4].id == 'raa')
                valMatrix[6][9] += 1;
              if (that.items5[that.result50].id == 'raa')
                valMatrix[6][9] += 1;

              if (valMatrix[6][9] == 2) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][9] == 3) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][9] == 4) {
                if (that.items1[that.result13].id == 'raa' && that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'raa' && that.items3[that.result3].id == 'raa' && that.items4[that.result4].id == 'raa' && that.items5[that.result50].id == 'raa') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#raa4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[6][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#raa5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'esc')
                valMatrix[7][9] += 1;
              if (that.items2[that.result2].id == 'esc')
                valMatrix[7][9] += 1;
              if (that.items3[that.result3].id == 'esc')
                valMatrix[7][9] += 1;
              if (that.items4[that.result4].id == 'esc')
                valMatrix[7][9] += 1;
              if (that.items5[that.result50].id == 'esc')
                valMatrix[7][9] += 1;

              if (valMatrix[7][9] == 2) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][9] == 3) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][9] == 4) {
                if (that.items1[that.result13].id == 'esc' && that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'esc' && that.items3[that.result3].id == 'esc' && that.items4[that.result4].id == 'esc' && that.items5[that.result50].id == 'esc') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#esc4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[7][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#esc5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'far')
                valMatrix[8][9] += 1;
              if (that.items2[that.result2].id == 'far')
                valMatrix[8][9] += 1;
              if (that.items3[that.result3].id == 'far')
                valMatrix[8][9] += 1;
              if (that.items4[that.result4].id == 'far')
                valMatrix[8][9] += 1;
              if (that.items5[that.result50].id == 'far')
                valMatrix[8][9] += 1;

              if (valMatrix[8][9] == 2) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][9] == 3) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][9] == 4) {
                if (that.items1[that.result13].id == 'far' && that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'far' && that.items3[that.result3].id == 'far' && that.items4[that.result4].id == 'far' && that.items5[that.result50].id == 'far') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#far4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[8][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#far5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }

              if (that.items1[that.result13].id == 'indi')
                valMatrix[9][9] += 1;
              if (that.items2[that.result2].id == 'indi')
                valMatrix[9][9] += 1;
              if (that.items3[that.result3].id == 'indi')
                valMatrix[9][9] += 1;
              if (that.items4[that.result4].id == 'indi')
                valMatrix[9][9] += 1;
              if (that.items5[that.result50].id == 'indi')
                valMatrix[9][9] += 1;

              if (valMatrix[9][9] == 2) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi2x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][9] == 3) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi3x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][9] == 4) {
                if (that.items1[that.result13].id == 'indi' && that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi') {
                  document.getElementById("win101").style.visibility = "visible";
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                } else if (that.items2[that.result2].id == 'indi' && that.items3[that.result3].id == 'indi' && that.items4[that.result4].id == 'indi' && that.items5[that.result50].id == 'indi') {
                  document.getElementById("win102").style.visibility = "visible";
                  document.getElementById("win103").style.visibility = "visible";
                  document.getElementById("win104").style.visibility = "visible";
                  document.getElementById("win105").style.visibility = "visible";
                  document.getElementById("diez").style.visibility = "visible";
                  ec += parseInt($('#indi4x').text()) * parseInt($('#bet').text());
                  linesToWin += 1;
                }
              } else if (valMatrix[9][9] == 5) {
                document.getElementById("diez").style.visibility = "visible";
                document.getElementById("win101").style.visibility = "visible";
                document.getElementById("win102").style.visibility = "visible";
                document.getElementById("win103").style.visibility = "visible";
                document.getElementById("win104").style.visibility = "visible";
                document.getElementById("win105").style.visibility = "visible";
                ec += parseInt($('#indi5x').text()) * parseInt($('#bet').text());
                linesToWin += 1;
              }
            }
          }

        
          console.log("Credits:    " + ec);
          $('#messages').text("Usted gano: " + ec + " creditos");

          var books = 0;

          if (that.items1[that.result10].id == 'book' || that.items1[that.result1].id == 'book' || that.items1[that.result13].id == 'book')
            books += 1;
          if (that.items2[that.result20].id == 'book' || that.items2[that.result2].id == 'book' || that.items2[that.result23].id == 'book')
            books += 1;
          if (that.items3[that.result30].id == 'book' || that.items3[that.result3].id == 'book' || that.items3[that.result33].id == 'book')
            books += 1;
          if (that.items4[that.result40].id == 'book' || that.items4[that.result4].id == 'book' || that.items4[that.result43].id == 'book')
            books += 1;
          if (that.items5[that.result50].id == 'book' || that.items5[that.result5].id == 'book' || that.items5[that.result53].id == 'book')
            books += 1;

        

          console.log(free);
          controlImg = 0;

          if ((books >= 4) && !free) {

            freeGames = 0;
            //$('div.win').children().css("visibility","hidden");
            //$('div#lines').children().css("visibility", "hidden");
            console.log("Books: " + books);
            free = true;
            itemRand = Math.floor(Math.random() * 9) + 1;
            console.log(itemRand);
            if (itemRand == 1)
              imageRand = "1q";
            if (itemRand == 2)
              imageRand = "esc";
            if (itemRand == 3)
              imageRand = "far";
            if (itemRand == 4)
              imageRand = "indi";
            if (itemRand == 5)
              imageRand = "j";
            if (itemRand == 6)
              imageRand = "k";
            if (itemRand == 7)
              imageRand = "q";
            if (itemRand == 8)
              imageRand = "raa";
            if (itemRand == 9)
              imageRand = "a";

            console.log(imageRand);
            $('#divBonusImage').css("visibility","visible");
            setTimeout(function () {
              $('#divBonusImage').css("visibility","hidden");
            }, 2000);
            //alert("Tiene 10 juegos gratis y su imagen de bonus es: " + imageRand);
          }

          if (free) {
            console.log(imageRand);
            if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand)
              controlImg += 1;
            if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand)
              controlImg += 1;
            if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand)
              controlImg += 1;
            if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand)
              controlImg += 1;
            if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand)
              controlImg += 1;
            playing = true;
          }

          if (free && controlImg > 3 && freeGames > 0) {
            console.log("AQUI CONI");
            playing = false;
          }
        }

            console.log("FREEGAMES: " + freeGames);

          setTimeout(function () {


            if (free && freeGames != -1)
              freeGames += 1;
            if (freeGames == -1)
              freeGames = 0;
            if (free && controlImg >= 3 && freeGames > 0 && percent) {
              playing = true;
              $('div.win').children().css("visibility", "hidden");
              $('div#lines').children().css("visibility", "hidden");
              $('#sombra').css("visibility", "visible");
              /*noWinImages();
              $('.noWinImg1').css("visibility", "hidden");
              $('#canvas1').css("visibility", "visible");
              $('.noWinImg2').css("visibility", "hidden");
              $('#canvas2').css("visibility", "visible");
              $('.noWinImg3').css("visibility", "hidden");
              $('#canvas3').css("visibility", "visible");
              $('.noWinImg4').css("visibility", "hidden");
              $('#canvas4').css("visibility", "visible");
              $('.noWinImg5').css("visibility", "hidden");
              $('#canvas5').css("visibility", "visible");*/
              switch (itemRand) {
                case 1:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/1q.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }
                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }

                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }
                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 2:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/esc.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#esc3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#esc3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#esc4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#esc4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#esc5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#esc5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }
                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }
                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 3:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/a.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }
                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 4:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/indi.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#indi3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#indi3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#indi4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#indi4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#indi5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#indi5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 5:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/j.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 6:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/k.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 7:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/q.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#1qqj5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 8:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/raa.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#raa3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#raa3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#raa4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#raa4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#raa5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#raa5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
                case 9:
                  console.log(controlImg);
                  if (controlImg >= 3) {
                    if (that.items1[that.result10].id == imageRand || that.items1[that.result1].id == imageRand || that.items1[that.result13].id == imageRand) {
                      document.getElementById("bonus11").style.visibility = "visible";
                      document.getElementById("bonus21").style.visibility = "visible";
                      document.getElementById("bonus31").style.visibility = "visible";
                    }
                    if (that.items2[that.result20].id == imageRand || that.items2[that.result2].id == imageRand || that.items2[that.result23].id == imageRand) {
                      document.getElementById("bonus12").style.visibility = "visible";
                      document.getElementById("bonus22").style.visibility = "visible";
                      document.getElementById("bonus32").style.visibility = "visible";
                    }
                    if (that.items3[that.result30].id == imageRand || that.items3[that.result3].id == imageRand || that.items3[that.result33].id == imageRand) {
                      document.getElementById("bonus13").style.visibility = "visible";
                      document.getElementById("bonus23").style.visibility = "visible";
                      document.getElementById("bonus33").style.visibility = "visible";
                    }
                    if (that.items4[that.result40].id == imageRand || that.items4[that.result4].id == imageRand || that.items4[that.result43].id == imageRand) {
                      document.getElementById("bonus14").style.visibility = "visible";
                      document.getElementById("bonus24").style.visibility = "visible";
                      document.getElementById("bonus34").style.visibility = "visible";
                    }
                    if (that.items5[that.result50].id == imageRand || that.items5[that.result5].id == imageRand || that.items5[that.result53].id == imageRand) {
                      document.getElementById("bonus15").style.visibility = "visible";
                      document.getElementById("bonus25").style.visibility = "visible";
                      document.getElementById("bonus35").style.visibility = "visible";
                    }

                    $('.bonusImg').attr("src", "img/Alcatraz/a.png");
                    $("#lines").children().css("z-index", 9999999);
                    var i = 0;
                    if (controlImg == 3) {
                      ec += (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak3x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 4) {
                      ec += (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak4x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    } else if (controlImg == 5) {
                      ec += (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      var minBonus = (parseInt($('#ak5x').text()) * parseInt($('#bet').text())) * 10;
                      $('#messages').text("Usted gano: " + minBonus + " creditos de bonus");
                    }

                    if (ec != 0) {
                      gamble = 0;
                      playing = true;
                      if (automatico==1) {
                        ec += parseInt($('#credits').text());
                        $('#credits').text(ec);
                      }else{
                        $('#play').text("Colectar");
                      }
                    } else {
                      $('div.button').addClass("button-default");
                      $('div.button').removeClass("button-disable");
                      $('#gambleBtn').toggleClass("button-disable button-default");
                      $('#messages').text("Por favor realice su apuesta");
                      gamble = 2;
                      ec += parseInt($('#credits').text());
                      var monto_max = 0;
                      datos = {
                        user: userID,
                        val: ec
                      };
                      $.get("http://casino.local/save_credits/" + datos.user + "/" + datos.val, function (data) {
                        //alert("Guardado exitoso");
                        monto_max = data.monto_max;


                        if (datos.val > monto_max) {
                          alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar.");
                $.get("http://casino.local/close_credits/" + device +"/", function () {
                            window.history.back();
                          }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                          });
                        }
                        ;

                      }).fail(function () {
                          alert("Disculpe, ocurrio un error de comunicación!"); window.history.back();
                        //alert("Error al guardar");
                      });
                      ec = 0;
                      playing = false;
                    }

                    interval = setInterval(function () {
                      if (i == 1) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("uno").style.visibility = "visible";
                      } else if (i == 2) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("dos").style.visibility = "visible";
                      } else if (i == 3) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("tres").style.visibility = "visible";
                      } else if (i == 4) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cuatro").style.visibility = "visible";
                      } else if (i == 5) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("cinco").style.visibility = "visible";
                      } else if (i == 6) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("seis").style.visibility = "visible";
                      } else if (i == 7) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("siete").style.visibility = "visible";
                      } else if (i == 8) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("ocho").style.visibility = "visible";
                      } else if (i == 9) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("nueve").style.visibility = "visible";
                      } else if (i == 10) {
                        $('div#lines').children().css("visibility", "hidden");
                        document.getElementById("diez").style.visibility = "visible";
                      }
                      i++
                      if (i > 12) {
                        $('div.bonus').children().css("visibility", "hidden");
                        $('div#lines').children().css("visibility", "hidden");
                        clearInterval(interval);
                      }

                    }, 200);
                  }
                  break;
              }

              $('#sombra').css("visibility", "hidden");


              
            }
            if (freeGames == 11) {
              alert("Se terminaron los juegos gratis!");
              freeGames = 0;
              free = false;
            }
              $('#numberGames').text(freeGames);
            console.log("freeGames: " + freeGames);
          }, 1000);

        if (!percent) {
          $('div#lines').children().css("visibility", "hidden");
        };
  if (automatico==1) {

    var creditos = parseInt($('#credits').text());
    var apuesta = parseInt($('#totalBet').text());
    if (creditos < apuesta) {
      $('#messages').text('Necesita tener más creditos para apostar');
      $('#auto').text("Automatico");
      automatico = 0;
      playing=false;
      ec = 0;
    }else {


      
      ec += parseInt($('#credits').text());
      $('#credits').text(ec);
      newCredits=ec;
      $.ajax({
          url: 'http://casino.local/setGame/'+oldCredits+'/'+newCredits+'/',
          dataType:'JSON',
          type: 'GET',
          contentType: 'application/json',
          success:    function(data) {
            //alert(data.user);
          }, error: function(jqXHR){
            alert("Error conectando con el servidor!");
          }
      });
      oldCredits=ec;
      var monto_max=0;
        datos = {
            user :userID,
            val  :ec
        };
        $.get("http://casino.local/save_credits/"+datos.user+"/"+datos.val, function (data){
              //alert("Guardado exitoso");
              monto_max = data.monto_max;
              

              if (datos.val > monto_max) {
                alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar");
                $.get("http://casino.local/close_sesion/" + device +"/", function () {
                    window.history.back();
                }).fail(function () {
                });
              };
              
          }).fail(function() {
              //alert("Error al guardar");
          });
      ec=0;

      var myTimeout = 1000;
      if (free == true && controlImg>=3) {
        myTimeout = 5000;
      }
          
      setTimeout(function(){
        my_media = new Media("/android_asset/www/sounds/reel.mp3", onSuccess, onError);
        my_media.play();

        function onSuccess() {
          console.log("playAudio():Audio Success");
        }
        function onError(error) {
          alert(window.location.pathname);
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        }

        percent = (myPercent >= Math.random()) ? true: false;
        console.log("PERCENT");
        console.log(percent);
        $('.noWinImg1').css("visibility","hidden");
        $('#canvas1').css("visibility","visible");
        $('.noWinImg2').css("visibility","hidden");
        $('#canvas2').css("visibility","visible");
        $('.noWinImg3').css("visibility","hidden");
        $('#canvas3').css("visibility","visible");
        $('.noWinImg4').css("visibility","hidden");
        $('#canvas4').css("visibility","visible");
        $('.noWinImg5').css("visibility","hidden");
        $('#canvas5').css("visibility","visible");

        winnerInterval = Math.floor(Math.random() * 4) + 1;
        if (winnerInterval==4) {
          linesToWin=0;
        }else{
          winnerInterval=4;
        }
        for(i in valMatrix){
          for(j in valMatrix[i]){
            //console.log("1.- MATRIX VALUE IN "+i+" "+j+": "+valMatrix[i][j]);
            valMatrix[i][j] = 0;
            //console.log("2.- MATRIX VALUE IN "+i+" "+j+": "+valMatrix[i][j]);
          }
        }
        $('div.win').children().css("visibility","hidden");
        ec = 0;
        $('div.button').prop('disabled', true);
        $('div.button').removeClass("button-default");
        $('div.button').addClass("button-disable");
        $('div#lines').children().css("visibility", "hidden");
        $('#messages').text('Jugando, Buena Suerte!');
        var creditos = 0;
        if (!free) {
          creditos = $('#credits').text() - $('#totalBet').text();
        }else{
          creditos = $('#credits').text() - 0;
        }
        $('#credits').text(creditos);
        that.restart();
          
      },myTimeout);
    }
  }else {
    if (ec!=0) {
      gamble=0;
      $('#play').text("Colectar");
    }else{
      $('div.button').addClass("button-default");
        $('div.button').removeClass("button-disable");
        $('#gambleBtn').toggleClass("button-disable button-default");
        $('#messages').text("Por favor realice su apuesta");
        gamble = 2;
        ec += parseInt($('#credits').text());
        var monto_max=0;
        datos = {
            user :userID,
            val  :ec
        };
        $.get("http://casino.local/save_credits/"+datos.user+"/"+datos.val, function (data){
              //alert("Guardado exitoso");
              monto_max = data.monto_max;
              

              if (datos.val > monto_max) {
                alert("Usted ha alcanzado el limite de credito por jugada, pase a cobrar");
                $.get("http://casino.local/close_sesion/" + device +"/", function () {
                    window.history.back();
                }).fail(function () {
                });
              };
              
          }).fail(function() {
              //alert("Error al guardar");
          });
        ec = 0;
        playing=false;
    }
  }



  //playing = true; 
  //ec = 0;

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
