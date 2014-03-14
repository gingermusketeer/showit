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
app.get(/\.js/, browserify(__dirname, {transform: ['brfs']}));

var server  = app.listen(4000);
var streams = [];
var slideshowSock = shoe(function(stream){
  streams.push(stream);
  console.log('slideshow connected');
  stream.on('data', function(data){
    console.log('slideshow', data);
  });
});

var controllerSock = shoe(function (stream) {
  stream.on('data', function(data){
    streams.forEach(function(stream){
      stream.write(data);
    });

    console.log(data);
  });
  stream.pipe(slideshowSock);
});

slideshowSock.install(server, '/slideshow');
controllerSock.install(server, '/controller');
