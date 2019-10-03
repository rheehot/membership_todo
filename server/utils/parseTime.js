module.exports = function (time) {
  const result = new Date(time).toISOString().substring(0, 10);
  return result;
};
