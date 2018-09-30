const express = require('express');
const router = express.Router();
const MongoDB   
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

    // Upload a file from loca file-system to MongoDB
router.get('/api/file/upload', (req, res) => {

  var filename = req.query.filename;
  var writestream = gfs.createWriteStream({ filename: filename });
  fs.createReadStream("../Fractal.png").pipe(writestream);
  writestream.on('close', (file) => {
    res.send('Stored File: ' + file.filename);
  });
});

module.exports = router;
