const readline = require('readline');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const notesService = require('./notesService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let db;

async function initDb() {
  db = await open({
    filename: './lab4/db.sqlite',
    driver: sqlite3.Database,
  });

  await notesService.createTable(db);
}

function showMenu() {
  console.log('\nStudent Notes System');
  console.log('1 - Переглянути нотатки');
  console.log('2 - Додати нотатку');
  console.log('3 - Редагувати нотатку');
  console.log('4 - Видалити нотатку');
  console.log('0 - Вийти');

  rl.question('Оберіть дію: ', handleMenu);
}

function handleMenu(choice) {
  switch (choice) {
    case '1':
      listNotes();
      break;
    case '2':
      addNote();
      break;
    case '3':
      editNote();
      break;
    case '4':
      deleteNote();
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('Невірний вибір');
      showMenu();
  }
}

async function listNotes() {
  const notes = await notesService.getNotes(db);
  console.log('\nНотатки:');
  notes.forEach((n) => console.log(`${n.id}: ${n.text}`));
  showMenu();
}

function addNote() {
  rl.question('Введіть текст нотатки: ', async (text) => {
    await notesService.addNote(db, text);
    console.log('Нотатку додано');
    showMenu();
  });
}

function editNote() {
  rl.question('ID нотатки: ', (id) => {
    rl.question('Новий текст: ', async (text) => {
      await notesService.updateNote(db, Number(id), text);
      console.log('Оновлено');
      showMenu();
    });
  });
}

function deleteNote() {
  rl.question('ID нотатки: ', async (id) => {
    await notesService.deleteNote(db, Number(id));
    console.log('Видалено');
    showMenu();
  });
}

(async () => {
  await initDb();
  showMenu();
})();
