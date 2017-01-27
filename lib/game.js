// var canvas = document.getElementById("myCanvas"),
// ctx, width, height,
//
// score = 0,
// best = 0,
//
// // penguin
// x = 60,
// y = canvas.height/2,
// dx = 0,
// dy = -7,
// penguinRadius = 25,
// swimPressed = false,
//
// currentState,
// states = {
//   splash: 0, game: 1, score: 2
// },
//
// penguin = [],
// walls = [];
//
// function main() {
//   canvas.document.createElement('canvas');
//
//   width = window.innerWidth;
//   height = window.innerHeight;
//
//   if (width >= 500) {
//     width = 320;
//     height = 480;
//     canvas.style.border = '1px solid #000';
//   }
//
//   canvas.width = width;
//   canvas.height = height;
//   ctx = canvas.getContext("2d");
//
//   document.body.appendChild(canvas);
//
//   var img = new Image();
//   img.onload = function() {
//     console.log("loading");
//   };
//   img.src = 'assets/penguin.pg';
// }
//
// function run() {
//
// }
// function update() {
//
// }
//
// function render() {
//
// }
//
// main();

var canvas = document.getElementById('myCanvas'),
penguinCanvas = document.getElementById('penguin'),

ctx = canvas.getContext("2d"),

refreshRate = 20,

penguin = {
  width: 50,
  height: 20,
  topSpeed: 5,
  acceleration: -0.2,
  img: null
},

physics = {
  terminalVelocity: -3.5,
  gravity: -.5,
  friction: .8
},

walls = {
  separation: 30,
  width: 30,
  step: 10,
  startHeight: 60,
  maxHeight: 120,
  heightIncreaseInterval: 5,
  heightIncreaseStep: 10
},

obstacles = {
  separation: 150,
  width: 40,
  height: 80
},

colors = {
  bg : "#0c1ba0",
  fill : "#723c09",
  penguin : "#ffff00"
},

gameData = {
    penguin : {
        x : 20,
        y : 0,
        speed : 0,
        rotation : 0
    },
    walls : {
        counter : 0,
        currentHeight : 0,
        currentStep : 0,
        heightIncreaseInterval : 0,    // fudge
        current : []
    },
    obstacles : {
        counter : 0,
        current : []
    }
},

scores = {
    current : 0,
    top : 0,
    elements : {
        current : null,
        top : null
    },
    halfStep : 0    // fudge
},



canvasInterval = null,
mouseDown = false,
gameRunning = false,
deathText = false,

scoreCont = document.createElement('div');
scoreCont.id = 'scorecontainer';
insertAfter(scoreCont, canvas);


initScoring();
createBG();

// set the intial copter game data
resetGameData();

// create penguin element
createPenguin();

// create initial floor & ceiling
createInitialWalls();

// set a mouse listener to start the game
initKeyListener();



function init() {
    initScoring();
    createBG();

    // set the intial copter game data
    resetGameData();

    // create copter element
    createPenguin();

    // create initial floor & ceiling
    createInitialWalls();

    // set a mouse listener to start the game
    initKeyListener();

}

function createBG() {

    // get the global draw context
    // var draw = ctx;

    // draw the outer rounded rectangle
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    roundedRect(ctx, 0, 0, canvas.width, canvas.height, 10);
    ctx.fillStyle = colors.bg;
    ctx.fill();
}

function resetGameData() {

    // reset current score
    scores.current = scores.elements.current.innerHTML = 0;

    // reset 'y' position of penguin
    gameData.penguin.y = Math.round(canvas.height/2);

    // reset the starting height of the walls
    gameData.walls.currentHeight = walls.startHeight;

    // reset the steps between wall heights
    gameData.walls.currentStep = walls.step;

    // set first obstacle to start straight away
    gameData.obstacles.counter = obstacles.separation - obstacles.width;

    // remove all obstacles
    gameData.obstacles.current.length = 0;

    // remove all walls
    gameData.walls.current.length = 0;

    // reset death text
    if (!!deathText) {
        deathText.style.display = "none";
    }

    // create initial floor and ceiling
    createInitialWalls();
}

function createPenguin() {

    // get the global draw context
    // var draw = ctx;

    // condition : calculate penguin position based on whether the mouse is currently held down
    if(mouseDown === true) {
        gameData.penguin.speed -= penguin.acceleration;
        if (gameData.penguin.speed < -penguin.topSpeed) gameData.penguin.speed = -penguin.topSpeed;
        gameData.penguin.rotation = gameData.penguin.rotation + 0.01;
        if (gameData.penguin.rotation > 0.25) gameData.penguin.rotation = 0.25;

    // mouse button not held down
    } else {
        gameData.penguin.speed = (gameData.penguin.speed + physics.gravity) * physics.friction;
        if(gameData.penguin.speed > physics.terminalVelocity) gameData.penguin.speed = physics.terminalVelocity;
        gameData.penguin.rotation = gameData.penguin.rotation - 0.02;
        if (gameData.penguin.rotation < -0.2) gameData.penguin.rotation = -0.2;
    }

    // set new Y position
    gameData.penguin.y = gameData.penguin.y + gameData.penguin.speed;

    // create and position penguin element
    ctx.save();
    ctx.translate(gameData.penguin.x, gameData.penguin.y);
    ctx.rotate(gameData.penguin.rotation);

    // condition : if an image is specified, use it
    if (penguin.img) {


        // create penguin element
        var penguinImg = new Image();
        penguinImg.src = penguin.img;



        penguinCanvas.width = 100;
        penguinCanvas.height = 100;

        var s_penguin = sprite({
            context: penguinCanvas.getContext("2d"),
            width: 137,
            height: 72,
            image: penguinImg
        });

        // when image has loaded
        penguinImg.onload = function() {
            s_penguin.render();
            penguin.width = s_penguin.width;
            penguin.height = s_penguin.height;
        };

        // penguinImg.onload = function() {
        //     ctx.drawImage(penguinImg, gameData.penguin.x, gameData.penguin.y, penguinImg.width, penguinImg.height);
        //     penguin.width = penguinImg.width;
        //     penguin.height = penguinImg.height;
        // };

    // no image set, use a block
    } else {
        ctx.beginPath();
        roundedRect(ctx, 0, 0, penguin.width, penguin.height, 10);
        ctx.fillStyle = colors.penguin;
        ctx.fill();
    }

    ctx.restore();
}

function sprite(options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;


    that.render = function() {
        // Draw the animation
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           0,
           0,
           that.width,
           that.height);
    };
    return that;

}


function roundedRect(a, x, y, width, height, radius) {
    a.beginPath();
    a.moveTo(x,y+radius);
    a.lineTo(x,y+height-radius);
    a.quadraticCurveTo(x,y+height,x+radius,y+height);
    a.lineTo(x+width-radius,y+height);
    a.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    a.lineTo(x+width,y+radius);
    a.quadraticCurveTo(x+width,y,x+width-radius,y);
    a.lineTo(x+radius,y);
    a.quadraticCurveTo(x,y,x,y+radius);
    //draw.stroke();
}

function initScoring() {

    // create score html elements and add them to the page
    scores.elements.current = createScore('current');
    scores.elements.top = createScore('top');

    // retrieve the current top score from cookie, if cookie script is present
    // if (!!cookie && !!cookie.get) {
    //     var topScore = cookie.get('topScore');
    // }

    // condition : if a current top score exists, set it
    // if (topScore) {
    //     scores.top = scores.elements.top.innerHTML = topScore;
    // }
}

function createScore(scoreType) {

    // create score element
    var scoreContainer = document.createElement("p");
    scoreContainer.id = scoreType+"scorecontainer";
    var scoreContainerText = document.createTextNode(ucFirst(scoreType) + " score: ");
    scoreContainer.appendChild(scoreContainerText);

    // create score container, ready to return
    var score = document.createElement("strong");
    score.id = scoreType+"score";

    // set the current score to 0
    var scoreText = document.createTextNode("0");
    score.appendChild(scoreText);
    scoreContainer.appendChild(score);

    // add the scores to the page
    scoreCont.appendChild(scoreContainer);
    // insertAfter(scoreContainer, canvas);

    return score;
}

function initKeyListener(){

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    document.addEventListener("mousedown", keyDownHandler, false);
    document.addEventListener("mouseup", keyUpHandler, false);

    function keyDownHandler(e) {
        if(e.keyCode == 32 || e.type === "mousedown") {
            mouseDown = true;
            if (gameRunning === false) {
                startGame();
            }

        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 32 || e.type === "mouseup") {
            mouseDown = false;
        }
    }

}

function startGame() {

    // reset game data
    resetGameData();

    // set running variable
    gameRunning = true;

    // set interval to start the game
    // canvasInterval = setInterval('draw()', refreshRate);
    draw();
}

function draw() {

    // check for impact
    var impact = checkForImpact();

    // condition : check for an impact
    if (impact === false) {

        // update graphics
        createBG();
        createPenguin();
        createWalls();
        createObstacles();

        // update score
        updateScore();
        requestAnimationFrame(draw);

    // condition : an impact has occurred, end the game
    } else {
        endGame();
    }
}

function checkForImpact() {

    // condition : OBSTACLES - only want to check for impacts on the latest, if it's in range
    if (gameData.obstacles.current.length >=1) {

        // loop through the obstacles
        for (var x = gameData.obstacles.current.length-1; x >= 0; x--){

            // only check the current obstacle if it overlaps horizontally with the penguin
            if(
                gameData.obstacles.current[x].x >=gameData.penguin.x &&
                gameData.obstacles.current[x].x <= (gameData.penguin.x+obstacles.width)
            ) {
                // condition : check for impacts on obstacles in range
                if (
                    gameData.penguin.y >= gameData.obstacles.current[x].y &&
                    gameData.penguin.y <= (gameData.obstacles.current[x].y + obstacles.height)
                ) {
                    return true;
                }
            }
        }
    }


    // loop through walls that we need to do detection
    for (var i = 0; i < gameData.walls.current.length; i++){

        if (gameData.walls.current[i].x < walls.width + penguin.width) {

            // condition : check for impacts on the walls that are in range
            if (
                (
                    gameData.walls.current[0].width == (canvas.width + walls.width) || // first wall
                    gameData.walls.current[i].x >=0 // all other walls
                ) && (
                    gameData.penguin.y < gameData.walls.current[i].height || //top
                    gameData.penguin.y > (canvas.height - penguin.height - (gameData.walls.current[i].y-gameData.walls.current[i].height)) // bottom
                )
            ) {
                return true;
            }
        }
    }

    // condition : final impact check - if somehow the penguin has gone off screen, above or below
    if (gameData.penguin.y < 0 || gameData.penguin.y > (canvas.height - penguin.height)) {
        return true;
    }

    // no impact detected
    return false;
}

function createInitialWalls() {

    // get the global draw context
    // var ctx = ctx;

    // generate values for the new wall
    var newwall = {
        x: 0,
        y: gameData.walls.currentHeight,
        width : canvas.width + walls.width,
        height : (gameData.walls.currentHeight/2)
    };

    // add wall to the array
    gameData.walls.current.push(newwall);

    // ctx ceiling
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = colors.fill;
    ctx.fillRect(newwall.x, 0, newwall.width, newwall.height);
    ctx.fill();
    ctx.restore();

    // ctx floor
    ctx.beginPath();
    ctx.fillStyle = colors.fill;
    ctx.fillRect(newwall.x, canvas.height-newwall.height, newwall.width, newwall.height);
    ctx.fill();
}

function createWalls() {

    // get the global draw context
    // var draw = ctx;

    // condition : if the separation (between walls) has been reached, create a new wall
    if (gameData.walls.counter++ >= Math.floor(walls.separation/penguin.topSpeed)) {

        // get previous wall height
        var previousHeight = gameData.walls.current[gameData.walls.current.length-1].height;

        // random decision, whether to increase or decrease the height (either 0 or 1)
        var plusMinus = Math.round(Math.random());

        // throw in the occasional bigger jump in wall positioning...
        var bigOne = Math.round(Math.random()*10);

        // set variable that will contain new height
        var newHeight;

        // condition : calculate the new height
        if (bigOne == 10) {
            newHeight = gameData.walls.currentHeight/2;
        } else if (plusMinus == 1) {
            newHeight = previousHeight + Math.floor(Math.random()*gameData.walls.currentStep);
        } else {
            newHeight = previousHeight - Math.floor(Math.random()*gameData.walls.currentStep);
        }

        // condition : stop the height going too...high
        if (newHeight > gameData.walls.currentHeight) {
            newHeight = gameData.walls.currentHeight - gameData.walls.currentStep;
        }

        // condition : stop the height going too...low
        if (newHeight < 0) {
            newHeight = gameData.walls.currentStep;
        }

        // generate values for the new wall
        var newwall = {
            x: canvas.width,
            y: gameData.walls.currentHeight,
            width: walls.width,
            height: newHeight
        };

        // add wall to the array
        gameData.walls.current.push(newwall);

        // reset wall separation counter
        gameData.walls.counter = 0;
    }

    // ctx every wall in the array
    for (var i=0; i < gameData.walls.current.length; i++) {

        // ctx ceiling
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = colors.fill;
        ctx.fillRect(gameData.walls.current[i].x-=penguin.topSpeed, 0, gameData.walls.current[i].width, gameData.walls.current[i].height);
        ctx.fill();
        ctx.restore();

        // ctx floor
        ctx.beginPath();
        ctx.fillStyle = colors.fill;
        ctx.fillRect(gameData.walls.current[i].x, canvas.height-(gameData.walls.current[i].y-gameData.walls.current[i].height), gameData.walls.current[i].width, gameData.walls.current[i].y-gameData.walls.current[i].height);
        ctx.fill();

        // condition : if the last wall in the array has disappeared off screen, remove it
        if (gameData.walls.current[i].x <= - (2*gameData.walls.current[i].width)) {
            gameData.walls.current.splice(i, 1);
        }
    }
}

function createObstacles() {

    // get the global draw context
    // var draw = ctx;

    // condition : if the separation (between obstacles) has been reached, create a new obstacle
    if (gameData.obstacles.counter++ >= Math.floor(obstacles.separation/penguin.topSpeed)) {

        // condition : increase the current height of the walls every x number of times
        if (
                gameData.walls.currentHeight <= walls.maxHeight &&
                walls.heightIncreaseInterval > 0 &&
                (gameData.walls.heightIncreaseInterval++ == walls.heightIncreaseInterval)
        ) {

            // increase the potential height of each wall
            gameData.walls.currentHeight += walls.heightIncreaseStep;

            // increase slightly the potential height difference between each wall
            gameData.walls.currentStep++;

            // reset counter
            gameData.walls.heightIncreaseInterval = 0;
        }

        // generate values for the new obstacle
        var newObstacle = {
            x: canvas.width,
            y: Math.floor((Math.random() * (canvas.height - (2* gameData.walls.currentHeight))) + (gameData.walls.currentHeight/2))
        };

        // add obstacle to the array
        gameData.obstacles.current.push(newObstacle);

        // reset obstacle separation counter
        gameData.obstacles.counter = 0;
    }

    // ctx every obstacle in the array
    for (var i=0; i < gameData.obstacles.current.length; i++) {

        ctx.beginPath();
        ctx.fillStyle = colors.fill;
        roundedRect(ctx, gameData.obstacles.current[i].x-=penguin.topSpeed, gameData.obstacles.current[i].y, obstacles.width, obstacles.height, 10);
        ctx.fill();

        // condition : if the last obstacle in the array has disappeared off screen, remove it
        if (gameData.obstacles.current[i].x <= - (canvas.width)) {
            gameData.obstacles.current.splice(i, 1);
        }
    }
}

function updateScore() {
    scores.halfStep = (scores.halfStep == 0) ? 1 : 0;
    if (scores.halfStep == 1) {
        scores.current++;
        scores.elements.current.innerHTML = scores.current;
    }
}

function endGame() {

    // condition : if the current score is higher than the top score, set it
    if (scores.current > scores.top) {

        // set the top score
        scores.top = scores.current;
        scores.elements.top.innerHTML = scores.current;

        // set cookie containing the top score
        // if (cookie && cookie.set) {
        //     cookie.set('topScore', scores.current, 1000, '/');
        // }
    }
    // condition : create death text ?
    var deathPhrases = [
      "GOODBYE SWEET PRINCE!",
      "D3AD",
      "GAME OVER",
      "GIT GUD",
      "ANGRY FEET"
    ];
    deathText = document.createElement("p");
    deathText.id = "deathtext";
    var deathTextText = document.createTextNode(deathPhrases[Math.floor(Math.random()*deathPhrases.length)]);
    deathText.appendChild(deathTextText);
    // insertAfter(deathText, canvas);

    scoreCont.appendChild(deathText);

    // if (!deathText) {
    //     deathText = document.createElement("p");
    //     deathText.id = "deathtext";
    //     var deathTextText = document.createTextNode(deathPhrases[Math.floor(Math.random()*deathPhrases.length)]);
    //     deathText.appendChild(deathTextText);
    //     insertAfter(deathText, canvas);
    // } else {
    //     deathText.style.display = "block";
    // }

    // stop the interval
    clearInterval(canvasInterval);

    // set running variable
    gameRunning = false;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function ucFirst(textString) {
    //return textString.substr(0,1).toUpperCase() + textString.substr(1,textString.length);
    return textString;
}




// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
//
// function keyDownHandler(e) {
//     if(e.keyCode == 32) {
//         swimPressed = true;
//     }
// }
//
// function keyUpHandler(e) {
//     if(e.keyCode == 32) {
//         swimPressed = false;
//     }
// }

// function collisionDetection() {
//     for (let c = 0; c < wallColumnCount; c++) {
//         for (let r = 0; r < wallRowCount; r++) {
//             var b = bricks[c][r];
//             if (x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
//                 dy = -dy;
//                 b.status = 0;
//                 score++;
//             }
//         }
//     }
// }

// draw();
