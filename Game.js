function Game()
{
	var prevTime;
	
	var pacmanObj;
	var mapElements; //Array of MapEntitites
	var score;
	this.init = initializer;
	var requestAnimationFrame;
	function initializer()
	{
		//initializations
		pacmanObj = new Pacman(pacmanFrames, PACMAN_INIT_C, PACMAN_INIT_R, allImages[1].width, allImages[1].height, INIT_DIRECTION, PACMAN_SPEED, PACMAN_FRAME_RATE);
		
		//Create All the map-Entities
		var c = 0;
		var r = 0;
		var numRows = SCR_H / CELL_SIZE;
		var numCols = SCR_W / CELL_SIZE;
		var enType;
		mapElements = new Array();
		var entity, w, h;
		for(r = 0; r < numRows; r++)
		{
			for(c = 0; c < numCols; c++)
			{
				enType = LEVEL[(r * numCols) + c];
				switch(enType)
				{
					case DOT:
						w = dotFrame.width;
						h = dotFrame.height;
						break;
					case WALL:
						w = wallFrame.width;
						h = wallFrame.height;
						break;
					default:
						w = 0;
						h = 0;
						break;
				}
				entity = new MapEntity(c, r, w, h, enType);
				mapElements.push(entity);
			}
		}
		
		score = 0;
		
		//start Game-Loop
		requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
		prevTime = window.mozAnimationStartTime || Date.now();
		gameLoop();
	}
	
	function gameLoop(timestamp)
	{
		//calculate difference since last repaint
		var currTime = (timestamp || Date.now());
		var dt = currTime - prevTime;
		
		if(dt > 0 && dt < 160)
		{
			update(dt);
			draw();
		}
		
		prevTime = currTime;
		
		//Request next call of gameLoop
		requestAnimationFrame(gameLoop); 
	}
	
	function update(dt)
	{		
		//process events
		var newDir = pacmanObj.getDir();
		if(inputManager.isUpPressed())
		{
			//pacmanObj.changeDir(DIR_UP);
			newDir = DIR_UP;
		}
			
		if(inputManager.isDownPressed())
		{
			//pacmanObj.changeDir(DIR_DOWN);
			newDir = DIR_DOWN;
		}
		
		if(inputManager.isLeftPressed())
		{
			//pacmanObj.changeDir(DIR_LEFT);
			newDir = DIR_LEFT;
		}
		
		if(inputManager.isRightPressed())
		{
			//pacmanObj.changeDir(DIR_RIGHT);
			newDir = DIR_RIGHT;
		}
		
		//Check whether direction can be changed
		var i = 0;
		if(newDir != pacmanObj.getDir())
		{
			var changeDir = true;
			var tempPacmanInNewDir = pacmanObj.getTempPacmanInNewDir(newDir, dt);
			for(i = 0; i < mapElements.length; i++)
			{
				if(checkCollision(tempPacmanInNewDir, mapElements[i]) == true && mapElements[i].getEntity() == WALL)
				{
					changeDir = false;
					break;
				}
			}
			if(changeDir)
				pacmanObj.changeDir(newDir);
		}
		
		pacmanObj.update(dt);
		//pacmanMoveSound.play();
		//Check Bounds
		if(pacmanObj.getX() < 0 || pacmanObj.getX() > SCR_W - pacmanObj.getW())
		{
			pacmanObj.setX(prevX);
			pacmanObj.changeDir(DIR_NONE);
		}
		
		if(pacmanObj.getY() < 0 || pacmanObj.getY() > SCR_H - pacmanObj.getH())
		{
			pacmanObj.setY(prevY);
			pacmanObj.changeDir(DIR_NONE);
		}
		
		//Collision-checking - Dot
		
		for(i = 0; i < mapElements.length; i++)
		{
			if(checkCollision(pacmanObj, mapElements[i]) == false || mapElements[i].getEntity() == EMPTY_CELL)
				continue;
			
			//collision occured with either a DOT or a WALL
			switch(mapElements[i].getEntity())
			{
				case DOT:
					mapElements[i].dotEaten();
					score++;
					pacmanEatSound.play();
					break;
				case WALL:
					switch(pacmanObj.getDir())
					{
							case DIR_RIGHT:
								pacmanObj.setX(mapElements[i].getX() - pacmanObj.getW());
								break;
							case DIR_LEFT:
								pacmanObj.setX(mapElements[i].getX() + mapElements[i].getW());
								break;
							case DIR_UP:
								pacmanObj.setY(mapElements[i].getY() + mapElements[i].getH());
								break;
							case DIR_DOWN:							
								pacmanObj.setY(mapElements[i].getY() - pacmanObj.getH());
								break;
					}
					pacmanObj.changeDir(DIR_NONE);
					break;
			}
		}
		
		//inputManager.setLeftKey(false);
		//inputManager.setUpKey(false);
		//inputManager.setDownKey(false);
		//inputManager.setRightKey(false);
	}
	
	function draw()
	{
		//clear the canvas
		ctx.clearRect(0,0,SCR_W,SCR_H);
		
		//draw Background
		ctx.drawImage(allImages[0], 0, 0);
		
		//drawLevel
		var i=0;
		for(i = 0; i < mapElements.length; i++)
		{
			switch(mapElements[i].getEntity())
			{
				case DOT:
					ctx.drawImage(dotFrame, (mapElements[i].getCol() * CELL_SIZE) + ((CELL_SIZE - dotFrame.width) / 2), 
											(mapElements[i].getRow() * CELL_SIZE) + ((CELL_SIZE - dotFrame.height) / 2));
					break;
				case WALL:
					ctx.drawImage(wallFrame, (mapElements[i].getCol() * CELL_SIZE) + ((CELL_SIZE - wallFrame.width) / 2), 
											(mapElements[i].getRow() * CELL_SIZE) + ((CELL_SIZE - wallFrame.height) / 2));
					break;
			}
		}
		
		//draw pacman
		//rotate context		
		ctx.translate( pacmanObj.getX() + pacmanObj.getW()/2.0, pacmanObj.getY() + pacmanObj.getH()/2.0 );
		ctx.rotate(pacmanObj.getAngle());
		ctx.drawImage(pacmanObj.getFrame(), -pacmanObj.getW() / 2, -pacmanObj.getH() / 2);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		
		//drawEnemy
		
	}
	
	function checkCollision(obj1, obj2)
	{
		var bottom1 = parseFloat(obj1.getY()) + parseFloat(obj1.getH());
		var right1 = parseFloat(obj1.getX()) + parseFloat(obj1.getW());
		var bottom2 = parseFloat(obj2.getY()) + parseFloat(obj2.getH());
		var right2 = parseFloat(obj2.getX()) + parseFloat(obj2.getW());
		
		if (bottom1 <= obj2.getY())
			return false;
		
		if (obj1.getY() >= bottom2)
			return false;
			
		if (right1 <= obj2.getX())
			return false;
		
		if (obj1.getX() >= right2)
			return false;
			
		return true;
	}
}