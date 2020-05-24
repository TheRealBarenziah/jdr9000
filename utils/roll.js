module.exports = function(diceSize){
  return Math.floor(Math.random() * diceSize) + 1;
};