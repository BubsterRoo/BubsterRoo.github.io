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

let xPos = 0;
let yPos = 0;
let currentYPos = 0;
let currentXPos = 3;
const backgroundSize = (board.width - 9) / 10;
background.onload = function(){
    drawBackground();
    drawIPiece(currentXPos, currentYPos);
    intervalid = setInterval(moveIPieceDown, 1000);
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
        
    }
    else if(e.key ==='ArrowRight'){
        currentXPos++;
        drawBackground();
        drawIPiece(currentXPos, currentYPos);
    }
    /*
    else if(e.key ==='ArrowUp'){
        currentYPos--;
        drawBackground();
        drawIPiece(currentXPos, currentYPos);
    }
    */
})
function moveIPieceDown(){
    currentYPos++;
    drawBackground();
    drawIPiece(currentXPos, currentYPos);
    if(currentYPos > 20){
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
function drawIPiece(xPosPiece, yPosPiece){
    boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    xPosPiece--;
    xPosPiece--;
    drawIPieceOutline(xPosPiece, 19);
}
function drawIPieceOutline(xPosPiece, yPosPiece){
    boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(iPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    xPosPiece--;
    xPosPiece--;
}
function drawOPiece(xPosPiece, yPosPiece){
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    yPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(oPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    yPosPiece--;
    drawOPieceOutline(xPosPiece, 19);
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
    xPosPiece--;
    yPosPiece++;
}
function drawLPiece(xPosPiece, yPosPiece){
    yPosPiece++;
    boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece--;
    boardctx.drawImage(lPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    xPosPiece--;
    drawLPieceOutline(xPosPiece, 19);
}
function drawLPieceOutline(xPosPiece, yPosPiece){
    boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece--;
    boardctx.drawImage(lPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawJPiece(xPosPiece, yPosPiece){
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
    drawJPieceOutline(xPosPiece, 19);
}
function drawJPieceOutline(xPosPiece, yPosPiece){
    yPosPiece--;
    boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece++;
    boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(jPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawSPiece(xPosPiece, yPosPiece){
    boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece++;
    boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(sPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    xPosPiece--;
    yPosPiece++;
    drawSPieceOutline(xPosPiece, 19);
}
function drawSPieceOutline(xPosPiece, yPosPiece){
    yPosPiece--;
    boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece++;
    boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(sPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawZPiece(xPosPiece, yPosPiece){
    yPosPiece++;
    boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece--;
    boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(zPiece, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece--;
    xPosPiece--;
    drawZPieceOutline(xPosPiece, 19);
}
function drawZPieceOutline(xPosPiece, yPosPiece){
    boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece--;
    boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(zPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}
function drawTPiece(xPosPiece, yPosPiece){
    xPosPiece++;
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
    drawTPieceOutline(xPosPiece, 19);
}
function drawTPieceOutline(xPosPiece, yPosPiece){
    yPosPiece--;
    xPosPiece++;
    boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    yPosPiece++;
    xPosPiece--;
    boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
    xPosPiece++;
    boardctx.drawImage(tPieceOutline, (xPosPiece * backgroundSize) + xPosPiece, (yPosPiece * backgroundSize) + yPosPiece, backgroundSize, backgroundSize)
}