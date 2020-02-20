const express = require('express');
const router = express.Router();
const hafas = require('nahsh-hafas');
const dateFormat = require('dateformat');

/* GET home page. */
/*router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});*/

router.get('/', function (req, res, next) {
    if (req.query.s) {
        hafas.locations(req.query.s, {addresses: false, poi: false, linesOfStops: true, language: 'de'})
            .then(function (locations) {
                //res.send(locations);
                res.render('stations', {title: req.query.s, stations: locations});
            });
    } else {
        res.render('search', {title: "NahSH - Bookmark"})
    }
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
    hafas.location(req.query.id, {language: 'de'}).then(
        function (stop) {
            function render(departures) {
                res.render('departures',
                    {
                        title: stop.name,
                        departures: departures,
                        dateFormat: dateFormat
                    });
            }
            hafas.departures(req.query.id, {when: time, duration: dur, language: 'de'})
                .then(function (d) {
                    render(d)
                });
        });
});

module.exports = router;
