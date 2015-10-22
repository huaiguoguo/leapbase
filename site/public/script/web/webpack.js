'use strict'
require('../../style/web/webpack.css');

$().ready(function() {
    console.log('in webpack test page');
    var testOutput1 = 'Current time is: ' + require('./display-time.js');
    $('.content1').html(testOutput1);
});