var express = require('express');
var router = express.Router();

var app = express();
let Data = require('../models/data');

router.get('/', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  Data.aggregate([{ $group: { _id: '$modeName' } }], (e, d) => {
    var myD = d;
    if (e) {
      res.json(e);
    }

    res.render('index', { data: myD });
  });
});

router.get('/:mode', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  Data.aggregate(
    [{ $match: { modeName: myModename } }, { $group: { _id: '$jobName' } }],
    (e, d) => {
      var myD = d;
      if (e) {
        res.json(e);
      }

      res.render('home', { data: myD, mode: myModename });
    }
  );
});

module.exports = router;
