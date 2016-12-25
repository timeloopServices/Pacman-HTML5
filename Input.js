function Input()
{
	var upKeyPressed = false;
	var downKeyPressed = false;
	var leftKeyPressed = false;
	var rightKeyPressed = false;
	
	this.isLeftPressed = checkLeft;
	this.isRightPressed = checkRight;
	this.isUpPressed = checkUp;
	this.isDownPressed = checkDown;
	this.setLeftKey = leftSetter;
	this.setRightKey = rightSetter;
	this.setUpKey = upSetter;
	this.setDownKey = downSetter;
	
	function checkLeft()
	{
		return leftKeyPressed;
	}
	
	function checkRight()
	{
		return rightKeyPressed;
	}
	
	function checkUp()
	{
		return upKeyPressed;
	}
	
	function checkDown()
	{
		return downKeyPressed;
	}
	
	function leftSetter(val)
	{
		leftKeyPressed = val;
	}
	
	function rightSetter(val)
	{
		rightKeyPressed = val;
	}
	
	function upSetter(val)
	{
		upKeyPressed = val;
	}
	
	function downSetter(val)
	{
		downKeyPressed = val;
	}
}