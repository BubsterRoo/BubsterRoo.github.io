const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const floorImage = new Image();
floorImage.src = 'images/Floor.png';

const birdFrames = [
    new Image(),
    new Image(),
    new Image()
];

birdFrames[0].src = 'images/Bird-Frame-1.png';
birdFrames[1].src = 'images/Bird-Frame-2.png';
birdFrames[2].src = 'images/Bird-Frame-3.png';

const pipeImage = new Image();
pipeImage.src = 'images/Pipe.png';
const background = new Image();
background.src = 'images/Background.png';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const floorHeight = 75;
const yPos = canvas.height - floorHeight;

let xPos = 0;
let frameIndex = 0;
let frameCounter = 0;
const frameDelay = 10;
let score = 0;
let yBird = canvas.height / 2;
const xBird = (canvas.width / 2) - (55.5);
let xPipe = canvas.width;
let yPipe = Math.floor(Math.random() * (canvas.height - 160 - 240 + 1) + 240);
let death = false;
let xPosRect = (canvas.width / 2) - (55);
let yPosRect = (canvas.height / 2) - (20);
const rect = ctx.fillRect(xPosRect, yPosRect, 55, 40);

function drawFloor(){
    const repeatCount = Math.ceil(canvas.width / floorImage.width) + 1;
    for(let i = 0; i < repeatCount; i++){
       ctx.drawImage(floorImage, xPos + (i * floorImage.width), yPos, floorImage.width, floorHeight);
    }
}
function hitbox(){
    hit = false;
    if((xBird + 55 > xPipe && xBird + 55 < xPipe + 85) || (xBird > xPipe && xBird < xPipe + 85)){
        hit = true;
    }
    if((xBird + 55 > xPipe && xBird + 55 < xPipe + 85) && (yBird - 20 > yPipe - 155 && yBird + 20 < yPipe)){
        hit = false;
    }
    if((xBird > xPipe && xBird < xPipe + 85) && (yBird - 20 > yPipe - 155 && yBird + 20 < yPipe)){
        hit = false;
    }
    return hit;
}
function drawScore() {
    ctx.font = '50px flappybirdnum';
    ctx.textAlign = 'center';
    ctx.lineWidth = 3;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(score, canvas.width / 2, 145);

    ctx.strokeStyle = '#000000';
    ctx.strokeText(score, canvas.width / 2, 145);
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height - 75);

    xPipe -= 4;

    drawPipe();

    drawFloor();

    drawScore();

    ctx.drawImage(birdFrames[frameIndex], xBird, yBird - (20), 55, 40);

    frameCounter++;

    if(frameCounter >= frameDelay){
        frameIndex = (frameIndex + 1) % birdFrames.length;
        frameCounter = 0;
    }

    xPos -= 4;
    
    yBird += 4;

    if(xPos < -floorImage.width){
        xPos = 0;
    }

    if(xPipe < -pipeImage.width){
        yPipe = Math.floor(Math.random() * canvas.height);
        xPipe = canvas.width;
    }

    if(xBird + 55 == xPipe + 41){
        score++;
    }
    if(hitbox() === true){
        death = true;
    }
    else if(floorCollision() === true){
        death = true;
    }
    if(death === false){
        requestAnimationFrame(animate);
    }
}
function drawPipe(){
    ctx.drawImage(pipeImage, xPipe, yPipe, 85, 485);
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(pipeImage, xPipe, canvas.height - (yPipe - 155), 85, 485);
    ctx.restore();

    
}
function floorCollision(){
    if(yBird + 17 >= canvas.height - floorHeight + 2){
        return true;
    }
    return false;
}
document.addEventListener('keydown', (e) => {
    if(e.key === ' '){
        if(death === false){
            yBird = yBird - 65;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height - 75);
            drawPipe();
            drawFloor();
            drawScore();
            ctx.drawImage(birdFrames[frameIndex], (canvas.width / 2) - (55), yBird - (20), 55, 40);
        }
    }
    else if(e.key === 'w'){
        requestAnimationFrame(animate);
    }
})
background.onload = function(){
    animate();
}