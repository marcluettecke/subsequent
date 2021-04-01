import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPersonalDescription } from '../../components/landing-page/models/LandingPage';
@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(private http: HttpClient) {}

	getAllPersonalDescriptions(): Observable<IPersonalDescription[]> {
		return this.http.get<IPersonalDescription[]>(
			'../../assets/text/landingPage/personalDescriptions.json'
		);
	}
}
