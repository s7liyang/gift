const path = require('path');

// js入口
const enterJs = {
  old: path.resolve(__dirname, '../page/main/js/old.js'),
  index: path.resolve(__dirname, '../page/main/js/index.js'),
  game: path.resolve(__dirname, '../page/main/js/game.js'),
  me: path.resolve(__dirname, '../page/main/js/me.js'),
  cart: path.resolve(__dirname, '../page/main/js/cart.js'),
  details: path.resolve(__dirname, '../page/main/js/details.js'),
  list: path.resolve(__dirname, '../page/main/js/list.js'),
};

module.exports = enterJs;