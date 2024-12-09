import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import paginator module
import { MatTableModule } from '@angular/material/table'; // Import table module
import { MatButtonModule } from '@angular/material/button'; // Import button module
import { MatIconModule } from '@angular/material/icon'; // Import icon module
import { MatDialogModule } from '@angular/material/dialog'; // Import dialog module
import { Product } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { AddEditProductDialogComponent } from '../components/add-edit-product-dialog/add-edit-product-dialog.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PaginationComponent } from '../../../layouts/pagintion/pagination.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteConfirmationDialogComponent } from '../components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AddEditProductDialogComponent,
    PaginationComponent,
    DeleteConfirmationDialogComponent,
    CurrencyPipe,
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'category', 'actions'];
  pageSize: number = 5;
  totalProducts: number = 0;
  currentPage: number = 1;
  loading = true;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService :TranslateService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts();
    this.productService.products$.subscribe((data) => {
      this.products = data;
      this.updateProductList(data);
      this.loading = false;
      this.totalProducts = data.length;
    });
  }



  updateProductList(products: Product[]): void {
    this.products = products;
    this.totalProducts = products.length;
    this.paginateProducts(0, this.pageSize);
    this.loading = false;
  }


  onPageChange(page: any): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }



  paginateProducts(startIndex: number, endIndex: number): void {
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddEditProductDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { isEdit: false }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open(this.translateService.instant('Admin.productMessages.productAdded'), 'Close', { duration: 3000 });
      }
    });
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(AddEditProductDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { isEdit: true, product }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open(this.translateService.instant('Admin.productMessages.productUpdated'), 'Close', { duration: 3000 });
      }
    });
  }

  deleteProduct(product : Product): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data:  product.title
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe(() => {
          this.loadProducts();
          this.snackBar.open(this.translateService.instant('Admin.productMessages.productDeleted'), 'Close', { duration: 3000 });
        });
      }
    });
  }


}
