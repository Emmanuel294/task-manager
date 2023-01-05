import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public opened: boolean = false;
  public sideIcon: string = 'chevron_right';

  public items: any[] = [
    { id: 0, name: "should adsfasdfsadf", color: "primary" },
    { id: 1, name: "be", color: "accent" },
    { id: 2, name: "preselected", color: "warn" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
