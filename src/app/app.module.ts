import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './modules/app-routing.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainNavComponent } from './components/landing-page/misc/main-nav/main-nav.component';
import { FeatureDataExtractionComponent } from './components/landing-page/feature-data-extraction/feature-data-extraction.component';
import { FeatureDataAnalysisComponent } from './components/landing-page/feature-data-analysis/feature-data-analysis.component';
import { CoverImageComponent } from './components/landing-page/cover-image/cover-image.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MainNavComponent,
    CoverImageComponent,
    FeatureDataExtractionComponent,
    FeatureDataAnalysisComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
