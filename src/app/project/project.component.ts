import { Component, OnInit, Input } from '@angular/core';
import { ProjectDocument } from '../types/project/project.document';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: ProjectDocument | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
