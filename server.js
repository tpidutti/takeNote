const express = require("express");
const fs = require("fs");
const path = require("path");
const SaveNote = require ("./SaveNote");

// initailize the app, create port
const app = express();
const PORT =process.env.PORT || 8080;

// Middleware Functions
// sets up express to handle parsing data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
// static file hosts all files in public folder
app.use(express.static("public"));


// html routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});


// api routes
app.get("/api/notes", (req, res) => {
    // retrieve all notes and res.json them back to the front end

    readAllNotes()
// returns a promise, the successful completion of an operation's value in the form of an object
.then((notes) => res.json(notes))
// respond with error message, generic internal server issue, if failure
.catch((err) => res.status(500).json(err));
    
});

app.post("/api/notes", (req, res) => {
    // creates a note from req.body
    
SaveNote
    
});

app.delete("/api/notes/:id", (req, res) => {
    // delete a note based off id
    const { id } = req.params;

// start server on port
app.listen(PORT, () => console.log("App listening on PORT" + PORT));

