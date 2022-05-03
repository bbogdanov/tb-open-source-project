import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoPageComponent } from './todo-page.component';

@NgModule({
  declarations: [TodoPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TodoPageComponent, pathMatch: 'full' },
    ]),
  ],
  exports: [TodoPageComponent, RouterModule],
})
export class TodoPageModule {}
