import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { MainNavComponent } from './components/landing-page/misc/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CoverImageComponent } from './components/landing-page/cover-image/cover-image.component';
import { FeatureListComponent } from './components/landing-page/feature-list/feature-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MainNavComponent,
    CoverImageComponent,
    FeatureListComponent
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
