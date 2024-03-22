import { Injectable } from '@angular/core';

import { Color, Summary, Type } from '../../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  selectedCar: Summary = {};

  constructor() {}

  getSummary(): Summary {
    return this.selectedCar;
  }

  isStep1Completed(): boolean {
    return !!(
      this.selectedCar.code &&
      this.selectedCar.description &&
      this.selectedCar.color
    );
  }

  isStep2Completed(): boolean {
    return !!this.selectedCar.config;
  }

  setConfig(config?: Type) {
    this.selectedCar.config = config;
  }

  setTowHitch(towHitch: boolean) {
    this.selectedCar.towHitch = towHitch;
  }

  setYoke(yoke: boolean) {
    this.selectedCar.yoke = yoke;
  }

  setModel(code: string, description: string, color: Color) {
    this.selectedCar.code = code;
    this.selectedCar.description = description;
    this.selectedCar.color = color;
  }

  resetModel() {
    this.selectedCar.code = undefined;
    this.selectedCar.description = undefined;
    this.selectedCar.color = undefined;
    this.selectedCar.config = undefined;
    this.selectedCar.towHitch = false;
    this.selectedCar.yoke = false;
  }

  resetConfig() {
    this.setConfig(undefined);
  }
}
