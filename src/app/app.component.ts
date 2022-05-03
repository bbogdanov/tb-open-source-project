import { Component } from '@angular/core';
import { LoadingService } from './todo/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todos';

  constructor(public loadingService: LoadingService) {}
}
