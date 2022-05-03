import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import { BackEndService } from './services/back-end.service';
import { LoadingService } from './services/loading.service';

@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<Todo[]> {
  constructor(
    private backEndService: BackEndService,
    private loadingService: LoadingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo[]> {
    this.loadingService.start();
    return this.backEndService.getTodos().pipe(
      delay(1000),
      tap(() => this.loadingService.stop())
    );
  }
}
