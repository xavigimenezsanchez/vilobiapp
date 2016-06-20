var router = require("express").Router();
var db = require("../../db");
var forEach = require('async-foreach').forEach;


router.get('/dept', function(req, res, next) {
    new db.shopFloor.Request().query('select WCGroup from CSF_ENP_TOR.dbo.WrkCtr group by WCGroup')
        .then(function(qty) {
            res.json(qty);
        }).catch(function(err) {
            console.log(err);
        })
});

router.get('/dept/:id', function(req, res, next) {
    new db.shopFloor.Request().query('SELECT WrkCtrId FROM CSF_ENP_TOR.dbo.WrkCtr WITH (NOLOCK) WHERE CompanyId = \'ent\'  AND ((LEFT(OprTypeId,3) = \'' + req.params.id +'\'  AND WCGroup = \' \') OR (WCGroup <> \' \' AND WCGroup = \'' + req.params.id + '\' )) AND IsGroup = 0 AND SupervisorViewOrder > 0  AND PlantId = \'AT\'  ORDER BY SupervisorViewOrder, WrkCtrId')
        .then(function(qty) {
            res.json(qty);
        }).catch(function(err) {
            console.log(err);
        })
});


router.get('/deptall/:id', function(req, res, next) {
    var aux =[]
    
    new db.shopFloor.Request().query('SELECT WrkCtrId FROM CSF_ENP_TOR.dbo.WrkCtr WITH (NOLOCK) WHERE CompanyId = \'ent\'  AND ((LEFT(OprTypeId,3) = \'' + req.params.id +'\'  AND WCGroup = \' \') OR (WCGroup <> \' \' AND WCGroup = \'' + req.params.id + '\' )) AND IsGroup = 0 AND SupervisorViewOrder > 0  AND PlantId = \'AT\'  ORDER BY SupervisorViewOrder, WrkCtrId')
        .then(function(qty) {
            var cont = 0; // Used for start next select when it has been processed current select
            qty.forEach(function(item, index, arr) {
                aux[index]= {};
                aux[index]['id'] = item['WrkCtrId'].trim();
                
                if(cont++ == (arr.length-1)) {  // if 1
                    var cont2 = 0; // Used for start next select when it has been processed current select
                   aux.forEach(function(item, index, arr) {
                       // Machine's names
                       new db.axapta.Request().query('select NAME from ENP_ES_AX_PRD.dbo.WRKCTRTABLE where WRKCTRID = \'' + item.id + '\'')
                        .then(function (name) {
                            aux[index]['name'] = name[0]['NAME'].trim();
                             
                            if(cont2++ == (arr.length-1)) {  // if 2
                                
                                var cont3 = 0; // Used for start next select when it has been processed current select
                                aux.forEach(function(item, index, arr) {
                                  // Get of, oprNum and Status
                                  
                                  new db.shopFloor.Request().query('select top 1  PrOdId, OprNum, LastTimeCode, LastTimeJobType from CSF_ENP_TOR.dbo.SF where companyId=\'ent\' and WrkCtrId=\'' + item.id + '\' ORDER BY lASTtIMEtIME desc')
                                    .then(function (name) {
                                       
                                        aux[index]['of'] = name[0]['PrOdId']
                                        aux[index]['oprNum'] = name[0]['OprNum'];
                                        aux[index]['status'] = name[0]['LastTimeJobType'].trim();
                                        if (cont3++ == (arr.length-1)) {   // if 3
                                            // Get ItemId, desc, custNuo, custName and ufd
                                            
                                            var cont4 = 0; // Used for start next select when it has been processed current select
                                            
                                            aux.forEach(function(item, index, arr) {
                                                new db.shopFloor.Request().query('SELECT Item.ItemId, Item.ItemDesc, ItemAdd.CustNo, ItemAdd.CustName, ItemAdd.UDF01 FROM CSF_ENP_TOR.dbo.PrOdItem Item WITH (NOLOCK) INNER JOIN CSF_ENP_TOR.dbo.PrOdItemAddData ItemAdd WITH (NOLOCK) ON Item.CompanyId = ItemAdd.CompanyId AND Item.PrOdId = ItemAdd.PrOdId AND Item.AppPrOdId = ItemAdd.AppPrOdId AND Item.ItemId = ItemAdd.ItemId AND Item.SizeId = ItemAdd.SizeId AND Item.SizeId2 = ItemAdd.SizeId2 AND Item.ColorId = ItemAdd.ColorId WHERE Item.CompanyId = \'ent\'  AND Item.PrOdId = \'' + item.of + '\'')
                                                    .then(function (desc) {
                                                        aux[index]['ItemId'] = desc[0]['ItemId'].trim();
                                                        aux[index]['desc'] = desc[0]['ItemDesc'].trim();
                                                        aux[index]['custNo'] = desc[0]['CustNo'].trim();
                                                        aux[index]['custName'] = desc[0]['CustName'].trim();
                                                        aux[index]['ufd'] = desc[0]['UDF01'].trim();
                                                        if (cont4++ == (arr.length - 1)) {
                                                            // Get QuantityPlanned
                                                            var cont5 = 0;
                                                            
                                                            aux.forEach(function(item, index, arr) {
                                                                new db.shopFloor.Request().query('SELECT PrOdId, OrderQty, SalesUnit AS Unitat, LineNum, ItemId, ItemDesc, StkUnit, FinishedWidth, WidthUnit, FinishedLength, LengthUnit, NumAcross, Yield, YieldUnit, SalesId,SalesLineNum, OrdDueTime, InventTransId, SpecId, AppPrOdId, SizeDesc, PackageQtyPer, PackageUnit, PackageType, PackageWeight, PlanSetNum, ComputerName FROM CSF_ENP_TOR.dbo.PrOdItem WHERE PrOdId = \'' + item.of +'\'')
                                                                .then(function(qty) {
                                                                    
                                                                    if (item.oprNum == 10 && 
                                                                        (item.name == 'CER1'  && item.name == 'CER2'
                                                                        && item.name == 'HP20000' && item.name == 'CER3A' && item.name == 'CER3B'
                                                                        )) {
                                                                            /* If OF is in state 10 or machine id is diferent 
                                                                                of INKMAKER or NOMAN OR MAN we need find out quantity 
                                                                                in another table: PrOdBOM
                                                                            */
                                                                            cont5++;
                                                                            new db.shopFloor.Request().query('SELECT StkReqQty as quantity from CSF_ENP_TOR.dbo.PrOdBOM where PrOdId = \'' + item.of +'\' AND OprNum = 10 AND ItemId LIKE \'WIP%\' AND SFBOMRevision = 0 ')
                                                                                .then(function(q) {
                                                                                    aux[index]['quantityPlanned'] = q[0]['quantity'];
                                                                                    
                                                                                })
                                                                        } else {
                                                                            aux[index]['quantityPlanned'] = qty[0]['OrderQty'];
                                                                            cont5++;
                                                                        } // end if QuantityPlanned
                                                                        if (cont5 == (arr.length -1)) {
                                                                            // get ofCompleted
                                                                            var cont6 = 0;
                                                                            aux.forEach(function(item, index, arr) {
                                                                                new db.shopFloor.Request().query('SELECT ItemId, SUM(StkQty) AS StkQty, SUM(PQty) AS PQty, PUnit, SUM(SQty) AS SQty, SUnit, SUM(TQty) AS TQty, TUnit, SUM(FtQty) AS FtQty, SUM(LbQty) AS LbQty FROM CSF_ENP_TOR.dbo.SFMatl WITH (NOLOCK) WHERE CompanyId = \'ent\'  AND PrOdId = \''+ item.of +'\'  AND OprNum = ' + item.oprNum +'  AND WrkCtrId = \'' + item.id +'\'  AND TranType IN (\'OFF-FIN\',\'OFF-WIP\') GROUP BY ItemId, PUnit, SUnit, TUnit')
                                                                                    .then(function(comp) {
                                                                                        cont6++;
                                                                                        aux[index]['ofCompleted'] = comp[0]['StkQty'];
                                                                                        if (cont6 == (arr.length )) {
                                                                                            console.log('Viscaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');
                                                                                            res.json(aux);
                                                                                        }
                                                                                    }) 
                                                                                
                                                                            }) // end get OfCompleted
                                                                        }  //end if cont 5
                                                                })
                                                            }) // end get QuantityPlanned
                                                        }  //end if 4
                                                    }) // end get ItemId, desc, custNuo, custName and ufd
                                            }) 
                                        } // end if 3
                                    }); // end Get of, oprNum and Status
                                })
                            } // end if 2
                   }) 
                });
                } // end if 1
            }) //end qty.forEach
        });
});
module.exports = router;