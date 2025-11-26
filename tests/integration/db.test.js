const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const notesService = require("../../lab4/notesService");

let db;

beforeAll(async () => {
  db = await open({
    filename: "tests/test.sqlite",
    driver: sqlite3.Database
  });

  await notesService.createTable(db);
});

test("інтеграційний тест: робота з реальною БД", async () => {
  await notesService.addNote(db, "Integration note");

  const notes = await notesService.getNotes(db);

  expect(notes.length).toBeGreaterThan(0);
});
