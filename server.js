//Modules
var express = require('express');
// var mysql = require('mysql');
// var fs = require('fs');
var bodyparser = require('body-parser');
var path = require('path');

//Defines server
var app = express();
var port = process.env.PORT || 8080;

//Initiates server
app.listen(port, function() {
    console.log('Connection successful at port ' + port);
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: "application/vnd.api+json" }));
app.use(express.static(__dirname + '/app/public'));
// app.use(express.static('app/'));
// app.use(express.static('app/public/'));

//Global variables
var match;
var profiles = [{
        name: 'Jim',
        photo: 'https://tribzap2it.files.wordpress.com/2015/10/jim-jefferies-stand-up-getty.jpg',
        scores: [4, 5, 2, 4, 3, 1, 1, 1, 3, 5]
    },
    {
        name: 'Kate',
        photo: 'https://static1.gamespot.com/uploads/original/355/3557156/2550862-3920783094-51bac.jpg',
        scores: [1, 5, 2, 1, 3, 1, 5, 2, 3, 5]
    },
    {
        name: 'Claire',
        photo: 'http://cdn.pcwallart.com/images/claire-forlani-meet-joe-black-wallpaper-4.jpg',
        scores: [5, 2, 5, 4, 3, 1, 1, 3, 3, 3]
    },
    {
        name: 'Leo',
        photo: 'http://cdn4.thr.com/sites/default/files/2014/11/leonardo_dicaprio.jpg',
        scores: [2, 3, 2, 5, 3, 1, 5, 4, 1, 2]
    },
    {
        name: 'Matt',
        photo: 'http://www.goodwp.com/large/201207//22818.jpg',
        scores: [3, 2, 5, 4, 5, 5, 1, 1, 3, 4]
    },
    {
        name: 'Will',
        photo: 'https://i.cbc.ca/1.3524802.1460035717!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/will-ferrell-on-stroumboulopoulos.jpg',
        scores: [4, 4, 5, 4, 5, 4, 3, 1, 1, 2]
    },
    {
        name: 'Chloe',
        photo: 'http://www.speakerscorner.me/wp-content/uploads/2016/05/chloe24.jpg',
        scores: [3, 4, 4, 3, 4, 1, 4, 1, 1, 5]
    },
    {
        name: 'Snooki',
        photo: 'http://www.hollywoodnews.com/wp-content/uploads/2010/08/nicole-snooki-jersey-shore-600x280-prphotos1.jpg',
        scores: [1, 5, 1, 1, 1, 1, 2, 5, 3, 3]
    }
];

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app, profiles);
