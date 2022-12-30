import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { FirebaseService } from './services/firebase.service';
import { FirebaseCollections } from './types/objects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  constructor(private readonly authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
