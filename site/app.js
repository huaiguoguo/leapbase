'use strict';
var debug = require('debug')('app');
var express = require('express');
var session = require('express-session');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var compression = require('compression')
var _ = require('underscore');
var tool = require('leaptool');

var app = {};
app.db = null;
app.engine = require('web_engine')(app);

app.cb = function(error, docs, info, req, res, callback) {
  error && console.log('Error:', error);
  if (callback) {
    callback(error, docs, info, req, res);
  } else {
    var result = {
      error: error,
      docs: docs,
      info: info
    };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end();
  }
};

app.getPage = function(req, context) {
  context.req = {
    url: req.url,
    method: req.method,
    headers: req.headers,
    cookies: req.cookies,
    params: req.params,
    query: req.query
  };
  context.user = req.session && req.session.user || null;
  context.title = context.title || context.page_name;
  return context;
};

app.renderInfoPage = function(error, docs, info, req, res) {
  var page = app.getPage(req, { error:error, docs:docs, info:info });
  res.render('common/info.html', { page: page });
};

function setup(cbSetup) {
  // create express server
  app.server = express();
  // read setting
  app.setting = tool.getDefaultSetting(__dirname);
  debug('setting:', app.setting);
  var siteSetting = null;
  try {
    siteSetting = require('./setting').setting;
    debug('setting file:', siteSetting);
  } catch (e) {
    debug('setting file is absent');
  }
  app.setting = _.extend(app.setting, siteSetting);
  // setup swig as view engine
  app.server.engine('html', cons.swig);
  app.server.set('views', path.join(__dirname, 'views'));
  app.server.set('view engine', 'html');
  // setup middleware
  app.server.use(favicon(path.join(__dirname, app.setting.public_name, 'image', 'favicon.ico')));
  app.server.use(compression());
  app.server.use(logger('dev'));
  app.server.use(bodyParser.json());
  app.server.use(bodyParser.urlencoded({ extended: true }));
  app.server.use(cookieParser());
  app.server.use(session({
    secret:'mykey123456',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 120 * 60 * 1000 }  //session expires in 120 minutes
  }));
  app.server.use(express.static(path.join(__dirname, app.setting.public_name)));

  // DEBUG
  // middleware for api token check
  var apiRoutes = express.Router();
  apiRoutes.use(function(req, res, next) {
    if (req.session && req.session.user) {
      // no need for token check if user is logged in already
      next();
    } else {
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // decode token
      if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.setting.token_secret, function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            console.log('token decoded:', decoded);
            req.decoded = decoded; // save decoded info in req
            next();
          }
        });
      } else {
        // if there is no token, return 403
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
      }
    }
  });
  app.server.get('/data/*', apiRoutes);
  //app.server.get('/data/api', apiRoutes);
  // END OF DEBUG

  // setup database connection
  if (app.setting.database && app.setting.database.type) {
    var Database = require(app.setting.database.type + '_db');
    app.db = new Database(app, function() {
      setupModules(app, cbSetup);
    });
  } else {
    setupModules(app, cbSetup);
  }
}

// setup modules under app_modules folder
function setupModules(app, cbSetup) {
  // load application modules
  app.module = {};
  var modulePath = path.join(app.setting.server_path, app.setting.app_modules_name);
  fs.readdir(modulePath, function(error, files) {
    if (error) {
      debug('Error in setupModules:', error);
      process.exit();
    } else {
      for (var i = 0; i < files.length; i++) {
        var module_name = files[i].split('.')[0];
        var modulePath = './' + app.setting.app_modules_name + '/' + module_name;
        app.module[module_name] = require(modulePath)(app);
      }
      setupServer(app, cbSetup);
    }
  });
}

// setup web server properties
function setupServer(app, cbSetup) {
  debug('setup server');
  // catch 404 and forward to error handler
  app.server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // development error handler - will print stacktrace
  if (app.server.get('env') === 'development') {
    app.server.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('web/error', {
        message: err.message,
        error: err
      });
    });
  }
  // production error handler - no stacktraces leaked to user
  app.server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('web/error', {
      message: err.message,
      error: {}
    });
  });
  // invoke callback to continue setup
  cbSetup && cbSetup(app);
}

module.exports = function(callback) {
  // setup is asynchrous (database connect), so callback is needed to wait setup to complete
  setup(function(app) {
    callback && callback(app);
  });
};
