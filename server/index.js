const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

var port = process.env.PORT || 1320;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
