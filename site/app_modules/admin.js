var debug = require('debug')('admin');
var util = require('util');
var jwt = require('jsonwebtoken');
var tool = require('leaptool');

module.exports = function(app) {

  var module_name = 'admin';
  var block = {
    app: app,
    model: null
  };
  block.data = tool.object(require('basedata')(app, module_name));
  block.page = tool.object(require('basepage')(app, module_name, block.data));

  // make sure token is valid
  block.data.checkToken = function(req, res, next) {
    if (req.session && req.session.user) {
      next(); // no need for token check if user is logged in already
    } else {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, app.setting.token_secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Invalid token' });
          } else {
            debug('api token check - decoded token value:', decoded);
            req.decoded = decoded; // save decoded info in req
            next();
          }
        });
      } else {
        // if there is no token, return 403
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
      }
    }
  };

  // make sure logged in user has access to route
  block.data.checkAccess = function(req, res, next) {
    
  };

  // site admin page
  block.page.getAdminPage = function(req, res) {
    var page = app.getPage(req, { title:'admin' });
    res.render('admin/index', { page:page });
  };

  /*
  // user manager page
  block.page.getManagePage = function(req, res) {
    var page = app.getPage(req);
    res.render('admin/manage', { page:page });
  };
  */

  // routes
  app.server.all('/admin', block.page.checkLogin);
  app.server.all('/admin/*', block.page.checkLogin);
  app.server.get('/admin', block.page.getAdminPage);

  /*
  app.server.get('/' + module_name + '/page/:pagename', block.page.showPage);
  app.server.all('/manage', block.page.checkLogin);
  app.server.all('/manage/*', block.page.checkLogin);
  app.server.get('/manage', block.page.getManagePage);
  */

  return block;
};
