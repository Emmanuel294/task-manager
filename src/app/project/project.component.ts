import { AfterViewInit, Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectDocument } from '../types/project/project.document';
import { Subscription } from 'rxjs';
import { TaskDocument } from '../types/task/task.document';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() project: ProjectDocument | undefined;

  public tasks: TaskDocument[] = [];

  private tasksSubscription$!: Subscription;

  public projectProgress: number = 0;

  constructor(
    private readonly tasksService: TaskService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.project) {
      this.getTasks();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['project'] && changes['project'].currentValue !== changes['project'].previousValue
    ) {
      this.getTasks();
    }
  }

  private getTasks() {
    if (this.project) {
      this.tasksService.getAllTasksOfProject(this.project.id);
      this.tasksSubscription$ = this.tasksService.tasks$.subscribe(
        (tasks: TaskDocument[]): any => {
          tasks.sort(
            (a: TaskDocument, b: TaskDocument): number => {
              return a.created - b.created;
            }
          )
          this.tasks = tasks;
          let tasksDone: number = 0;
          tasks.forEach(
            (task: TaskDocument): any => {
              tasksDone += task.closed ? 1 : 0;
            }
          )

          this.projectProgress = -1;
          if (tasks.length > 0) {
            this.calculatePercent(tasksDone, tasks.length);
          }
        }
      );
    }
  }

  private calculatePercent(tasksDone: number, totalTasks: number): void {
    this.projectProgress = (tasksDone * 100) / totalTasks;
  }

}
