import { NgFor } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '@core/constants/category.constant';

@Component({
  selector: 'categories-component',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  standalone: true,
  imports: [NgFor],
})
export class CategoriesComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelected = new EventEmitter<string>();

  selectCategory(category: string): void {
    this.categorySelected.emit(category);
  }
}
