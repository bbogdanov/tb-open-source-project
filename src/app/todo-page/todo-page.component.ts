import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from '../todo/models/todo.model';
import { StorageService } from '../todo/services/storage.service';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent {
  todo: Todo | undefined;
  private subscriptions = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params) => {
        this.subscriptions.add(
          this.storageService.items.subscribe((todos) => {
            this.todo = todos.find((x) => x.id === parseInt(params.id));
          })
        );
      })
    );
  }

  deleteItem(todo: Todo) {
    this.storageService.deleteItem(todo);
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
