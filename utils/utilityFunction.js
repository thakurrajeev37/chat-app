let isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};
let generateMessage = (from, text) => {
  return {
    from,
    text
  }
}
  module.exports = {
    isRealString,
    generateMessage
  };
  