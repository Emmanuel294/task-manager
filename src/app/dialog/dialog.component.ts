import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    content: string,
    action: string,
    sendOnClose: boolean
  }) {
  }

  ngOnInit(): void {
  }

}
