import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [NgClass,NgFor],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Input() count: number = 0;

  get stars() {
    return Array(5).fill(0);
  }
}
