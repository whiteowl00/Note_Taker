const fs = require("fs")
const database = require("../db/db.json")

// Creating the id to delete
let id = database.length + 1

module.exports = function (app) {

    // Creating the API Routes
    app.get("/api/notes", function (req, res) {
        res.json(database)
    })
    // Create a post for our API
    app.post("/api/notes", function (req, res) {
        req.body.id = id++;
        database.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
            if (err) throw err
        })
        res.json(database)

    })
    // Update the notes as needed
    app.patch('/api/notes/:id', function (req, res) {
        if (req.body._id && req.body._id != req.params.id) return res.status(400).json({ error: 'ID in the body is not matching ID in the URL' })
        delete req.body._id
        req.collection.updateById(req.params.id, { $set: req.body }, function (e, results) {
            console.log('boo', e, results)
            res.json(results)
        })
    })
    // Delete all the notes
    app.delete("/api/notes/:id", function (req, res) {
        let getId = req.params.id

        for (let index = 0; index < database.length; index++) {
            if (database[index].id === parseInt(getId)) {
                database.splice(index, 1);
            }
        }
        fs.writeFile("./db/db.json", JSON.stringify(database), function (err) {
            if (err) throw err
        })
        res.json(database)

    })

}