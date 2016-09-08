'use strict';

module.exports = LazyImgConfig;

function LazyImgConfig (){
	
	var t = {};
	
	t.options = {
		offset       : 100,
		errorClass   : null,
		successClass : null,
		onError      : function(){},
		onSuccess    : function(){}
	};

	t.$get = getOptions;
	
	t.setOptions = setOptions;
	
	return t;
		
	function setOptions (options) {
		
		angular.extend(t.options, options);
		
	}

	function getOptions () {
		
		var options = t.options;
		
		return {
			getOptions: function() {
				
				return options;
				
			}
		};
	}
}
