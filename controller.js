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

Hammer(document).on('swipeleft', () => {
  console.log('swiping left');
  nextSlide();
});

Hammer(document).on('swiperight', () => {
  console.log('swiping right');
  previousSlide();
});


Hammer(document).on('dragleft', () => {
  console.log('swiping left');
  nextSlide();

});

Hammer(document).on('dragright', () => {
  console.log('swiping right');
  previousSlide();
});
