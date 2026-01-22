const readline = require('readline');
const { openDb } = require('./db/sqlite');

const NotesService = require('./services/notesService');
const notesRepository = require('./repositories/notesRepository');
const notesService = new NotesService(notesRepository);

const notesRoutes = require('./routes/notesRoutes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let db;

async function initDb() {
  db = await openDb();
  await notesService.init(db);
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

async function handleMenu(choice) {
  try {
    switch (choice) {
      case '1':
        await notesRoutes.listNotes(db);
        return showMenu();
      case '2':
        return rl.question('Введіть текст нотатки: ', async (text) => {
          try {
            await notesRoutes.addNote(db, text);
          } catch (e) {
            console.log(e.message);
          }
          showMenu();
        });
      case '3':
        return rl.question('ID нотатки: ', (id) => {
          rl.question('Новий текст: ', async (text) => {
            try {
              await notesRoutes.editNote(db, id, text);
            } catch (e) {
              console.log(e.message);
            }
            showMenu();
          });
        });
      case '4':
        return rl.question('ID нотатки: ', async (id) => {
          try {
            await notesRoutes.removeNote(db, id);
          } catch (e) {
            console.log(e.message);
          }
          showMenu();
        });
      case '0':
        rl.close();
        return;
      default:
        console.log('Невірний вибір');
        return showMenu();
    }
  } catch (e) {
    console.log(e.message);
    showMenu();
  }
}

(async () => {
  await initDb();
  showMenu();
})();
