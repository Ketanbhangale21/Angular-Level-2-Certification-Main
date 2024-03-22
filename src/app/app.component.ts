import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StepSelectorComponent } from './components/step-selector/step-selector.component';
import { StateService } from './services/state/state.service';
import { CarImageComponent } from './components/car-image/car-image.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepSelectorComponent,
    RouterOutlet,
    CarImageComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(public state: StateService) {}
}
