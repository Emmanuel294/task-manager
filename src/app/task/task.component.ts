import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TaskService } from '../services/task.service';
import { TaskDocument, TaskUpdateDocument } from '../types/task/task.document';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: TaskDocument;

  constructor(
    public dialogo: MatDialog,
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  public handleChangeStatus(checked: boolean) {
    const taskUpdate: TaskUpdateDocument = {
      closed: checked,
      name: this.task.name,
    }
    this.taskService.updateTask(taskUpdate, this.task.id);
  }

  public handleDelete() {
    this.dialogo.open(
      ConfirmationDialogComponent, {
      data: {
        acceptLabel: 'Delete',
        cancelLabel: 'Cancel',
        dialogTitle: 'Delete Task',
        message: `Are you sure you want to delete the task '${this.task.name}'?`,
      },
      backdropClass: 'error-class',
    }
    )
      .afterClosed()
      .subscribe(
        (result: boolean): any => {
          if (result) {
            this.taskService.deleteTask(this.task.id);
          }
        }
      )
  }

}
