const notesService = require('../services/notesService');

async function listNotes(db) {
  const notes = await notesService.getNotes(db);
  console.log('\nНотатки:');
  notes.forEach((n) => console.log(`${n.id}: ${n.text}`));
}

async function addNote(db, text) {
  await notesService.addNote(db, text);
  console.log('Нотатку додано');
}

async function editNote(db, id, text) {
  await notesService.updateNote(db, Number(id), text);
  console.log('Оновлено');
}

async function removeNote(db, id) {
  await notesService.deleteNote(db, Number(id));
  console.log('Видалено');
}

module.exports = { listNotes, addNote, editNote, removeNote };
