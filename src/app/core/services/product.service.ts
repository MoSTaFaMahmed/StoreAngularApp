import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Product } from '@core/models/product.model';
import { Category } from '@core/constants/category.constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}


  getProducts(): void {
    this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      catchError(this.handleError)
    ).subscribe((data) => {
      this.productsSubject.next(data);
    });
  }


  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`).pipe(
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/products/categories`).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product).pipe(
      map((newProduct) => {
        this.getProducts();
        return newProduct;
      }),
      catchError(this.handleError)
    );
  }


  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, product).pipe(
      map((updatedProduct) => {
        this.getProducts();
        return updatedProduct;
      }),
      catchError(this.handleError)
    );
  }


  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`).pipe(
      map(() => {
        this.getProducts(); // Refresh product list after deletion
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error(error);
    return throwError(() => new Error('Something went wrong while fetching data'));
  }
}
