var mongodb = require('mongodb')
var mongoose = require("mongoose")
var Url = require('./urlSchema')

mongoose.connect(process.env.MONGOLAB_URI)

var createShortUrl = function(original,done){
  var url
  Url.count({}, function (err, count) {
      url = new Url({original_url: original, short_url: count+1})
    })
  console.log(url)
  Url.findOne({original_url: original}, function(err, data){
    if (err) done(err);
    if(!data) {
      url.save(function(err, newdata){
        console.log(newdata)
        done(null, newdata)
      })
    }
    else done(null, data);
  })
}

var findShortUrl = function(original,done){
  Url.findOne({original_url: original}, function(err, data){
    if (err) done(err);
    done(null, data);
  })
}

var findOriginalUrl = function(short,done){
  Url.findOne({short_url: short}, function(err, data){
    if (err) done(err);
    done(null, data);
  })
}

exports.createShortUrl = createShortUrl;
exports.findShortUrl = findShortUrl;
exports.findOriginalUrl = findOriginalUrl;