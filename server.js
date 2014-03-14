var shoe = require('shoe');

var browserify = require('browserify-middleware');
var express = require('express');
var app = express();

app.use(app.router);
app.use(express.static(__dirname));
app.get('/controller.js', function(req, res){
  var browserify = require('browserify');
  browserify()
    .add(require('es6ify').runtime)
     // compile all .js files except the ones coming from node_modules
    // .transform(require('brfs'))
    .transform(require('es6ify').configure(/^(?!.*node_modules)+.+\.js$/))
    .require(require.resolve('./controller.js'), { entry: true })
    .bundle({ debug: true })
    .pipe(res);
});

app.get('/index.js', function(req, res){
  var browserify = require('browserify');
  browserify()
    // .add(require('es6ify').runtime)
     // compile all .js files except the ones coming from node_modules
    .transform(require('brfs'))
    // .transform(require('es6ify').configure(/^(?!.*node_modules)+.+\.js$/))
    .require(require.resolve('./index.js'), { entry: true })
    .bundle({ debug: true })
    .pipe(res);
});


var server  = app.listen(4000);
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

// var controllerSock = shoe(function (stream) {
//   stream.on('data', function(data){
//     streams.forEach(function(stream){
//       stream.write(data);
//     });
//
//     console.log(data);
//   });
//   stream.pipe(slideshowSock);
// });
// controllerSock.install(server, '/controller');

slideshowSock.install(server, '/slideshow');
