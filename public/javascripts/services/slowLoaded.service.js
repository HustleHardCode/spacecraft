/**
 * Created by vaimer on 05.09.16.
 */

module.export = slowLoaded;

function slowLoaded () {
	
	var t = {};
	var slow = 200;
	
	t.initSlow = initSlow;
	
	return t;

	function initSlow ()
	{
		return new Blazy({
			success: replaceClass(element)
		});
	}
	
	function replaceClass (element)
	{
		
		setTimeout(function(){
			element.className = element.className.replace('loaded-background','');
		},slow)
		
	}
}
