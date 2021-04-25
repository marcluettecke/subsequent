import { Component, OnInit } from "@angular/core";
// import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { DataService } from "../../../core/services/data-service.service";
import { IPersonalDescription } from "../models/LandingPage";
@Component({
  selector: "app-about-us",
  templateUrl: "./about-us.component.html",
  styleUrls: ["./about-us.component.scss"],
})
export class AboutUsComponent implements OnInit {
  descriptions: IPersonalDescription[];

  imagePath = "card__picture card__picture--";

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllPersonalDescriptions().subscribe(
      (data: IPersonalDescription[]) => {
        this.descriptions = data;
        // console.log(data);
      },
      (err: any) => console.log(err)
    );
    console.log(this.descriptions);
  }
}
