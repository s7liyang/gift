const path = require('path');

// js入口
const enterJs = {
  index: path.resolve(__dirname, '../page/main/js/index.js'),
  me: path.resolve(__dirname, '../page/main/js/me.js'),
  user: path.resolve(__dirname, '../page/main/js/user.js'),
  activity: path.resolve(__dirname, '../page/main/js/activity.js'),
  list: path.resolve(__dirname, '../page/main/js/list.js'),
  detail: path.resolve(__dirname, '../page/main/js/detail.js'),
  cart: path.resolve(__dirname, '../page/main/js/cart.js'),
  order: path.resolve(__dirname, '../page/main/js/order.js'),
  game: path.resolve(__dirname, '../page/main/js/game.js'),
};

module.exports = enterJs;