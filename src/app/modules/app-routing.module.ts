import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from '../components/landing-page/feature-list/feature-list.component';

import {LandingPageComponent} from '../components/landing-page/landing-page.component'

const routes: Routes = [
  {path: '', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
