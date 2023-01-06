import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { ProjectCreateDocument } from '../types/project/project.document';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  public projectForm: FormGroup = new FormGroup({});

  public formElement!: HTMLFormElement;

  constructor(
    private readonly projectService: ProjectService
  ) { }

  public ngOnInit(): void {
    this.projectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required,]),
    });
  }

  public onSubmit(): void {
    const project: ProjectCreateDocument = this.projectForm.value;
    this.projectService.createProject(project);
    this.projectForm.reset();
  }

}
