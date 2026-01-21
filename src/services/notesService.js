const notesRepository = require('../repositories/notesRepository');

async function init(db) {
  await notesRepository.createTable(db);
}

async function addNote(db, text) {
  const trimmed = String(text ?? '').trim();
  if (!trimmed) throw new Error('Текст нотатки не може бути порожнім');
  return notesRepository.addNote(db, trimmed);
}

async function getNotes(db) {
  return notesRepository.getNotes(db);
}

async function updateNote(db, id, text) {
  const trimmed = String(text ?? '').trim();
  if (!Number.isInteger(id) || id <= 0) throw new Error('Некоректний ID');
  if (!trimmed) throw new Error('Текст нотатки не може бути порожнім');
  return notesRepository.updateNote(db, id, trimmed);
}

async function deleteNote(db, id) {
  if (!Number.isInteger(id) || id <= 0) throw new Error('Некоректний ID');
  return notesRepository.deleteNote(db, id);
}

module.exports = {
  init,
  addNote,
  getNotes,
  updateNote,
  deleteNote,
};
