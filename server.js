const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const util = require('util');


const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

//Get method to direct to public/notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */


//function to write to file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

//Function to read and append the file
const readAndAppend = (content, file) => {
  console.log("test");
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};




//Get method to get files from db/db.json
app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Post method to write information to db/db.json
app.post('/api/notes', (req, res) => {

    console.info (`${req.method} request received to add a review`)

    const { title, text } = req.body

        if (title && text ){
          const newNote = {
              title, 
              text, 
              id: uuid(),
          }
        readAndAppend(newNote, './db/db.json');
          res.json(`Note added successfully`);
        } else {
          res.error('Error in adding note'); 
        };
});


app.delete('/api/notes/:term', (req, res) => {

  console.info (`${req.method} request received `)
  
  readFromFile('./db/db.json').then((data) => {

    const notes = JSON.parse(data);

    const newarray =  notes.filter(note => req.params.term != note.id)

    fs.writeFile(`./db/db.json`, JSON.stringify(newarray, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ./db/db.json'`)
     );
    
    res.send("DELETE Request Called")

  });


})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);