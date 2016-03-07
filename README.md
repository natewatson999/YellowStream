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

The received streaming object must be capable of emitting "error", "data", and "end"; in the ususual ways. 

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

### FrameStreams

FrameStreams are intended for services like VOIP services, which have a continuous stream, and need the data segmented. The problem is that, usually, TCP sends packets of a certain regular size, which may or may not be the size of the data frames the developer needs. This takes an arbitrary stream, and converts its data emission into a format some human might want.

FrameStreams take a streaming object, and output a streaming object. FrameStreams have 3 events: "error", "data", and "end". "error" is for errors in the usual way. "data" is a dataframe of a garunteed size. "end" is emitted when the source stream closes. "end"'s callback function has a parameter that is the data left over in the buffer. 

The received streaming object must be capable of emitting "error", "data", and "end"; in the ususual ways. 

#### FrameStream Example
    var https = require("https");
    var yellow = require("yellow-stream");
    https.get("https://www.google.com", function(raw){
        var stream = new yellow.toFrameStream(raw);
        stream.frameSize = 32;
        stream.on("error", function(e){
            console.log(e);
        });
        stream.on("data", function(value){
            console.log(value);
        });
        stream.on("end", function(value){
            console.log(value);
        });
    });

### NewLineStreams

NewLineStreams are intended for services such as IM systems, consoles, and certain database systems where one may need to break a stream up by lines. 

NewLineStreams take a streaming object, and output a streaming object. NewLineStreams have 3 events: "error", "data", and "end". "error" is for errors in the usual way. "data" is a dataframe. "end" is emitted when the source stream closes. "end"'s callback function has a parameter that is the data left over in the buffer. 

The received streaming object must be capable of emitting "error", "data", and "end"; in the ususual ways. 

#### NewLineStream Example
    var https = require("https");
    var yellow = require("yellow-stream");
    http.get("http://www.uglydress.com/", function(raw){
        var stream = new yellow.breakByLine(raw, true, true, true, true);
        stream.on("error", function(e){
            console.log(e);
        });
        stream.on("data", function(value){
            console.log(value);
            console.log("\n");
        });
        stream.on("end", function(value){
            console.log(value);
        });
    });