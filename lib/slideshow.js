var remark = require('./remark.js');
var slideshowActionHandler = require('./takeAction.js');

module.exports = {
    create: (rawSlides, container) => {

      var config = {
        container: container,
        source: rawSlides.toString(), // rawSlides might be a buffer
      };

      return slideshowActionHandler(remark.create(config));
    }
};
