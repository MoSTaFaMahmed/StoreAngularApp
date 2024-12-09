import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '@core/services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-product-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './add-edit-product-dialog.component.html',
  styleUrls: ['./add-edit-product-dialog.component.scss']
})
export class AddEditProductDialogComponent {
  productForm: FormGroup;
  isEdit: boolean;
  categories: string[] = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys']; // Example categories

  constructor(
    public dialogRef: MatDialogRef<AddEditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.isEdit = data.isEdit;
    this.productForm = this.fb.group({
      title: [data.isEdit ? data.product.title : '', Validators.required],
      price: [data.isEdit ? data.product.price : '', Validators.required],
      category: [data.isEdit ? data.product.category : '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;

    if (this.isEdit) {
      this.productService.updateProduct(this.data.product.id, productData).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.productService.addProduct(productData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
