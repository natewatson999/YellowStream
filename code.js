var events = require("events");
var consolidator = function(basis){
	var buffer = "";
	basis.on("data", function(data){
		buffer = buffer + data;
	});
	this.on = function(condition, callback){
		switch(condition) {
			case "end":
				basis.on("end", function(){
					callback(buffer);
				});
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
var ToFrameStream = function(basis){
	var buffer = "";
	this.frameSize = 64;
	this.emitter = new events.EventEmitter();
	this.on = function(condition, callback) {
		switch(condition) {
			case "data":
				this.emitter.on("data", callback);
				break;
			case "error":
				this.emitter.on("error", callback);
				break;
			case "end":
				this.emitter.on("end", callback);
				break;
			default:
				break;
		}
	};
	basis.on("data", function(data){
		buffer = buffer + data;
		while (buffer.length >= this.frameSize) {
			this.emitter.emit("data", buffer.substring(0, (this.frameSize-1)));
			buffer = buffer.substring((this.frameSize-1), buffer.length);
		}
	});
	basis.on("error", function(error){
		this.emitter.emit("error", error);
	});
	basis.on("end", function(){
		this.emitter.emit("end", buffer);
	});
	return;
};
var features = {};
features.toFrameStream = ToFrameStream;
features.consolidator = consolidator;
module.exports = exports = features;
