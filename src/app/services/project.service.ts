/* ••[1]••••••••••••••••••••••••• project.service.ts •••••••••••••••••••••••••••••• */

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, map } from 'rxjs';
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

    public getAllProjects(): void {
        this.firebaseService.getObjectList(FirebaseCollections.projects)
            .pipe(
                map(
                    (projects: FirebaseObjects[]): ProjectDocument[] => {
                        return projects.filter(
                            (project: FirebaseObjects): boolean => {
                                return !(project as ProjectDocument).closed;
                            }
                        ) as unknown as ProjectDocument[];
                    }
                )
            )
            .subscribe(
                (projects: ProjectDocument[]): void => {
                    this.projects = projects;
                    this.projects$.next(this.projects.slice());
                }
            );
    }

    public closeProject(projectId: string) {
        this.firebaseService.updateObject(FirebaseCollections.projects, { closed: true }, projectId);
    }
}