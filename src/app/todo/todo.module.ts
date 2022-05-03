import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoContainerComponent } from './components/todo-container/todo-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TodoItemComponent, TodoContainerComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [TodoContainerComponent],
})
export class TodoModule {}
