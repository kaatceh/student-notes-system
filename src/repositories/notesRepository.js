async function createTable(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL
    )
  `);
}

async function addNote(db, text) {
  return db.run('INSERT INTO notes (text) VALUES (?)', text);
}

async function getNotes(db) {
  return db.all('SELECT * FROM notes');
}

async function updateNote(db, id, text) {
  return db.run('UPDATE notes SET text = ? WHERE id = ?', text, id);
}

async function deleteNote(db, id) {
  return db.run('DELETE FROM notes WHERE id = ?', id);
}

module.exports = {
  createTable,
  addNote,
  getNotes,
  updateNote,
  deleteNote,
};
