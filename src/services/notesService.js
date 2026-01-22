class NotesService {
  constructor(repo) {
    this.repo = repo;
  }

  async init(db) {
    await this.repo.createTable(db);
  }

  async addNote(db, text) {
    const trimmed = String(text ?? '').trim();
    if (!trimmed) throw new Error('Текст нотатки не може бути порожнім');
    return this.repo.addNote(db, trimmed);
  }

  async getNotes(db) {
    return this.repo.getNotes(db);
  }

  async updateNote(db, id, text) {
    const trimmed = String(text ?? '').trim();
    if (!Number.isInteger(id) || id <= 0) throw new Error('Некоректний ID');
    if (!trimmed) throw new Error('Текст нотатки не може бути порожнім');
    return this.repo.updateNote(db, id, trimmed);
  }

  async deleteNote(db, id) {
    if (!Number.isInteger(id) || id <= 0) throw new Error('Некоректний ID');
    return this.repo.deleteNote(db, id);
  }
}

module.exports = NotesService;
