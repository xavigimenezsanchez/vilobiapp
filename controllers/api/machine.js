var router = require("express").Router();
var db = require("../../db");


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
   console.log('SELECT PRODROUTEJOB.PRODID, PRODROUTEJOB.OPRNUM, PRODROUTEJOB.NUMTYPE, PRODROUTEJOB.JOBTYPE, PRODROUTEJOB.LINK, PRODTABLE.AFCPRODPOOLSSID, PRODTABLE.NAME,PRODROUTEJOB.LINKTYPE, PRODROUTEJOB.FROMDATE, PRODROUTEJOB.FROMTIME, PRODROUTEJOB.TODATE, PRODROUTEJOB.TOTIME, PRODROUTEJOB.SCHEDTIMEHOURS, PRODROUTEJOB.CALCTIMEHOURS, PRODROUTEJOB.AFCPRIORITY, PRODROUTEJOB.CALCTIMEHOURSCOMBO_AFC, PRODROUTEJOB.ENP_ASPROVA FROM ENP_ES_AX_PRD.dbo.PRODROUTEJOB PRODROUTEJOB, ENP_ES_AX_PRD.dbo.PRODTABLE PRODTABLE WHERE PRODTABLE.DATAAREAID = PRODROUTEJOB.DATAAREAID AND PRODTABLE.PRODID = PRODROUTEJOB.PRODID AND ((PRODROUTEJOB.FROMDATE>={ts \''+ dateSql+ '\'}) AND (PRODROUTEJOB.DATAAREAID=\'ent\') AND (PRODROUTEJOB.WRKCTRID=\''+req.params.id+'\') ) ORDER BY PRODROUTEJOB.FROMDATE')
    new db.axapta.Request().query('SELECT PRODROUTEJOB.PRODID, PRODROUTEJOB.OPRNUM, PRODROUTEJOB.NUMTYPE, PRODROUTEJOB.JOBTYPE, PRODROUTEJOB.LINK, PRODTABLE.AFCPRODPOOLSSID, PRODTABLE.NAME,PRODROUTEJOB.LINKTYPE, PRODROUTEJOB.FROMDATE, PRODROUTEJOB.FROMTIME, PRODROUTEJOB.TODATE, PRODROUTEJOB.TOTIME, PRODROUTEJOB.SCHEDTIMEHOURS, PRODROUTEJOB.CALCTIMEHOURS, PRODROUTEJOB.AFCPRIORITY, PRODROUTEJOB.CALCTIMEHOURSCOMBO_AFC, PRODROUTEJOB.ENP_ASPROVA FROM ENP_ES_AX_PRD.dbo.PRODROUTEJOB PRODROUTEJOB, ENP_ES_AX_PRD.dbo.PRODTABLE PRODTABLE WHERE PRODTABLE.DATAAREAID = PRODROUTEJOB.DATAAREAID AND PRODTABLE.PRODID = PRODROUTEJOB.PRODID AND ((PRODROUTEJOB.FROMDATE>={ts \''+ dateSql+ '\'}) AND (PRODROUTEJOB.DATAAREAID=\'ent\') AND (PRODROUTEJOB.WRKCTRID=\''+req.params.id+'\') ) ORDER BY PRODROUTEJOB.FROMDATE')
        .then(function(recordset) {
                        res.json(generateOnLine(recordset));
                }).catch(function(err) {
                        console.log('Error select');
                        console.log(err);
                        // ... query error checks
                });
});

function generateOnLine(info) {
    var i = 0,
        iaux,
        aux = [];
    function hour(h) {
        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60));
        
        //return Math.floor(h/60/60) + ':' + Math.floor((h/60- Math.floor(h/60/60)*60));
        return (aux < 10 ?("" +(100 + aux)).slice(1) : "" + aux) + ':' + (aux2 < 10 ?("" +(100 + aux2)).slice(1) : "" + aux2);
    }
    
    function createDate(d,h) {
        //var aux = new Date(d.substring(0,10) + ' ' + h);
        
        var aux     = Math.floor(h/60/60) < 1 ? 0 : Math.floor(h/60/60);
        var aux2    = Math.floor((h/60- Math.floor(h/60/60)*60)); 
        d.setHours(aux);
        d.setMinutes(aux2);
        return d;
    }
        
     while (info.length > i) {        
        if (info[i].AFCPRODPOOLSSID == '') {
            try {
                iaux = i;
                while (info[i].PRODID == info[iaux].PRODID) {
                    i++;
                    if (i >= info.length) {
                        break;
                    }
                }
                //createDate(info[iaux].FROMDATE,hour(info[iaux].FROMTIME))
                aux.push({'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                i--;
            } catch(err) {
                aux.push({'OF':info[iaux].PRODID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
                console.log(err);
                break;
            }    
        } else {
            
            iaux = i;
            while (info[i].AFCPRODPOOLSSID == info[iaux].AFCPRODPOOLSSID) {
                i++;
                if (i >= info.length) {
                        break;
                    }
            }
            aux.push({'OF':info[iaux].AFCPRODPOOLSSID,'DESCRIPTION':info[iaux].NAME,'DATASETUP':createDate(info[iaux].FROMDATE,info[iaux].FROMTIME),'SETUP':hour(info[iaux].FROMTIME),'DATASTART':createDate(info[iaux].TODATE,info[iaux].TOTIME),'START':hour(info[iaux].TOTIME)});
            i--;
        }
      i++;    
    }
    
    return aux;
}



module.exports = router;