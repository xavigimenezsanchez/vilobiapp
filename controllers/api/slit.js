var router = require("express").Router();
var db = require("../../db");


router.get('/:of', function(req, res, next) {
    new db.shopFloor.Request().query('SELECT PrOdId, OrderQty, SalesUnit AS Unitat, LineNum, ItemId, ItemDesc, StkUnit, FinishedWidth, WidthUnit, FinishedLength, LengthUnit, NumAcross, Yield, YieldUnit, SalesId,SalesLineNum, OrdDueTime, InventTransId, SpecId, AppPrOdId, SizeDesc, PackageQtyPer, PackageUnit, PackageType, PackageWeight, PlanSetNum, ComputerName FROM CSF_ENP_TOR.dbo.PrOdItem WHERE PrOdId = \'' + req.params.of +'\'')
        .then(function(qty) {
            res.json(qty);
        }).catch(function(err) {
            console.log(err);
        })
});

module.exports = router;