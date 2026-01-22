const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const notesService = require('../../src/services/notesService');

let db;

beforeAll(async () => {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await notesService.init(db);
});

test('addNote додає нотатку', async () => {
  await notesService.addNote(db, 'Test note');

  const notes = await notesService.getNotes(db);

  expect(notes.length).toBe(1);
  expect(notes[0].text).toBe('Test note');
});
test('addNote кидає помилку якщо текст порожній або з пробілів', async () => {
  await expect(notesService.addNote(db, '')).rejects.toThrow('Текст нотатки не може бути порожнім');
  await expect(notesService.addNote(db, '   ')).rejects.toThrow(
    'Текст нотатки не може бути порожнім'
  );
});

test('updateNote кидає помилку якщо id некоректний', async () => {
  await expect(notesService.updateNote(db, 0, 'x')).rejects.toThrow('Некоректний ID');
  await expect(notesService.updateNote(db, -1, 'x')).rejects.toThrow('Некоректний ID');
  await expect(notesService.updateNote(db, 1.5, 'x')).rejects.toThrow('Некоректний ID');
});

test('updateNote кидає помилку якщо текст порожній або з пробілів', async () => {
  await expect(notesService.updateNote(db, 1, '')).rejects.toThrow(
    'Текст нотатки не може бути порожнім'
  );
  await expect(notesService.updateNote(db, 1, '   ')).rejects.toThrow(
    'Текст нотатки не може бути порожнім'
  );
});

test('deleteNote кидає помилку якщо id некоректний', async () => {
  await expect(notesService.deleteNote(db, 0)).rejects.toThrow('Некоректний ID');
  await expect(notesService.deleteNote(db, -2)).rejects.toThrow('Некоректний ID');
  await expect(notesService.deleteNote(db, 2.2)).rejects.toThrow('Некоректний ID');
});
