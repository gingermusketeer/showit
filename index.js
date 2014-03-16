var shoe = require('shoe');
var getPin = require('./lib/getPin.js');
var Slideshow = require('./lib/slideshow.js');
var rawSlides = require('fs').readFileSync('./slides.md').toString(); //Might be a buffer

var takeAction = Slideshow.create(rawSlides, 'slideshow-container');
var stream = shoe('/slideshow');

stream.on('connect', function(){
  var pin = getPin();
  stream.write(JSON.stringify({ pin: pin }));
});

stream.on('data', (data) => {
  var object = JSON.parse(data);
  if(object.command) {
    takeAction(object.command);
  }
  console.log('data', data);
});
