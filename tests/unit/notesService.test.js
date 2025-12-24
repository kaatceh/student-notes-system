const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const notesService = require('../../lab4/notesService');

let db;

beforeAll(async () => {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await notesService.createTable(db);
});

test('addNote додає нотатку', async () => {
  await notesService.addNote(db, 'Test note');

  const notes = await notesService.getNotes(db);

  expect(notes.length).toBe(1);
  expect(notes[0].text).toBe('Test note');
});
