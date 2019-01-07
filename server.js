'use strict';

var express = require('express');
var bodyParser = require('body-parser')
var dns = require('dns')
var parse = require('url-parse');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

var createShortUrl = require('./shortener').createShortUrl
var findOriginalUrl = require('./shortener').findOriginalUrl
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/shorturl/:num", function(req,res){
  findOriginalUrl(req.params.num, function(err, data){
    res.redirect(data.original_url)
  })
})

app.post("/api/shorturl/new", function(req,res){
  let host = req.body.url;
  dns.lookup(parse(host).hostname, function(err, address, family){
    console.log(err, address, family)
    if (err) res.send({"error":"invalid URL"})
    else {
      createShortUrl(host, function(err, data){
        res.send({original_url: data.original_url, short_url: data.short_url})
      })
    }
  })
})


app.listen(port, function () {
  console.log('Node.js listening ...');
});