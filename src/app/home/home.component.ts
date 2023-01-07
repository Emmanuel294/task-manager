import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectDocument } from '../types/project/project.document';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatChip } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  // SPINNER
  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value: number = 50;
  public displayProgressSpinner = false;

  public opened: boolean = true;
  public sideIcon: string = 'chevron_left';

  public projects$: ProjectDocument[] = [];

  private projectsSubscription$!: Subscription;

  public createProjectBool: boolean = false;

  public projectButtonLabel: string = 'New Project';

  public selectedProject: ProjectDocument | undefined = undefined;

  constructor(
    private readonly dialog: MatDialog,
    private readonly projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getProjects();
    this.projectsSubscription$ = this.projectService.projects$
      .pipe(
        catchError(
          (): Observable<never[]> => {
            this.displayProgressSpinner = false;
            return of([]);
          }
        )
      )
      .subscribe(
        (projects: ProjectDocument[]): any => {
          this.projects$ = projects;
          this.displayProgressSpinner = false;
          this.firstProjectSelection();
        }
      );

  }

  private firstProjectSelection() {
    if (!this.selectedProject && this.projects$.length > 0) {
      this.selectedProject = this.projects$[0];
    }
  }

  public async getProjects(): Promise<void> {
    setTimeout(
      (): any => {
        this.displayProgressSpinner = true;
      }, 1
    )
    await this.projectService.getAllProjects();
  }

  public createProject(): void {
    this.createProjectBool = !this.createProjectBool;
    this.projectButtonLabel = this.createProjectBool ? 'Cancel' : 'New Project';
    const formElement: HTMLDivElement = <HTMLDivElement>document.getElementById('projectForm');
    if (this.createProjectBool) {
      formElement.classList.remove('prj-form-open');
      formElement.classList.add('prj-form');
    } else {
      formElement.classList.remove('prj-form');
      formElement.classList.add('prj-form-open');
    }
  }

  ngOnDestroy(): void {
    this.projectsSubscription$.unsubscribe();
  }

  clickSidenav(): void {
    this.opened = !this.opened;
    this.sideIcon = this.opened ? 'chevron_left' : 'chevron_right';
  }

  public changeSelectedProject(selectedProject: ProjectDocument): void {
    if (selectedProject !== this.selectedProject) {
      this.selectedProject = selectedProject;
    }
  }

  public closeProject(project: ProjectDocument) {
    this.dialog.open(
      ConfirmationDialogComponent, {
      data: {
        acceptLabel: 'Delete',
        cancelLabel: 'Cancel',
        dialogTitle: 'Delete Project',
        message: `Are you sure you want to delete the project '${project.name}'?`,
      },
      backdropClass: 'error-class',
    }
    ).afterClosed()
      .subscribe(
        (result: boolean): any => {
          if (result) {
            this.projectService.closeProject(project.id);
          }
        }
      )
  }

}
