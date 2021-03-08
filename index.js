const fs = require("fs");
const path = require("path");


function createNote(note, notesArr) {

    const newNote = note
    console.log(notesArr)
    // Push newNote to allNotes 
    notesArr.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'), JSON.stringify(notesArr, null, 2))
    return newNote;

};


function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false
    }
    if (!note.text || typeof note.text !== 'string') {
        return false
    }
    return true;
}



module.exports = {
    createNote,
    validateNote
};