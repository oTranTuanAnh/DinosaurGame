let board;
let boarWith = 750;
let boardHeight = 250;
let context;
//dino
let dinoWidth = 60;
let dinoHeight = 75;
let dinoX = 50;
let dinoY = boardHeight-dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

//cactus
let cactusArr = [];
let cactus1Width = 25;
let cactus2Width = 50;
let cactus3Width = 75;

let cactusHeight = 75;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;


//animation
let velocityX= -10;
let velocityY = 0;
let gravity = 0.4;

let gameOver =false;
let score = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boarWith;
    context = board.getContext("2d");

    dinoImg = new Image();
    dinoImg.src = "./img/dino.png";
    setInterval(()=>{
        dinoImg.src = "./img/dino-run1.png";
    },100);
    setInterval(()=>{
        dinoImg.src = "./img/dino-run2.png";
    },200)
    dinoImg.onload = function () {
        context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus,1000);
    document.addEventListener("keydown", moveDino);

}
function update() {
    requestAnimationFrame(update)
    if(gameOver){
        return;
    }
    context.clearRect(0,0,boarWith,boardHeight);

    //dino
    velocityY+= gravity;
    dino.y = Math.min (dino.y + velocityY, dinoY);
    context.drawImage(dinoImg,dino.x,dino.y,dino.width,dino.height);

    //cactus
    for (let i = 0; i < cactusArr.length; i++) {
        let cactus = cactusArr[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img,cactus.x, cactus.y, cactus.width, cactus.height);

        if (collision(dino,cactus)){
            gameOver = true;
            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload();
            alert("game over " + "\nYour Point is: "+score+ "\nPress F5 to play again");
        }
    }

    //score
    context.fillStyle = "black";
    context.font = `20px courier`;
    score++;
    context.fillText(score,5,20);

}



function moveDino(e) {
    if (gameOver){
        return;
    }
    if ((e.code === "Space")&& dino.y === dinoY){
        velocityY = -10;
    }

}
function placeCactus() {
    if (gameOver){
        return;
    }
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }
    let placeChange = Math.random();
    if (placeChange> 0.8){
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArr.push(cactus);
    } else  if (placeChange> 0.5){
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArr.push(cactus);
    } else {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArr.push(cactus);
    }

    if (cactusArr.length>5){
        cactusArr.shift();
    }
}

function collision(a,b) {
    return a.x< b.x+b.width &&
        a.x + a.width > b.x &&
        a.y< b.y + b.height &&
        a.y + a.height > b.y;

}