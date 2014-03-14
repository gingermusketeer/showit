var container = document.querySelector('#container');

var shoe = require('shoe');
var through = require('through');

var Hammer = require('hammerjs');
var debounce = require('debounce');

var pin;
while (!pin || pin.length < 4){
  pin = prompt('Enter a slideshow pin longer then 4 characters');
}

var stream = shoe('/slideshow');

stream.on('connect', function(){
  stream.write(JSON.stringify({pin}));
});
stream.on('data', (data) => {
  var message = JSON.parse(data);
  if(message.slide) {
    currentSlide = slide;
    updateSlide();
  }
});

var sendStreamCurrentSlide = debounce((command) => {
  stream.write(JSON.stringify({ command }));
}, 200, true);

let previousSlide = () => {
  sendStreamCurrentSlide('previousSlide');
};
nextSlide = () => {
  sendStreamCurrentSlide('nextSlide');
};

Hammer(document).on('swipeleft dragleft', () => {
  console.log('swiping left');
  nextSlide();
});

Hammer(document).on('swiperight dragright', () => {
  console.log('swiping right');
  previousSlide();
});
