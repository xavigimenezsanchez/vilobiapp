var router = require("express").Router();
var db = require("../../db");


router.get('/desc/:id', function (req, res, next) {
    new db.shopFloor.Request().query('SELECT Item.ItemId, Item.ItemDesc, ItemAdd.CustNo, ItemAdd.CustName, ItemAdd.UDF01 FROM CSF_ENP_TOR.dbo.PrOdItem Item WITH (NOLOCK) INNER JOIN CSF_ENP_TOR.dbo.PrOdItemAddData ItemAdd WITH (NOLOCK) ON Item.CompanyId = ItemAdd.CompanyId AND Item.PrOdId = ItemAdd.PrOdId AND Item.AppPrOdId = ItemAdd.AppPrOdId AND Item.ItemId = ItemAdd.ItemId AND Item.SizeId = ItemAdd.SizeId AND Item.SizeId2 = ItemAdd.SizeId2 AND Item.ColorId = ItemAdd.ColorId WHERE Item.CompanyId = \'ent\'  AND Item.PrOdId = \'' + req.params.id + '\'')
        .then(function (desc) {
            res.json(desc);
        }).catch(function(err) {
            console.log(err);
            res.json(desc);
        });
});

router.get('/completed/:of/:opr/:wrk', function(req, res, next) {
    new db.shopFloor.Request().query('SELECT ItemId, SUM(StkQty) AS StkQty, SUM(PQty) AS PQty, PUnit, SUM(SQty) AS SQty, SUnit, SUM(TQty) AS TQty, TUnit, SUM(FtQty) AS FtQty, SUM(LbQty) AS LbQty FROM CSF_ENP_TOR.dbo.SFMatl WITH (NOLOCK) WHERE CompanyId = \'ent\'  AND PrOdId = \''+ req.params.of +'\'  AND OprNum = ' + req.params.opr +'  AND WrkCtrId = \'' + req.params.wrk +'\'  AND TranType IN (\'OFF-FIN\',\'OFF-WIP\') GROUP BY ItemId, PUnit, SUnit, TUnit')
        .then(function(info) {
            res.json(info);
        }).catch(function(err) {
            console.log(err);
        })
});

router.get('/state/:of/:opr/:wrk', function(req, res, next) {
    new db2.Request().query('SELECT * FROM SF WITH (NOLOCK) WHERE  CompanyId = \'ent\'  AND  PrOdId = \''+ req.params.of +'\'  AND  OprNum = ' + req.params.opr +'  AND  WrkCtrId = \'' + req.params.wrk + '\'')
        .then(function(info) {
            res.json(info);
        }).catch(function(err) {
            console.log(err);
        })
});

module.exports = router;