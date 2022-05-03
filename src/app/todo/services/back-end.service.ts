import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class BackEndService {
  api = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get<Todo[]>(`${this.api}/tasks`);
  }

  addTodo(todo: Todo) {
    return this.httpClient.post<void>(`${this.api}/tasks`, todo);
  }

  updateTodo(todo: Todo) {
    return this.httpClient.put<void>(`${this.api}/tasks/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo) {
    return this.httpClient.delete<void>(`${this.api}/tasks/${todo.id}`);
  }
}
