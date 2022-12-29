import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { FirebaseCollections } from './types/objects';
import { UserDocument } from './types/user/user.document';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';

  constructor() {
  }
}
