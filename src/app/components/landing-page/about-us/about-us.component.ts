import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/services/data-service.service';
import { IAllPersonalDescriptions } from '../models/LandingPage';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
@Component({
	selector: 'app-about-us',
	templateUrl: './about-us.component.html',
	styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
	descriptions: IAllPersonalDescriptions;
  filIcon = faFilm;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.dataService.getAllPersonalDescriptions().subscribe(
			(data: IAllPersonalDescriptions) => {
        this.descriptions = data
        console.log(data);

      },
			(err: any) => console.log(err)
		);
    console.log(this.descriptions);

	}
}
