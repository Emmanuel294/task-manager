/* ••[1]••••••••••••••••••••••••• task.service.ts •••••••••••••••••••••••••••••• */

import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { FirebaseCollections, FirebaseObjects } from '../types/objects';
import { TaskCreateDocument, TaskDocument, TaskUpdateDocument } from '../types/task/task.document';
import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    public constructor(
        private readonly firebaseService: FirebaseService
    ) {

    }

    public tasks$: Subject<TaskDocument[]> = new Subject<TaskDocument[]>();
    public tasks: TaskDocument[] = [];

    public createTask(task: TaskCreateDocument) {
        this.firebaseService.createObject(FirebaseCollections.tasks, task);
    }

    public async updateTask(task: TaskUpdateDocument, id: string): Promise<void> {
        await this.firebaseService.updateObject(FirebaseCollections.tasks, task, id);
    }

    public getAllTasks(projectId: string): void {
        this.firebaseService.getObjectList(FirebaseCollections.tasks)
            .pipe(
                map(
                    (objects: FirebaseObjects[]): TaskDocument[] => {
                        return objects as TaskDocument[];
                    }
                )
            )
            .subscribe(
                (tasks: TaskDocument[]): void => {
                    this.tasks = tasks;
                    this.tasks$.next(this.tasks.slice());
                }
            );
    }

    public getAllTasksOfProject(projectId: string): void {
        this.firebaseService.getObjectListByField(FirebaseCollections.tasks, 'projectId', projectId)
            .pipe(
                map(
                    (objects: FirebaseObjects[]): TaskDocument[] => {
                        return objects as TaskDocument[];
                    }
                )
            )
            .subscribe(
                (tasks: TaskDocument[]): void => {
                    this.tasks = tasks;
                    this.tasks$.next(this.tasks.slice());
                }
            );
    }

    public deleteTask(taskId: string) {
        this.firebaseService.deleteObject(FirebaseCollections.tasks, taskId);
    }
}