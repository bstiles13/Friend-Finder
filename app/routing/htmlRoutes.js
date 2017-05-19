var path = require('path');

module.exports = function(app) {

    app.get('/:url?', function(req, res) {
        var url = req.params.url;

        switch (url) {
            case ('/home'):
                res.sendFile(path.join(__dirname + '/../public/home.html'));
                break;
            case ('survey'):
                res.sendFile(path.join(__dirname + '/../public/survey.html'));
                break;
            default:
                res.sendFile(path.join(__dirname + '/../public/home.html'));
                break;
        }
    })

}
