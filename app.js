let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var api = require('./routes/api.js');
var MYDATA = require('./models/data');
var URI = require('./constants/constant');
//mongoose.connect('mongodb://127.0.0.1:27017/MS3LiveDataDB', {
// useNewUrlParser: true
//});

mongoose.connect(URI, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log(`connected to ${res.db.s.databaseName} Database`);
  console.log(`On host: ${res.host}`);
});

console.log(URI);
let db = mongoose.connection;

//db error
db.on('error', err => {
  console.log(err);
});

//db connected
db.once('open', () => {
  console.log('mongo is Live');
});

//initialise express
let app = express();

// bring in Model
let Data = require('./models/data');

//Data.collection.collectionName = 'DATA';
//Data.collection.name = 'DATA';
//console.log(Data.collection);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//some application states
let states = {
  errors: null,
  info: null
};

app.use('/api', api);

app.get('/', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  Data.aggregate([{ $group: { _id: '$modeName' } }], (e, d) => {
    var myD = d;
    if (e) {
      res.json(e);
    }
    console.log(myD);

    res.render('index', { data: myD });
  });
});

app.get('/:mode', (req, res) => {
  var myModename = req.params.mode;
  var myData = '';
  Data.aggregate(
    [{ $match: { modeName: myModename } }, { $group: { _id: '$jobName' } }],
    (e, d) => {
      var myD = d;
      if (e) {
        res.json(e);
      }
      console.log(myD);

      res.render('home', { data: myD, mode: myModename });
    }
  );
});

//routes

// launch server .... listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
