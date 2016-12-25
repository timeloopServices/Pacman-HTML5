function Pacman(_fArray, col, row, _w, _h, _dir, _speed, _frameRate)
{
	var frameArray = _fArray;
	
	var width = _w;
	var height = _h;
	var x = (col * CELL_SIZE) + ((CELL_SIZE - width) / 2);
	var y = (row * CELL_SIZE) + ((CELL_SIZE - height) / 2);
	var speed = _speed;
	var dir = _dir;
	var frameRate = _frameRate;
	var currFrame = 0;
	var animTicker = 0;	
	
	this.setX = function(_x) { x = _x; }
	this.setY = function(_y) { y = _y; }
	
	this.getX = function() { return x; }
	this.getY = function() { return y; }
	this.getW = function() { return width; }
	this.getH = function() { return height; }
	this.getDir = function() {return dir; }
	this.getFrame = function() { return frameArray[currFrame]; }
	
	this.getAngle = function ()
	{
		switch(dir)
		{
			case DIR_RIGHT:
				return 0;
				
			case DIR_LEFT:
				return Math.PI;
				
			case DIR_UP:
				return 3 * (Math.PI / 2.0);
				
			case DIR_DOWN:
				return Math.PI / 2.0;
		}
		return 0;
	}
	
	this.getTempPacmanInNewDir = function(newDir, dt)
	{
		//dt is in milliseconds
		//Speed is in px/seconds
		var tx = x;
		var ty = y;
		var distance = speed * (dt / 1000);
		switch(newDir)
		{
			case DIR_RIGHT:
				tx += distance;
				break;
			case DIR_LEFT:
				tx -= distance;
				break;
			case DIR_UP:
				ty -= distance;
				break;
			case DIR_DOWN:
				ty += distance;
				break;
		}
		var tempPacman = new Pacman(frameArray, 0, 0, width, height, newDir, speed, frameRate);
		tempPacman.setX(tx);
		tempPacman.setY(ty);
		return tempPacman;
	}
	
	this.update = function(dt)
	{
		if(dir != DIR_NONE)
		{
			animTicker += dt;
			var singleFrameDur = 1000 / frameRate;
			if(animTicker >= singleFrameDur)
			{
				animTicker -= singleFrameDur;
				currFrame++;
				currFrame %= frameArray.length;
			}
		}
		
		//dt is in milliseconds
		//Speed is in px/seconds
		var distance = speed * (dt / 1000);
		switch(dir)
		{
			case DIR_RIGHT:
				x += distance;
				break;
			case DIR_LEFT:
				x -= distance;
				break;
			case DIR_UP:
				y -= distance;
				break;
			case DIR_DOWN:
				y += distance;
				break;
		}
	}
	
	this.changeDir = function(newDir)
	{
		dir = newDir;
		if(dir == DIR_NONE)
		{
			currFrame = 0;
		}
	}
}