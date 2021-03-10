# Express-Note-Taker

## Description:

Note Taker is an application which enables users to write, save, and delete notes.

When the user opens the Note Taker application a landing page is presented with a link to a notes page.

When clicked, the link presents the user with a notes page that displays existing notes, if any, listed in the left-hand column.
The right-hand column presents empty fields to enter a new note.

In the empty fields, the user can enter a new note title, note text/description, and can save the note by clicking the Save icon at the top-right of the navigation.

New saved notes will appear in the left-hand column with existing notes, if any.

User can click on an existing note, and it will appears in the right-hand column so it can be updated. Clicking Save will save the changes.

A New Note can be created by clicking on the Write icon at the top right of navigation bar. 



**Deployed Application:**  <https://express-notetkr.herokuapp.com/>


## Routes Implemented:

**HTML routes were created:**

* GET /notes - Should return the notes.html file.

* GET * - Should return the index.html file

* The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.


**API routes should be created:**

* GET /api/notes - Should read the db.json file and return all saved notes as JSON.

* POST /api/notes - Should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

* DELETE /api/notes/:id - Should recieve a query paramter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.