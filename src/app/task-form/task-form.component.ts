import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ProjectDocument } from '../types/project/project.document';
import { TaskCreateDocument } from '../types/task/task.document';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() projectId: string | undefined = undefined;

  public taskForm: FormGroup = new FormGroup({});

  constructor(
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
    });
  }

  public onSubmit(formDirective: FormGroupDirective) {
    if (this.projectId) {
      const newTask: TaskCreateDocument =
      {
        ...this.taskForm.value,
        closed: false,
        projectId: this.projectId
      };
      this.taskService.createTask(newTask);
      this.taskForm.reset();
      formDirective.resetForm();
    }
  }
}
