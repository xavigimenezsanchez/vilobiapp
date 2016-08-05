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
            var auxOut = [];
            var lastCounter = 0;
            auxOFs.forEach(function(ele, index, array) {
                //Get Material for each OF
                new db.shopFloor.Request().query('SELECT ItemId, Width, WidthUnit, RequiredQty FROM CSF_ENP_TOR.dbo.PrOdBOM WHERE (PrOdId = \'' + ele.OF + '\') AND (ItemType = \'Substrates\') AND (OprNum = 10) AND (RequiredQty > 0) AND (SFBOMRevision = 0)')
                .then(function(mat) {
                        auxOut[auxCont] = ele;
                        auxOut[auxCont++]['material']= mat;
                     if ((auxCont) == (array.length)) {
                        auxOut.forEach(function(ele1, index1, array1) {
                            var auxSemaphor = true;
                            if (ele1.material.length != 0) {
                                    ele1.material.forEach(function(ele2,index2, array2) {
                                        new db.shopFloor.Request().query('SELECT Sum(INVENTSUM.AVAILPHYSICAL) AS \'Avalaible\' FROM ENP_ES_AX_PRD.dbo.INVENTDIM INVENTDIM, ENP_ES_AX_PRD.dbo.INVENTSUM INVENTSUM WHERE INVENTSUM.DATAAREAID = INVENTDIM.DATAAREAID AND INVENTSUM.INVENTDIMID = INVENTDIM.INVENTDIMID AND ((INVENTDIM.CONFIGID=\''+ ele2['Width'] +'\') AND (INVENTSUM.ITEMID=\''+ ele2['ItemId'] + '\') AND (INVENTSUM.AVAILPHYSICAL>0) AND (INVENTDIM.WMSLOCATIONID=(select QUEUEBEFORE from CSF_ENP_TOR.dbo.WrkCtr where WrkCtrId = \'' + ele1['MACHINE'] +'\')))')
                                            .then(function(avalaible) {
                                                
                                                if (auxSemaphor) {
                                                    lastCounter++;
                                                    auxSemaphor = false;
                                                }
                                                ele2['Avalaible'] = avalaible[0]['Avalaible']==null ? 0:avalaible[0]['Avalaible'];
                                                if (lastCounter == array1.length && (index2+1) == array2.length) {
                                                    res.json(auxOut);
                                                }
                                            }).catch(function(err) {
                                                console.log(err);
                                            });
                                    });
                            } else {
                                lastCounter++;
                            }
                        });
                    } 
                }).catch(function(err) {
                    console.log(err);
                });
            });
        }).catch(function(err) {
            console.log(err); 
        });    
});

module.exports = router;