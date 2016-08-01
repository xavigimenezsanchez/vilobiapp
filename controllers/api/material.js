var router = require("express").Router();
var db = require("../../db");
var f = require('./apiFunctions');

router.get('/:section', function(req, res, next) {
    var date = new Date();
    var dateSql = date.getFullYear() + '-' +('00' + (date.getMonth() + 1)).slice(-2) +'-' + ('00' + (date.getDate())).slice(-2)  + ' 00:00:00';

    new db.axapta.Request().query('SELECT PRODROUTEJOB.WRKCTRID, PRODROUTEJOB.PRODID, PRODROUTEJOB.OPRNUM, PRODROUTEJOB.NUMTYPE, PRODROUTEJOB.JOBTYPE, PRODROUTEJOB.LINK, PRODTABLE.AFCPRODPOOLSSID, PRODTABLE.NAME,PRODROUTEJOB.LINKTYPE, PRODROUTEJOB.FROMDATE, PRODROUTEJOB.FROMTIME, PRODROUTEJOB.TODATE, PRODROUTEJOB.TOTIME, PRODROUTEJOB.SCHEDTIMEHOURS, PRODROUTEJOB.CALCTIMEHOURS, PRODROUTEJOB.AFCPRIORITY, PRODROUTEJOB.CALCTIMEHOURSCOMBO_AFC, PRODROUTEJOB.ENP_ASPROVA FROM ENP_ES_AX_PRD.dbo.PRODROUTEJOB PRODROUTEJOB, ENP_ES_AX_PRD.dbo.PRODTABLE PRODTABLE WHERE PRODTABLE.DATAAREAID = PRODROUTEJOB.DATAAREAID AND PRODTABLE.PRODID = PRODROUTEJOB.PRODID AND PRODROUTEJOB.JOBSTATUS != 4 AND((PRODROUTEJOB.FROMDATE>={ts \'' + dateSql + '\'}) AND (PRODROUTEJOB.DATAAREAID=\'ent\') and ( PRODROUTEJOB.WRKCTRID in (SELECT top 100 PERCENT   WrkCtrId FROM CSF_ENP_TOR.dbo.WrkCtr WHERE CompanyId = \'ent\'  AND ((LEFT(OprTypeId,3) = \'' + req.params.section + '\'  AND WCGroup = \'\') OR (WCGroup <> \'\' AND WCGroup = \'' + req.params.section + '\' )) AND IsGroup = 0 AND SupervisorViewOrder > 0  AND PlantId = \'AT\'  ORDER BY SupervisorViewOrder,WrkCtrId)) )  ORDER BY PRODROUTEJOB.FROMDATE')
        .then(function(ofs) {
            var auxOFs = f.generateOnLine(ofs);
            var auxCont = 0;
            auxOFs.forEach(function(ele, index, array) {
                //Get Matirial for each OF
                
            });
            
            res.json({'hola':'que fas'});
        }).catch(function(err) {
            console.log(err); 
        });    
});

module.exports = router;