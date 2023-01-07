/* ••[1]••••••••••••••••••••••••• project.document.ts •••••••••••••••••••••••••••••• */

import { CommonDocument } from "../common/common.document"

export type ProjectDocument = CommonDocument & ProjectCreateDocument;

export type ProjectCreateDocument = {
    closed: false,
    description: string,
    name: string,
}