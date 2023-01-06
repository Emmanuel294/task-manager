/* ••[1]••••••••••••••••••••••••• project.document.ts •••••••••••••••••••••••••••••• */

import { CommonDocument } from "../common/common.document"

export type ProjectDocument = CommonDocument & ProjectCreateDocument;

export type ProjectCreateDocument = {
    description: string,
    name: string,
}