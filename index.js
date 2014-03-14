require('remark/src/remark.js');
var remark = window.remark;
var fs = require('fs');

var rawSlides = fs.readFileSync('./slides.md');
var config = {
  container: 'remark-slides',
  source: rawSlides.toString(),
};

var slideshow = remark.create(config);

var shoe = require('shoe');
var through = require('through');

var result = document.getElementById('result');

var stream = shoe('/slideshow');
stream.pipe(through(function (slideString) {
  slideshow.gotoSlide(parseInt(slideString, 10));
}));
