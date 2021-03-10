const path = require('path');
const fs = require('fs');


module.exports = (app) => {

    // read parsed json data and set variable for notes
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        //console.log(data);

        // =======================================================

        // GET route to get api/notes
        app.get("/api/notes", function (req, res) {
            // read and get the db.json file with saved notes as JSON.
            res.json(notes);

        });

        // POST route to post new notes
        // app.post("/api/notes", function(req, res) {
        //     // Receives a new note, adds it to db.json, then returns the new note
        //     let newNote = req.body;
        //     notes.push(newNote);
        //     updateDb();
        //     console.log(`Added new note: ${newNote.title}`);
        // });

        app.post("/api/notes", function (req, res) {
            let newNote = req.body;
            // validate note
            if(!validateNote(newNote)){
                res.status(400).send('Please provide note title and text description')
            }
            else{
                notes.push(newNote);
                updateDb();
                res.json(notes)
                // return new note obj
                console.log(`Added new note: ${newNote.title}`);
            }
        });

        // GET route for specific note by id
        app.get("/api/notes/:id", function (req, res) {
            // show notes array as json with index id
            res.json(notes[req.params.id]);
        });

        // DELETE route to delete specific note by id
        app.delete("/api/notes/:id", function (req, res) {
            // remove the selected note from db.json
            notes.splice(req.params.id, 1);
            updateDb();
            res.json(notes)
            console.log(`Deleted note with id ${req.params.id}`);
        });

        // =======================================================
        
        // Validate new note
        function validateNote(note) {
            if(!note.title || typeof note.title !== 'string'){
                return false;
            }
            if(!note.text || typeof note.text !== 'string'){
                return false;
            }
            return true;
        }

        // Update db.json whenever note is created or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes, null, 2),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
