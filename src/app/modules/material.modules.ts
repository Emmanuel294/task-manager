/* ••[1]••••••••••••••••••••••••• material.modules.ts •••••••••••••••••••••••••••••• */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from '@angular/material/tabs';

const material = [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule
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