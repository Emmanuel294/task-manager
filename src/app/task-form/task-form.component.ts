import { Component, OnInit, Input } from '@angular/core';
import { ProjectDocument } from '../types/project/project.document';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() projectId: string | undefined = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
