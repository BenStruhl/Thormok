const express = require('express');
const gridfs = require('gridfs-stream');
const router = express.Router();
const MongoDB;
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Upload a file from local file-system to MongoDB
router.get('/api/file/upload', (req, res) => {

  var filename = req.query.filename;
  var writestream = gfs.createWriteStream({filename: filename});
  fs.createReadStream("../Fractal.png").pipe(writestream);
  writestream.on('close', (file) => {
    res.send('Stored File: ' + file.filename);
  });
});

router.get('/getFiles', function (req, res, next) {
  gridfs.files.find({filename}).toArray((err, files) => {
    if (err) res.send(err);
    res.json(files);
  });
});

router.post('/putFile', function (req, res, next) {
// Connect to the db
  MongoClient.connect("mongodb://66.175.211.166/test", function (err, db) {
    if (err) return console.dir(err);
    var grid = new Grid(db, 'fs');
    var buffer = new Buffer("Hello world");
    grid.put(buffer, {metadata: {category: 'text'}, content_type: 'text'}, function (err, fileInfo) {
      if (!err) {
        console.log("Finished writing file to Mongo");
      }
    });
  });
});

module.exports = router;
