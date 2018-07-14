const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const exec = require('child_process').exec;
const formidable = require('formidable');
const fs = require('fs');
const unzip = require('unzip');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory);

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

var port = process.env.PORT || 1320;

app.get('/worlds', (req, res)=>{
  res.send(JSON.stringify(getDirectories(__dirname + '/../client/dist')));
});

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (files.file === undefined) {
      return;
    }
    var oldpath = files.file.path;
    var newpath = path.join(__dirname, files.file.name);
    fs.rename(oldpath, newpath, function(err) {
      if (err)
        return console.error(err);
      fs.createReadStream(path.join(__dirname, files.file.name))
      .pipe(unzip.Extract({path: __dirname}))
      .on('close', () => {
        let randomDir = files.file.name.slice(0, -4) + "-" + Math.random() * Number.MAX_SAFE_INTEGER;
        exec(`overviewer.py ${path.join(__dirname, files.file.name.slice(0, -4))} ${path.join(__dirname + `/../client/dist/${randomDir}`)}`, (err, stdo, stde) => {
          exec(`find ${__dirname} -not -name 'index.js' -delete`);
          res.send(randomDir);
        });
      });
    });
  });
  //save some space
  //external command curl --upload-file transfer.sh <myfile>
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
