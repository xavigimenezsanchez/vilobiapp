/* Express as frameWork */
var express = require("express");
/* bodyParser as middleware for handle json */
var bodyParser = require("body-parser");
var app = express();

/* config.js sets the configuration */
var config = require('./config');

app.use(bodyParser.json());

app.use(require("./auth"));  /*In future if it wants to implement authentication */

/* Serve api restFull */
app.use("/api/machine", require("./controllers/api/machine"));
app.use("/api/of", require("./controllers/api/of"));
app.use("/api/slit", require('./controllers/api/slit'));
app.use("/api/printer", require('./controllers/api/printer'));
app.use("/api/supervisor", require('./controllers/api/supervisor'));
app.use("/api/bom", require('./controllers/api/bom'));
app.use("/api/material", require('./controllers/api/material'));

app.use("/",require("./controllers/static"));  /* Serve static content */



app.listen(config.PORT, function() {
    console.log('Server listening on ', config.PORT);
})