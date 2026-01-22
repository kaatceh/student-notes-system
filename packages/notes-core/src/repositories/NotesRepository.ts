import type { Note } from "../models/Note";

export interface NotesRepository {
  getAll(): Promise<Note[]>;
  create(text: string): Promise<void>;
  update(id: number, text: string): Promise<void>;
  delete(id: number): Promise<void>;
}