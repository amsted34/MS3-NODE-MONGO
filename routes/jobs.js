var express = require('express');
var router = express.Router();

var app = express();
let Data = require('../models/data');

router.get('/', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  var time = new Date().getTime();
  Data.aggregate([{ $group: { _id: '$modeName' } }], (e, d) => {
    var myD = d;
    if (e) {
      res.json(e);
    }

    res.render('index', { data: myD });
    console.log(`/ time: ${new Date().getTime() - time}ms`);
  });
});

router.get('/:mode', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  var time = new Date().getTime();

  Data.aggregate(
    [{ $match: { modeName: myModename } }, { $group: { _id: '$jobName' } }],
    (e, d) => {
      var myD = d;
      if (e) {
        res.json(e);
      }

      res.render('home', { data: myD, mode: myModename });
      console.log(`/:mode time: ${new Date().getTime() - time}ms`);
    }
  );
});

module.exports = router;
