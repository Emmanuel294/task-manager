/* ••[1]••••••••••••••••••••••••• material.modules.ts •••••••••••••••••••••••••••••• */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const material = [
    MatButtonModule
];

@NgModule({
    declarations: [],
    exports: [material],
    imports: [
        CommonModule,
        material,
    ]
})
export class MaterialModule { }