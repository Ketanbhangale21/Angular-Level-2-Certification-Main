import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-step-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-selector.component.html',
  styleUrl: './step-selector.component.scss'
})
export class StepSelectorComponent {
  @Input() step2Enabled = false
  @Input() step3Enabled = false

  constructor(protected router: Router) {}

  onStep(idx: number) {
    this.router.navigate(['/', `step${idx}`])
  }
}
