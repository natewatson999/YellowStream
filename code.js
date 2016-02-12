var consolidator = function(basis){
	var buffer = "";
	basis.on("data", function(data){
		buffer = buffer + data;
	});
	var self = this;
	this.on = function(condition, callback){
		switch(condition) {
			case "end":
				callback(backback);
				break;
			case "error":
				basis.on("error", function(error){
					callback(error);
				});
				break;
			default:
				break;
		}
	};
	return;
};
var features = {};
features.consolidator = consolidator;
module.exports = exports = features;
