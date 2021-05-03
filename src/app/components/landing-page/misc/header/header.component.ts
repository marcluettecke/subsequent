import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  circleNavMenuExtraClass: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  /**
   * scrollTo searches for the given element and scrolls to it, with the
   * headerHeight as offset.
   *
   * @param searchID the element that should be scrolled to
   */
  scrollTo(searchID: string) {
    console.log("scrollTo clicked, searchID: ", searchID);
    const element = document.querySelector(searchID);
    console.log("scrollTo clicked, element: ", element);
    const headerElement = document.querySelector("#header");
    if (element && headerElement) {
      const headerHeight = headerElement.getBoundingClientRect().height;
      const elementRect = element.getBoundingClientRect().top;
      const bodyRect = document.body.getBoundingClientRect().top;
      const scrollToPosition = elementRect - bodyRect - headerHeight;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }
  }

  burgerMenuClicked() {
    // toggle extraClass:
    if (!this.circleNavMenuExtraClass) {
      this.circleNavMenuExtraClass = "tmp";
      setTimeout(() => {
        this.circleNavMenuExtraClass = "fadeIn";
      }, 1);
    } else {
      this.circleNavMenuExtraClass = null;
    }
  }
}
