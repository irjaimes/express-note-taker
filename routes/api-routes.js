const path = require('path');
const fs = require('fs');

module.exports = (app) => {

    // read parsed json data and set variable for notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        //console.log(data);
        
        // GET route to get api/notes
        app.get("/api/notes", function (req, res) {
            // read and get the db.json file with saved notes as JSON.
            res.json(notes);
            
        });

        // POST route to post new notes
        app.post("/api/notes", function (req, res) {
            // set up new note
            let newNote = req.body;
            console.log(newNote);
            // add new note to db.json
            notes.push(newNote);
            updateDb();
            // return new note obj
            return console.log(`Added new note: ${newNote.title}`);
        });

        // GET route for specific note by id
        app.get("/api/notes/:id", function (req, res) {
            // show notes array as json with index id
            res.json(notes[req.params.id]);
        });


        // function to update db.json whenever note is created or deleted
        function updateDb() {
            fs.writeFileSync("../db/db.json", JSON.stringify(notes, null, 2), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
