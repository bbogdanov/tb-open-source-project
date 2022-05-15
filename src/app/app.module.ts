import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TodoContainerComponent } from './todo/components/todo-container/todo-container.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoPageModule } from './todo-page/todo-page.module';
import { HomePageModule } from './home-page/todo-page.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { AuthGuard } from './auth.guard';
import { TodoResolver } from './todo/todo.resolver';
import { CdsModule } from '@cds/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CdsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      {
        path: 'tasks',
        component: TodoContainerComponent,
        resolve: {
          todos: TodoResolver,
        },
        // canActivate: [AuthGuard],
      },
      {
        path: 'task/:id',
        loadChildren: () =>
          import('./todo-page/todo-page.module').then((m) => m.TodoPageModule),
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ]),
    PageNotFoundModule,
    HomePageModule,
    BrowserModule,
    ClarityModule,
    CommonModule,
    TodoModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
