import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiGateService } from '../../services/api-gate/api-gate.service';
import { StateService } from '../../services/state/state.service';
import { Color, Model } from '../../interfaces/types';

@Component({
  selector: 'app-choose-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './choose-car.component.html',
  styleUrl: './choose-car.component.scss',
})
export class ChooseCarComponent implements OnInit {
  chooseCarForm = new FormGroup({
    modelSelect: new FormControl('', [Validators.required]),
    colorSelect: new FormControl('', [Validators.required]),
  });

  models: Model[] = [];
  colors: Color[] = [];

  constructor(private apiGate: ApiGateService, private state: StateService) {}

  ngOnInit() {
    this.subscribeToGetModels();
    this.subscribeToModelSelectChanges();
    this.subscribeToFormStatusChanges();
  }

  subscribeToGetModels() {
    this.apiGate.getModels().subscribe((data) => {
      this.models = data;
      if (this.state.isStep1Completed()) {
        this.initByState();
      }
    });
  }

  initByState() {
    const summary = this.state.getSummary();
    this.chooseCarForm.setValue({
      modelSelect: summary.code!,
      colorSelect: summary.color?.code!,
    });
  }

  subscribeToModelSelectChanges() {
    this.chooseCarForm.controls['modelSelect'].valueChanges.subscribe(
      (value) => {
        this.resetColorsFormControl();
        this.initColorsArray(value);
      }
    );
  }

  subscribeToFormStatusChanges() {
    this.chooseCarForm.statusChanges.subscribe((status) => {
      if (this.chooseCarForm.dirty) {
        switch (status) {
          case 'VALID':
            const chosenModel = this.models.find(
              ({ code }) =>
                code === this.chooseCarForm.get('modelSelect')?.value
            );
            const chosenColor = chosenModel?.colors.find(
              ({ code }) =>
                code === this.chooseCarForm.get('colorSelect')?.value
            );
            this.state.setModel(
              chosenModel!.code,
              chosenModel!.description,
              chosenColor!
            );
            break;
          default:
            this.state.resetModel();
        }
      }
    });
  }

  initColorsArray(modelCode: string | null) {
    const newColors = this.models.find(
      ({ code }) => code === modelCode
    )?.colors;
    if (newColors) {
      this.colors = newColors;
      this.chooseCarForm.controls['colorSelect'].setValue(this.colors[0].code);
    } else {
      this.colors = [];
    }
  }

  resetColorsFormControl() {
    this.chooseCarForm.controls['colorSelect'].setValue('');
  }
}
