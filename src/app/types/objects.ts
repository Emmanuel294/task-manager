/* ••[1]••••••••••••••••••••••••• objects.ts •••••••••••••••••••••••••••••• */

import { ProjectDocument } from "./project/project.document";
import { TaskDocument } from "./task/task.document";
import { UserDocument } from "./user/user.document";

export enum FirebaseCollections {
    user = 'user',
    projects = 'projects',
    tasks = 'tasks'
};

export type FirebaseObjects =
    | UserDocument
    | ProjectDocument
    | TaskDocument;