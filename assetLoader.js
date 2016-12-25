var allImages;
var allImagePaths;
var totalImages;
var loadedImageCount;
var pacmanFrames;
var dotFrame;
var wallFrame;

function loadImages()
{
	allImagePaths = new Array();
	allImages = new Array();
	var i = 0;
	//Background
	allImagePaths[i] = IMAGES_PATH + 'game_bg.png';
	allImages[i] = new Image();
	i++;
	
	//Pacman Frames
	pacmanFrames = new Array();
	allImagePaths[i] = IMAGES_PATH + 'pacman_closed_mouth.png';
	allImages[i] = new Image();
	pacmanFrames.push(allImages[i]);
	i++;
	allImagePaths[i] = IMAGES_PATH + 'pacman_open_mouth.png';
	allImages[i] = new Image();
	pacmanFrames.push(allImages[i]);
	i++;	
	
	//Dot
	allImagePaths[i] = IMAGES_PATH + "dot.png";
	allImages[i] = new Image();
	dotFrame = allImages[i];
	i++;
	
	//Enemy
	allImagePaths[i] = IMAGES_PATH + "enemy_normal.png";
	allImages[i] = new Image();
	i++;
	allImagePaths[i] = IMAGES_PATH + "enemy_eatable.png";
	allImages[i] = new Image();
	i++;
	
	//Wall
	allImagePaths[i] = IMAGES_PATH + "wall.png";
	allImages[i] = new Image();
	wallFrame = allImages[i];
	i++;
	
	totalImages = i;
	loadedImageCount = 0;
	for(i = 0; i < totalImages; i++)
	{
		allImages[i].onload = imageLoaded;
		allImages[i].src = allImagePaths[i];
	}
}

function imageLoaded()
{
	loadedImageCount++;
	if(loadedImageCount != totalImages)
		return;
	
	startGameLoop();
}