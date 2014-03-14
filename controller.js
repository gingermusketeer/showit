var currentSlide = 1;
var container = document.querySelector('#container');

var shoe = require('shoe');
var through = require('through');

var Hammer = require('hammerjs');
var debounce = require('debounce');


var stream = shoe('/controller');

var sendStreamCurrentSlide = debounce((newSlideNumber) => {
  currentSlide = newSlideNumber;
  updateSlide();
  stream.write(currentSlide);
}, 200);

let updateSlide = () => {
  container.innerText = currentSlide;
};

let previousSlide = () => {
  sendStreamCurrentSlide(currentSlide - 1);
};
nextSlide = () => {
  sendStreamCurrentSlide(currentSlide + 1);
};

Hammer(document).on('swipeleft dragleft', () => {
  console.log('swiping left');
  nextSlide();
});

Hammer(document).on('swiperight dragright', () => {
  console.log('swiping right');
  previousSlide();
});
