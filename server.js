var shoe = require('shoe');
var browserify = require('browserify');
var es6ify = require('es6ify');
var express = require('express');
var app = express();

app.use(app.router);
app.use(express.static(__dirname));
app.get('/controller.js', function(req, res){

  browserify()
    .add(es6ify.runtime)
    // .transform(require('brfs'))
    .transform(require('es6ify').configure(/^(?!.*node_modules)+.+\.js$/))
    .require(require.resolve('./controller.js'), { entry: true })
    .bundle({ debug: true })
    .pipe(res);
});

app.get('/index.js', function(req, res){
  browserify()
    .add(es6ify.runtime)
    .transform(require('es6ify').configure(/^(?!.*node_modules)+.+\.js$/))
    .transform(require('brfs'))
    .require(require.resolve('./index.js'), { entry: true })
    .bundle({ debug: true })
    .pipe(res);
});


var server  = app.listen(4000, function(){
  console.log('Server started on: ' + 4000);
});
var streams = {};
var slideshowSock = shoe(function(stream){
  var pin;
  console.log('slideshow connected');
  stream.on('data', function(data){
    var object = JSON.parse(data);
    if(!pin && object.pin) {
      pin = object.pin;
      if(!streams[pin]) {
        streams[pin] = stream;
      } else {
        stream.pipe(streams[pin]);
        streams[pin].pipe(stream);
      }
    }
    console.log('slideshow', data, pin);
  });
});

slideshowSock.install(server, '/slideshow');
