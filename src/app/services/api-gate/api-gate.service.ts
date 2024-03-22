import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Configuration, Model } from '../../interfaces/types';

@Injectable({
  providedIn: 'root',
})
export class ApiGateService {
  constructor(private http: HttpClient) {}

  getModels() {
    return this.http.get<Model[]>('/models');
  }

  getConfigurations(modelCode: string) {
    return this.http.get<Configuration>(`/options/${modelCode}`);
  }
}
