module.exports = function(app, profiles) {

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
}
