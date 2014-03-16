var stream = shoe('/slideshow');
var shoe = require('shoe');
require('remark/src/remark.js');
var remark = window.remark;
var fs = require('fs');

var rawSlides = fs.readFileSync('./slides.md');
var config = {
  container: 'remark-slides',
  source: rawSlides.toString(),
};

var slideshow = remark.create(config);

let pin;
while (!pin || pin.length < 4){
  pin = prompt('Enter a slideshow pin longer then 4 characters');
}

var result = document.getElementById('result');

stream.on('connect', function(){
  stream.write(JSON.stringify({ pin: pin }));
});

var takeAction = (command) => {
  switch(command){
  case 'nextSlide':
    slideshow.gotoNextSlide();
    break;
  case 'previousSlide':
    slideshow.gotoPreviousSlide();
    break;
  default:
    console.log('Invalid command: ', command);
  }
};

stream.on('data', (data) => {
  var object = JSON.parse(data);
  if(object.command) {
    takeAction(object.command);
  }
  console.log('data', data);
});
