var router = require("express").Router();
var db = require("../../db");
var f = require('./apiFunctions');


router.get('/name/:id', function (req, res, next) {
    new db.axapta.Request().query('select NAME from ENP_ES_AX_PRD.dbo.WRKCTRTABLE where WRKCTRID = \'' + req.params.id + '\'')
        .then(function(name) {
            res.json(name);
        }).catch(function(err) {
            console.log(err);
        });
    
});

router.get('/actual/:id', function(req,res,next) {
    new db.shopFloor.Request().query('select top 1  PrOdId, OprNum, LastTimeCode, LastTimeJobType from CSF_ENP_TOR.dbo.SF where companyId=\'ent\' and WrkCtrId=\'' + req.params.id +'\' ORDER BY lASTtIMEtIME desc')
        .then(function(name) {
            res.json(name);
        }).catch(function(err) {
            console.log(err);
        });
})

router.get('/:id',function (req, res, next) {
   var date = new Date();
   var dateSql = date.getFullYear() + '-' +('00' + (date.getMonth() + 1)).slice(-2) +'-' + ('00' + (date.getDate())).slice(-2)  + ' 00:00:00'; 
    new db.axapta.Request().query('SELECT PRODROUTEJOB.PRODID, PRODROUTEJOB.OPRNUM, PRODROUTEJOB.NUMTYPE, PRODROUTEJOB.JOBTYPE, PRODROUTEJOB.LINK, PRODTABLE.AFCPRODPOOLSSID, PRODTABLE.NAME,PRODROUTEJOB.LINKTYPE, PRODROUTEJOB.FROMDATE, PRODROUTEJOB.FROMTIME, PRODROUTEJOB.TODATE, PRODROUTEJOB.TOTIME, PRODROUTEJOB.SCHEDTIMEHOURS, PRODROUTEJOB.CALCTIMEHOURS, PRODROUTEJOB.AFCPRIORITY, PRODROUTEJOB.CALCTIMEHOURSCOMBO_AFC, PRODROUTEJOB.ENP_ASPROVA FROM ENP_ES_AX_PRD.dbo.PRODROUTEJOB PRODROUTEJOB, ENP_ES_AX_PRD.dbo.PRODTABLE PRODTABLE WHERE PRODTABLE.DATAAREAID = PRODROUTEJOB.DATAAREAID AND PRODTABLE.PRODID = PRODROUTEJOB.PRODID AND PRODROUTEJOB.JOBSTATUS != 4 AND((PRODROUTEJOB.FROMDATE>={ts \''+ dateSql+ '\'}) AND (PRODROUTEJOB.DATAAREAID=\'ent\') AND (PRODROUTEJOB.WRKCTRID=\''+req.params.id+'\') ) ORDER BY PRODROUTEJOB.FROMDATE')
        .then(function(recordset) {
                        res.json(f.generateOnLine(recordset));
                }).catch(function(err) {
                        console.log(err);
                });
});


module.exports = router;