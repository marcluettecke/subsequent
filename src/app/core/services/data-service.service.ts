import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAllPersonalDescriptions, IPersonalDescription } from '../../components/landing-page/models/LandingPage'
@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(private http: HttpClient) {}

  getAllPersonalDescriptions(): Observable<IAllPersonalDescriptions>{
    return this.http.get<IAllPersonalDescriptions>('../../assets/text/landingPage/personalDescriptions.json')
  }
}
