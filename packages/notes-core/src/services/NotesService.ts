import { NotesRepository } from "../repositories/NotesRepository";
import { Note } from "../models/Note";

export class NotesService {
  constructor(private readonly repo: NotesRepository) {}

  async getNotes(): Promise<Note[]> {
    return this.repo.getAll();
  }

  async addNote(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) {
      throw new Error("Текст нотатки не може бути порожнім");
    }
    await this.repo.create(trimmed);
  }

  async updateNote(id: number, text: string): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Некоректний ID");
    }
    const trimmed = text.trim();
    if (!trimmed) {
      throw new Error("Текст нотатки не може бути порожнім");
    }
    await this.repo.update(id, trimmed);
  }

  async deleteNote(id: number): Promise<void> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Некоректний ID");
    }
    await this.repo.delete(id);
  }
}