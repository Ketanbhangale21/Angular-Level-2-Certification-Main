import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss',
})
export class CarImageComponent {
  @Input() carCode?: string = '';
  @Input() colorCode?: string = '';
}
