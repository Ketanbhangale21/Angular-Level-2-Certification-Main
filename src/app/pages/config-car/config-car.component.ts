import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { ApiGateService } from '../../services/api-gate/api-gate.service';
import { StateService } from '../../services/state/state.service';
import { Configuration, Type } from '../../interfaces/types';

@Component({
  selector: 'app-config-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './config-car.component.html',
  styleUrl: './config-car.component.scss',
})
export class ConfigCarComponent implements OnInit {
  configuration?: Configuration;
  actualConfiguration?: Type;

  chooseConfigurationForm = new FormGroup({
    configSelect: new FormControl(-1, [Validators.required, Validators.min(0)]),
  });

  constructor(
    private router: Router,
    private apiGate: ApiGateService,
    protected state: StateService
  ) {}

  ngOnInit() {
    if (!this.state.isStep1Completed()) {
      this.router.navigate(['/', 'step1']);
    }

    this.subscribeToConfigs();
    this.subscribeToConfigSelectChanges();
    this.subscribeToFormStatusChanges();
  }

  subscribeToConfigs() {
    this.apiGate
      .getConfigurations(this.state.getSummary().code!)
      .subscribe((data) => {
        this.configuration = data;
        if (this.state.isStep2Completed()) {
          this.initByState();
        }
      });
  }

  initByState() {
    const summary = this.state.getSummary();
    this.chooseConfigurationForm.setValue({
      configSelect: summary.config?.id!,
    });
  }

  subscribeToConfigSelectChanges() {
    this.chooseConfigurationForm.controls[
      'configSelect'
    ].valueChanges.subscribe((value) => {
      this.actualConfiguration = this.configuration?.configs.find(
        ({ id }) => id == value
      );
    });
  }

  onChangeIncludeYoke(event: Event) {
    this.state.setYoke((<HTMLInputElement>event.target).checked);
  }

  onChangeIncludeTow(event: Event) {
    this.state.setTowHitch((<HTMLInputElement>event.target).checked);
  }

  subscribeToFormStatusChanges() {
    this.chooseConfigurationForm.statusChanges.subscribe((status) => {
      switch (status) {
        case 'VALID':
          this.state.setConfig(this.actualConfiguration);
          break;
        default:
          this.state.resetConfig();
      }
    });
  }
}
