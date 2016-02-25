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
	this.buffer = "";
	this.frameSize = 64;
	this.emitter = new events.EventEmitter();
	var self = this;
	this.on = function(condition, callback) {
		switch(condition) {
			case "data":
				self.emitter.on("data", callback);
				break;
			case "error":
				self.emitter.on("error", callback);
				break;
			case "end":
				self.emitter.on("end", callback);
				break;
			default:
				break;
		}
	};
	basis.on("data", function(data){
		self.buffer = self.buffer + data;
		while (self.buffer.length >= self.frameSize) {
			self.emitter.emit("data", self.buffer.substring(0, (self.frameSize-1)));
			self.buffer = self.buffer.substring((self.frameSize-1), self.buffer.length);
		}
	});
	basis.on("error", function(error){
		self.emitter.emit("error", error);
	});
	basis.on("end", function(){
		self.emitter.emit("end", self.buffer);
	});
	return;
};
var features = {};
features.toFrameStream = ToFrameStream;
features.consolidator = consolidator;
module.exports = exports = features;
