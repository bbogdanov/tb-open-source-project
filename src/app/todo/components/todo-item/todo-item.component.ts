import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() item!: Todo;

  @Output() delete: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() labelChanged: EventEmitter<{ todoItem: Todo; newLabel: string }> = new EventEmitter();

  public isEditable: boolean = false;

  constructor() { }

  public toggleEditable(): void {
    this.isEditable = !this.isEditable;
  }

  public changeLabel(newLabel: string) {
    this.toggleEditable();
    this.labelChanged.emit({
      todoItem: this.item,
      newLabel
    });
  }

  public onDelete(): void {
    this.delete.emit(this.item);
  }

  public showAlert(label: string | undefined): void {
    alert(`TODO item label: ${label}`);
  }
}
