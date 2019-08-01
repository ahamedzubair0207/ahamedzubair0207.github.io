import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigSettingsService {

  controllerName = 'ConfigSettings'

  
  constructor(private http: CustomHttp) { }

  getApplicationInfo(): Observable<any> {
    return this.http.get(this.controllerName,'Application')
      .pipe(
        map(response => response)
      );
  }

  getCreateOrgScreenLabels(): Observable<any> {
    return this.http.get(this.controllerName,'fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/95200C8D-9910-42F2-B26D-56E4BAC697B1')
      .pipe(
        map(response => response)
      );
  }

  getCreateLocScreenLabels(): Observable<any>{
    return this.http.get(this.controllerName, 'fd027a29-f9b7-474d-a4f4-0462d027c535/ScreenLabel/a2e85d4b-b6c1-4767-a7d7-ee0df88a6b92')
    .pipe(
      map(response => response)
    );
  }
}
