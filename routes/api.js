var express = require('express');
var router = express.Router();

var app = express();
let Data = require('../models/data');

router.get('/', (req, res) => {
  Data.find({}, (err, myD) => {
    if (err) {
      console.log(err);
      return;
    }

    res.json(myD);
  })
    .limit(50)
    .sort({ date: -1 });
});

router.get('/:mode', (req, res) => {
  console.log(req.params.mode);
  var myModename = req.params.mode;
  Data.aggregate(
    [{ $match: { modeName: myModename } }, { $group: { _id: '$jobName' } }],
    (err, d) => {
      if (err) {
        res.json(e);
      }
      res.json(d);
    }
  );
});

module.exports = router;
