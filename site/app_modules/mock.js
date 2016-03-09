var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {
  
    var mockg = require('mockg')(app);
    var mockEngine = require('mockengine')(app);
    
    var moduleName = 'mock';
    var block = {
        app: app,
        group: 'app',
        model: null
    };
    
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    block.model = null;
    
    // block.data
    block.data.mock = function(req, res) {
        var callback = arguments[3] || null;
        var parameter = tool.getReqParameter(req);
        
        console.log('mock parameter:', parameter);
        console.log('mockg test:', mockg.test());
        console.log('mockengine test:', mockEngine.test());
        
        app.cb(null, [], { message:'mock' }, req, res, callback);
    };
    
    // block.page
    block.page.getIndex = function(req, res) {
        var page = app.getPage(req);
        res.render('mock/index', { page:page });
    };
    
    // route
    app.server.get('/mock/page', block.page.getIndex);
    app.server.get('/mock', block.data.mock);
    
    return block;
};

