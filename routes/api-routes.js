const app = require("express").app;
const db = require("../db/db.json");
const {createNote, validateNote} = require("../index")
const fs = require("fs");

// GET request
app.get("/api/notes", function (req, res) {
    res.JSON(db);
});

// POST request 
app.post("/api/notes", (req, res) => {
    req.body.id = db.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('Please enter valid note title and text description!');
    }
    else {
        const newNote = createNote(req.body, notes)
        res.json(newNote)
    }
});

// DELETE request
app.delete("/api/notes/:id", (req, res) => {

    let noteId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        const allNotes = JSON.parse(data);
        // Set allNewNotes to hold updated notes
        const allNewNotes = allNotes.filter(note => note.id != noteId);

        fs.writeFile("./db/db.json", JSON.stringify(allNewNotes, null, 2), err => {
            if (err) throw err;
            res.send(db);
            console.log("The note was deleted!")
        });
    });
});

module.exports = app;