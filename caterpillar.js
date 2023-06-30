const canvas =document.getElementById("game");
const ctx = canvas.getContext("2d");

class caterpillarPart {
    constructor(x, y) {
        this.x =x;
        this.y = y;
     }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2;

let headX = 10;
let headY = 10;

const caterpillarParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let inputxVelocity = 0;
let inputyVelocity = 0;

let score = 0;

//const gulpSound = new Audio("gulp.mp3");


//game loop
function drawGame(){
    xVelocity = inputxVelocity;
    yVelocity = inputyVelocity;
  
      changeCaterpillarPosition();
      let result = isGameOver();
       if(result){
        return;
    }

    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawCaterpillar();

    drawScore();

   if (score > 5) {
    speed = 9;
   }
   if(score > 10){
    speed =11;
   }
    
   setTimeout(drawGame, 1000 / speed);
}
   function isGameOver(){
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
      }
    //wals
    if(headX < 0){
        gameOver = true;
    } else if(headX === tileCount) {
        gameOver = true
    } else if (headY < 0){
        gameOver = true;
    } else if (headY ===tileCount) {
        gameOver = true;

    }
    for (let i = 0; i < caterpillarParts.length; i++) {
        let part = caterpillarParts[i];
        if (part.x ==headX && part.y === headY) {
            gameOver=true;
            break;
        }
    }

        if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        var gradient = ctx.creatLinearGradient(0, 0, canvas.width,0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        //fill with gradient
        ctx.fillStayle = gradient;
        }

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)


    return gameOver;

   }


function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px  Verdana";
    ctx.fillText("Score:" + score, canvas.width-50, 10);
}
function clearScreen(){
    ctx.fillStyle ="black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
  function drawCaterpillar(){
        ctx.fillStyle = "green";
         for(let i = 0; i < caterpillarParts.length; i++) {
            let part = caterpillarParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize );

         }        

         caterpillarParts.push(new caterpillarPart(headX, headY));//put an item at the end of the list next to the head
         while ( caterpillarParts.length > tailLength) {
            caterpillarParts.shift();//remove the furthers items from the bird parts if have more than our tail size

         }

         ctx.fillStyle = "orange";
         ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);

    }

function changeCaterpillarPosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}
function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}
function checkAppleCollision() {
if(appleX=== headX && appleY == headY){
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
    //gulpSound.play();
    }

}

//function drawCaterpillar(){
   // ctx.fillStyle = 'orange'
    //ctx.fillRect(headx*tileCount, heady*tileCount, tileSize,tileSize)
//}

document.body.addEventListener("keydown", keyDown);

//key "up"
function keyDown(event) {
 if(event.keyCode == 38 || event.keyCode == 87) {
    //87 is W
    if ( inputyVelocity == -1) 
    return;
    //if(yVelocity == 1) {
    //return;
    //}
    inputyVelocity = 1;
    inputxVelocity = 0;


}
//key "down"
if(event.keyCode == 40 || event.keyCode == 83) {

    //83 is s

    if(inputyVelocity == -1) {
     return;
    inputyVelocity = 0;
    inputxVelocity = -1;
}
//key "left"
if(event.keyCode == 37 || event.keyCode == 65) {
    //65 is a
    if (inputxVelocity == 1) 
    return;
    inputyVelocity = 0;
    inputxVelocity = -1;

//if(event.keyCode == 37) {
    //if(xVelocity == 1){
       // return;
    //}
   // yVelocity = 0;
    //xVelocity = -1;
    //if (event.keyCode == 37 || event.keyCode == 65) {
        
        // 65 is a
        //if (inputsXVelocity == 1)
         //return;
       // inputsYVelocity = 0;
       // inputsXVelocity = -1;
     // }
}
//key "right"
if (event.keyCode == 39 || event.keyCode == 68) {
    //68 is d
    if (inputxVelocity == -1)
     return;
    inputxVelocity = 0;
    inputxVelocity = 1;
  }
}
// if(event.keyCode == 39) {
//     if(xVelocity == -1){
//         return
// ;    }
//     yVelocity = 0;
//     xVelocity = 1;
// }
//}
//document.body.addEventListener(' keydown',keyDown);

//requestAnimationFrame
//setInterval x times per a second
//setTimeOutdrawGame();

drawGame();
}