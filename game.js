var canvas;
var canvasContext;
var ballx = 20;
var ballSpeedX = 6; 
var bally = 20;
var ballSpeedY = 6;
var paddle1X = 0;
var paddle1Y = 250;
var paddle2Y = 250;
var Score1 = 0;
var Score2 = 0;
var winScreen = true;
var gameStatus = "'re Welcome";
var canv = document.getElementById("canvas-container");
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 10;


function getMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt){
    if(winScreen){
        openFullscreen();
        winScreen = false;
        Score1 = 0;
        Score2 = 0;
    }
}

function openFullscreen() {
  if (canv.requestFullscreen) {
    canv.requestFullscreen();
  } else if (canv.mozRequestFullScreen) { /* Firefox */
    canv.mozRequestFullScreen();
  } else if (canv.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    canv.webkitRequestFullscreen();
  } else if (canv.msRequestFullscreen) { /* IE/Edge */
    canv.msRequestFullscreen();
  }
}

window.onload = function(){
    console.log("Page loaded!");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    var fps = 60;
    setInterval(function(){
        move();
        draw();
    }, 1000/fps)

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function(evt){
        var mousePos = getMousePos(evt);
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    });
}
function startTheMagic(){
    draw();
    move();
}

function resetBall(){
    if(Score1 >= WINNING_SCORE){
        winScreen = true;
        gameStatus = " Won"
    } 
    if(Score2 >= WINNING_SCORE){
        winScreen = true;
        gameStatus = " Lost"
        //console.log("Somebody won!");
        
    }
    ballSpeedX = -ballSpeedX;
    if(ballSpeedX>0){
        ballSpeedX = 5;
    }
    else{
        ballSpeedX = -5;
    }

    if(ballSpeedY>0){
        ballSpeedY = 5;
    }
    else{
        ballSpeedY = -5;
    }
    ballx = canvas.width/2;
    bally = canvas.height/2;

}

function botMove(){
    if(paddle2Y+PADDLE_HEIGHT/2 < bally){
        paddle2Y+=6;
    }
    else{
        paddle2Y-=6;
    }
}

function move(){
    if(winScreen){
        return;
    }

    botMove();
    ballx+=ballSpeedX;
    bally+=ballSpeedY;
    if(ballx < 0){
        if(bally > paddle1Y && bally < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            var deltaY = bally - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            console.log(ballSpeedY)
        }
        else{
            Score2++;
            resetBall();
            
        }
    }

    if(ballx > canvas.width){
        if(bally > paddle2Y && bally < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
            var deltaY = bally - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            console.log(ballSpeedY)
        }
        else{
            Score1++;
            resetBall();
        }
    }
    if(bally > canvas.height){
        ballSpeedY = -ballSpeedY;
    }
    if( bally < 0){
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet(){
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1, i, 2, 20, 'white');
    }
}

function draw(){
    //Fills screen with black
    colorRect(0,0,canvas.width, canvas.height, 'black');
    
    if(winScreen){
        canvasContext.fillStyle = "white";
        var str = "You"+ gameStatus + ". Click to Continue";
        canvasContext.fillText(str, canvas.width*0.45, canvas.height/2);
        
        
        return;
    }

    drawNet();

    //Draw Paddle1 (Left Paddle)
    colorRect(paddle1X,paddle1Y,PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    //Draw Paddle2 (Right Paddle)
    colorRect(canvas.width-10,paddle2Y,PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    //Draws the Ball
    colorCirc(ballx, bally, 10, 'white');
    
    canvasContext.fillText(Score1, canvas.width/100*25, 100);
    canvasContext.fillText(Score2, canvas.width/100*75, 100);
}

function colorRect(x,y,width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width, height);
}
function colorCirc(x, y, rad, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, rad, 0, Math.PI*2, true);
    canvasContext.fill()
}