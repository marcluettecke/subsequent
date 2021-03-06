import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-main-nav",
  templateUrl: "./main-nav.component.html",
  styleUrls: ["./main-nav.component.scss"],
})
export class MainNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService
  ) {
    translate.setDefaultLang("de");
  }

  scrollTo(searchID: string) {
    const element = document.querySelector(searchID);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
