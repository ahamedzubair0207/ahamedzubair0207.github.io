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
    return this.http.get(this.controllerName,'ScreenLabel')
      .pipe(
        map(response => response)
      );
  }
}
