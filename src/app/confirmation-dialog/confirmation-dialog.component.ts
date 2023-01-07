import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      acceptLabel: string,
      cancelLabel: string
      dialogTitle: string,
      message: string,
    }) { }

  closeDialogCancel(): void {
    this.dialog.close(false);
  }

  closeDialogAccept(): void {
    this.dialog.close(true);
  }

  ngOnInit(): void {
  }

}
