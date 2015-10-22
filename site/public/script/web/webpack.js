'use strict'
require('style!css!../../style/web/webpack.css')
$().ready(function() {
    console.log('in webpack test page');
    var testOutput1 = 'current time: ' + require('./display-time.js');
    $('.content1').html(testOutput1);
});