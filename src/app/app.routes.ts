import { Routes } from '@angular/router'

import { ChooseCarComponent } from './pages/choose-car/choose-car.component'
import { ConfigCarComponent } from './pages/config-car/config-car.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'
import { SummaryComponent } from './pages/summary/summary.component'

export const routes: Routes = [
    { path: '',   redirectTo: '/step1', pathMatch: 'full' },
    { path: 'step1', component: ChooseCarComponent },
    { path: 'step2', component: ConfigCarComponent },
    { path: 'step3', component: SummaryComponent },
    { path: '**',   component: PageNotFoundComponent },
];
