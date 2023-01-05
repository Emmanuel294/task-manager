import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public pageTitle: string = 'Task Manager';
  public isAuthenticated: boolean = false;

  constructor(private readonly authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.token.subscribe(
      (token): any => {
        this.isAuthenticated = !!token;
      }
    )
  }

}
