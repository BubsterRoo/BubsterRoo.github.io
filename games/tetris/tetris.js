const board = document.getElementById('board');
const boardctx = board.getContext('2d');
const nextPiece = document.getElementById('nextPiece');
const nextPiecectx = nextPiece.getContext('2d');
const hold = document.getElementById('hold');
const holdctx = hold.getContext('2d');
const score = document.getElementById('score');
const scorectx = score.getContext('2d');
board.width = board.offsetWidth;
board.height = board.offsetHeight;
nextPiece.width = nextPiece.offsetWidth;
nextPiece.height = nextPiece.offsetHeight;
hold.width = hold.offsetWidth;
hold.height = hold.offsetHeight;
score.width = score.offsetWidth;
score.height = score.offsetHeight;
const iPiece = new Image();
iPiece.src = 'images/I-piece.png';
const lPiece = new Image();
lPiece.src = 'images/L-piece.png';
const jPiece = new Image();
jPiece.src = 'images/J-piece.png';
const zPiece = new Image();
zPiece.src = 'images/Z-piece.png';
const sPiece = new Image();
sPiece.src = 'images/S-piece.png';
const oPiece = new Image();
oPiece.src = 'images/O-piece.png';
const tPiece = new Image();
tPiece.src = 'images/T-piece.png';
const iPieceOutline = new Image();
iPieceOutline.src = 'images/I-piece-outline.png';
const lPieceOutline = new Image();
lPieceOutline.src = 'images/L-piece-outline.png';
const jPieceOutline = new Image();
jPieceOutline.src = 'images/J-piece-outline.png';
const zPieceOutline = new Image();
zPieceOutline.src = 'images/Z-piece-outline.png';
const sPieceOutline = new Image();
sPieceOutline.src = 'images/S-piece-outline.png';
const oPieceOutline = new Image();
oPieceOutline.src = 'images/O-piece-outline.png';
const tPieceOutline = new Image();
tPieceOutline.src = 'images/T-piece-outline.png';
const background = new Image();
background.src = 'images/Background.png';
const nextText = "NEXT";
nextPiecectx.font = '25px Arial';
nextPiecectx.fillStyle = "white";
const nextTextWidth = nextPiecectx.measureText(nextText).width;
nextPiecectx.fillText(nextText, (nextPiece.width - nextTextWidth) / 2, 35);
const holdText = "HOLD";
holdctx.font = '25px Arial';
holdctx.fillStyle = "white";
const holdTextWidth = holdctx.measureText(holdText).width;
holdctx.fillText(holdText, (hold.width - holdTextWidth) / 2, 35);
const scoreText = "SCORE";
scorectx.font = '25px Arial';
scorectx.fillStyle = "white";
const scoreTextWidth = scorectx.measureText(scoreText).width;
scorectx.fillText(scoreText, (score.width - scoreTextWidth) / 2, 35);
const linesText = "LINES";
const lineTextWidth = scorectx.measureText(linesText).width;
scorectx.fillText(linesText, (score.width - lineTextWidth) / 2, 175);

const pieces = [
    {name: 'iPiece', image: iPiece, outline: iPieceOutline, draw: drawIPiece, drawOutline: drawIPieceOutline},
    {name: 'lPiece', image: lPiece, outline: lPieceOutline, draw: drawLPiece, drawOutline: drawLPieceOutline},
    {name: 'jPiece', image: jPiece, outline: jPieceOutline, draw: drawJPiece, drawOutline: drawJPieceOutline},
    {name: 'zPiece', image: zPiece, outline: zPieceOutline, draw: drawZPiece, drawOutline: drawZPieceOutline},
    {name: 'sPiece', image: sPiece, outline: sPieceOutline, draw: drawSPiece, drawOutline: drawSPieceOutline},
    {name: 'tPiece', image: tPiece, outline: tPieceOutline, draw: drawTPiece, drawOutline: drawTPieceOutline},
    {name: 'oPiece', image: oPiece, outline: oPieceOutline, draw: drawOPiece, drawOutline: drawOPieceOutline}
]

let xPos = 0;
let yPos = 0;
let currentYPos = 1;
let currentXPos = 3;
let currentYOutlinePos = 19;
let rotation = 0;
let currentpiece;
const backgroundSize = (board.width - 9) / 10;

function getRandomPiece(){
    const randomIndex = Math.floor(Math.random() * pieces.length);
    currentpiece = pieces[randomIndex];
}
background.onload = function(){
    getRandomPiece();
    drawBackground();
    currentpiece.draw(currentXPos, currentYPos, rotation);
    currentpiece.drawOutline(currentXPos, currentYOutlinePos, rotation);
    //intervalid = setInterval(movePieceDown, 1000);
}
document.addEventListener('keydown', (e) => {
    /*
    if(e.key === 'ArrowDown'){
        currentYPos++;
        drawBackground();
        drawIPiece(currentXPos, currentYPos);
    }
    */
    if(e.key ==='ArrowLeft'){
        if(currentXPos > 0){
            if(currentYPos != currentYOutlinePos){
                currentXPos--;
                drawBackground();
                currentpiece.drawOutline(currentXPos, currentYOutlinePos, rotation);
                currentpiece.draw(currentXPos, currentYPos, rotation);
            }
        }
    }
    else if(e.key ==='ArrowRight'){
        if(currentXPos + 4 < 10){
            if(currentYPos != currentYOutlinePos){
                currentXPos++;
                drawBackground();
                currentpiece.drawOutline(currentXPos, currentYOutlinePos, rotation);
                currentpiece.draw(currentXPos, currentYPos, rotation);
            }
        }
    }
    else if(e.key ==='ArrowUp'){
        if(currentYPos != currentYOutlinePos){
            rotation = (rotation + 1) % 4;
            drawBackground();
            currentpiece.drawOutline(currentXPos, currentYOutlinePos, rotation);
            currentpiece.draw(currentXPos, currentYPos, rotation);
        }
    }
    else if(e.key === ' '){
        let newYPos = currentYOutlinePos;
        drawBackground();
        currentpiece.drawOutline(currentXPos, newYPos, rotation);
        currentpiece.draw(currentXPos, newYPos, rotation);
        clearInterval(intervalid);
    }
})
function movePieceDown(){
    currentYPos++;
    drawBackground();
    currentpiece.drawOutline(currentXPos, currentYOutlinePos, rotation);
    currentpiece.draw(currentXPos, currentYPos, rotation);
    if(currentYPos == currentYOutlinePos){
        clearInterval(intervalid);
    }
}
function drawBackground(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 20; j++){
            boardctx.drawImage(background, xPos + (i * (backgroundSize + 1)), yPos + (j * (backgroundSize + 1)), backgroundSize, backgroundSize);
        }
    }
}
function drawIPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }

    else if(rotation == 1){
        xPosPiece++;
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }

    else if(rotation == 2){
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }

    else if(rotation == 3){
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawIPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0 || rotation == 2){
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }

    else if(rotation == 1){
        xPosPiece++;
        xPosPiece++;
        yPosPiece--;
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        xPosPiece++;
        yPosPiece--;
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawOPiece(xPosPiece, yPosPiece){
    yPosPiece--;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    yPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawOPieceOutline(xPosPiece, yPosPiece){
    boardctx.drawImage(oPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    yPosPiece--;
    boardctx.drawImage(oPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawLPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 1){
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        yPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawLPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 1){
        xPosPiece++;
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawJPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        yPosPiece--;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
        yPosPiece++;
    }
    else if(rotation == 1){
        yPosPiece--;
        xPosPiece++;
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        boardctx.drawImage(jPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawJPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        yPosPiece--;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
        yPosPiece++;
    }
    else if(rotation == 1){
        yPosPiece--;
        yPosPiece--;
        xPosPiece++;
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        yPosPiece--;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawZPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        yPosPiece--;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
        yPosPiece++;
    }
    else if(rotation == 1){
        yPosPiece++;
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
        yPosPiece++;
    }
    else if(rotation == 3){
        yPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawZPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0 || rotation == 2){
        yPosPiece--;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
        yPosPiece++;
    }
    else if(rotation == 1){
        xPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawSPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
    }
    else if(rotation == 1){
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        yPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
    }
    else if(rotation == 3){
        yPosPiece--;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawSPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0 || rotation == 2){
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
    }
    else if(rotation == 1){
        xPosPiece++;
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        yPosPiece--;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawTPiece(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        xPosPiece--;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
    }
    else if(rotation == 1){
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        yPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        xPosPiece--;
        boardctx.drawImage(tPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}
function drawTPieceOutline(xPosPiece, yPosPiece, rotation){
    if(rotation == 0){
        xPosPiece++;
        yPosPiece--;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        xPosPiece--;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        xPosPiece--;
    }
    else if(rotation == 1){
        yPosPiece--;
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 2){
        yPosPiece--;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        xPosPiece--;
        yPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
    else if(rotation == 3){
        yPosPiece--;
        yPosPiece--;
        xPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece++;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
        yPosPiece--;
        xPosPiece--;
        boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    }
}