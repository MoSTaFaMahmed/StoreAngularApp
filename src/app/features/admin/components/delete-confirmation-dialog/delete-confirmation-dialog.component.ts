import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss'
})
export class DeleteConfirmationDialogComponent {
  productName : string;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.productName = data;
  }
}
