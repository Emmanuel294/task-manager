/* ••[1]••••••••••••••••••••••••• forms.module.ts •••••••••••••••••••••••••••••• */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const forms = [
    FormsModule,
    ReactiveFormsModule,
];

@NgModule({
    declarations: [],
    exports: [forms],
    imports: [
        CommonModule,
        forms,
    ]
})
export class FormsModules { }