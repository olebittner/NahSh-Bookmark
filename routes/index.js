var express = require('express');
var router = express.Router();
const hafas = require('nahsh-hafas');
const dateFormat = require('dateformat');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stations', function(req, res, next) {
  hafas.locations(req.query.s, {addresses: false, poi: false, linesOfStops: true, language: 'de'})
      .then(function (locations) {
        //res.send(locations);
        res.render('stations', {stations: locations});
      });
});

router.get('/departures', function(req, res, next) {
  var time = new Date();
  if (req.query.time) {
    const h = parseInt(req.query.time.substr(0, 2));
    const min = parseInt(req.query.time.substr(2, 2));
    if (!isNaN(h) && !isNaN(min))
      time.setHours(h, min, 0);
  }
  var dur = parseInt(req.query.d);
  if (isNaN(dur))
    dur = 30;
  hafas.departures(req.query.id, {when: time, duration: dur, language: 'de'})
      .then(function (departures) {
        //res.send(departures);
        res.render('departures', {departures: departures, dateFormat: dateFormat});
      });
});

module.exports = router;
