var config = require('./config');
var sql = require('mssql');
var sql2 = require('mssql');

var shopFloor = sql.connect("mssql://" + config.db.user + ":" + config.db.passwd + "@193.127.209.242/CSF_ENP_TOR")
    .then(function() {
        console.log('Connect to SQL Server Axapta');
    }).catch(function(err) {
        console.log('Error connet SQL Server Axapta');
        console.log(err);
    });
    
 var axapta = sql2.connect("mssql://" + config.db.user + ":" + config.db.passwd + "@193.127.209.242/ENP_ES_AX_PRD")
    .then(function() {
        console.log('Connect to SQL Server Shop Floor');
    }).catch(function(err) {
        console.log('Error connet SQL Server Shop Floor');
        console.log(err);
    });
    
    
module.exports = {"axapta" : sql2, "shopFloor" : sql}
