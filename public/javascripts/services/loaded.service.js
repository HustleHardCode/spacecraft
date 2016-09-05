/**
 * Created by Ivan on 05.09.2016.
 */

module.exports = Loaded;

function Loaded(){

	var t = {};
	var delayTime = 200;

	t.initSlow = initSlow;

	return t;

	function initSlow() {
		
		return new Blazy({
			success: function () {
				console.log("before timeout");
				setTimeout(function(){
					//element.className = element.className.replace('loaded-background','');
					console.log("In success");
				}, delayTime)
			},
			error: function (ele, msg) {
				console.log("Error = " + msg);
			}
		});
	}
}
