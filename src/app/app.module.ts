import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import {
  FontAwesomeModule,
  FaIconLibrary,
} from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { MatDialogModule } from "@angular/material/dialog";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AngularMaterialModule } from "./modules/angular-material.module";
import { AppComponent } from "./app.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { MainNavComponent } from "./components/landing-page/misc/main-nav/main-nav.component";
import { CoverImageComponent } from "./components/landing-page/cover-image/cover-image.component";
import { FeatureDetailsDirective } from "./shared/components/feature-details.directive";
import { FeatureListComponent } from "./components/landing-page/feature-list/feature-list.component";
import { AboutUsComponent } from "./components/landing-page/about-us/about-us.component";
import { FooterComponent } from "./components/landing-page/misc/footer/footer.component";
import { FeatureModalComponent } from "./components/landing-page/feature-list/feature-modal/feature-modal.component";

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MainNavComponent,
    CoverImageComponent,
    FeatureDetailsDirective,
    FeatureListComponent,
    AboutUsComponent,
    FooterComponent,
    FeatureModalComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatDialogModule,
  ],
  exports: [TranslateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}
