
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const htmlRts = require('./routes/html-routes');

app.use(express.static("public"));
app.use('/', htmlRts);

// GET request to display Notes
app.get('/api/notes', function (req, res) {

  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    // set note data to array
    let noteData = [];
    if (err) { throw err; }

    if (data.length > 2) {
      noteData = JSON.parse(data);
      res.send(noteData);
    }
    else {
      console.log('There are no saved notes.');
    }
  })
});

// POST request to create new note
app.post('/api/notes', (req, res) => {
  
  let newNote = req.body;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    else if (data.length > 2) {
      // parse thru db data
      obj = JSON.parse(data);
      // push new note to obj array
      obj.push(newNote);

      fs.writeFile('./db/db.json', JSON.stringify(obj, null, 2), err => {
        if (err) { throw err; }
        // write new note into db.json body
        console.log('Note was saved!')
      });
    }
    else {
      obj = [];
      obj.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(obj, null, 2), err => {
        if (err) { throw err; }
        console.log('Note was saved!')
      });
    }
  });
});

// // DELETE request
app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) { throw err; }

    let newNotesObj = JSON.parse(data);
    let noteId = req.params.id 
    for (let i = 0; i < newNotesObj.length; i++) {
      if (noteId == newNotesObj[i].id) {
        newNotesObj.splice(i, 1);
      }
      else {
        console.log('There is not matching id')
      }
    }

    const output = fs.writeFile('./db/db.json', JSON.stringify(newNotesObj, null, 2), err => {
      if (err) { throw err; }
      console.log('Note rewritten');
    })
    res.send(output);
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});