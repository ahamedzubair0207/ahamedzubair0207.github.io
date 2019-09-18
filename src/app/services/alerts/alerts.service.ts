import { Injectable } from '@angular/core';
import { CustomHttp } from '../custom_http/custom_http.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Alert } from '../../models/alert.model';
import { AppConstants } from '../../helpers/app.constants';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private http: CustomHttp) { }


  getAllAlerts(): Observable<any> {
    return this.http.get(AppConstants.GET_ALERT)
      .pipe(
        map(response => response)
      );
  }

  getAllAlertsByOrgId(orgId: string): Observable<any> {
    return this.http.get(`${AppConstants.GET_ALERT_BYORGID}/${orgId}`)
      .pipe(
        map(response => response)
      );
  }
}
