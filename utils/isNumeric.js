module.exports = function isNumeric(x) {
  return ((typeof x === "number" || typeof x === "string") && !isNaN(Number(x)));
};