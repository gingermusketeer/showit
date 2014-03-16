module.exports = (slideshow) => {
    return (command) => {
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
};
