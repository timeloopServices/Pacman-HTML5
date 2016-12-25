var canvasRef;
var ctx;
var gameObj;
var inputManager;
var pacmanEatSound;
function init()
{
	//Get a reference to the canvas
	canvasRef = document.getElementById('gameCanvas');
	//Get a handle to the 2d context of the canvas
	ctx = canvasRef.getContext('2d');
	pacmanEatSound = document.createElement("audio");
	pacmanEatSound.setAttribute("src", "assets/sounds/pacman_move.wav");
	
	inputManager = new Input();
	window.addEventListener('keydown', userInputDown, true);
	window.addEventListener('keyup', userInputUp, true);
		
	//loadImages in assetLoader.js
	//startGameLoop will be called when all the resources are loaded
    loadImages();
}

function startGameLoop()
{
	gameObj = new Game();
	gameObj.init();
}

function userInputDown(e)
{
	//console.log(e.keyCode);
	switch(e.keyCode)
	{
		case 37:
			inputManager.setLeftKey(true);
			break;
		case 38:
			inputManager.setUpKey(true);
			break;
		case 39:
			inputManager.setRightKey(true);
			break;
		case 40:
			inputManager.setDownKey(true);
			break;
	}
}

function userInputUp(e)
{
	//console.log(e.keyCode);
	switch(e.keyCode)
	{
		case 37:
			inputManager.setLeftKey(false);
			break;
		case 38:
			inputManager.setUpKey(false);
			break;
		case 39:
			inputManager.setRightKey(false);
			break;
		case 40:
			inputManager.setDownKey(false);
			break;
	}
}
