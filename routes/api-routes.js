// set db.json to variable 
const db = require("../db/db.json");
// use fs to store and retrieve notes from db.json
const fs = require("fs");
// use uuid to
const uuid = require("uuid/v4");

module.exports = function (app) {
    // GET request
    app.get("/api/notes", function (req, res) {
        res.send(db);
    });

    // POST request using uuid to assign note an id
    app.post("/api/notes", function (req, res) {

        let noteId = uuid();
        let newNote = {
            id: noteId,
            title: req.body.title,
            text: req.body.text
        };

        // Use fs to pull data from db.json
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            // Set variable for pulled data
            const allNotes = JSON.parse(data);
            // Push newNote to allNotes 
            allNotes.push(newNote);

            // Use fs to write new note 
            fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("New note created!")
            });
        });
    });

    app.delete("/api/notes/:id", (req, res) => {

        let noteId = req.params.id;

        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;

            const allNotes = JSON.parse(data);
            // Set newAllNotes to hold updated notes
            const newAllNotes = allNotes.filter(note => note.id != noteId);

            fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
                if (err) throw err;
                res.send(db);
                console.log("The note was deleted!")
            });
        });
    });
};