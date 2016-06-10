var router = require("express").Router();
var db = require("../../db");


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

module.exports = router;