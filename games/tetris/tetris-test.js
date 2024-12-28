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

const i = 1;
const l = 2;
const j = 3;
const z = 4;
const s = 5;
const t = 6;
const o = 7;

const pieces = [
    {name: 'iPiece', image: iPiece, outline: iPieceOutline, binary: i},
    {name: 'lPiece', image: lPiece, outline: lPieceOutline, binary: l},
    {name: 'jPiece', image: jPiece, outline: jPieceOutline, binary: j},
    {name: 'zPiece', image: zPiece, outline: zPieceOutline, binary: z},
    {name: 'sPiece', image: sPiece, outline: sPieceOutline, binary: s},
    {name: 'tPiece', image: tPiece, outline: tPieceOutline, binary: t},
    {name: 'oPiece', image: oPiece, outline: oPieceOutline, binary: o}
]

const tetrominoes = {  
    i: [
       [[0, 0, 0, 0], [1, 1, 1, 1]],
       [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
       [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
       [[0, 1], [0, 1], [0, 1], [0, 1]]
    ],
    l: [
       [[0, 0, 2], [2, 2, 2]],
       [[2, 0], [2, 0], [2, 2]],
       [[2, 2, 2], [2, 0, 0]],
       [[2, 2], [0, 2], [0, 2]]
    ],
    j: [
       [[3, 0, 0], [3, 3, 3]],
       [[3, 3], [3, 0], [3, 0]],
       [[3, 3, 3], [0, 0, 3]],
       [[0, 3], [0, 3], [3, 3]]
    ],
    z: [
       [[4, 4, 0], [0, 4, 4]],
       [[0, 4], [4, 4], [4, 0]],
       [[4, 4, 0], [0, 4, 4]],
       [[0, 4], [4, 4], [4, 0]]
    ],
    s: [
       [[0, 5, 5], [5, 5, 0]],
       [[5, 0], [5, 5], [0, 5]],
       [[0, 5, 5], [5, 5, 0]],
       [[5, 0], [5, 5], [0, 5]]
    ],
    t: [
       [[0, 6, 0], [6, 6, 6]],
       [[6, 0], [6, 6], [6, 0]],
       [[6, 6, 6], [0, 6, 0]],
       [[0, 6], [6, 6], [0, 6]]
    ],
    o: [
       [[7, 7], [7, 7]],
       [[7, 7], [7, 7]],
       [[7, 7], [7, 7]],
       [[7, 7], [7, 7]]
    ]
};

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

let boardArray = new Array(20).fill(0).map(() => new Array(10).fill(0));
let x = 3;
let y = 0;
let movement = true;
let currentRotation = 0;
let scoreEarned = 0;
let lineScored = 0;

let scoreEarnedWidth = scorectx.measureText(scoreEarned).width;
let lineScoredWidth = scorectx.measureText(lineScored).width;
scorectx.fillText(scoreEarned, (score.width - scoreEarnedWidth) / 2, 85)
scorectx.fillText(lineScored, (score.width - scoreEarnedWidth) / 2, 225)



function getRandomPiece(){
    const randomIndex = Math.floor(Math.random() * 7);
    return pieces[randomIndex];
}
const cellSize = (board.height - 19) / 20;

function drawBoard(){
    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            if(boardArray[i][j] === 0){
                boardctx.drawImage(background, j * (cellSize + 1), i * (cellSize + 1), cellSize, cellSize);
            }
            else{
                let looking = boardArray[i][j];
                if(looking === 1){
                    boardctx.drawImage(iPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 2){
                    boardctx.drawImage(lPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 3){
                    boardctx.drawImage(jPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 4){
                    boardctx.drawImage(zPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 5){
                    boardctx.drawImage(sPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 6){
                    boardctx.drawImage(tPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
                else if(looking === 7){
                    boardctx.drawImage(oPiece, j * (cellSize + 1), i * (cellSize + 1),  cellSize, cellSize);
                }
            }
        }
    }
}
function drawNext(one, two, three){
    nextPiecectx.drawImage(one.image, cellSize, cellSize, cellSize, cellSize);
    nextPiecectx.drawImage(two.image, cellSize, cellSize * 2, cellSize, cellSize);
    nextPiecectx.drawImage(three.image, cellSize, cellSize * 3, cellSize, cellSize);
}
function findBottom(x, y){
    for(let i = 0; i < tetrominoes[currentTetromino][currentRotation].length; i++){
        for(let j = 0; j < tetrominoes[currentTetromino][currentRotation][i].length; j++){
            if(tetrominoes[currentTetromino][currentRotation][i][j] !== 0){
                if(y + i + 1 >= boardArray.length || boardArray[y + i + 1][x + j] !== 0){
                    return true;
                }
            }
        }
    }
    return false;
}
function findBottomSpace(x, y){
    let count = 0
    while(y + 1 < boardArray.length && boardArray[y + 1][x] === 0){
        y++;
        count++
    }
    return count;
}
function movePieceDown(){
    clearTetromino();
    if(findBottom(x, y) === false){
        y++;
        drawTetromino();
        drawBoard();
    }
    else{
        drawTetromino();
        drawBoard();
        clearInterval(intervalid);
        
        setTimeout(() => {
            movement = false;
            scoreEarned = scoreEarned + checkRow();
            console.log(scoreEarned);
            generateNewPiece();
            intervalid = setInterval(movePieceDown, 1000);
        }, 1000)
    }
}
function generateNewPiece(){
    currentpiece = nextPieceOne.binary;
    currentTetromino = Object.keys(tetrominoes)[currentpiece - 1];
    currentRotation = 0;
    x = 3;
    y = 0;
    nextPieceOne = nextPieceTwo;
    nextPieceTwo = nextPieceThree;
    nextPieceThree = getRandomPiece();
    clearTetromino();
    drawNext(nextPieceOne, nextPieceTwo, nextPieceThree);
    drawTetromino();
    drawBoard();
    movement = true;
}
function drawTetromino(){
    for(let i = 0; i < tetrominoes[currentTetromino][currentRotation].length; i++){
        for(let j = 0; j < tetrominoes[currentTetromino][currentRotation][i].length; j++){
            if(tetrominoes[currentTetromino][currentRotation][i][j] !== 0){
                boardArray[y+i][x+j] = tetrominoes[currentTetromino][currentRotation][i][j];
            }
        }
    }
}
function clearTetromino(){
    for(let i = 0; i < tetrominoes[currentTetromino][currentRotation].length; i++){
        for(let j = 0; j < tetrominoes[currentTetromino][currentRotation][i].length; j++){
            if(tetrominoes[currentTetromino][currentRotation][i][j] !== 0){
                boardArray[y+i][x+j] = 0;
            }
        }
    }
}

function checkRow(){
    combo = 0;
    lineScore = 0;
    for(let i = 19; i >= 0; i--){
        checkSpace = 0;
        for(let j = 0; j < 10; j++){
            if(boardArray[i][j] !== 0){
                checkSpace++;
            }
        }
        if(checkSpace === 10){
            boardArray.splice(i, 1);
            boardArray.unshift(new Array(10).fill(0));
            lineScored++;
            combo++;

            scorectx.clearRect(0, 0, score.width, score.height);

            scorectx.fillText(scoreText, (score.width - scoreTextWidth) / 2, 35);
            scorectx.fillText(linesText, (score.width - lineTextWidth) / 2, 175);

            scoreEarnedWidth = scorectx.measureText(scoreEarned).width;
            lineScoredWidth = scorectx.measureText(lineScored).width;
            scorectx.fillText(scoreEarned, (score.width - scoreEarnedWidth) / 2, 85)
            scorectx.fillText(lineScored, (score.width - lineScoredWidth) / 2, 225)
        }
        if(combo === 4){
            break;
        }
    }
    if(combo === 1){
        lineScore = 100;
    }
    else if(combo === 2){
        lineScore = 300;
    }
    else if(combo === 3){
        lineScore = 500;
    }
    else if(combo === 4){
        lineScore = 800;
    }
    return lineScore;
}
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft'){
        if(movement === true){
            clearTetromino();
            if(x > 0){
                x--;
                drawTetromino();
                drawBoard();
            }
        }
    }
    else if(e.key === 'ArrowRight'){
        if(movement === true){
            clearTetromino();
            if(x < 10 - tetrominoes[currentTetromino][currentRotation][0].length){
                x++;
                drawTetromino();
                drawBoard();
            }
        }
    }
    else if(e.key === 'ArrowUp'){
        clearTetromino();
        currentRotation = (currentRotation + 1) % 4;
        drawTetromino();
        drawBoard();
    }
    
    else if(e.key === 'ArrowDown'){
        clearInterval(intervalid);
        intervalid = setInterval(movePieceDown, 100);
    }
    else if(e.key === " "){
        if(findBottom(x, y) === false){
            clearTetromino();
            y = y + findBottomSpace();
            drawTetromino();
            drawBoard();
            clearInterval(intervalid);
            movement = false;
        }
    }
    else if(e.key === 'p'){
        console.log(boardArray);
    }
})
document.addEventListener('keyup', (e) => {
    if(e.key === 'ArrowDown'){
        clearInterval(intervalid);
        intervalid = setInterval(movePieceDown, 1000);
    }
})
background.onload = function(){
    nextPieceOne = getRandomPiece();
    nextPieceTwo = getRandomPiece();
    nextPieceThree = getRandomPiece();
    currentpiece = nextPieceOne.binary;
    currentTetromino = Object.keys(tetrominoes)[currentpiece - 1];
    drawNext(nextPieceOne, nextPieceTwo, nextPieceThree);
    drawTetromino();
    drawBoard();
    intervalid = setInterval(movePieceDown, 1000);
}