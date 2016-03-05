var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {

    var moduleName = 'admin';
    var block = {
        app: app,
        group: 'admin',
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));

    block.model = null;

    // block.page
    block.page.getIndex = function(req, res) {
        var page = app.getPage(req);
        res.render('admin/index', { page:page });
    };

    // page route
    app.server.get('/admin', block.page.getIndex);
    return block;
};

