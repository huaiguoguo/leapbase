var debug = require('debug')('admin');
var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'admin';
  var block = {
    app: app,
    model: null
  };
  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  // site admin page
  block.page.getAdminPage = function(req, res) {
    var page = app.getPage(req);
    res.render('admin/index', { page:page });
  };

  // user manager page
  block.page.getManagePage = function(req, res) {
    var page = app.getPage(req);
    res.render('admin/manage', { page:page });
  };

  // routes
  /*
  app.server.all('/admin', block.page.checkLogin);
  app.server.all('/admin/*', block.page.checkLogin);
  app.server.get('/admin', block.page.getAdminPage);
  app.server.get('/' + module_name + '/page/:pagename', block.page.showPage);

  app.server.all('/manage', block.page.checkLogin);
  app.server.all('/manage/*', block.page.checkLogin);
  app.server.get('/manage', block.page.getManagePage);
  */
  
  return block;
};
