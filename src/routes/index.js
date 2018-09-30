const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/putFile', function(req, res, next) {
// Connect to the db
  MongoClient.connect("mongodb://66.175.211.166/test", function(err, db) {
    if(err) return console.dir(err);
    var grid = new Grid(db, 'fs');
    var buffer = new Buffer("Hello world");
    grid.put(buffer, {metadata:{category:'text'}, content_type: 'text'}, function(err, fileInfo) {
      if(!err) {
        console.log("Finished writing file to Mongo");
      }
    });
  });
});

module.exports = router;
