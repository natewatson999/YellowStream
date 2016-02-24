# YellowStream

YellowStream is a Node.js library for managing streams. The basic core goal of YellowStream is to do to streams what Jquery did to DOM code. 

This module is published under the MIT license. 

## Installation Instructions

### Local Directory

In the directory in question, run this command:

```
npm install udp-hub
```

### Global

Assuming you have the rights to do so, run this command:

```
npm install -g udp-hub
```

## Usage instructions

### consolidator

Consolidator is basically a utility function, that takes a stream, takes all of the content from that stream, and when the content is all received, allows a function to be performed with the completed content. It's pretty much a "Stream to String" feature.

Consolidators take a streaming object, and output a similar object. Consolidators have two events: "error" and "end". Error will usually have an error object as a callback parameter. "end" will always have a callback parameter, which is the value of the string in the buffer. 

#### consolidator example
    var https = require("https");
    var yellow = require("yellow-stream");
    https.get("https://www.google.com", function(raw){
      var stream = new yellow.consolidator(raw);
      stream.on("error", function(e){
        console.log(e);
      });
      stream.on("end", function(value){
        console.log(value);
      });
    });
