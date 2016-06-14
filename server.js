var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var config = require('./config');

app.use(bodyParser.json());
app.use(require("./auth"));
app.use("/api/machine", require("./controllers/api/machine"));
app.use("/api/of", require("./controllers/api/of"));
app.use("/api/slit", require('./controllers/api/slit'));
app.use("/api/printer", require('./controllers/api/printer'));
app.use("/api/supervisor", require('./controllers/api/supervisor'));

app.use("/",require("./controllers/static"));
/*app.use("/machine/:id",require("./controllers/machine"));*/


app.listen(config.PORT, function() {
    console.log('Server listening on ', config.PORT);
})