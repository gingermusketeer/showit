module.exports = () => {
  let pin;
  while (!pin || pin.length < 4){
    pin = prompt('Enter a slideshow pin longer then 4 characters');
  }
  
  return pin;
}
