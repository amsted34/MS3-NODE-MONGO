let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var api = require('./routes/api.js');
var jobs = require('./routes/jobs.js');
var MYDATA = require('./models/data');
var URI = require('./constants/URI');

//Mongo connction with mongoose - URI is the mongodb connection either mongodb://localhost:27017 or online cluster see your mongodb settings
mongoose.connect(URI, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    console.log(err);
  }
  console.log(`connected to ${res.db.s.databaseName} Database`);
  console.log(`On host: ${res.host}`);
});

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

// bring in Models
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

//routes -- go to routes Folder for details
app.use('/api', api);
app.use('/', jobs);

// launch server .... listening on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
