import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  interval,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { BackEndService } from './back-end.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _items$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  constructor(private backend: BackEndService) {
    const schedule = interval(2000);
    schedule.subscribe(
      () => this.getTasksHelper().subscribe() // This should be destroy at some point but for the example its fine.
    );
  }

  get items(): BehaviorSubject<Todo[]> {
    return this._items$;
  }

  public addItem(item: Todo) {
    this.backend
      .addTodo(item)
      .pipe(concatMap(() => this.getTasksHelper())) // Executes getTasks after adding the item
      .subscribe();
  }

  public deleteItem(item: Todo) {
    this.backend
      .deleteTodo(item)
      .pipe(concatMap(() => this.getTasksHelper())) // Executes getTasks after the detele
      .subscribe();
  }

  public updateItem(item: Todo) {
    this.backend
      .updateTodo(item)
      .pipe(concatMap(() => this.getTasksHelper())) // Executes getTasks after the update
      .subscribe();
  }

  private getTasksHelper() {
    return this.backend.getTodos().pipe(
      // When the request succeeds, update the items observable
      tap((todos) => {
        this._items$.next(todos);
      })
    );
  }
}
