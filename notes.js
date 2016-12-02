const fs =require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch (e) {
    return [];
  }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNoteDiff = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title : title,
    body : body
  };

  var duplicateNotes = notes.filter( (note)=> {
    return note.title === title;
  });

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};

var getAll = () => {
  return fetchNotes();
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter ((note) => {
    return note.title !== title;
  });
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

 var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter( (note)=> {
      return note.title === title;
    });
    return filteredNotes[0];
 };

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title : ${note.title}`);
  console.log(`Body : ${note.body}`);
};

module.exports = {
  addNote : addNoteDiff,
  getAll : getAll ,
  removeNote : removeNote,
  getNote : getNote,
  logNote : logNote
};
