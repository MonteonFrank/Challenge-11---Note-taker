# Challenge-11-Note Taker

<h1>Note Taker ReadMe<h1>

<h2><strong>Description</strong></h2>

<p>Challenge 11 consisted of finishing a partial code that was given which creates, stores and deletes notes using Express. For this activity, we used the GET, POST, DELETE methods as well as Middleware seen during class. </p>
  
<p>When the user opens the web page, old notes can be seen on the left column and a blank page on the right column for the user to create a new note. Upon writing a new note, a save button on the top will be shown and once the user completes their note, they can click it to save it and it will automatically appear on the left column. Additionally, upon clicking the save button, the right column will become blank for a new note to be created .</p> 
  
<p><Lastly, upon selecting different notes from the left, their content will be shown on the right and if a note is no longer needed, the user can delete it by clicking on the trash can icon. This will automatically delete the note and will disappear from the left column /p>
 
 
<h2><strong>Programming Logic</strong></h2>

<p>Since a partial code was given, only the routes using express were added. For this, the GET method was used to obtain the informaiton from the db.json file (where the notes are stores), the POST method to store information and lastly, the DELETE method to eliminate notes no longer used. </p>
  
<p>For the POST method, I used the read and write functions seen during the class and from the file system module. Upon receiving the request to add a new note, the information is then stored into a variable, then we read the db.json file, append the new content received and lastly, write the file again but now with the new informaiton appended before.</p>

<p>For the DELETE method, the filter function was used in order to identify the ID of the note selected and take it out from the array. With the inormation returned from the filter function, this is added into a new array (but with out the selected item) and then writen into the db.json file.</p>
  
  
<h2><strong>What did I learn?</strong></h2>

 <p>For this activity, I learned that Express issed to connect the different files and to ensure they work, we use Insomnia or Postman to validate if the routes are providing information, storing information and deleting information correctly.</p>

<h2><strong>Link to the deployed app</strong></h2>
<p>Live URL through Heroku</p>
  
https://notetaker-fm1234.herokuapp.com/
 
