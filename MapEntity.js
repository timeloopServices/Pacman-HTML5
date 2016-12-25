function MapEntity(c, r, _w, _h, enType)
{
	var col = c;
	var row = r;
	var w = _w;
	var h = _h;
	var entityType = enType;
	
	this.getRow = rowGetter;
	this.getCol = colGetter;
	this.getW = function () { return w; }
	this.getH = function () { return h; }
	this.getEntity = entityGetter;
	this.dotEaten = setEaten;
	
	this.getX = function()
	{
		return col * CELL_SIZE + ((CELL_SIZE - w) / 2);
	}
	
	this.getY = function()
	{
		return row * CELL_SIZE + ((CELL_SIZE - h) / 2);
	}
	
	function rowGetter()
	{
		return row;
	}
	
	function colGetter()
	{
		return col;
	}
	
	function entityGetter()
	{
		return entityType;
	}
	
	function isEmpty()
	{
		return entityType == EMPTY_CELL;
	}
	
	function isDot()
	{
		return entityType == DOT;
	}
	
	function isWall()
	{
		return entityType == WALL;
	}
	
	function setEaten()
	{
		return entityType = EMPTY_CELL;
	}
}