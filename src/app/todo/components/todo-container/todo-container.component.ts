import { Component, OnDestroy } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.scss'],
})
export class TodoContainerComponent implements OnDestroy {
  todoFormGroup: FormGroup;

  todos$!: Observable<Todo[]>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public storageService: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.todoFormGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      details: ['', Validators.required],
    });

    this.activatedRoute.data.subscribe((data) => {
      this.todos$ = new BehaviorSubject<Todo[]>(data.todos).asObservable();
    });

    // this.todos$ = this.storageService.items;
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public addTodoItem() {
    if (!this.todoFormGroup.valid) {
      alert('The text box cannot be empty!');
      return;
    }

    const itemToAdd: Todo = {
      completed: false,
      title: this.todoFormGroup.get('title')?.value,
      details: this.todoFormGroup.get('details')?.value,
    };

    this.storageService.addItem(itemToAdd);

    // clean the form
    this.todoFormGroup.setValue({
      title: '',
      details: '',
    });
    this.todoFormGroup.markAsPristine();
  }

  public updateTodoItem({
    todoItem,
    newLabel,
  }: {
    todoItem: Todo;
    newLabel: string;
  }): void {
    todoItem.details = newLabel;
    this.storageService.updateItem(todoItem);
  }

  public deleteTodoItem(itemToDelete: Todo): void {
    this.storageService.deleteItem(itemToDelete);
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    target.value = '';
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const parsedFile = fileReader.result;
      const lines = (parsedFile as string).split('\n');
      lines.forEach((line: string) => {
        const parts = line.split('|');

        if (parts.length !== 2) {
          return;
        }

        const itemToAdd: Todo = {
          completed: false,
          title: parts[0],
          details: parts[1],
        };

        this.storageService.addItem(itemToAdd);
      });
    };
    fileReader.readAsText(file);
  }
}
