/* ••[1]••••••••••••••••••••••••• task.document.ts •••••••••••••••••••••••••••••• */

import { CommonDocument } from "../common/common.document"

export type TaskDocument = CommonDocument & TaskCreateDocument;

export type TaskCreateDocument = {
    closed: boolean;
    name: string,
    projectId: string,
}

export type TaskUpdateDocument = {
    closed: boolean;
    name: string,
}