const path = require('path');
const fs = require('fs');


module.exports = (app) => {

    // read parsed json data and set variable for notes
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        //console.log(data);

        // =======================================================

        // GET route to get api/notes
        app.get("/api/notes", function (req, res) {
            // read and get the db.json file with saved notes as JSON.
            res.json(notes);

        });

        // POST route to post new notes
        app.post("/api/notes", function(req, res) {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            console.log(`Added new note: ${newNote.title}`);
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
            console.log(`Deleted note with id ${req.params.id}`);
        });

        // =======================================================
        
        // GET requests to serve HTML
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Display index.html when all other routes are accessed
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // Update db.json whenever note is created or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
