module.exports = function () {
  const timestamp = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  return timestamp;
};
