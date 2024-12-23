const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const floorImage = new Image();
floorImage.src = 'images/Floor.png';

const birdFrames = [
    new Image(),
    new Image(),
    new Image()
];

const pipeImage = new Image();
pipeImage.src = 'images/Pipe.png';

birdFrames[0].src = 'images/Bird-Frame-1.png';
birdFrames[1].src = 'images/Bird-Frame-2.png';
birdFrames[2].src = 'images/Bird-Frame-3.png';

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const floorHeight = 75;
const yPos = canvas.height - floorHeight;

let xPos = 0;
let frameIndex = 0;
let frameCounter = 0;
const frameDelay = 10;
let score = 0;

let xPosRect = (canvas.width / 2) - (55);
let yPosRect = (canvas.height / 2) - (20);
const rect = ctx.fillRect(xPosRect, yPosRect, 55, 40);

function drawFloor(){
   const repeatCount = Math.ceil(canvas.width / floorImage.width) + 1;

   for(let i = 0; i < repeatCount; i++){
      ctx.drawImage(floorImage, xPos + (i * floorImage.width), yPos, floorImage.width, floorHeight);
   }
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

// Animate the floor
function animate(){
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bird
    ctx.drawImage(birdFrames[frameIndex], (canvas.width / 2) - (55), (canvas.height / 2) - (20), 55, 40);

    frameCounter++;

    if(frameCounter >= frameDelay){
        frameIndex = (frameIndex + 1) % birdFrames.length;
        frameCounter = 0;
        score++;
    }

    // Floor
    drawFloor();

    // Score
    drawScore();

    xPos -= 4;

    // Check if the floor image has moved off the screen
    if(xPos < -floorImage.width){
        xPos = 0;
    }

    requestAnimationFrame(animate);
}

Promise.all([new Promise(resolve => floorImage.onload = resolve), ...birdFrames.map(frame => new Promise(resolve => frame.onload = resolve))]).then(() => {
   animate();
});






// Pipe gap is 155px