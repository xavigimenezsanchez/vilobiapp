var router = require("express").Router();
var db = require("../../db");

router.get('/:machine/:of', function(req, res, next) {
    var aux = []; // Auxiliar array for store information
    new db.shopFloor.Request().query('SELECT ItemId, Width, WidthUnit, RequiredQty FROM CSF_ENP_TOR.dbo.PrOdBOM WHERE        (PrOdId = \'' + req.params.of + '\') AND (ItemType = \'Substrates\') AND (OprNum = 10) AND (RequiredQty > 0) AND (SFBOMRevision = 0)')
                .then(function(material) {
                    if (material.length == 0) res.json(material);
                    var cont = 0;
                    material.forEach(function(item, index, arr) {
                        aux[index] = item;
                        new db.shopFloor.Request().query('SELECT Sum(INVENTSUM.AVAILPHYSICAL) AS \'Avalaible\' FROM ENP_ES_AX_PRD.dbo.INVENTDIM INVENTDIM, ENP_ES_AX_PRD.dbo.INVENTSUM INVENTSUM WHERE INVENTSUM.DATAAREAID = INVENTDIM.DATAAREAID AND INVENTSUM.INVENTDIMID = INVENTDIM.INVENTDIMID AND ((INVENTDIM.CONFIGID=\''+ item['Width'] +'\') AND (INVENTSUM.ITEMID=\''+ item['ItemId'] + '\') AND (INVENTSUM.AVAILPHYSICAL>0) AND (INVENTDIM.WMSLOCATIONID=(select QUEUEBEFORE from CSF_ENP_TOR.dbo.WrkCtr where WrkCtrId = \'' + req.params.machine +'\')))')
                            .then(function(avalaible) {
                                aux[index]['Avalaible'] = avalaible[0]['Avalaible']==null ? 0:avalaible[0]['Avalaible'];
                                if (++cont == arr.length) res.json(aux);
                            }).catch(function(err) {
                                console.log(err);
                            })
     
                    }); 
                }).catch(function(err) {
                    console.log(err);
                });
});
module.exports = router;