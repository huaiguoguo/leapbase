'use strict';
var debug = require('debug')('app');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'web';
  var block = {
    group: 'app',
    model: null
  };
  
  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  // page route
  app.server.get('/', block.page.showPage);
  app.server.get('/page/:page_name', block.page.showPage);

  return block;
};
