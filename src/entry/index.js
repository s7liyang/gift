const path = require('path');

// js入口
const enterJs = {
  old: path.resolve(__dirname, '../page/main/js/old.js'),
  index: path.resolve(__dirname, '../page/main/js/index.js'),
  game: path.resolve(__dirname, '../page/main/js/game.js'),
  me: path.resolve(__dirname, '../page/main/js/me.js'),
};

module.exports = enterJs;