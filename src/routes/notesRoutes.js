const notesRepository = require('../repositories/notesRepository');

async function listNotes(db) {
  const notes = await notesRepository.getNotes(db);
  notes.forEach((n) => console.log(`${n.id}: ${n.text}`));
}

async function addNote(db, text) {
  await notesRepository.addNote(db, text);
}

async function editNote(db, id, text) {
  await notesRepository.updateNote(db, Number(id), text);
}

async function removeNote(db, id) {
  await notesRepository.deleteNote(db, Number(id));
}

module.exports = {
  listNotes,
  addNote,
  editNote,
  removeNote,
};
