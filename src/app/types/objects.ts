/* ••[1]••••••••••••••••••••••••• objects.ts •••••••••••••••••••••••••••••• */

import { ProjectDocument } from "./project/project.document";
import { UserDocument } from "./user/user.document";

export enum FirebaseCollections {
    user = 'user',
    projects = 'projects',
};

export type FirebaseObjects =
    | UserDocument
    | ProjectDocument;