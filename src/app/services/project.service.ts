/* ••[1]••••••••••••••••••••••••• project.service.ts •••••••••••••••••••••••••••••• */

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { FirebaseCollections, FirebaseObjects } from '../types/objects';
import { ProjectCreateDocument, ProjectDocument } from '../types/project/project.document';
import { FirebaseService } from './firebase.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    public constructor(
        private readonly firebaseService: FirebaseService
    ) {

    }

    public projects$: Subject<ProjectDocument[]> = new Subject<ProjectDocument[]>();
    public projects: ProjectDocument[] = [];

    public createProject(project: ProjectCreateDocument) {
        this.firebaseService.createObject(FirebaseCollections.projects, project);
    }

    public async getAllProjects(): Promise<void> {
        await this.firebaseService.getObjectList(FirebaseCollections.projects)
            .subscribe(
                (projects: FirebaseObjects[]): void => {
                    this.projects = projects as ProjectDocument[];
                    this.projects$.next(this.projects.slice());
                }
            );
    }
}