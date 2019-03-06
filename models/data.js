let mongoose = require('mongoose');

//data schema

let dataSchema = new mongoose.Schema({
  modeName: {
    type: String
  },
  jobName: {
    type: String
  },
  jobId: {
    type: String
  },
  data: {
    type: Array
    //required: true
  },
  count: {
    type: Number
  },
  date: {
    type: Date,

    default: Date.now
  }
});

var MYDATA = (module.exports = mongoose.model(
  'DATA',
  dataSchema,
  'DATA',
  true
));
