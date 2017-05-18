//Modules
var express = require('express');
// var mysql = require('mysql');
// var fs = require('fs');
var bodyparser = require('body-parser');

//Defines server
var app = express();
var port = 8080;

//Initiates server
app.listen(port, function() {
    console.log('Connection successful at port ' + port);
});

app.use(express.static('app/public'));

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
        scores: [1, 5, 2, 1, 3, 1, 5, 3, 2, 5]
    },
    {
        name: 'Claire',
        photo: 'http://cdn.pcwallart.com/images/claire-forlani-meet-joe-black-wallpaper-4.jpg',
        scores: [5, 2, 5, 4, 3, 1, 1, 3, 3, 3]
    },
    {
        name: 'Leo',
        photo: 'http://cdn4.thr.com/sites/default/files/2014/11/leonardo_dicaprio.jpg',
        scores: [4, 1, 2, 4, 3, 1, 5, 5, 1, 2]
    },
    {
        name: 'Matt',
        photo: 'http://www.goodwp.com/large/201207//22818.jpg',
        scores: [3, 2, 5, 4, 5, 5, 1, 1, 3, 4]
    }
];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.text());
app.use(bodyparser.json({
    type: "application/vnd.api+json"
}));

app.get('/:path?', function(req, res) {
    var path = req.params.path;

    switch (path) {
        case ('/home'):
            res.sendFile(__dirname + '/app/public/home.html');
            break;
        case ('survey'):
            res.sendFile(__dirname + '/app/public/survey.html');
            break;
        default:
            res.sendFile(__dirname + '/app/public/home.html');
            break;
    }
})

app.post('/survey/result', function(req, res) {
    // console.log(req.body);
    var reqObj = req.body;
    console.log(reqObj);
    var reqArray = Object.keys(reqObj).map(function(key) {
        return (parseInt(reqObj[key]));
    })
    console.log(reqArray);

    var compatibility = [];
    match = "";

    for (var i = 0; i < profiles.length; i++) {
        var compScore = 0;
        for (var z = 0; z < profiles[i].scores.length; z++) {
            compScore += Math.abs(parseInt(profiles[i].scores[z]) - parseInt(reqArray[z]));
        }
        compatibility.push(compScore);
    }

    console.log(compatibility);

    match = compatibility.indexOf(Math.min.apply(Math, compatibility));
    res.json(profiles[match]);
})
