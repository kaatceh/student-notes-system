const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const notesService = require('../../src/services/notesService');

let db;

beforeAll(async () => {
  db = await open({
    filename: 'tests/test.sqlite',
    driver: sqlite3.Database,
  });

  await notesService.init(db);
});

test('інтеграційний тест: робота з реальною БД', async () => {
  await notesService.addNote(db, 'Integration note');

  const notes = await notesService.getNotes(db);

  expect(notes.length).toBeGreaterThan(0);
});
test('інтеграція: updateNote і deleteNote реально змінюють БД', async () => {
  await notesService.addNote(db, 'A');
  const all1 = await notesService.getNotes(db);
  const id = all1[all1.length - 1].id;

  await notesService.updateNote(db, id, 'B');
  const all2 = await notesService.getNotes(db);
  expect(all2.find((n) => n.id === id).text).toBe('B');

  await notesService.deleteNote(db, id);
  const all3 = await notesService.getNotes(db);
  expect(all3.find((n) => n.id === id)).toBeUndefined();
});
