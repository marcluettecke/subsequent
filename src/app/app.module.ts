import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './modules/app-routing.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainNavComponent } from './components/landing-page/misc/main-nav/main-nav.component';
import { CoverImageComponent } from './components/landing-page/cover-image/cover-image.component';
import { FeatureDetailsDirective } from './shared/components/feature-details.directive';
import { FeatureListComponent } from './components/landing-page/feature-list/feature-list.component';
import { AboutUsComponent } from './components/landing-page/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MainNavComponent,
    CoverImageComponent,
    FeatureDetailsDirective,
    FeatureListComponent,
    AboutUsComponent
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
