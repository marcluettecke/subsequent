import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollTo(searchID: string) {
    console.log("scrollTo clicked, searchID: ", searchID);
    const element = document.querySelector(searchID);
    console.log("scrollTo clicked, element: ", element);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  burgerMenuClicked() {
    console.log("burgerMenuClicked");
  }
}
