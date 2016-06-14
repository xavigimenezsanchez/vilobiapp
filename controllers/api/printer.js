var router = require("express").Router();
var db = require("../../db");


router.get('/:of', function(req, res, next) {
    new db.shopFloor.Request().query('SELECT StkReqQty as quantity from CSF_ENP_TOR.dbo.PrOdBOM where PrOdId = \'' + req.params.of +'\' AND OprNum = 10 AND ItemId LIKE \'WIP%\' AND SFBOMRevision = 0 ')
        .then(function(qty) {
            res.json(qty);
        }).catch(function(err) {
            console.log(err);
        })
});

module.exports = router;