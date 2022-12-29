/* ••[1]••••••••••••••••••••••••• objects.ts •••••••••••••••••••••••••••••• */

import { UserDocument } from "./user/user.document";

export enum FirebaseCollections {
    user = 'user'
};

export type FirebaseObjects =
    | UserDocument;