import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from '../../services/state/state.service';
import { Summary } from '../../interfaces/types';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  summary: Summary = {};

  constructor(private state: StateService, public router: Router) {}

  ngOnInit() {
    if (!this.state.isStep1Completed()) {
      this.router.navigate(['/', 'step1']);
    }
    if (!this.state.isStep2Completed()) {
      this.router.navigate(['/', 'step2']);
    }
    this.summary = this.state.getSummary();
  }
}
