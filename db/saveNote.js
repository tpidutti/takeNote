const express = require("express");
const fs = require("fs");
const util = require("util");
const db = require("./db.json");

// takes a function and returns a version that gives promises
const writeNote = util.promisify(fs.writeFile);
const readNote = util.promisify(fs.readFile);

class SaveNote {
    // read note from db.json file
   read(){
       return readNote("db/db.json", "utf-8");
   };
//    writes note in db.json as strigified json data
   write(note){
    return writeNote("db/db.json", JSON.stringify(note))
   };
//    takes read and written note and returns them as json parsed data
   readAllNotes(){
       return this.read().then(response => [...JSON.parse(response)])    
    };
// a note object has id, title and text properties
    addNote(note){
    const newNote = {
        id: db.length+1,
        title: note.title,
        text: note.text,
    }
    // the total of all notes is combined with new note through spreading so all parts are included in the addition.  This is written with all the notes
    return this.readAllNotes().then(response => [...response, newNote]).then(response => this.write(response)).then(() => this.readAllNotes())
    };
// create a new array that excludes the note with the id that we want to delete
    deleteANote(id) {
        return this.readAllNotes().then(response => response.filter(note => note.id !==id))
    };
}

// makes accessilbe to use in server.js
module.exports = new SaveNote()