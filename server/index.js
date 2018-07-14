const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

var port = process.env.PORT || 1320;

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldpath = files.file.path;
    var newpath = path.join(__dirname, files.file.name);
    fs.rename(oldpath, newpath, function(err) {
      if (err)
        throw err;
      res.end();
    });
  });
  //external command curl --upload-file transfer.sh <myfile>
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
