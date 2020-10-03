var ctx = null;
var gGame = null;
var clicked = false;
var start = false;
var over = false;
var images = {};
var touchGround = false;

function appOnLoad()
{

    canvas = document.getElementById("game_canvas");
    canvas.height = window.innerHeight;
    canvas.width = canvas.height/2;

    ctx = canvas.getContext("2d");
    gGame = new Game();
    gGame.init();

    canvas.addEventListener("mousedown", function(){clicked = true;});
    canvas.addEventListener("mouseup", function(){clicked = false;});
    canvas.addEventListener("touchstart", function(){clicked = true;});
    canvas.addEventListener("touchcancel", function(){clicked = false;});




    setInterval(loop, 16);
}

function loop()
{
    gGame.update();
    gGame.render();
}
