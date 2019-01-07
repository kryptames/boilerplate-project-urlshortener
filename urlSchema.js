var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url:{
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)