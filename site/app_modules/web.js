var util = require('util');
var tool = require('leaptool');

module.exports = function(app) {
    
    var moduleName = 'web';
    var block = {
        app: app,
        model: null
    };
    block.data = tool.object(require('basedata')(app, moduleName));
    block.page = tool.object(require('basepage')(app, moduleName, block.data));
    
    block.page.getAbout = function(req, res) {
        var page = { title:'about' };
        res.render(moduleName + '/about', { page:page });
    };
    
    app.server.get('/', block.page.getIndex);
    app.server.get('/about', block.page.getAbout);
    
    app.server.get('/' + moduleName + '/page/:pagename', block.page.showPage);
    
    return block;
};