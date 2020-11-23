const path = require("path")

module.exports = function (html) {
    html.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    html.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })
}