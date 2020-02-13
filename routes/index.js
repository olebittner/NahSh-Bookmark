var express = require('express');
var router = express.Router();
const hafas = require('nahsh-hafas');
const dateFormat = require('dateformat');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/stations', function (req, res, next) {
    hafas.locations(req.query.s, {addresses: false, poi: false, linesOfStops: true, language: 'de'})
        .then(function (locations) {
            //res.send(locations);
            res.render('stations', {stations: locations});
        });
});

router.get('/departures', function (req, res, next) {
    let time = new Date();
    if (req.query.time) {
        const h = parseInt(req.query.time.substr(0, 2));
        const min = parseInt(req.query.time.substr(2, 2));
        if (!isNaN(h) && !isNaN(min))
            time.setHours(h, min, 0);
    }
    let dur = parseInt(req.query.d);
    if (isNaN(dur))
        dur = 30;
    hafas.departures(req.query.id, {when: time, duration: dur, language: 'de'})
        .then(function (departures) {
            let title = "Departures";
            if (departures.length > 0)
                title = departures[0].station.name || title;
            res.render('departures',
                {
                    title: title,
                    departures: departures,
                    dateFormat: dateFormat
                });
        });
});

module.exports = router;
