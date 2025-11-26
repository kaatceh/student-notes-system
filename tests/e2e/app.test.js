const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const notesService = require("../../lab4/notesService");

test("E2E: повний сценарій додавання та читання нотатки", async () => {
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database
  });

  await notesService.createTable(db);

  await notesService.addNote(db, "E2E note");

  const notes = await notesService.getNotes(db);

  expect(notes.length).toBe(1);
  expect(notes[0].text).toBe("E2E note");
});
