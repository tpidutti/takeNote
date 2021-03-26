// const express = require("express");
const fs = require("fs");
const util = require("util");
const db = require("./db.json");

// takes a function and returns a version that gives promises
const writeNote = util.promisify(fs.writeFile);
const readNote = util.promisify(fs.readFile);

class SaveNote {
   read(){
       return readNote("db/db.json", "utf-8");
   };
   write(note){
    return writeNote("db/db.json", JSON.stringify(note))
   };
   readAllNotes(){
       return this.read().then(response => [...JSON.parse(response)])    
    };

    addNote(note){
    const newNote = {
        id: db.length+1,
        title: note.title,
        text: note.text,
    }
    return this.readAllNotes().then(response => [...response, newNote]).then(response => this.write(response)).then(() => this.readAllNotes())
    };

    deleteANote(id) {
        return this.readAllNotes().then(response => response.filter(note => note.id !==id))
    };
}

module.exports = new SaveNote()