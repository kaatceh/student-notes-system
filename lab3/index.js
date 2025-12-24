const readline = require('readline');

let notes = [
  { id: 1, text: 'Підготуватися до лабораторної роботи' },
  { id: 2, text: 'Прочитати матеріал з Node.js' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

function listNotes() {
  console.log('\nНотатки:');
  notes.forEach((note) => console.log(`${note.id}: ${note.text}`));
  showMenu();
}

function addNote() {
  rl.question('Введіть текст нотатки: ', (text) => {
    notes.push({ id: notes.length + 1, text });
    console.log('Нотатку додано');
    showMenu();
  });
}

function editNote() {
  rl.question('ID нотатки: ', (id) => {
    const note = notes.find((n) => n.id === Number(id));
    if (!note) return showMenu();
    rl.question('Новий текст: ', (text) => {
      note.text = text;
      console.log('Оновлено');
      showMenu();
    });
  });
}

function deleteNote() {
  rl.question('ID нотатки: ', (id) => {
    notes = notes.filter((n) => n.id !== Number(id));
    console.log('Видалено');
    showMenu();
  });
}

showMenu();
